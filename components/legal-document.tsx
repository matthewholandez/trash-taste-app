import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <SiteShell mainClassName="mx-auto w-full max-w-3xl flex-1 bg-background px-6 py-10">
      <article className="space-y-8">
        <header className="space-y-3 border-b border-border pb-8">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-brand-purple transition hover:text-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple-light focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          >
            ← Back to archive
          </Link>
          <h1 className="font-display text-3xl tracking-tight text-foreground uppercase sm:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-muted">Last updated: {lastUpdated}</p>
        </header>

        <div className="space-y-6 text-sm leading-7 text-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </SiteShell>
  );
}
