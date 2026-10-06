import { publishedDispatches } from "@/content/dispatches";
import { publicNotebookEntries } from "@/content/notebook";
import type { Dispatch, EvidenceStatus, Vertical } from "@/content/schema";
import type { NotebookEntry } from "@/content/notebook/schema";
import {
  notebookSourceKnowledgeId,
  dispatchSourceKnowledgeId,
} from "@/content/notebook/source-authority";
import { siteUrl } from "@/lib/seo";

type KnowledgeObject = Readonly<Record<string, unknown>> & {
  id: string;
  kind: string;
};

type NotebookSourceUseRecord = {
  publicationId: string;
  context: string;
  limitation: string;
};

const midnight = (date: string) => `${date}T00:00:00.000Z`;
const normalize = (value: string) =>
  value
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const domains: Record<Vertical, readonly string[]> = {
  bilateral: ["politics", "policy"],
  culture: ["history", "politics"],
  mainland: ["politics", "policy"],
  technology: ["technology"],
  economy: ["economics", "finance"],
};
const evidence: Record<EvidenceStatus, string> = {
  reported: "source-reviewed",
  officiallyAnnounced: "source-reviewed",
  implemented: "corroborated",
  independentlyObserved: "corroborated",
  contested: "contested",
  superseded: "superseded",
  corrected: "corrected",
};

const common = ({
  id,
  legacyIds,
  title,
  summary,
  createdAt,
  updatedAt,
  objectDomains,
  topics,
  tags,
  evidenceStatus,
  editorialStatus,
  limitations,
}: {
  id: string;
  legacyIds: string[];
  title: string;
  summary: string;
  createdAt: string;
  updatedAt?: string;
  objectDomains: string[];
  topics: string[];
  tags: string[];
  evidenceStatus: string;
  editorialStatus: string;
  limitations: string[];
}) => ({
  schemaVersion: "1.0",
  id,
  projectId: "mainland-dispatch",
  legacyIds,
  title,
  summary,
  dates: { createdAt, ...(updatedAt ? { updatedAt } : {}) },
  provenance: { sourceIds: [], methodIds: [] },
  semantics: {
    domains: objectDomains,
    topics,
    tags,
    entities: [],
  },
  evidenceStatus,
  editorialStatus,
  visibility: "public",
  limitations,
  relationships: [],
  corrections: [],
});

function dispatchObjects(dispatch: Dispatch): KnowledgeObject[] {
  const sourceId = dispatchSourceKnowledgeId(dispatch.slug);
  const claimIds = dispatch.claims.map(
    (claim) =>
      `mainland-dispatch:claim:${dispatch.slug}-${claim.id.replace(/^claim-/, "")}`
  );
  const objectDomains = [
    ...new Set(dispatch.verticals.flatMap((vertical) => domains[vertical])),
  ];
  const topics = dispatch.verticals.map(normalize);
  const tags = [...new Set(dispatch.tags.map(normalize))];
  const source = dispatch.canonicalSource;
  const sourceObject: KnowledgeObject = {
    ...common({
      id: sourceId,
      legacyIds: [`${dispatch.id}:${source.id}`],
      title: source.title,
      summary: `Canonical source for ${dispatch.title}.`,
      createdAt: source.publishedAt,
      updatedAt: source.retrievedAt,
      objectDomains,
      topics,
      tags,
      evidenceStatus: "source-reviewed",
      editorialStatus: "published",
      limitations: source.limitations,
    }),
    kind: "source",
    dates: {
      createdAt: source.publishedAt,
      publishedAt: midnight(source.publishedAt),
      retrievedAt: midnight(source.retrievedAt),
      lastReviewedAt: source.retrievedAt,
    },
    source: {
      canonicalUrl: source.url,
      publisher: source.publisher,
      ...(source.byline ? { authors: [source.byline] } : {}),
      authorityRole: "secondary-source",
      accessStatus: source.limitations.some((item) =>
        /paywall|restricted/i.test(item)
      )
        ? "restricted"
        : "open-access",
      license:
        "Source-specific terms apply; publication does not grant reuse rights.",
      methodologyWarnings: source.limitations,
    },
  };
  const claims = dispatch.claims.map((claim, index): KnowledgeObject => ({
    ...common({
      id: claimIds[index],
      legacyIds: [`${dispatch.id}:${claim.id}`],
      title: `${dispatch.title}: claim ${index + 1}`,
      summary: claim.statement,
      createdAt: dispatch.curatedAt,
      updatedAt: dispatch.updatedAt,
      objectDomains,
      topics,
      tags,
      evidenceStatus: evidence[claim.status],
      editorialStatus: dispatch.editorialStatus,
      limitations: claim.limitations,
    }),
    kind: "claim",
    provenance: { sourceIds: [sourceId], methodIds: [] },
    claim: {
      statement: claim.statement,
      claimNature: "source-claim",
      sourceIds: [sourceId],
    },
  }));
  const publication: KnowledgeObject = {
    ...common({
      id: `mainland-dispatch:publication:dispatch-${dispatch.slug}`,
      legacyIds: [dispatch.id, dispatch.slug],
      title: dispatch.title,
      summary: dispatch.summary,
      createdAt: dispatch.curatedAt,
      updatedAt: dispatch.updatedAt,
      objectDomains,
      topics,
      tags,
      evidenceStatus:
        dispatch.provenance === "verified" ? "source-reviewed" : "unreviewed",
      editorialStatus: dispatch.editorialStatus,
      limitations: [
        ...source.limitations,
        ...(dispatch.provenance === "prototype"
          ? ["Prototype content is not verified reporting."]
          : []),
      ],
    }),
    kind: "publication",
    dates: {
      createdAt: dispatch.curatedAt,
      updatedAt: dispatch.updatedAt,
      publishedAt: midnight(dispatch.curatedAt),
    },
    provenance: { sourceIds: [sourceId], methodIds: [] },
    publication: {
      canonicalUrl: `${siteUrl}/dispatch/${dispatch.slug}`,
      publishedAt: midnight(dispatch.curatedAt),
      objectIds: [sourceId, ...claimIds],
    },
  };
  return [sourceObject, ...claims, publication];
}

