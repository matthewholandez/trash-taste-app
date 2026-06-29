import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service · Trash Taste Archive",
  description: "Terms for using the Trash Taste Archive fan site.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument title="Terms of Service" lastUpdated="June 29, 2026">
      <section className="space-y-3">
        <h2>Agreement</h2>
        <p>
          By using Trash Taste Archive, you agree to these terms. If you do not
          agree, please do not use the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Community fan project</h2>
        <p>
          This site is a community-made fan archive. It is not affiliated with,
          endorsed by, or operated by Trash Taste, any of its hosts, or their
          production companies. &quot;Trash Taste&quot; and related names, logos,
          and artwork are the property of their respective owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Content and links</h2>
        <p>
          Episode listings, thumbnails, and embedded players come from publicly
          available YouTube content and related metadata. We do not claim
          ownership of podcast episodes, video recordings, or official branding.
        </p>
        <p>
          Links to YouTube, Spotify, Reddit, and other third-party sites are
          provided for convenience. Those services have their own terms and
          policies, and we are not responsible for their content or availability.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Acceptable use</h2>
        <p>You agree not to misuse the site, including by attempting to:</p>
        <ul>
          <li>Disrupt or overload the service or its infrastructure.</li>
          <li>Access non-public endpoints or data without authorization.</li>
          <li>Use automated tools to scrape the site in ways that harm availability.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>Disclaimer</h2>
        <p>
          The site is provided &quot;as is&quot; and &quot;as available&quot;
          without warranties of any kind, whether express or implied. We do not
          guarantee that episode listings will always be complete, current, or
          error-free.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the operators of this
          community project are not liable for any indirect, incidental, or
          consequential damages arising from your use of the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site
          after changes are posted means you accept the revised terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2>Contact</h2>
        <p>
          Questions about these terms can be raised in the{" "}
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
