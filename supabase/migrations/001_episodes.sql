create table episodes (
  id uuid primary key default gen_random_uuid(),
  episode_number integer not null unique,
  title text not null,
  youtube_id text not null unique,
  youtube_url text not null,
  thumbnail_url text,
  published_at timestamptz,
  duration_seconds integer,
  transcription_status text not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index episodes_published_at_idx on episodes (published_at desc);
create index episodes_episode_number_idx on episodes (episode_number desc);