const notebookStatus = (status: NotebookEntry["frontPagePreview"]["status"]) =>
  status === "contested"
    ? "contested"
    : status === "observed"
      ? "corroborated"
      : "source-reviewed";
const notebookNature = (status: NotebookEntry["frontPagePreview"]["status"]) =>
  status === "scenario"
    ? "scenario"
    : status === "interpretation" || status === "contested"
      ? "interpretation"
      : status === "observed"
        ? "observation"
        : "source-claim";

function notebookObjects(entry: NotebookEntry): KnowledgeObject[] {
  const objectDomains = ["politics", "policy", "economics"];
  const topics = [normalize(entry.variant)];
  const tags = [...new Set(entry.tags.map(normalize))];
  const publicationId =
    `mainland-dispatch:publication:notebook-${entry.slug}` as const;
  const sourceIds = new Map(
    entry.sourceTrail.map((source) => [
      source.id,
      notebookSourceKnowledgeId(entry.slug, source.id),
    ])
  );
  const sources = entry.sourceTrail.map((source): KnowledgeObject => {
    const id = sourceIds.get(source.id);
    if (!id) throw new Error(`Missing Notebook source ${source.id}`);
    return {
      ...common({
        id,
        legacyIds: [source.id],
        title: source.title,
        summary: source.context,
        createdAt: source.retrievedAt,
        objectDomains,
        topics,
        tags,
        evidenceStatus: "source-reviewed",
        editorialStatus: "published",
        limitations: [source.limitation],
      }),
      kind: "source",
      dates: {
        createdAt: source.retrievedAt,
        retrievedAt: midnight(source.retrievedAt),
        lastReviewedAt: source.retrievedAt,
      },
      source: {
        canonicalUrl: source.links[0].url,
        publisher: source.publisher,
        ...(source.author ? { authors: [source.author] } : {}),
        authorityRole: "secondary-source",
        accessStatus: /paywall|restricted/i.test(source.limitation)
          ? "restricted"
          : "open-access",
        license:
          "Source-specific terms apply; publication does not grant reuse rights.",
        methodologyWarnings: [source.limitation],
        useRecords: [
          {
            publicationId,
            context: source.context,
            limitation: source.limitation,
          },
        ],
      },
    };
  });
  const previewSources = entry.frontPagePreview.sourceIds.map((sourceId) => {
    const id = sourceIds.get(sourceId);
    if (!id) throw new Error(`${entry.slug} cites missing source ${sourceId}`);
    return id;
  });
  const claimId = `mainland-dispatch:claim:${entry.slug}-front-page`;
  const claim: KnowledgeObject = {
    ...common({
      id: claimId,
      legacyIds: [`${entry.slug}:front-page-preview`],
      title: `${entry.title}: front-page finding`,
      summary: entry.frontPagePreview.finding,
      createdAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      objectDomains,
      topics,
      tags,
      evidenceStatus: notebookStatus(entry.frontPagePreview.status),
      editorialStatus: entry.editorialStatus,
      limitations: [entry.frontPagePreview.caveat, ...entry.limitations],
    }),
    kind: "claim",
    provenance: { sourceIds: previewSources, methodIds: [] },
    claim: {
      statement: entry.frontPagePreview.finding,
      claimNature: notebookNature(entry.frontPagePreview.status),
      sourceIds: previewSources,
    },
  };
  const publication: KnowledgeObject = {
    ...common({
      id: publicationId,
      legacyIds: [entry.slug, `notebook-${entry.ordinal}`],
      title: entry.title,
      summary: entry.description,
      createdAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      objectDomains,
      topics,
      tags,
      evidenceStatus:
        entry.reviewState === "source-reviewed"
          ? "source-reviewed"
          : "unreviewed",
      editorialStatus: entry.editorialStatus,
      limitations: entry.limitations,
    }),
    kind: "publication",
    dates: {
      createdAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      publishedAt: midnight(entry.publishedAt),
    },
    provenance: { sourceIds: [...sourceIds.values()], methodIds: [] },
    publication: {
      canonicalUrl: `${siteUrl}/notebook/${entry.slug}`,
      publishedAt: midnight(entry.publishedAt),
      objectIds: [...sourceIds.values(), claimId],
    },
    relationships: (entry.relatedNotebooks ?? []).map((relationship) => ({
      type: relationship.relation,
      targetId: `mainland-dispatch:publication:notebook-${relationship.slug}`,
    })),
  };
  return [...sources, claim, publication];
}

