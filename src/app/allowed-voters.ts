/**
 * Lista de correos autorizados para votar en la encuesta de adopción de OpenSpec.
 *
 * Esta lista se usa en el cliente para dar feedback inmediato en la UI (evitar
 * mostrar los botones de voto a alguien no autorizado), pero la barrera de
 * seguridad real está en la base de datos: ver `supabase/migrations/0002_allowed_voters.sql`,
 * que restringe las políticas RLS de `votes` a estos mismos correos.
 *
 * El correo se obtiene del email verificado asociado a la cuenta de GitHub con la
 * que el usuario inicia sesión (scope `user:email` de OAuth). Si alguien tiene una
 * cuenta de GitHub con un correo distinto al de la empresa, no podrá votar aunque
 * inicie sesión correctamente.
 */
export const ALLOWED_VOTER_EMAILS: ReadonlySet<string> = new Set([
  'juancarlos.ruiz@vivaticket.com',
  'hector.tilve@vivaticket.com',
  'kevin.cerro@vivaticket.com',
  'ivan.gomez@vivaticket.com',
  'israelgonzalbez@gmail.com',
  'david.alfageme@vivaticket.com',
  'hernan.cortes@vivaticket.com'
]);
