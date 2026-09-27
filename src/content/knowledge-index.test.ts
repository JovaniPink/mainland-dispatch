import { publishedDispatches } from "@/content/dispatches";
import { publicNotebookEntries } from "@/content/notebook";
import {
  mainlandKnowledgeIndex,
  validateMainlandKnowledgeBoundary,
} from "@/content/knowledge-index";
import { routingAroundRisk } from "@/content/notebook/routing-around-risk";
import { notebookSourceKnowledgeId } from "@/content/notebook/source-authority";
import { theArcticIsNotAShortcut } from "@/content/notebook/the-arctic-is-not-a-shortcut";

describe("public knowledge-contract adapter", () => {
  it("projects only public Dispatch and Notebook records", () => {
    expect(() => validateMainlandKnowledgeBoundary()).not.toThrow();
    const publications = mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "publication"
    );
    expect(publications).toHaveLength(
      publishedDispatches.length + publicNotebookEntries.length
    );
  });

  it("preserves legacy IDs and canonical public routes", () => {
    for (const publication of mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "publication"
    )) {
      expect(publication.legacyIds).not.toHaveLength(0);
      expect(JSON.stringify(publication)).toContain(
        "https://mainlanddispatch.com/"
      );
    }
  });

  it("does not turn curation into a license grant", () => {
    for (const source of mainlandKnowledgeIndex.objects.filter(
      ({ kind }) => kind === "source"
    )) {
      expect(JSON.stringify(source)).toContain("does not grant reuse rights");
    }
  });

  it("keeps the past-year HN discovery intake out of the public index", () => {
    const publicProjection = JSON.stringify(mainlandKnowledgeIndex);

    expect(publicProjection).not.toContain("china-hn-past-year-2026-09-15");
    expect(publicProjection).not.toContain("lead-hn-2025-");
    expect(publicProjection).not.toContain("lead-hn-2026-");
  });

  it("keeps the Anthropic threat-report story packet out of the public index", () => {
    const publicProjection = JSON.stringify(mainlandKnowledgeIndex);

    expect(publicProjection).not.toContain(
      "anthropic-china-threat-report-2026-09-15"
    );
    expect(publicProjection).not.toContain(
      "lead-2026-anthropic-september-threat-report"
    );
    expect(publicProjection).not.toContain(
      "lead-2026-hudson-china-insider-anthropic-threat-report"
    );
  });

  it("retains both scoped use records for each shared maritime source", () => {
    const publicationIds = [
      "mainland-dispatch:publication:notebook-routing-around-risk",
      "mainland-dispatch:publication:notebook-the-arctic-is-not-a-shortcut",
    ];

    for (const sourceId of [
      "notebook-source-risk-aljazeera",
      "notebook-source-risk-guardian",
    ]) {
      const knowledgeId = notebookSourceKnowledgeId(
        "the-arctic-is-not-a-shortcut",
        sourceId
      );
      const object = mainlandKnowledgeIndex.objects.find(
        ({ id }) => id === knowledgeId
      );
      const uses = (
        object?.source as
          | {
              useRecords?: Array<{
                publicationId: string;
                context: string;
                limitation: string;
              }>;
            }
          | undefined
      )?.useRecords;
      const nonArctic = routingAroundRisk.sourceTrail.find(
        (source) => source.id === sourceId
      );
      const arctic = theArcticIsNotAShortcut.sourceTrail.find(
        (source) => source.id === sourceId
      );

      expect(nonArctic).toBeDefined();
      expect(arctic).toBeDefined();
      expect(uses).toEqual([
        {
          publicationId: publicationIds[0],
          context: nonArctic!.context,
          limitation: nonArctic!.limitation,
        },
        {
          publicationId: publicationIds[1],
          context: arctic!.context,
          limitation: arctic!.limitation,
        },
      ]);
      expect(object?.summary).toContain("2 Notebook publications");
      expect(object?.limitations).toEqual(
        expect.arrayContaining([nonArctic!.limitation, arctic!.limitation])
      );
      expect((object?.semantics as { topics?: string[] }).topics).toEqual(
        expect.arrayContaining(["maritime-risk", "arctic-route"])
      );

      for (const publicationId of publicationIds) {
        const publication = mainlandKnowledgeIndex.objects.find(
          ({ id }) => id === publicationId
        );
        expect(
          (publication?.provenance as { sourceIds?: string[] }).sourceIds
        ).toContain(knowledgeId);
      }
    }
  });
});
