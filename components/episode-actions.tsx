"use client";

import { useCallback, useState } from "react";
import type { Episode } from "@/lib/types";

type EpisodeActionsProps = {
  episode: Episode;
  transcriptText: string;
};

export function EpisodeActions({
  episode,
  transcriptText,
}: EpisodeActionsProps) {
  const [shareLabel, setShareLabel] = useState("Share");
  const [copyLabel, setCopyLabel] = useState("Copy transcript");

  const resetLabel = useCallback(
    (setter: (value: string) => void, original: string) => {
      window.setTimeout(() => setter(original), 2000);
    },
    [],
  );

  const handleShare = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : undefined;

    if (!url) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: episode.title,
          text: `Trash Taste Episode ${episode.episode_number}`,
          url,
        });
        setShareLabel("Shared!");
        resetLabel(setShareLabel, "Share");
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareLabel("Link copied!");
      resetLabel(setShareLabel, "Share");
    } catch {
      // User cancelled share or clipboard denied — no-op
    }
  }, [episode.episode_number, episode.title, resetLabel]);

  const handleCopyTranscript = useCallback(async () => {
    if (!transcriptText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(transcriptText);
      setCopyLabel("Copied!");
      resetLabel(setCopyLabel, "Copy transcript");
    } catch {
      // Clipboard denied — no-op
    }
  }, [resetLabel, transcriptText]);

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-brand-purple hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none motion-reduce:transition-none"
      >
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={handleCopyTranscript}
        disabled={!transcriptText}
        className="inline-flex rounded-md px-4 py-2.5 text-sm font-medium text-muted transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        {copyLabel}
      </button>
    </>
  );
}
