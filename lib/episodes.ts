import { cacheLife, cacheTag } from "next/cache";
import { createPublishableSupabaseClient } from "@/lib/supabase/server";
import type { Episode } from "@/lib/types";

const EPISODE_LIST_SELECT =
  "id, episode_number, title, youtube_id, youtube_url, thumbnail_url, published_at, duration_seconds, summary, tags, view_count, chapters, transcription_status, created_at, updated_at";

function withEmptyTranscript(
  row: Omit<Episode, "transcript"> & { transcript?: Episode["transcript"] },
): Episode {
  return {
    ...row,
    tags: row.tags ?? [],
    chapters: row.chapters ?? [],
    transcript: row.transcript ?? [],
  };
}

export async function getEpisodes(): Promise<Episode[]> {
  "use cache";
  cacheTag("episodes");
  cacheLife("episodes");

  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select(EPISODE_LIST_SELECT)
    .order("episode_number", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(withEmptyTranscript);
}

export async function getLatestEpisode(): Promise<Episode | null> {
  "use cache";
  cacheTag("episodes");
  cacheLife("episodes");

  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select(EPISODE_LIST_SELECT)
    .order("episode_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? withEmptyTranscript(data) : null;
}

export async function getEpisode(episodeNumber: number): Promise<Episode | null> {
  "use cache";
  cacheTag("episodes");
  cacheLife("episodes");

  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("episode_number", episodeNumber)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getEpisodeTitle(
  episodeNumber: number,
): Promise<Pick<Episode, "episode_number" | "title"> | null> {
  "use cache";
  cacheTag("episodes");
  cacheLife("episodes");

  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select("episode_number, title")
    .eq("episode_number", episodeNumber)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
