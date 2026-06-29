import { createSecretSupabaseClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/lib/types";
import { fetchTrashTasteEpisodesFromYouTube } from "@/lib/youtube/client";

export async function syncEpisodesFromYouTube(): Promise<SyncResult> {
  const supabase = createSecretSupabaseClient();
  const { episodes, discarded } = await fetchTrashTasteEpisodesFromYouTube();

  if (episodes.length === 0) {
    return { synced: 0, inserted: 0, updated: 0, discarded };
  }

  const now = new Date().toISOString();
  const youtubeIds = episodes.map((episode) => episode.youtube_id);

  const { data: existingRows, error: existingError } = await supabase
    .from("episodes")
    .select("youtube_id")
    .in("youtube_id", youtubeIds);

  if (existingError) {
    throw new Error(existingError.message);
  }

  const existingIds = new Set((existingRows ?? []).map((row) => row.youtube_id));

  const rows = episodes.map((episode) => ({
    episode_number: episode.episode_number,
    title: episode.title,
    youtube_id: episode.youtube_id,
    youtube_url: episode.youtube_url,
    thumbnail_url: episode.thumbnail_url,
    published_at: episode.published_at,
    duration_seconds: episode.duration_seconds,
    updated_at: now,
  }));

  const { error } = await supabase.from("episodes").upsert(rows, {
    onConflict: "youtube_id",
  });

  if (error) {
    throw new Error(error.message);
  }

  const inserted = rows.filter((row) => !existingIds.has(row.youtube_id)).length;
  const updated = rows.length - inserted;

  return {
    synced: rows.length,
    inserted,
    updated,
    discarded,
  };
}
