alter table episodes
  add column summary text,
  add column tags text[] not null default '{}',
  add column view_count bigint,
  add column chapters jsonb not null default '[]'::jsonb,
  add column transcript jsonb not null default '[]'::jsonb;
