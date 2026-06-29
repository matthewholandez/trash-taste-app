export type EpisodePalette = {
  border: string;
  badge: string;
  badgeText: string;
};

const PALETTES: EpisodePalette[] = [
  { border: "#E8C547", badge: "#FFF4CC", badgeText: "#7A5C00" },
  { border: "#E8927C", badge: "#FFE8E1", badgeText: "#8A3B28" },
  { border: "#8FB996", badge: "#E8F5EA", badgeText: "#2F5E3A" },
  { border: "#7EB8DA", badge: "#E3F2FA", badgeText: "#1E5678" },
  { border: "#C9A0DC", badge: "#F3E8F8", badgeText: "#5E3A72" },
];

export function getEpisodePalette(index: number): EpisodePalette {
  return PALETTES[index % PALETTES.length]!;
}
