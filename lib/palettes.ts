export type EpisodePalette = {
  accent: string;
};

const PALETTES: EpisodePalette[] = [
  { accent: "#FFD23F" },
  { accent: "#FF4D8D" },
  { accent: "#4DC4FF" },
  { accent: "#7B3FAF" },
  { accent: "#FFFFFF" },
];

export function getEpisodePalette(index: number): EpisodePalette {
  return PALETTES[index % PALETTES.length]!;
}
