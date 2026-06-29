import Link from "next/link";
import { EpisodeActions } from "@/components/episode-actions";
import { EpisodePlayer } from "@/components/episode-player";
import { EpisodeReader } from "@/components/episode-reader";
import {
  formatDate,
  formatDuration,
  formatViewCount,
} from "@/lib/format";
import type { Episode } from "@/lib/types";

type EpisodeDetailProps = {
  episode: Episode;
};

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const published = formatDate(episode.published_at);
  const duration = formatDuration(episode.duration_seconds);
  const views = formatViewCount(episode.view_count);
  const meta = [
    `Episode ${episode.episode_number}`,
    published,
    duration,
    views ? `${views} views` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const transcriptText =
    episode.transcription_status === "complete" && episode.transcript.length > 0
      ? episode.transcript.map((line) => `[${line.time}] ${line.text}`).join("\n")
      : "";

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-purple transition hover:text-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none motion-reduce:transition-none"
      >
        ← Back to archive
      </Link>

      <EpisodePlayer episode={episode} />

      <div className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.15em] text-brand-purple uppercase">
          Episode {episode.episode_number}
        </p>
        <h1 className="font-display text-3xl leading-tight tracking-tight text-foreground uppercase sm:text-4xl">
          {episode.title}
        </h1>
        <p className="font-mono text-sm text-muted">{meta}</p>

        {episode.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {episode.tags.map((tag) => (
              <a
                key={tag}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`Trash Taste ${tag}`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition hover:border-brand-purple hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none motion-reduce:transition-none"
              >
                {tag}
              </a>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <a
            href={episode.youtube_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-md bg-brand-purple px-5 py-2.5 text-sm font-medium text-foreground-on-purple transition hover:bg-brand-purple-dark hover:shadow-[0_0_20px_rgba(255,210,63,0.3)] focus-visible:ring-2 focus-visible:ring-brand-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:shadow-none"
          >
            Watch on YouTube
          </a>
          <EpisodeActions episode={episode} transcriptText={transcriptText} />
        </div>
      </div>

      <EpisodeReader episode={episode} />

      <footer className="border-t border-border pt-8 text-center text-sm text-muted">
        <p>
          Trash Taste archive —{" "}
          <a
            href="https://www.youtube.com/@TrashTaste"
            target="_blank"
            rel="noreferrer"
            className="text-brand-purple hover:underline"
          >
            @TrashTaste
          </a>
        </p>
      </footer>
    </div>
  );
}
