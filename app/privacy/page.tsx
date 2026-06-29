import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy · Trash Taste Archive",
  description: "How the Trash Taste Archive fan site handles information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="June 29, 2026">
      <section className="space-y-3">
        <h2>Overview</h2>
        <p>
          Trash Taste Archive is a community-made fan site that lists publicly
          available Trash Taste episodes. We do not operate accounts, sell
          advertising, or collect personal information through forms on this
          site.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Information we process</h2>
        <p>
          When you visit the site, our hosting provider may automatically record
          standard server logs such as your IP address, browser type, requested
          pages, and timestamps. We use this information only to operate,
          secure, and troubleshoot the service.
        </p>
        <p>
          Episode metadata shown on the site (titles, numbers, publish dates,
          thumbnails, and YouTube links) is synced from public YouTube uploads
          and stored in Supabase so the archive can load quickly. Some episode
          pages also show auto-generated summaries, tags, and transcripts.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Third-party services</h2>
        <p>
          Embedded YouTube players are served by Google and may set cookies or
          collect usage data under Google&apos;s policies. Thumbnail images and
          outbound links to YouTube, Spotify, and Reddit are also subject to
          those platforms&apos; terms and privacy practices.
        </p>
        <p>
          Supabase hosts the episode database that powers the archive. Data
          requests from our server to Supabase are limited to reading public
          episode records needed to render pages.
        </p>
      </section>

      <section className="space-y-3">
        <h2>What we do not do</h2>
        <ul>
          <li>We do not require sign-in or collect names, emails, or passwords.</li>
          <li>We do not sell or rent personal information.</li>
          <li>
            We do not use third-party analytics or advertising trackers on this
            site.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>Changes</h2>
        <p>
          We may update this policy as the site evolves. The &quot;Last
          updated&quot; date at the top of this page will change when we do.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Contact</h2>
        <p>
          Questions about this policy can be raised in the{" "}
          <a
            href="https://github.com/matthewholandez/trash-taste-app/issues"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-purple underline decoration-brand-purple/30 underline-offset-2 transition hover:text-brand-purple-dark hover:decoration-brand-purple/60 motion-reduce:transition-none"
          >
            project issue tracker
          </a>
          .
        </p>
      </section>
    </LegalDocument>
  );
}
