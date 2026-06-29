import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { EmptyState } from "@/components/empty-state";
import { EpisodeArchive } from "@/components/episode-archive";
import { HeroLatestEpisode } from "@/components/hero-latest-episode";
import { getEpisodes, getLatestEpisode } from "@/lib/episodes";
import type { Episode } from "@/lib/types";

type PageContent =
  | { kind: "ready"; latestEpisode: Episode; episodes: Episode[] }
  | { kind: "empty" }
  | { kind: "error"; message: string };

async function loadPageContent(): Promise<PageContent> {
  try {
    const [episodes, latestEpisode] = await Promise.all([
      getEpisodes(),
      getLatestEpisode(),
    ]);

    if (episodes.length === 0 || !latestEpisode) {
      return { kind: "empty" };
    }

    return {
      kind: "ready",
      latestEpisode,
      episodes,
    };
  } catch (error) {
    return {
      kind: "error",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export default function HomePage() {
  return (
    <PageShell>
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
    </PageShell>
  );
}

async function HomeContent() {
  const content = await loadPageContent();

  if (content.kind === "empty") {
    return (
      <EmptyState
        title="No episodes yet"
        description="Run the sync job after configuring Supabase and your YouTube API key. POST /api/sync/episodes with your CRON_SECRET to populate the archive."
      />
    );
  }

  if (content.kind === "error") {
    return (
      <EmptyState title="Something went wrong" description={content.message} />
    );
  }

  return (
    <>
      <HeroLatestEpisode episode={content.latestEpisode} />
      <EpisodeArchive episodes={content.episodes} />
    </>
  );
}

function HomeLoading() {
  return (
    <div className="flex flex-col gap-10">
      <div className="aspect-video animate-pulse rounded-lg bg-brand-purple/10" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-video animate-pulse rounded-lg bg-brand-purple/10"
          />
        ))}
      </div>
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 bg-background px-6 py-10">
        {children}
      </main>
    </>
  );
}
