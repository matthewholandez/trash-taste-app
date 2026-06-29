"use client";

import { useState } from "react";
import { EpisodeThumbnail } from "@/components/episode-thumbnail";
import { formatDuration } from "@/lib/format";
import { THUMBNAIL_ASPECT_CLASS } from "@/lib/thumbnail";
import type { Episode } from "@/lib/types";

type EpisodePlayerProps = {
  episode: Episode;
};

export function EpisodePlayer({ episode }: EpisodePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const duration = formatDuration(episode.duration_seconds);

  if (playing) {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-black shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${episode.youtube_id}?autoplay=1&rel=0`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={[
        "group relative w-full overflow-hidden rounded-lg border border-border bg-brand-purple shadow-sm",
        "focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none",
        THUMBNAIL_ASPECT_CLASS,
      ].join(" ")}
      aria-label={`Play ${episode.title}`}
    >
      {episode.thumbnail_url ? (
        <EpisodeThumbnail
          src={episode.thumbnail_url}
          alt=""
          sizes="(max-width: 1024px) 100vw, 896px"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-purple-dark"
        />
      )}

      {!episode.thumbnail_url ? (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-6xl text-foreground-on-purple/20 uppercase"
        >
          {episode.episode_number}
        </span>
      ) : null}

      <span
        aria-hidden
        className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40 motion-reduce:transition-none"
      />

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={[
            "flex h-16 w-16 items-center justify-center rounded-full bg-accent-neon-yellow text-brand-purple shadow-lg",
            "transition group-hover:shadow-[0_0_24px_rgba(255,210,63,0.6)] motion-reduce:transition-none motion-reduce:group-hover:shadow-lg",
          ].join(" ")}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      <span className="absolute bottom-3 left-3 rounded-sm bg-brand-purple/90 px-2 py-0.5 text-xs font-semibold tracking-wide text-foreground-on-purple uppercase">
        Watch
      </span>

      {duration ? (
        <span className="absolute right-3 bottom-3 rounded-sm bg-black/70 px-2 py-0.5 font-mono text-xs text-white">
          {duration}
        </span>
      ) : null}
    </button>
  );
}
