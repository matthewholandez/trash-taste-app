import Link from "next/link";
import { isAwardsEpisode } from "@/lib/awards";
import { formatDate, formatDuration } from "@/lib/format";
import type { Episode } from "@/lib/types";
import { EpisodeThumbnail } from "@/components/episode-thumbnail";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { THUMBNAIL_ASPECT_CLASS } from "@/lib/thumbnail";

type HeroLatestEpisodeProps = {
  episode: Episode;
};

export function HeroLatestEpisode({ episode }: HeroLatestEpisodeProps) {
  const isAwards = isAwardsEpisode(episode.title);
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
    <section
      className={[
        "-mt-6 rounded-lg border p-6 shadow-lg sm:p-8",
        isAwards
          ? "border-awards-gold/40 bg-awards-black shadow-awards-gold/15"
          : "border-border bg-background shadow-brand-purple/10",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col gap-8 border-l-4 pl-6 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:pl-8",
          isAwards ? "border-awards-gold" : "border-brand-purple",
        ].join(" ")}
      >
        <div className="space-y-5">
          <p
            className={[
              "text-xs font-semibold tracking-[0.15em] uppercase",
              isAwards ? "text-awards-gold-light" : "text-brand-purple",
            ].join(" ")}
          >
            {isAwards ? "Latest awards episode" : "Latest episode"}
          </p>
          <h2
            className={[
              "font-display text-3xl leading-tight tracking-tight uppercase sm:text-4xl",
              isAwards ? "text-awards-gold-light" : "text-foreground",
            ].join(" ")}
          >
            <Link
              href={`/episodes/${episode.episode_number}`}
              className="transition hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none motion-reduce:transition-none"
            >
              {episode.title}
            </Link>
          </h2>
          <p
            className={[
              "text-sm",
              isAwards ? "text-awards-gold-muted" : "text-muted",
            ].join(" ")}
          >
            {meta}
          </p>

          {episode.thumbnail_url ? (
            <div
              className={[
                "relative overflow-hidden rounded-lg border lg:hidden",
                THUMBNAIL_ASPECT_CLASS,
                isAwards ? "border-awards-gold/30" : "border-border",
              ].join(" ")}
            >
              <EpisodeThumbnail
                src={episode.thumbnail_url}
                alt={episode.title}
                priority
              />
            </div>
          ) : null}

          <a
            href={episode.youtube_url}
            target="_blank"
            rel="noreferrer"
            className={[
              "inline-flex rounded-md px-5 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none",
              isAwards
                ? "bg-awards-gold text-awards-black hover:bg-awards-gold-light hover:shadow-[0_0_20px_rgba(201,162,39,0.45)] focus-visible:ring-awards-gold-light focus-visible:ring-offset-awards-black motion-reduce:hover:shadow-none"
                : "bg-brand-purple text-foreground-on-purple hover:bg-brand-purple-dark hover:shadow-[0_0_20px_rgba(255,210,63,0.3)] focus-visible:ring-brand-purple-light focus-visible:ring-offset-background motion-reduce:hover:shadow-none",
            ].join(" ")}
          >
            Watch on YouTube
          </a>
        </div>

        <div className="space-y-4">
          <YouTubeEmbed
            videoId={episode.youtube_id}
            title={episode.title}
            variant={isAwards ? "awards" : "default"}
          />
        </div>
      </div>
    </section>
  );
}
