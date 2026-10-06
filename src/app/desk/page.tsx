import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Composer } from "@/components/desk/composer";
import { NotebookFiveAudioAudit } from "@/components/desk/notebook-five-audio-audit";
import { ReviewQueue } from "@/components/desk/review-queue";
import { SourceLeadInbox } from "@/components/desk/source-lead-inbox";
import { dispatches } from "@/content/dispatches";
import { sourceLeads } from "@/content/source-leads";

export const metadata: Metadata = {
  title: "Desk",
  description: "Local editorial review workspace for Mainland Dispatch.",
  robots: { index: false, follow: false, noarchive: true },
};

const deskEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.ENABLE_EDITORIAL_DESK === "1";

export default function DeskPage() {
  if (!deskEnabled) notFound();

  // The private catalog is read here, on the server, and reaches the Desk's
  // client components only as props of this gated page.
  const knownSources = dispatches.map((dispatch) => ({
    id: dispatch.id,
    url: dispatch.canonicalSource.url,
  }));
  const reviewQueue = dispatches.filter(
    (dispatch) =>
      dispatch.editorialStatus !== "published" &&
      dispatch.editorialStatus !== "corrected" &&
      dispatch.editorialStatus !== "archived"
  );
  const queuedLeadIds = new Set(reviewQueue.map((d) => d.sourceLeadId));
  const queuedLeads = sourceLeads.filter((lead) => queuedLeadIds.has(lead.id));

  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Desk · local editorial sandbox
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          The editorial desk
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Add links, correct metadata, and move entries through review. This
          prototype-only workspace is excluded from public navigation and is
          unavailable in production unless explicitly enabled at build time.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <NotebookFiveAudioAudit />
        <Composer knownSources={knownSources} />
        <SourceLeadInbox sourceLeads={sourceLeads} />
        <ReviewQueue queue={reviewQueue} sourceLeads={queuedLeads} />
      </div>
    </div>
  );
}
