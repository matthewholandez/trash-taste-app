import { createPublishableSupabaseClient } from "@/lib/supabase/server";
import type { Episode } from "@/lib/types";

export async function getEpisodes(): Promise<Episode[]> {
  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .order("episode_number", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getLatestEpisode(): Promise<Episode | null> {
  const supabase = createPublishableSupabaseClient();

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .order("episode_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
