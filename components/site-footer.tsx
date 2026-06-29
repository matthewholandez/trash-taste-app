import Link from "next/link";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Community-made fan archive. Trash Taste and related marks belong to
          their respective owners.
        </p>

        <nav
          aria-label="Legal"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-brand-purple transition hover:text-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none motion-reduce:transition-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
