-- Allow public read access for the archive page.
alter table episodes enable row level security;

create policy "Public read access for episodes"
  on episodes
  for select
  to anon, authenticated
  using (true);

grant select on table public.episodes to anon, authenticated;
grant select, insert, update, delete on table public.episodes to service_role;

