-- Migration: restrict voting to an explicit allowlist of emails
--
-- Cualquier cuenta de GitHub puede autenticarse via OAuth (Supabase no filtra
-- por dominio), así que la restricción de "quién puede votar" se aplica aqui,
-- a nivel de RLS, usando el correo verificado del JWT (auth.jwt() ->> 'email').
-- Esto es la barrera de seguridad real; la comprobación en el cliente
-- (src/app/allowed-voters.ts) es solo para dar feedback inmediato en la UI.

create table if not exists allowed_voters (
  email text primary key
);

insert into allowed_voters (email) values
  ('juancarlos.ruiz@vivaticket.com'),
  ('hector.tilve@vivaticket.com'),
  ('kevin.cerro@vivaticket.com'),
  ('ivan.gomez@vivaticket.com'),
  ('israel.gonzalbez@vivaticket.com'),
  ('david.alfageme@vivaticket.com'),
  ('hernan.cortes@vivaticket.com')
on conflict (email) do nothing;

-- Solo el propio backend (via service role) gestiona esta tabla; los usuarios
-- autenticados no tienen ningún acceso directo a ella.
alter table allowed_voters enable row level security;

-- Reemplaza las políticas de la migración 0001 para añadir la comprobación
-- de la allowlist ademas de auth.uid() = user_id.
drop policy if exists "Users can select their own vote" on votes;
drop policy if exists "Users can insert their own vote" on votes;
drop policy if exists "Users can update their own vote" on votes;

create policy "Allowed voters can select their own vote"
  on votes
  for select
  to authenticated
  using (
    auth.uid() = user_id
    and lower(auth.jwt() ->> 'email') in (select email from allowed_voters)
  );

create policy "Allowed voters can insert their own vote"
  on votes
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and lower(auth.jwt() ->> 'email') in (select email from allowed_voters)
  );

create policy "Allowed voters can update their own vote"
  on votes
  for update
  to authenticated
  using (
    auth.uid() = user_id
    and lower(auth.jwt() ->> 'email') in (select email from allowed_voters)
  )
  with check (
    auth.uid() = user_id
    and lower(auth.jwt() ->> 'email') in (select email from allowed_voters)
  );
