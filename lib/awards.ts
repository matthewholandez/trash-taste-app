const AWARDS_TITLE_PATTERN =
  /^The\s+(?:(?:\d+(?:st|nd|rd|th)?|\d{4}|\w+(?:\s+\w+)?)\s+)?Trash Taste Awards$/i;

export function isAwardsEpisode(title: string): boolean {
  return AWARDS_TITLE_PATTERN.test(title.trim());
}
