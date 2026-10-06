import { publishedDispatches, toPublicDispatch } from "./dispatches";
import { latestNotebookEntry, publicNotebookEntries } from "./notebook";
import {
  notebookSourceKnowledgeId,
  dispatchSourceKnowledgeId,
} from "./notebook/source-authority";
import type { PublicDispatch } from "./schema";

export type SourceUse = {
  kind: "notebook" | "dispatch";
  id: string;
  title: string;
  href: string;
  context: string;
  limitations: string[];
  publishedAt?: string;
  retrievedAt: string;
};
type ResultBase = {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  publishedAt?: string;
  reviewedAt?: string;
  topics: string[];
  href: string;
  searchText: string;
};
export type InquiryResult = ResultBase & {
  kind: "inquiry";
  slug: string;
  readTime: string;
};
export type SourceResult = ResultBase & {
  kind: "source";
  retrievedAt: string;
  links: { label: string; url: string }[];
  uses: SourceUse[];
};
export type DispatchResult = ResultBase & {
  kind: "dispatch";
  record: PublicDispatch;
};
export type PublicDiscoveryResult =
  InquiryResult | SourceResult | DispatchResult;
export type DiscoveryKind = PublicDiscoveryResult["kind"];

// Publication identities are authoritative. Similar URLs or titles are not deduplication keys.

function projectPublicDiscovery(): PublicDiscoveryResult[] {
  const results: PublicDiscoveryResult[] = [];
  const sources = new Map<string, SourceResult>();
  function admitSource(source: SourceResult) {
    const existing = sources.get(source.id);
    if (existing) {
      existing.uses.push(...source.uses);
      existing.links = [
        ...new Map(
          [...existing.links, ...source.links].map((link) => [link.url, link])
        ).values(),
      ];
      existing.searchText += ` ${source.searchText}`;
      existing.topics = [...new Set([...existing.topics, ...source.topics])];
    } else sources.set(source.id, source);
  }
  for (const entry of publicNotebookEntries) {
    const href = `/notebook/${entry.slug}`;
    const claims =
      "claimAudit" in entry
        ? entry.claimAudit
            .filter((claim) => claim.decision !== "exclude")
            .map((claim) =>
              claim.decision === "retain"
                ? `${claim.claim} ${claim.assessment}`
                : claim.assessment
            )
            .join(" ")
        : "";
    results.push({
      kind: "inquiry",
      id: `notebook:${entry.slug}`,
      slug: entry.slug,
      title: entry.title,
      summary: entry.description,
      publisher: "Mainland Dispatch",
      publishedAt: entry.publishedAt,
      reviewedAt: entry.updatedAt,
      topics: entry.tags,
      href,
      readTime: entry.readTime,
      searchText: [
        entry.title,
        entry.subtitle,
        entry.description,
        entry.thesis,
        ...entry.tags,
        claims,
      ].join(" "),
    });
    for (const source of entry.sourceTrail) {
      const contextHref = `${href}#${source.id}`;
      admitSource({
        kind: "source",
        id: notebookSourceKnowledgeId(entry.slug, source.id),
        title: source.title,
        summary: source.context,
        publisher: source.publisher,
        publishedAt: source.publishedAt,
        retrievedAt: source.retrievedAt,
        topics: entry.tags,
        href: contextHref,
        links: source.links,
        uses: [
          {
            kind: "notebook",
            id: entry.slug,
            title: entry.title,
            href: contextHref,
            context: source.context,
            limitations: [source.limitation],
            publishedAt: source.publishedAt,
            retrievedAt: source.retrievedAt,
          },
        ],
        searchText: [
          source.title,
          source.publisher,
          source.context,
          source.limitation,
          entry.title,
          ...entry.tags,
        ].join(" "),
      });
    }
  }
  for (const record of publishedDispatches.filter(
    (record) => record.provenance === "verified"
  )) {
    const href = `/dispatch/${record.slug}`;
    const claims = record.claims.map((claim) => claim.statement).join(" ");
    results.push({
      kind: "dispatch",
      id: record.id,
      title: record.title,
      summary: record.summary,
      publisher: record.canonicalSource.publisher,
      publishedAt: record.canonicalSource.publishedAt,
      reviewedAt: record.curatedAt,
      topics: [...record.tags, ...record.verticals, ...record.places],
      href,
      record: toPublicDispatch(record),
      searchText: [
        record.title,
        record.summary,
        record.canonicalSource.publisher,
        ...record.tags,
        ...record.verticals,
        ...record.places,
        claims,
      ].join(" "),
    });
    for (const [index, source] of [
      record.canonicalSource,
      ...record.supportingSources,
    ].entries()) {
      const contextHref = `${href}#${source.id}`;
      const context =
        record.claims
          .filter((claim) => claim.sourceIds.includes(source.id))
          .map((claim) => claim.statement)
          .join(" ") || record.summary;
      admitSource({
        kind: "source",
        id: dispatchSourceKnowledgeId(
          record.slug,
          index === 0 ? undefined : source.id
        ),
        title: source.title,
        summary: context,
        publisher: source.publisher,
        publishedAt: source.publishedAt,
        retrievedAt: source.retrievedAt,
        topics: record.tags,
        href: contextHref,
        links: [{ label: "Open source", url: source.url }],
        uses: [
          {
            kind: "dispatch",
            id: record.id,
            title: record.title,
            href: contextHref,
            context,
            limitations: source.limitations,
            publishedAt: source.publishedAt,
            retrievedAt: source.retrievedAt,
          },
        ],
        searchText: [
          source.title,
          source.publisher,
          context,
          ...source.limitations,
          ...record.tags,
        ].join(" "),
      });
    }
  }
  return [...results, ...sources.values()];
}
export const publicDiscovery = projectPublicDiscovery();
export const discoveryPublishers = [
  ...new Set(publicDiscovery.map((result) => result.publisher)),
].sort();
export const discoveryYears = [
  ...new Set(
    publicDiscovery.flatMap((result) =>
      result.publishedAt ? [result.publishedAt.slice(0, 4)] : []
    )
  ),
]
  .sort()
  .reverse();

export const publicArchiveCatalog = {
  latestInquirySlug: latestNotebookEntry.slug,
  inquirySlugs: publicNotebookEntries.map((entry) => entry.slug),
  focusIds: publishedDispatches
    .filter((record) => record.provenance === "verified")
    .map((record) => record.id),
  publishers: discoveryPublishers,
  years: discoveryYears,
  kinds: [...new Set(publishedDispatches.map((record) => record.kind))],
  places: [
    ...new Set(publishedDispatches.flatMap((record) => record.places)),
  ].sort(),
};

export type DiscoveryInquiry = {
  slug: string;
  title: string;
  ordinal: number;
  description: string;
  sourceIds: string[];
};
export const discoveryInquiries: DiscoveryInquiry[] = publicNotebookEntries.map(
  (entry) => ({
    slug: entry.slug,
    title: entry.title,
    ordinal: entry.ordinal,
    description: entry.description,
    sourceIds: entry.sourceTrail.map((source) =>
      notebookSourceKnowledgeId(entry.slug, source.id)
    ),
  })
);
