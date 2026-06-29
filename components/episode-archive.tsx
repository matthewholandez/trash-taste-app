"use client";

import { useMemo, useState } from "react";
import { EpisodeCard } from "@/components/episode-card";
import type { Episode } from "@/lib/types";

type EpisodeArchiveProps = {
  episodes: Episode[];
};

export function EpisodeArchive({ episodes }: EpisodeArchiveProps) {
  const [query, setQuery] = useState("");

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return episodes;
    }

    return episodes.filter((episode) => {
      const haystack = `${episode.title} ${episode.episode_number}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [episodes, query]);

  return (
    <section id="episodes" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl tracking-tight text-foreground uppercase sm:text-3xl">
            All episodes
          </h2>
          <p className="mt-1 text-sm text-muted">{episodes.length} episodes</p>
        </div>

        <label className="block w-full sm:max-w-sm">
          <span className="sr-only">Search episodes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or number"
            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30"
          />
        </label>
      </div>

      {filteredEpisodes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-brand-purple/40 bg-surface px-6 py-10 text-center">
          <p className="font-medium text-foreground">No episodes found</p>
          <p className="mt-2 text-sm text-muted">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEpisodes.map((episode, index) => (
            <EpisodeCard key={episode.id} episode={episode} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
