-- Tables created via SQL no longer auto-grant to API roles.
-- Without these, PostgREST returns: permission denied for table episodes (42501)

grant select on table public.episodes to anon, authenticated;
grant select, insert, update, delete on table public.episodes to service_role;
