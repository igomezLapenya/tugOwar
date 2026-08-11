# OpenSpec Poll

Aplicación Angular para votar democráticamente sobre la adopción de OpenSpec. Cada usuario se autentica con GitHub y puede votar sí/no una sola vez (con posibilidad de cambiar su voto). Los resultados agregados se muestran solo después de votar.

## Tecnologías

- Angular 19 (standalone components, routing, sin SSR)
- Tailwind CSS
- Supabase (Auth + Postgres)
- GitHub OAuth

## Setup local

```bash
npm install
ng serve
```

La app estará disponible en `http://localhost:4200`.

## Variables de entorno

Las variables de entorno están en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://REDACTED_PROJECT_REF.supabase.co',
  supabaseKey: 'REDACTED_SUPABASE_KEY'
};
```

La publishable key es pública por diseño y se usa en el cliente. El service key **nunca** debe incluirse en el frontend.

## Pasos manuales requeridos

### 1. GitHub OAuth App

1. Ve a https://github.com/settings/developers
2. Crea una **New OAuth App**
3. Configura:
   - Homepage URL: `http://localhost:4200`
   - Authorization callback URL: `http://localhost:4200/**`
4. Copia el **Client ID** y **Client Secret**

### 2. Configurar provider en Supabase

1. Ve al dashboard de Supabase: https://supabase.com/dashboard/project/REDACTED_PROJECT_REF
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
ng build          # Build de producción
ng test           # Tests unitarios (Karma + Jasmine)
ng serve          # Servidor de desarrollo
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
