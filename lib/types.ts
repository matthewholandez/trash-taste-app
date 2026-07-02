export type TranscriptionStatus = "none" | "pending" | "complete";

export type Chapter = {
  time: string;
  seconds: number;
  label: string;
  blurb?: string;
};

export type TranscriptLine = {
  time: string;
  seconds: number;
  text: string;
};

export type Episode = {
  id: string;
  episode_number: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  thumbnail_url: string | null;
  published_at: string | null;
  duration_seconds: number | null;
  summary: string | null;
  tags: string[];
  view_count: number | null;
  chapters: Chapter[];
  transcript: TranscriptLine[];
  transcription_status: TranscriptionStatus;
  created_at: string;
  updated_at: string;
};

/** Slim shape for archive listings — keeps the home page payload small. */
export type EpisodeListItem = Pick<
  Episode,
  | "id"
  | "episode_number"
  | "title"
  | "thumbnail_url"
  | "published_at"
  | "duration_seconds"
>;

export type ParsedYouTubeEpisodeBase = {
  episode_number: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  thumbnail_url: string | null;
  published_at: string;
  duration_seconds: number | null;
};

export type ParsedYouTubeEpisode = ParsedYouTubeEpisodeBase & {
  summary: string | null;
  tags: string[];
  view_count: number | null;
  chapters: Chapter[];
};

export type SyncResult = {
  synced: number;
  inserted: number;
  updated: number;
  discarded: number;
};
