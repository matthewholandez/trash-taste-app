import { parseYouTubeEpisodeTitle } from "@/lib/youtube/parse";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const parsed = parseYouTubeEpisodeTitle(
  "Gamers Are Eating Good in 2026 | Trash Taste #314",
  "abc123",
  "2026-06-26T20:00:00Z",
  "https://i.ytimg.com/vi/abc123/maxresdefault.jpg",
);

assert(parsed !== null, "Expected episode to parse");
assert(parsed!.episode_number === 314, "Expected episode number 314");
assert(
  parsed!.title === "Gamers Are Eating Good in 2026",
  "Expected cleaned title",
);

const discarded = parseYouTubeEpisodeTitle(
  "Trash Taste Live at Anime Expo",
  "xyz789",
  "2026-06-26T20:00:00Z",
  null,
);

assert(discarded === null, "Expected non-episode upload to be discarded");

console.log("parse smoke test passed");
