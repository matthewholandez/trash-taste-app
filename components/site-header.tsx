const LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@TrashTaste" },
  { label: "Spotify", href: "https://bit.ly/TrashTastePodcast" },
  { label: "Reddit", href: "https://www.reddit.com/r/TrashTaste/" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-[#E8E2D6] bg-[#FAF7F0]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-[#1B5E3A] uppercase">
            Podcast archive
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">
            Trash Taste
          </h1>
          <p className="mt-2 max-w-xl text-base text-[#5C5C5C]">
            Every episode from the show, in one place.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#D9D0C0] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] transition hover:-translate-y-0.5 hover:border-[#1B5E3A] hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
