"use client";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  variant?: "default" | "awards";
};

export function YouTubeEmbed({
  videoId,
  title,
  variant = "default",
}: YouTubeEmbedProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-lg border bg-black shadow-sm",
        variant === "awards" ? "border-awards-gold/40" : "border-border",
      ].join(" ")}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
        loading="lazy"
      />
    </div>
  );
}
