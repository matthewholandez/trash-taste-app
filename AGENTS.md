<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Trash Taste App

Community-made web app for the [Trash Taste podcast](https://www.youtube.com/@TrashTaste). Episodes are synced from YouTube into Supabase and shown in a browsable archive with a featured latest episode.

## Stack

- **Next.js 16.2.9** (App Router) with **React 19.2** and **TypeScript**. Cache Components are enabled (`cacheComponents: true` in `next.config.ts`).
- **pnpm 11.9.0** is the package manager. Build-allowed native deps (`esbuild`, `sharp`, `unrs-resolver`) are declared in `pnpm-workspace.yaml`.
- **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) for storage.
- **Tailwind CSS v4** — config lives in `app/globals.css` via `@theme inline`, not a JS config file.
- **Deployed on Vercel** (`vercel.json` defines the cron).

## Architecture & data flow

1. `/api/sync/episodes` (`app/api/sync/episodes/route.ts`) fetches the `@TrashTaste` uploads playlist via the YouTube Data API v3, keeps videos whose title contains `Trash Taste #`, and upserts them into the Supabase `episodes` table. It accepts GET (Vercel Cron) and POST (manual), both gated by a `Bearer $CRON_SECRET` auth header.
2. Title parsing (`lib/youtube/parse.ts`): episode number from `Trash Taste #<n>`; display title is the text before `| Trash Taste`. Non-matching uploads (lives, specials) are discarded.
3. The home page (`app/page.tsx`) reads episodes through cached functions in `lib/episodes.ts` and renders `HeroLatestEpisode` + `EpisodeArchive`.

## Caching

- `lib/episodes.ts` uses `"use cache"` with `cacheTag("episodes")` and `cacheLife("episodes")`. The `episodes` profile is defined in `next.config.ts`.
- After a sync, the route calls `revalidateTag("episodes", "max")` to refresh reads. Don't bypass these tags when adding new reads/writes.

## Supabase keys

This project uses Supabase's **new publishable/secret keys**, not legacy `anon`/`service_role` JWTs.
- `lib/supabase/server.ts` → `createPublishableSupabaseClient()` (publishable key) for public page reads; `createSecretSupabaseClient()` (secret key) for sync writes.
- Env access is centralized in `lib/supabase/env.ts` — go through it rather than reading `process.env` directly.
- Migrations are in `supabase/migrations/` (run in order). Tables created via SQL are not auto-granted to API roles, so `003_grants.sql` exists to fix `permission denied for table episodes`.

## Conventions

- Imports use the `@/` path alias for the repo root.
- Env vars are read through small helper functions that throw on missing values (see `lib/supabase/env.ts`, `getApiKey` in `lib/youtube/client.ts`). Follow that pattern instead of inlining `process.env`.
- YouTube fetches retry on quota/rate-limit errors with backoff (`lib/youtube/client.ts`).
- Design tokens (brand purple, neon accents, awards gold) live as CSS variables in `app/globals.css`; fonts are Archivo Black (`font-display`) and IBM Plex Sans (`font-sans`). Awards episodes get special styling — detect them with `isAwardsEpisode` (`lib/awards.ts`).
- Thumbnails crop the repetitive bottom branding band; use the shared constants in `lib/thumbnail.ts`.

## Transcripts

Episode transcripts come from local `transcripts/<episode_number>.srt` files (uploaded via CLI), **not** any API.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` — Next.js dev/build/serve.
- `pnpm lint` — ESLint.
- `pnpm test:parse` — runs the title-parser smoke test (`scripts/smoke-parse.ts` via `tsx`).
