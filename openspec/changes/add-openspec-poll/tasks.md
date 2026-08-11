# Tasks: add-openspec-poll

## 0. Branch

- [x] 0.1 Crear y cambiar a la rama de la feature (p. ej. `feature/add-openspec-poll`) antes de tocar código de producto.

## 1. Scaffold Angular + Tailwind

- [x] 1.1 Crear la aplicación Angular (standalone components, routing, sin SSR) en la raíz del repo con `ng new` / `ng generate` según convención actual del CLI.
- [x] 1.2 Instalar y configurar Tailwind CSS (`tailwind.config`, `styles.css` con directivas) y verificar que una clase de utilidad se aplica en pantalla.
- [x] 1.3 Instalar `@supabase/supabase-js` y crear `src/environments/` con `supabaseUrl` y publishable key generados desde variables de entorno (`.env`, ver `.env.example`). `environment.ts` y `environment.prod.ts` están en `.gitignore`.
- [x] 1.4 Verificación: `ng build` y `ng serve` levantan la app vacía sin errores. Guardar log en `reports/task-1-build.log`.

## 2. Supabase: esquema y configuración

- [x] 2.1 Crear migración `supabase/migrations/0001_votes.sql` con la tabla `votes` (`user_id uuid PK references auth.users`, `vote boolean`, `created_at`, `updated_at`), RLS habilitado y policies owner-only (select/insert/update con `auth.uid() = user_id`), según diseño D3.
- [x] 2.2 Añadir en la migración la función RPC `get_poll_results()` (`security definer`, devuelve `yes_count`/`no_count`, ejecutable por `authenticated`), según diseño D4.
- [x] 2.3 Aplicar la migración al proyecto Supabase (Supabase CLI `supabase db push` o SQL editor del dashboard) y verificar tabla, policies y función.
- [ ] 2.4 MANUAL (usuario): crear GitHub OAuth App, configurar el provider GitHub en Supabase Auth y las callback URLs (`http://localhost:4200/**` para desarrollo). Verificación manual: el flujo de login redirige a GitHub y vuelve.
- [x] 2.5 Guardar evidencia de la verificación (salida de CLI o capturas) en `reports/task-2-supabase.md`.

## 3. Auth en la SPA

- [x] 3.1 Crear `AuthService` (cliente Supabase, `signInWithOAuth({ provider: 'github' })`, `signOut`, signal/observable de sesión persistida).
- [x] 3.2 UI de login/logout en la landing: botón "Iniciar sesión con GitHub" en estado anónimo; indicador de usuario y "Cerrar sesión" en estado autenticado.
- [x] 3.3 Tests unitarios del `AuthService` (mock del cliente Supabase: login, logout, sesión persistida) ejecutados por code-writer con `ng test`; log en `reports/task-3-tests.log`.
- [ ] 3.4 Verificación manual: login real contra GitHub en `ng serve`, recarga mantiene sesión, logout vuelve al estado anónimo. Anotar resultado en `reports/task-3-manual.md`.

## 4. Votación y resultados

- [x] 4.1 Crear `VoteService`: leer mi voto (`select` por `user_id`), votar/cambiar voto (`upsert onConflict: 'user_id'`), obtener tally (`rpc('get_poll_results')`).
- [x] 4.2 Componente de voto Sí/No: visible solo con sesión; botones deshabilitados durante la petición; voto actual marcado y cambiable (diseño D3, spec poll-voting).
- [x] 4.3 Componente de tally: visible solo tras votar (spec poll-results); se refresca tras cada voto y al cargar si ya se votó; muestra totales Sí/No (p. ej. barras con Tailwind).
- [x] 4.4 Componente de ilustración SVG inline (montaña + escalador + bandera OpenSpec) integrado en la landing, responsive (spec landing-visual).
- [x] 4.5 Tests unitarios de `VoteService` y componentes (mock Supabase: primer voto, cambio de voto, tally solo tras votar) con `ng test`; log en `reports/task-4-tests.log`.
- [ ] 4.6 Verificación manual end-to-end con dos cuentas GitHub: (a) cada una vota una vez; (b) cambiar voto actualiza el tally; (c) un usuario no puede leer el voto del otro (RLS); (d) anónimo no ve tally. Anotar en `reports/task-4-e2e.md`.

## 5. Documentación y cierre

- [x] 5.1 Actualizar `README.md` con descripción de la app, setup local (`pnpm install`, `pnpm start`), variables de entorno de Supabase y pasos manuales de GitHub OAuth.
- [x] 5.2 Revisar que `reports/` contiene los logs de build/tests/verificaciones de las tareas 1–4.
- [x] 5.3 Implementer: verificación final — `ng build`, `ng test` verdes, y checklist de specs (landing-visual, github-auth, poll-voting, poll-results) cumplido antes de marcar `[x]`.

<!-- apply: [wip]=started/incomplete; [x]=verified by implementer -->
<!-- execution: batch -->
