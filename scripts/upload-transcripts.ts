import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEnvLocal } from "./load-env-local";
import { parseSrt } from "@/lib/transcript/srt";
import { createSecretSupabaseClient } from "@/lib/supabase/server";

loadEnvLocal();

function parseArgs(argv: string[]) {
  let dir = process.env.TRANSCRIPTS_DIR ?? "./transcripts";
  const episodeNumbers: number[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dir" && argv[index + 1]) {
      dir = argv[index + 1]!;
      index += 1;
      continue;
    }

    const parsed = Number(arg);
    if (Number.isInteger(parsed) && parsed > 0) {
      episodeNumbers.push(parsed);
    }
  }

  return { dir, episodeNumbers };
}

async function revalidateEpisodesCache() {
  const cronSecret = process.env.CRON_SECRET;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  if (!cronSecret) {
    console.log(
      "\nReminder: episode cache may be stale until cacheLife expires.",
    );
    console.log(
      "Add CRON_SECRET to .env.local, then run: pnpm cache:revalidate",
    );
    return;
  }

  const url = new URL("/api/revalidate/episodes", baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cronSecret}` },
  });

  if (response.ok) {
    console.log("\nEpisodes cache revalidated.");
  } else {
    console.warn(`\nCache revalidation failed (${response.status}).`);
  }
}

async function main() {
  const { dir, episodeNumbers } = parseArgs(process.argv.slice(2));
  const supabase = createSecretSupabaseClient();

  let files: string[];

  try {
    files = (await readdir(dir)).filter((name) => name.endsWith(".srt"));
  } catch {
    console.error(`Could not read directory: ${dir}`);
    process.exit(1);
  }

  const targets =
    episodeNumbers.length > 0
      ? episodeNumbers.map((n) => `${n}.srt`)
      : files.filter((name) => {
          const stem = name.replace(/\.srt$/, "");
          return /^\d+$/.test(stem);
        });

  let uploaded = 0;
  let skipped = 0;

  for (const filename of targets.sort()) {
    const stem = filename.replace(/\.srt$/, "");
    const episodeNumber = Number(stem);

    if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) {
      console.warn(`Skip ${filename}: invalid episode number`);
      skipped += 1;
      continue;
    }

    const raw = await readFile(join(dir, filename), "utf8");
    const transcript = parseSrt(raw);

    const { data: existing, error: lookupError } = await supabase
      .from("episodes")
      .select("id")
      .eq("episode_number", episodeNumber)
      .maybeSingle();

    if (lookupError) {
      console.error(`Ep ${episodeNumber}: lookup failed — ${lookupError.message}`);
      skipped += 1;
      continue;
    }

    if (!existing) {
      console.warn(`Ep ${episodeNumber}: no matching episode row — skipped`);
      skipped += 1;
      continue;
    }

    const { error } = await supabase
      .from("episodes")
      .update({
        transcript,
        transcription_status: "complete",
        updated_at: new Date().toISOString(),
      })
      .eq("episode_number", episodeNumber);

    if (error) {
      console.error(`Ep ${episodeNumber}: upload failed — ${error.message}`);
      skipped += 1;
      continue;
    }

    console.log(`Ep ${episodeNumber}: uploaded ${transcript.length} lines`);
    uploaded += 1;
  }

  console.log(`\nDone — ${uploaded} uploaded, ${skipped} skipped.`);
  await revalidateEpisodesCache();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
