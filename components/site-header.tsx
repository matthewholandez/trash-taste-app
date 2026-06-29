const LINKS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TrashTaste",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Spotify",
    href: "https://bit.ly/TrashTastePodcast",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.34a.748.748 0 0 1-1.035.288 14.28 14.28 0 0 0-5.487-1.066 14.28 14.28 0 0 0-5.487 1.066.748.748 0 1 1-.747-1.297 15.776 15.776 0 0 1 6.234-1.213 15.776 15.776 0 0 1 6.234 1.213.748.748 0 0 1 .288 1.009zm1.762-3.942a.935.935 0 0 1-1.293.361 17.805 17.805 0 0 0-6.959-1.394 17.805 17.805 0 0 0-6.959 1.394.935.935 0 0 1-1.293-.361.935.935 0 0 1 .361-1.293 19.678 19.678 0 0 1 7.891-1.577 19.678 19.678 0 0 1 7.891 1.577.935.935 0 0 1 .361 1.293zm2.022-4.027a1.122 1.122 0 0 1-1.552.433 22.337 22.337 0 0 0-8.912-1.812 22.337 22.337 0 0 0-8.912 1.812 1.122 1.122 0 0 1-1.552-.433 1.122 1.122 0 0 1 .433-1.552 24.582 24.582 0 0 1 9.631-1.962 24.582 24.582 0 0 1 9.631 1.962 1.122 1.122 0 0 1 .433 1.552z" />
      </svg>
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/TrashTaste/",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
  },
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
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Social links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-foreground-on-purple/40 text-foreground-on-purple transition hover:border-accent-neon-yellow hover:text-accent-neon-yellow focus-visible:border-accent-neon-yellow focus-visible:ring-2 focus-visible:ring-accent-neon-yellow/50 focus-visible:outline-none motion-reduce:transition-none"
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
