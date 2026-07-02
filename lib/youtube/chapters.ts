import { formatTimestamp } from "@/lib/format";
import type { Chapter } from "@/lib/types";

const CHAPTER_LINE =
  /^((?:\d{1,2}:)?\d{1,2}:\d{2})\s+(.+?)\s*$/;

function parseTimestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(":").map(Number);

  if (parts.length === 3) {
    return parts[0]! * 3600 + parts[1]! * 60 + parts[2]!;
  }

  if (parts.length === 2) {
    return parts[0]! * 60 + parts[1]!;
  }

  return 0;
}

export function parseChaptersFromDescription(description: string): Chapter[] {
  const chapters: Chapter[] = [];

  for (const line of description.split(/\r?\n/)) {
    const match = line.trim().match(CHAPTER_LINE);
    if (!match) {
      continue;
    }

    const seconds = parseTimestampToSeconds(match[1]!);
    chapters.push({
      time: formatTimestamp(seconds),
      seconds,
      label: match[2]!.trim(),
    });
  }

  if (chapters.length < 3 || chapters[0]!.seconds !== 0) {
    return [];
  }

  return chapters;
}

// Trash Taste descriptions open with sponsor plugs and link blocks. Anything
// with a URL or promo language is not a usable episode summary.
const PROMO_PATTERN =
  /https?:\/\/|\bwww\.|\buse code\b|\bpromo code\b|\bcode\s+[A-Z0-9]{3,}\b|%\s*off\b|\bdiscount\b|\bfree shipping\b|\bsign up\b|\btrial\b|\bsponsor/i;

export function summaryFromDescription(description: string): string | null {
  const lines = description.split(/\r?\n/);
  const paragraphs: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.match(CHAPTER_LINE)) {
      break;
    }

    if (!trimmed) {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }

    current.push(trimmed);
  }

  if (current.length > 0) {
    paragraphs.push(current.join(" "));
  }

  const first = paragraphs.find(
    (paragraph) => paragraph.length > 0 && !PROMO_PATTERN.test(paragraph),
  );
  return first ?? null;
}
