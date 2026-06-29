import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { EmptyState } from "@/components/empty-state";

export default function EpisodeNotFound() {
  return (
    <SiteShell mainClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col bg-background px-6 py-10">
      <EmptyState
        title="Episode not found"
        description="That episode number doesn't exist in the archive."
      />
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-brand-purple hover:underline"
        >
          ← Back to archive
        </Link>
      </div>
    </SiteShell>
  );
}
