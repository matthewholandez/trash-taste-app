import { isAwardsEpisode } from "@/lib/awards";
import { formatDate, formatDuration } from "@/lib/format";
import { getEpisodePalette } from "@/lib/palettes";
import type { Episode } from "@/lib/types";
import { EpisodeThumbnail } from "@/components/episode-thumbnail";
import { THUMBNAIL_ASPECT_CLASS } from "@/lib/thumbnail";

type EpisodeCardProps = {
  episode: Episode;
  index: number;
};

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const isAwards = isAwardsEpisode(episode.title);
  const palette = getEpisodePalette(index);
  const published = formatDate(episode.published_at);
  const duration = formatDuration(episode.duration_seconds);
  const meta = [published, duration].filter(Boolean).join(" · ");

  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-lg shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        isAwards
          ? "bg-awards-black hover:shadow-awards-gold/25 focus-within:ring-awards-gold/40"
          : "bg-background hover:shadow-brand-purple/20 focus-within:ring-brand-purple/30",
      ].join(" ")}
    >
      <a
        href={episode.youtube_url}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col"
      >
        <div
          className={[
            "relative overflow-hidden",
            THUMBNAIL_ASPECT_CLASS,
            isAwards ? "border-b border-awards-gold/30 bg-black" : "bg-surface",
          ].join(" ")}
        >
          {episode.thumbnail_url ? (
            <EpisodeThumbnail
              src={episode.thumbnail_url}
              alt={episode.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div
              className={[
                "flex h-full items-center justify-center text-sm",
                isAwards ? "text-awards-gold-muted" : "text-muted",
              ].join(" ")}
            >
              No thumbnail
            </div>
          )}
          {isAwards ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-awards-black/80 via-transparent to-awards-gold/10"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          {isAwards ? (
            <span className="inline-flex w-fit rounded-sm bg-awards-gold/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-awards-gold-light uppercase">
              Awards
            </span>
          ) : null}

          <h3
            className={[
              "font-display text-lg leading-snug tracking-tight uppercase",
              isAwards ? "text-awards-gold-light" : "text-foreground",
            ].join(" ")}
          >
            {episode.title}
          </h3>

          {meta ? (
            <p
              className={[
                "text-sm",
                isAwards ? "text-awards-gold-muted" : "text-muted",
              ].join(" ")}
            >
              {meta}
            </p>
          ) : null}
        </div>

        <div
          className={[
            "relative flex items-center px-4 py-2.5",
            isAwards
              ? "bg-gradient-to-r from-awards-gold to-awards-gold-light"
              : "bg-brand-purple",
          ].join(" ")}
          style={
            isAwards ? undefined : { borderLeft: `4px solid ${palette.accent}` }
          }
        >
          <span
            className={[
              "font-display text-sm tracking-wide uppercase",
              isAwards ? "text-awards-black" : "text-foreground-on-purple",
            ].join(" ")}
          >
            Ep {episode.episode_number}
          </span>
        </div>
      </a>
    </article>
  );
}
