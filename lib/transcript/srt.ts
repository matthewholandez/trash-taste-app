import { formatTimestamp } from "@/lib/format";
import type { TranscriptLine } from "@/lib/types";

const TIMESTAMP =
  /^(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})$/;

function timestampToSeconds(h: number, m: number, s: number, ms: number): number {
  return h * 3600 + m * 60 + s + ms / 1000;
}

function stripMarkup(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]+\}/g, "")
    .trim();
}

export function parseSrt(raw: string): TranscriptLine[] {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const blocks = normalized.split(/\n\n+/);
  const lines: TranscriptLine[] = [];

  for (const block of blocks) {
    const blockLines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (blockLines.length < 2) {
      continue;
    }

    const timestampLine = blockLines.find((line) => TIMESTAMP.test(line));
    if (!timestampLine) {
      continue;
    }

    const match = timestampLine.match(TIMESTAMP);
    if (!match) {
      continue;
    }

    const seconds = timestampToSeconds(
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
      Number(match[4]),
    );

    const textIndex = blockLines.indexOf(timestampLine) + 1;
    const text = stripMarkup(blockLines.slice(textIndex).join(" "));

    if (!text) {
      continue;
    }

    lines.push({
      time: formatTimestamp(Math.floor(seconds)),
      seconds: Math.floor(seconds),
      text,
    });
  }

  return lines;
}
