-- Migration: votes table and RLS policies
-- Design D3

create table if not exists votes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  vote boolean not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table votes enable row level security;

-- Owner-only policies: each user can only read/insert/update their own row
create policy "Users can select their own vote"
  on votes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own vote"
  on votes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own vote"
  on votes
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- RPC function to get aggregated poll results (Design D4)
create or replace function get_poll_results()
returns table (yes_count int, no_count int)
language sql
security definer
set search_path = public
as $$
  select
    count(*) filter (where vote = true)::int as yes_count,
    count(*) filter (where vote = false)::int as no_count
  from votes;
$$;

-- Grant execute to authenticated users
grant execute on function get_poll_results() to authenticated;

