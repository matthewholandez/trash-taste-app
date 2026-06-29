const LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@TrashTaste" },
  { label: "Spotify", href: "https://bit.ly/TrashTastePodcast" },
  { label: "Reddit", href: "https://www.reddit.com/r/TrashTaste/" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative bg-brand-purple">
      <div
        aria-hidden
        className="slant-accent slant-accent-animate pointer-events-none absolute top-10 left-8 h-24 w-64 bg-foreground-on-purple/10 sm:left-16 sm:h-32 sm:w-80"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-12">
        <div>
          <div className="relative w-fit">
            <div
              aria-hidden
              className="slant-accent absolute -inset-x-4 -inset-y-2 bg-foreground-on-purple sm:-inset-x-6"
            />
            <div className="slant-accent relative px-6 py-3 sm:px-8 sm:py-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-purple uppercase">
                Podcast archive
              </p>
              <h1 className="mt-1 font-display text-4xl tracking-tight text-brand-purple uppercase sm:text-5xl">
                Trash Taste
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-base text-foreground-on-purple/70">
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
              className="rounded-md border border-foreground-on-purple/40 px-4 py-2 text-sm font-medium text-foreground-on-purple transition hover:border-accent-neon-yellow hover:text-accent-neon-yellow focus-visible:border-accent-neon-yellow focus-visible:ring-2 focus-visible:ring-accent-neon-yellow/50 focus-visible:outline-none motion-reduce:transition-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
