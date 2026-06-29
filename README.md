<div align="center">
<h1>Trash Taste App</h1>
<p>Community-made web app for the <a href="https://www.youtube.com/@TrashTaste">Trash Taste podcast.</a></p>
</div>

## Setup

1. Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

2. Create a Supabase project, create publishable/secret API keys in **Settings → API Keys**, and run the migrations in [`supabase/migrations/`](supabase/migrations/).

3. Install dependencies and start the dev server:

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

## Sync schedule

Vercel Cron runs `/api/sync/episodes` every Friday at 22:00 UTC via [`vercel.json`](vercel.json).
