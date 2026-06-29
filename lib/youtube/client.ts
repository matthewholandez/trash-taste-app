import { parseIso8601Duration } from "@/lib/format";
import { parseYouTubeEpisodeTitle } from "@/lib/youtube/parse";
import type { ParsedYouTubeEpisode } from "@/lib/types";

type YouTubeThumbnail = {
  url?: string;
};

type YouTubeSnippet = {
  title?: string;
  publishedAt?: string;
  resourceId?: {
    videoId?: string;
  };
  thumbnails?: {
    maxres?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    default?: YouTubeThumbnail;
  };
};

type PlaylistItemsResponse = {
  items?: Array<{ snippet?: YouTubeSnippet }>;
  nextPageToken?: string;
};

type ChannelsResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type VideosResponse = {
  items?: Array<{
    id?: string;
    contentDetails?: {
      duration?: string;
    };
  }>;
};

const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [1000, 2000, 4000];

function getApiKey(): string {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing YOUTUBE_API_KEY");
  }
  return apiKey;
}

function isQuotaError(status: number, body: string): boolean {
  if (status === 429) {
    return true;
  }

  if (status === 403) {
    return /quota|rateLimit/i.test(body);
  }

  return false;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function youtubeFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  url.searchParams.set("key", getApiKey());

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    const body = await response.text();

    if (isQuotaError(response.status, body) && attempt < MAX_RETRIES) {
      const delay = RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS.at(-1)!;
      console.warn(
        `YouTube API ${path} quota error (${response.status}), retry ${attempt + 1}/${MAX_RETRIES} in ${delay}ms`,
      );
      await sleep(delay);
      lastError = new Error(`YouTube API error (${response.status}): ${body}`);
      continue;
    }

    throw new Error(`YouTube API error (${response.status}): ${body}`);
  }

  throw lastError ?? new Error(`YouTube API error: ${path}`);
}

function pickThumbnail(snippet: YouTubeSnippet): string | null {
  return (
    snippet.thumbnails?.maxres?.url ??
    snippet.thumbnails?.standard?.url ??
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.medium?.url ??
    snippet.thumbnails?.default?.url ??
    null
  );
}

export async function getUploadsPlaylistId(): Promise<string> {
  const cachedPlaylistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;
  if (cachedPlaylistId) {
    return cachedPlaylistId;
  }

  const data = await youtubeFetch<ChannelsResponse>("channels", {
    part: "contentDetails",
    forHandle: "TrashTaste",
  });

  const uploadsPlaylistId =
    data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error("Could not resolve @TrashTaste uploads playlist");
  }

  return uploadsPlaylistId;
}

export async function fetchAllPlaylistItems(
  playlistId: string,
): Promise<Array<{ snippet: YouTubeSnippet }>> {
  const items: Array<{ snippet: YouTubeSnippet }> = [];
  let pageToken: string | undefined;

  do {
    const params: Record<string, string> = {
      part: "snippet",
      playlistId,
      maxResults: "50",
    };

    if (pageToken) {
      params.pageToken = pageToken;
    }

    const data = await youtubeFetch<PlaylistItemsResponse>("playlistItems", params);

    for (const item of data.items ?? []) {
      if (item.snippet) {
        items.push({ snippet: item.snippet });
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

export async function fetchVideoDurations(
  videoIds: string[],
  existingDurations: Map<string, number> = new Map(),
): Promise<Map<string, number>> {
  const durations = new Map(existingDurations);
  const idsToFetch = videoIds.filter((id) => !durations.has(id));

  for (let index = 0; index < idsToFetch.length; index += 50) {
    const batch = idsToFetch.slice(index, index + 50);
    const data = await youtubeFetch<VideosResponse>("videos", {
      part: "contentDetails",
      id: batch.join(","),
    });

    for (const item of data.items ?? []) {
      if (!item.id || !item.contentDetails?.duration) {
        continue;
      }

      const duration = parseIso8601Duration(item.contentDetails.duration);
      durations.set(item.id, duration);
    }
  }

  return durations;
}

export async function fetchTrashTasteEpisodesFromYouTube(
  existingDurations: Map<string, number> = new Map(),
): Promise<{
  episodes: ParsedYouTubeEpisode[];
  discarded: number;
}> {
  const uploadsPlaylistId = await getUploadsPlaylistId();
  const playlistItems = await fetchAllPlaylistItems(uploadsPlaylistId);

  const parsed: ParsedYouTubeEpisode[] = [];
  let discarded = 0;

  for (const item of playlistItems) {
    const title = item.snippet.title;
    const videoId = item.snippet.resourceId?.videoId;
    const publishedAt = item.snippet.publishedAt;

    if (!title || !videoId || !publishedAt) {
      discarded += 1;
      continue;
    }

    const episode = parseYouTubeEpisodeTitle(title, videoId, publishedAt, pickThumbnail(item.snippet));

    if (!episode) {
      discarded += 1;
      continue;
    }

    parsed.push(episode);
  }

  const durations = await fetchVideoDurations(
    parsed.map((episode) => episode.youtube_id),
    existingDurations,
  );

  return {
    episodes: parsed.map((episode) => ({
      ...episode,
      duration_seconds: durations.get(episode.youtube_id) ?? null,
    })),
    discarded,
  };
}
