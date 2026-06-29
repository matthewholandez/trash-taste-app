import Image from "next/image";
import { formatDate, formatDuration } from "@/lib/format";
import { getEpisodePalette } from "@/lib/palettes";
import type { Episode } from "@/lib/types";

type EpisodeCardProps = {
  episode: Episode;
  index: number;
};

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const palette = getEpisodePalette(index);
  const published = formatDate(episode.published_at);
  const duration = formatDuration(episode.duration_seconds);
  const meta = [published, duration].filter(Boolean).join(" · ");

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ borderColor: palette.border }}
    >
      <a
        href={episode.youtube_url}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-[#F3EFE6]">
          {episode.thumbnail_url ? (
            <Image
              src={episode.thumbnail_url}
              alt={episode.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#666666]">
              No thumbnail
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <span
            className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: palette.badge,
              color: palette.badgeText,
            }}
          >
            Episode {episode.episode_number}
          </span>

          <h3 className="font-display text-lg leading-snug font-semibold text-[#1A1A1A]">
            {episode.title}
          </h3>

          {meta ? <p className="text-sm text-[#666666]">{meta}</p> : null}

          <span className="mt-auto text-sm font-medium text-[#1B5E3A]">
            Watch
          </span>
        </div>
      </a>
    </article>
  );
}
