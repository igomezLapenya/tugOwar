# OpenSpec Poll

Aplicación Angular para votar democráticamente sobre la adopción de OpenSpec. Cada usuario se autentica con GitHub y puede votar sí/no una sola vez (con posibilidad de cambiar su voto). Los resultados agregados se muestran solo después de votar.

## Tecnologías

- Angular 19 (standalone components, routing, sin SSR)
- Tailwind CSS
- Supabase (Auth + Postgres)
- GitHub OAuth

## Setup local

```bash
pnpm install
pnpm start
```

La app estará disponible en `http://localhost:4200`.

## Variables de entorno

Las credenciales de Supabase se gestionan mediante variables de entorno, nunca se commitean en el repo.

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Rellena `.env` con los valores de tu proyecto (Supabase Dashboard → Settings → API):
   ```
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_KEY=your-publishable-key
   ```
3. `pnpm start` y `pnpm run build` ejecutan automáticamente `scripts/generate-env.js`, que lee `.env` y genera `src/environments/environment.ts` / `environment.prod.ts` (ambos ignorados por git).

La publishable key es pública por diseño y se usa en el cliente. El service key **nunca** debe incluirse en el frontend ni en `.env` de este proyecto.

## Pasos manuales requeridos

### 1. GitHub OAuth App

1. Ve a https://github.com/settings/developers
2. Crea una **New OAuth App**
3. Configura:
   - Homepage URL: `http://localhost:4200`
   - Authorization callback URL: `http://localhost:4200/**`
4. Copia el **Client ID** y **Client Secret**

### 2. Configurar provider en Supabase

1. Ve al dashboard de Supabase: https://supabase.com/dashboard/project/&lt;tu-project-ref&gt;
2. Navega a **Authentication → Providers**
3. Habilita **GitHub** y pega el Client ID y Client Secret
4. Guarda los cambios

## Migraciones de Supabase

La migración `supabase/migrations/0001_votes.sql` crea:
- Tabla `votes` con RLS
- Políticas owner-only
- Función RPC `get_poll_results()`

Ya está aplicada al proyecto remoto. Si necesitas recrearla localmente, ejecuta el SQL en el SQL Editor del dashboard.

## Scripts útiles

```bash
pnpm run build    # Build de producción
pnpm test         # Tests unitarios (Karma + Jasmine)
pnpm start        # Servidor de desarrollo (ng serve)
```

## Estructura del proyecto

```
src/
  app/
    components/
      illustration/   # SVG montaña + escalador + bandera
      tally/          # Resultados agregados
      vote/           # Botones Sí/No
    services/
      auth.service.ts # Auth con GitHub via Supabase
      vote.service.ts # Votación y resultados
    supabase.provider.ts # Inyección del cliente Supabase
  environments/
    environment.ts
    environment.prod.ts
supabase/
  migrations/
    0001_votes.sql
```
