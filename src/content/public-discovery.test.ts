import { searchDiscovery } from "@/lib/discovery-search";
import type { ArchiveContext } from "@/machines/archive-machine";
import { publicDiscovery } from "./public-discovery";
import { publicNotebookEntries } from "./notebook";
import { dispatches, publishedDispatches } from "./dispatches";
import { initialArchiveContext } from "@/machines/archive-machine";
import { notebookSourceKnowledgeId } from "./notebook/source-authority";

const searchPublicDiscovery = (context: ArchiveContext) =>
  searchDiscovery(context, publicDiscovery);

it("finds the Arctic inquiry and its admitted sources", () => {
  const results = searchPublicDiscovery({
    ...initialArchiveContext,
    query: "Arctic",
  });
  expect(
    results.some(
      (result) =>
        result.kind === "inquiry" &&
        result.slug === "the-arctic-is-not-a-shortcut"
    )
  ).toBe(true);
  expect(
    results.filter((result) => result.kind === "source").length
  ).toBeGreaterThan(0);
  expect(results.some((result) => result.kind === "dispatch")).toBe(false);
});
it("retains every public trail use under its established identity", () => {
  for (const entry of publicNotebookEntries)
    for (const source of entry.sourceTrail) {
      const result = publicDiscovery.find(
        (result) =>
          result.id === notebookSourceKnowledgeId(entry.slug, source.id)
      );
      expect(result?.kind).toBe("source");
      if (result?.kind !== "source") throw new Error("Missing source");
      expect(result.uses).toContainEqual(
        expect.objectContaining({
          id: entry.slug,
          context: source.context,
          limitations: [source.limitation],
          href: `/notebook/${entry.slug}#${source.id}`,
          publishedAt: source.publishedAt,
          retrievedAt: source.retrievedAt,
        })
      );
    }
  expect(
    publicDiscovery.some(
      (result) => result.kind === "source" && result.uses.length > 1
    )
  ).toBe(true);
  expect(new Set(publicDiscovery.map((result) => result.id)).size).toBe(
    publicDiscovery.length
  );
});
it("includes every public Dispatch source and no private or prototype record", () => {
  const records = publicDiscovery.filter(
    (result) => result.kind === "dispatch"
  );
  expect(records).toHaveLength(publishedDispatches.length);
  for (const record of records)
    expect(record.record.provenance).toBe("verified");
  for (const privateRecord of dispatches.filter(
    (record) => !publishedDispatches.includes(record)
  )) {
    expect(
      publicDiscovery.some(
        (result) => result.href === `/dispatch/${privateRecord.slug}`
      )
    ).toBe(false);
    expect(
      publicDiscovery.some(
        (result) =>
          result.kind === "source" &&
          result.uses.some((use) => use.id === privateRecord.id)
      )
    ).toBe(false);
  }
});
it("ranks exact titles first and keeps Dispatch facets scoped", () => {
  const entry = publicNotebookEntries[0];
  expect(
    searchPublicDiscovery({ ...initialArchiveContext, query: entry.title })[0]
      .title
  ).toBe(entry.title);
  const filtered = searchPublicDiscovery({
    ...initialArchiveContext,
    evidence: "contested",
  });
  expect(filtered.filter((result) => result.kind === "inquiry")).toHaveLength(
    10
  );
  expect(filtered.filter((result) => result.kind === "source")).toHaveLength(
    publicDiscovery.filter((result) => result.kind === "source").length
  );
});
it("filters by source publication dates, never retrieval dates", () => {
  const undated = publicDiscovery.find(
    (result) => result.kind === "source" && !result.publishedAt
  );
  expect(undated).toBeDefined();
  expect(
    searchPublicDiscovery({ ...initialArchiveContext, year: "2026" })
  ).not.toContain(undated);
  expect(
    searchPublicDiscovery({
      ...initialArchiveContext,
      publisher: "Mainland Dispatch",
    }).every((result) => result.kind === "inquiry")
  ).toBe(true);
});
