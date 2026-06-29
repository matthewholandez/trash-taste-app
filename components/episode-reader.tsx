"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getEpisodePalette } from "@/lib/palettes";
import type { Episode } from "@/lib/types";

type EpisodeReaderProps = {
  episode: Episode;
};

function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) {
    return text;
  }

  const normalizedQuery = query.trim();
  const lowerText = text.toLowerCase();
  const lowerQuery = normalizedQuery.toLowerCase();
  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const index = lowerText.indexOf(lowerQuery, cursor);
    if (index === -1) {
      parts.push(text.slice(cursor));
      break;
    }

    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }

    parts.push(
      <mark
        key={`${index}-${cursor}`}
        className="rounded-sm bg-accent-neon-yellow/40 text-foreground"
      >
        {text.slice(index, index + normalizedQuery.length)}
      </mark>,
    );

    cursor = index + normalizedQuery.length;
  }

  return parts;
}

function findActiveChapter(
  chapters: Episode["chapters"],
  seconds: number,
): number {
  let active = -1;

  for (let index = 0; index < chapters.length; index += 1) {
    if (chapters[index]!.seconds <= seconds) {
      active = index;
    } else {
      break;
    }
  }

  return active;
}

export function EpisodeReader({ episode }: EpisodeReaderProps) {
  const [query, setQuery] = useState("");
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const chapters = episode.chapters;
  const transcript = episode.transcript;
  const hasTranscript =
    episode.transcription_status === "complete" && transcript.length > 0;

  const activeChapter = useMemo(() => {
    if (activeLineIndex == null) {
      return -1;
    }

    const seconds = transcript[activeLineIndex]?.seconds;
    if (seconds == null) {
      return -1;
    }

    return findActiveChapter(chapters, seconds);
  }, [chapters, transcript, activeLineIndex]);

  const filteredTranscript = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return transcript
      .map((line, index) => ({ line, index }))
      .filter(({ line }) => {
        if (!normalizedQuery) {
          return true;
        }

        return line.text.toLowerCase().includes(normalizedQuery);
      });
  }, [transcript, query]);

  const seekTo = useCallback(
    (seconds: number) => {
      const index = transcript.findIndex((line) => line.seconds >= seconds);
      if (index === -1) {
        return;
      }

      setActiveLineIndex(index);
      lineRefs.current.get(index)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [transcript],
  );

  return (
    <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-7">
      <aside className="mb-7 space-y-5 lg:sticky lg:top-6 lg:mb-0 lg:self-start">
        {episode.summary ? (
          <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
            <h2 className="font-display text-sm tracking-wide text-foreground uppercase">
              Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {episode.summary}
            </p>
          </div>
        ) : null}

        {chapters.length > 0 ? (
          <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
            <h2 className="font-display text-sm tracking-wide text-foreground uppercase">
              Chapters
            </h2>
            <ul className="mt-3 space-y-1">
              {chapters.map((chapter, index) => {
                const palette = getEpisodePalette(index);
                const isActive = index === activeChapter;

                return (
                  <li key={`${chapter.seconds}-${chapter.label}`}>
                    <button
                      type="button"
                      onClick={() => seekTo(chapter.seconds)}
                      className={[
                        "flex w-full items-start gap-3 rounded-md px-2 py-2 text-left transition",
                        "hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none",
                        "motion-reduce:transition-none",
                        isActive ? "bg-surface" : "",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-full min-h-[2rem] w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: palette.accent }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="font-mono text-xs text-muted">
                          {chapter.time}
                        </span>
                        <span
                          className={[
                            "mt-0.5 block text-sm leading-snug",
                            isActive
                              ? "font-medium text-foreground"
                              : "text-foreground/90",
                          ].join(" ")}
                        >
                          {chapter.label}
                        </span>
                        {chapter.blurb ? (
                          <span className="mt-1 block text-xs text-muted">
                            {chapter.blurb}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </aside>

      <div className="rounded-lg border border-border bg-background shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-sm tracking-wide text-foreground uppercase">
              Transcript
            </h2>
            {hasTranscript ? (
              <>
                <span className="rounded-sm bg-surface px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted uppercase">
                  Auto-generated
                </span>
                <span className="text-xs text-muted">
                  {transcript.length} lines
                </span>
              </>
            ) : null}
          </div>

          {hasTranscript ? (
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Search transcript</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search transcript"
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30"
              />
            </label>
          ) : null}
        </div>

        {hasTranscript ? (
          <div
            ref={scrollRef}
            className="max-h-[32rem] overflow-y-auto px-5 py-4"
          >
            {filteredTranscript.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">
                No lines match your search.
              </p>
            ) : (
              <ul className="space-y-1">
                {filteredTranscript.map(({ line, index }) => {
                  const isActive = index === activeLineIndex;

                  return (
                    <li key={index}>
                      <button
                        type="button"
                        ref={(element) => {
                          if (element) {
                            lineRefs.current.set(index, element);
                          } else {
                            lineRefs.current.delete(index);
                          }
                        }}
                        onClick={() => setActiveLineIndex(index)}
                        className={[
                          "flex w-full gap-3 rounded-md px-2 py-2 text-left transition",
                          "hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand-purple/30 focus-visible:outline-none",
                          "motion-reduce:transition-none",
                          isActive ? "bg-brand-purple/10" : "",
                        ].join(" ")}
                      >
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {line.time}
                        </span>
                        <span className="text-sm leading-relaxed text-foreground">
                          {highlight(line.text, query)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-foreground">
              Transcript not available yet
            </p>
            <p className="mt-2 text-sm text-muted">
              Transcripts are uploaded separately and will appear here once
              ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