const projectedKnowledgeObjects: readonly KnowledgeObject[] = [
  ...publishedDispatches.flatMap(dispatchObjects),
  ...publicNotebookEntries.flatMap(notebookObjects),
];

function deduplicateKnowledgeObjects(
  objects: readonly KnowledgeObject[]
): KnowledgeObject[] {
  const byId = new Map<string, KnowledgeObject>();
  const stringUnion = (left: unknown, right: unknown) => [
    ...new Set([
      ...(Array.isArray(left)
        ? left.filter((item) => typeof item === "string")
        : []),
      ...(Array.isArray(right)
        ? right.filter((item) => typeof item === "string")
        : []),
    ]),
  ];
  const sourceUses = (candidate: KnowledgeObject) => {
    const source = candidate.source as Record<string, unknown> | undefined;
    return Array.isArray(source?.useRecords)
      ? (source.useRecords as NotebookSourceUseRecord[])
      : [];
  };
  const mergeSourceUses = (
    existing: KnowledgeObject,
    candidate: KnowledgeObject
  ) => {
    const byPublication = new Map<string, NotebookSourceUseRecord>();
    for (const use of [...sourceUses(existing), ...sourceUses(candidate)]) {
      const prior = byPublication.get(use.publicationId);
      if (prior && JSON.stringify(prior) !== JSON.stringify(use)) {
        throw new Error(
          `Conflicting public source use for ${existing.id} in ${use.publicationId}`
        );
      }
      byPublication.set(use.publicationId, use);
    }
    return [...byPublication.values()];
  };
  for (const object of objects) {
    const existing = byId.get(object.id);
    if (!existing) {
      byId.set(object.id, object);
      continue;
    }
    const sourceIdentity = (candidate: KnowledgeObject) => {
      const source = candidate.source as Record<string, unknown> | undefined;
      return JSON.stringify({
        kind: candidate.kind,
        title: candidate.title,
        dates: candidate.dates,
        canonicalUrl: source?.canonicalUrl,
        publisher: source?.publisher,
        authors: source?.authors,
      });
    };
    if (
      object.kind !== "source" ||
      existing.kind !== "source" ||
      sourceIdentity(object) !== sourceIdentity(existing)
    ) {
      throw new Error(
        `Conflicting public knowledge authority for ${object.id}`
      );
    }
    const existingSource = existing.source as Record<string, unknown>;
    const candidateSource = object.source as Record<string, unknown>;
    const existingSemantics = existing.semantics as Record<string, unknown>;
    const candidateSemantics = object.semantics as Record<string, unknown>;
    const useRecords = mergeSourceUses(existing, object);
    byId.set(object.id, {
      ...existing,
      legacyIds: stringUnion(existing.legacyIds, object.legacyIds),
      summary:
        useRecords.length > 1
          ? `Shared source identity for ${useRecords.length} Notebook publications; publication-scoped use records preserve context and limitations.`
          : existing.summary,
      limitations: stringUnion(existing.limitations, object.limitations),
      semantics: {
        ...existingSemantics,
        domains: stringUnion(
          existingSemantics.domains,
          candidateSemantics.domains
        ),
        topics: stringUnion(
          existingSemantics.topics,
          candidateSemantics.topics
        ),
        tags: stringUnion(existingSemantics.tags, candidateSemantics.tags),
        entities: stringUnion(
          existingSemantics.entities,
          candidateSemantics.entities
        ),
      },
      source: {
        ...existingSource,
        methodologyWarnings: stringUnion(
          existingSource.methodologyWarnings,
          candidateSource.methodologyWarnings
        ),
        useRecords,
      },
    });
  }
  return [...byId.values()];
}

export const mainlandKnowledgeObjects: readonly KnowledgeObject[] =
  deduplicateKnowledgeObjects(projectedKnowledgeObjects);
const newest = [
  ...publishedDispatches.map((item) => item.updatedAt),
  ...publicNotebookEntries.map((item) => item.updatedAt),
]
  .sort()
  .at(-1);

export const mainlandKnowledgeIndex = {
  schemaVersion: "1.0",
  projectId: "mainland-dispatch",
  generatedAt: midnight(newest ?? "2026-08-30"),
  objects: mainlandKnowledgeObjects,
} as const;

export function validateMainlandKnowledgeBoundary(): void {
  const ids = mainlandKnowledgeObjects.map(({ id }) => id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Mainland knowledge object IDs must be unique");
  }
  if (
    mainlandKnowledgeObjects.some(
      (object) =>
        object.visibility !== "public" ||
        object.editorialStatus === "draft" ||
        JSON.stringify(object).includes("source-lead")
    )
  ) {
    throw new Error(
      "Private or review-stage material crossed the public boundary"
    );
  }
}

validateMainlandKnowledgeBoundary();
