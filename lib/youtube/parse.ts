import type { ParsedYouTubeEpisodeBase } from "@/lib/types";

const EPISODE_MARKER = "Trash Taste #";

export function parseYouTubeEpisodeTitle(
  rawTitle: string,
  videoId: string,
  publishedAt: string,
  thumbnailUrl: string | null,
): ParsedYouTubeEpisodeBase | null {
  if (!rawTitle.includes(EPISODE_MARKER)) {
    return null;
  }

  const match = rawTitle.match(/Trash Taste #(\d+)/);
  if (!match) {
    return null;
  }

  const episodeNumber = Number.parseInt(match[1]!, 10);
  if (Number.isNaN(episodeNumber)) {
    return null;
  }

  const title = rawTitle.split("| Trash Taste")[0]?.trim();
  if (!title) {
    return null;
  }

  return {
    episode_number: episodeNumber,
    title,
    youtube_id: videoId,
    youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnail_url: thumbnailUrl,
    published_at: publishedAt,
    duration_seconds: null,
  };
}
