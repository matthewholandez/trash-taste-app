export type TranscriptionStatus = "none" | "pending" | "complete";

export type Episode = {
  id: string;
  episode_number: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  thumbnail_url: string | null;
  published_at: string | null;
  duration_seconds: number | null;
  transcription_status: TranscriptionStatus;
  created_at: string;
  updated_at: string;
};

export type ParsedYouTubeEpisode = {
  episode_number: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  thumbnail_url: string | null;
  published_at: string;
  duration_seconds: number | null;
};

export type SyncResult = {
  synced: number;
  inserted: number;
  updated: number;
  discarded: number;
};
