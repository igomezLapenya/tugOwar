# Design: add-openspec-poll

## Context

Repositorio greenfield. Queremos una SPA en Angular + Tailwind con una encuesta de adopción de OpenSpec (sí/no), login GitHub y persistencia de votos. La idea inicial de CSV fue reemplazada por **Supabase** (Auth + Postgres), lo que elimina la necesidad de backend propio: la SPA habla directamente con Supabase usando la publishable key, y la seguridad se garantiza con Row Level Security (RLS).

Arquitectura: `Angular SPA (@supabase/supabase-js) -> Supabase Auth (GitHub OAuth) -> Postgres (tabla votes + RPC de tally)`.

## Goals / Non-Goals

**Goals:**

- SPA Angular standalone + Tailwind con landing visual: montaña, escalador y bandera de OpenSpec (ilustración SVG inline, sin assets binarios).
- Login GitHub vía Supabase Auth; sesión persistida en el navegador.
- Voto sí/no con unicidad por usuario garantizada en base de datos; el usuario puede cambiar su voto.
- Tally agregado (sí/no) visible solo tras votar, sin exponer votos individuales.
- Migraciones SQL versionadas en `supabase/migrations/`.

**Non-Goals:**

- Panel de administración, moderación o exportación de votos.
- Mostrar quién votó qué (solo agregados).
- Backend propio / API REST custom.
- Despliegue a producción (CI/CD, hosting): trabajo futuro.
- Múltiples encuestas o preguntas configurables.

## Decisions

### D1: Supabase en lugar de CSV + backend propio

Una SPA Angular no puede escribir un CSV ni custodiar el `client_secret` de OAuth de forma segura. Supabase resuelve ambos problemas (Auth con provider GitHub + Postgres con RLS) sin backend propio. Alternativa descartada: Node/Express + CSV en disco (más piezas que mantener, OAuth manual).

### D2: Auth con `@supabase/supabase-js` y provider GitHub

`supabase.auth.signInWithOAuth({ provider: 'github' })` con redirect a la app; sesión en localStorage (default del SDK). Requiere crear una GitHub OAuth App y habilitar el provider en Supabase (paso manual documentado en tasks). Alternativa descartada: OAuth manual contra la API de GitHub (inseguro desde una SPA).

### D3: Tabla `votes` con `user_id` como PRIMARY KEY

```sql
create table votes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  vote boolean not null,           -- true = si, false = no
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table votes enable row level security;
-- policies: select/insert/update solo cuando auth.uid() = user_id
```

- Unicidad: PK sobre `user_id` (un voto por usuario, garantizado por DB).
- Cambio de voto: `upsert` con `onConflict: 'user_id'`; el último voto cuenta.
- RLS: cada usuario solo lee/escribe su propia fila.

### D4: Tally vía RPC `get_poll_results()`

Función Postgres `security definer` que devuelve `(yes_count int, no_count int)` y es ejecutable por usuarios autenticados. Así el tally no requiere exponer filas de otros usuarios (RLS lo impediría). Alternativa descartada: vista pública o select directo (expondría votos individuales o chocaría con RLS).

### D5: Ilustración como SVG inline

La montaña/escalador/bandera se implementa como SVG inline en un componente Angular estilizado con Tailwind. Sin assets binarios, sin dependencias de imágenes externas, versionable y escalable.

### D6: Configuración del proyecto

URL y publishable key de Supabase en `src/environments/`. La publishable key es pública por diseño. El service key **nunca** aparece en el cliente ni en el repo. Proyecto: `https://REDACTED_PROJECT_REF.supabase.co`.

## Risks / Trade-offs

- [RLS mal configurada expone o permite votos ajenos] -> Migración con policies mínimas owner-only + verificación manual (checklist en tasks) probando con dos usuarios.
- [La GitHub OAuth App requiere pasos manuales fuera del repo] -> Documentados como tareas manuales con criterio de verificación; el implementer no puede automatizarlos sin credenciales.
- [RPC `security definer` ejecuta con privilegios elevados] -> Función de solo lectura de agregados (`count`), sin parámetros ni SQL dinámico.
- [El tally podría mostrar datos obsoletos] -> Se consulta tras cada voto y al cargar si el usuario ya votó; sin caché.
- [Doble click / race condition al votar] -> El upsert es idempotente por PK; la UI deshabilita botones durante la petición.

## Migration Plan

No hay datos ni sistema previo (greenfield). Aplicar migraciones con Supabase CLI (`supabase db push`) o pegando el SQL en el dashboard. Rollback: `drop table votes; drop function get_poll_results();`.

## Open Questions

- ¿Se añade el MCP de Supabase a OpenCode antes de apply? (Config pendiente por permisos; ver handoff del planner.)
- Texto exacto de la pregunta de la encuesta y copy de la landing (propuesta por defecto: "¿Adoptamos OpenSpec?").
