import Image from "next/image";
import { formatDate, formatDuration } from "@/lib/format";
import type { Episode } from "@/lib/types";
import { YouTubeEmbed } from "@/components/youtube-embed";

type HeroLatestEpisodeProps = {
  episode: Episode;
};

export function HeroLatestEpisode({ episode }: HeroLatestEpisodeProps) {
  const published = formatDate(episode.published_at);
  const duration = formatDuration(episode.duration_seconds);
  const meta = [
    `Episode ${episode.episode_number}`,
    published,
    duration,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="rounded-3xl border border-[#E8E2D6] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-medium tracking-wide text-[#1B5E3A] uppercase">
            Latest episode
          </p>
          <h2 className="font-display text-3xl leading-tight font-semibold text-[#1A1A1A] sm:text-4xl">
            {episode.title}
          </h2>
          <p className="text-sm text-[#666666]">{meta}</p>

          {episode.thumbnail_url ? (
            <div className="overflow-hidden rounded-2xl border border-[#E8E2D6] lg:hidden">
              <Image
                src={episode.thumbnail_url}
                alt={episode.title}
                width={1280}
                height={720}
                className="h-auto w-full"
                priority
              />
            </div>
          ) : null}

          <a
            href={episode.youtube_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[#1B5E3A] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#164A2F] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Watch on YouTube
          </a>
        </div>

        <div className="space-y-4">
          <YouTubeEmbed videoId={episode.youtube_id} title={episode.title} />
        </div>
      </div>
    </section>
  );
}
