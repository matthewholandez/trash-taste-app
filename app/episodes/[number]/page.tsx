import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/site-shell";
import { EmptyState } from "@/components/empty-state";
import { EpisodeDetail } from "@/components/episode-detail";
import { getEpisode, getEpisodeTitle } from "@/lib/episodes";

type PageProps = {
  params: Promise<{ number: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const episodeNumber = Number(number);

  if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) {
    return { title: "Episode not found" };
  }

  try {
    const episode = await getEpisodeTitle(episodeNumber);
    if (!episode) {
      return { title: "Episode not found" };
    }

    return {
      title: `Ep ${episode.episode_number} — ${episode.title}`,
    };
  } catch {
    return { title: "Episode not found" };
  }
}

export default function EpisodePage({ params }: PageProps) {
  return (
    <SiteShell mainClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col bg-background px-6 py-10">
      <Suspense fallback={<EpisodeLoading />}>
        <EpisodeContent params={params} />
      </Suspense>
    </SiteShell>
  );
}

async function EpisodeContent({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const episodeNumber = Number(number);

  if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) {
    notFound();
  }

  let episode;

  try {
    episode = await getEpisode(episodeNumber);
  } catch (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={
          error instanceof Error ? error.message : "Could not load episode"
        }
      />
    );
  }

  if (!episode) {
    notFound();
  }

  return <EpisodeDetail episode={episode} />;
}

function EpisodeLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-4 w-32 animate-pulse rounded bg-brand-purple/10" />
      <div className="aspect-video animate-pulse rounded-lg bg-brand-purple/10" />
      <div className="space-y-3">
        <div className="h-4 w-24 animate-pulse rounded bg-brand-purple/10" />
        <div className="h-10 w-full max-w-2xl animate-pulse rounded bg-brand-purple/10" />
        <div className="h-4 w-64 animate-pulse rounded bg-brand-purple/10" />
      </div>
    </div>
  );
}
