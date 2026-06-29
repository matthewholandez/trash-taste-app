import Image from "next/image";

type EpisodeThumbnailProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function EpisodeThumbnail({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
}: EpisodeThumbnailProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={720}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full origin-top ${className}`.trim()}
    />
  );
}
