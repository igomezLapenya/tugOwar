# Restricción de votantes — Pasos manuales pendientes

## Estado: PENDIENTE (requiere acción del usuario)

El código ya está listo (build y tests pasan), pero la restricción real de
"quién puede votar" vive en dos sitios y uno de ellos requiere que apliques
una migración SQL manualmente porque no tengo credenciales de base de datos
(solo la publishable key en `.env`, sin permisos de escritura sobre políticas).

## Qué se hizo en el código

1. `src/app/allowed-voters.ts`: lista de los 7 correos autorizados.
2. `src/app/services/auth.service.ts`: nuevo `isAllowedVoter()` que comprueba
   si el email verificado de la cuenta de GitHub está en la lista.
3. `src/app/app.component.ts` / `.html`: los botones de voto y el tally solo
   se muestran si `isAllowedVoter()` es true; si no, se muestra un aviso de
   "cuenta no autorizada".
4. `supabase/migrations/0002_allowed_voters.sql`: nueva tabla `allowed_voters`
   y políticas RLS de `votes` que exigen `auth.jwt() ->> 'email'` en esa tabla,
   además de `auth.uid() = user_id`.

**Importante:** el punto 3 (chequeo en el cliente) es solo UX. La seguridad
real está en el punto 4 (RLS). Sin aplicar la migración, cualquier cuenta de
GitHub que se autentique podría votar directamente contra la API de Supabase
aunque la UI de Angular no le muestre los botones.

## Pasos para aplicar la migración

### Opción A: Dashboard de Supabase (más simple)

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Abre **SQL Editor**
3. Pega el contenido completo de `supabase/migrations/0002_allowed_voters.sql`
4. Ejecuta la query
5. Verifica en **Authentication → Policies** (tabla `votes`) que ahora aparecen
   las 3 políticas nuevas: "Allowed voters can select/insert/update their own vote"
   y que las 3 antiguas ("Users can select/insert/update...") ya no existen

### Opción B: Supabase CLI

```bash
npx supabase login
npx supabase link --project-ref <tu-project-ref>
npx supabase db push
```

## Verificación

- [ ] Migración aplicada (tabla `allowed_voters` con 7 filas)
- [ ] Políticas RLS de `votes` actualizadas (verificar en el dashboard)
- [ ] Login con una cuenta de GitHub cuyo email NO esté en la lista: la UI debe
      mostrar el aviso de "cuenta no autorizada" y no debe poder insertar en `votes`
      (probar también con una petición directa si quieres confirmar que RLS bloquea,
      no solo la UI)
- [ ] Login con una cuenta de GitHub cuyo email SÍ esté en la lista: debe poder
      votar con normalidad

## Nota sobre el email de GitHub

Supabase toma el email verificado que devuelve la API de GitHub para la cuenta
usada en el login. Si algún invitado tiene configurado un email diferente al
corporativo como principal/verificado en GitHub, no podrá votar aunque
"debería" poder. Si eso ocurre, la solución es que esa persona añada y verifique
su correo `@vivaticket.com` en la configuración de su cuenta de GitHub, o que
ajustemos la lista para incluir el correo real que usan.
