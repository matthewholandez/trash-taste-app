# Trash Taste Archive

A fan archive for the [Trash Taste](https://www.youtube.com/@TrashTaste) podcast. Episodes are synced from YouTube into Supabase and displayed in a warm, browsable grid.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

2. Create a Supabase project, create publishable/secret API keys in **Settings → API Keys**, and run the migrations in [`supabase/migrations/`](supabase/migrations/).

3. Apply the RLS migration so the publishable key can read episodes publicly, then run [`003_grants.sql`](supabase/migrations/003_grants.sql) if you already applied the earlier migrations before grants were added.

4. Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

5. Seed episodes from YouTube:

```bash
curl -X POST http://localhost:3000/api/sync/episodes \
  -H "Authorization: Bearer $CRON_SECRET"
```

The same endpoint accepts GET (used by Vercel Cron) and POST (manual sync).

## Environment variables

| Variable | Purpose |
|---|---|
| `YOUTUBE_API_KEY` | YouTube Data API v3 key |
| `YOUTUBE_UPLOADS_PLAYLIST_ID` | Optional. Skips the `channels.list` call when set |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (`sb_publishable_...`) for page reads |
| `SUPABASE_SECRET_KEY` | Supabase secret key (`sb_secret_...`) for sync writes |
| `CRON_SECRET` | Protects `/api/sync/episodes` |

Supabase replaced legacy `anon` and `service_role` JWT keys with [publishable and secret keys](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys). Create them under **Settings → API Keys → Publishable and secret API keys** in the Supabase dashboard.

## Sync schedule

Vercel Cron runs `/api/sync/episodes` every Friday at 22:00 UTC via [`vercel.json`](vercel.json).

## Episode parsing rules

- Fetch all uploads from `@TrashTaste`
- Keep videos whose title contains `Trash Taste #`
- Episode number comes from `Trash Taste #123`
- Display title is the text before `| Trash Taste`

## Troubleshooting

**`permission denied for table episodes`**

This is a Postgres `GRANT` issue, not an RLS policy issue. Supabase no longer auto-grants API roles access to tables created via SQL. Run [`supabase/migrations/003_grants.sql`](supabase/migrations/003_grants.sql) in the Supabase SQL editor.
