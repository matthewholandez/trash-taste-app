import { SiteHeader } from "@/components/site-header";
import { EmptyState } from "@/components/empty-state";
import { EpisodeArchive } from "@/components/episode-archive";
import { HeroLatestEpisode } from "@/components/hero-latest-episode";
import { getEpisodes, getLatestEpisode } from "@/lib/episodes";
import type { Episode } from "@/lib/types";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const content = await loadPageContent();

  if (content.kind === "empty") {
    return (
      <PageShell>
        <EmptyState
          title="No episodes yet"
          description="Run the sync job after configuring Supabase and your YouTube API key. POST /api/sync/episodes with your CRON_SECRET to populate the archive."
        />
      </PageShell>
    );
  }

  if (content.kind === "error") {
    return (
      <PageShell>
        <EmptyState title="Something went wrong" description={content.message} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <HeroLatestEpisode episode={content.latestEpisode} />
      <EpisodeArchive episodes={content.episodes} />
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
        {children}
      </main>
    </>
  );
}
