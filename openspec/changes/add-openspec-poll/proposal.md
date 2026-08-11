# Proposal: add-openspec-poll

## Why

El equipo quiere decidir si adopta OpenSpec de forma democrática y transparente. Se necesita una web compartible por link donde cada persona vote sí/no una sola vez, con identidad verificada (GitHub) y resultados agregados visibles. Hoy no existe ningún artefacto: el repositorio está vacío.

## What Changes

- Nueva aplicación **Angular + Tailwind CSS** (greenfield) que sirve una landing con una ilustración de una montaña y un escalador portando una bandera de OpenSpec.
- **Login con GitHub** vía Supabase Auth (OAuth). Sin login no se puede votar.
- **Votación sí/no** persistida en Postgres de Supabase (tabla `votes`). Un voto por usuario (`user_id` único); el usuario **puede cambiar su voto** (upsert, cuenta el último).
- **Resultados agregados** (tally sí/no) visibles solo después de votar, mediante función RPC de Postgres que no expone votos individuales.
- Configuración del proyecto Supabase: provider GitHub, migraciones SQL versionadas en el repo, políticas RLS.
- Nota: la idea inicial de persistir en CSV fue descartada y reemplazada por Supabase.

## Capabilities

### New Capabilities

- `landing-visual`: Página pública de la encuesta con la ilustración montaña/escalador/bandera OpenSpec y la pregunta de adopción.
- `github-auth`: Autenticación de usuarios mediante GitHub OAuth a través de Supabase Auth, con sesión persistente y estado de login en la UI.
- `poll-voting`: Emisión y cambio del voto sí/no, con unicidad por usuario garantizada en base de datos.
- `poll-results`: Consulta del recuento agregado de votos, visible únicamente tras haber votado.

### Modified Capabilities

(ninguna — no existen specs previas)

## Impact

- **Código nuevo**: aplicación Angular completa (`package.json`, `src/`, configuración Tailwind), migraciones SQL de Supabase (`supabase/migrations/`), configuración de entorno.
- **Dependencias nuevas**: Angular, Tailwind CSS, `@supabase/supabase-js`.
- **Sistemas externos**: Supabase (Auth + Postgres), GitHub OAuth App (callback URLs).
- **Datos**: la tabla `votes` almacena `user_id` de GitHub; no se exponen votos individuales por la UI (solo agregados vía RPC).
- **Secretos**: la publishable key de Supabase es pública por diseño e irá en el frontend; el service key nunca se usa en el cliente ni se commitea.
