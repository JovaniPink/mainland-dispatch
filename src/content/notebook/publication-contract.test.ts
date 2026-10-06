import fs from "node:fs";
import path from "node:path";
import {
  getPublicNotebookEntry,
  isPublicNotebookEntry,
  parseNotebookRegistry,
  publicNotebookEntries,
} from "@/content/notebook";
import {
  NotebookEntrySchema,
  type NotebookEntry,
} from "@/content/notebook/schema";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";

function cloneEntry(): NotebookEntry {
  return JSON.parse(JSON.stringify(whatXiJinpingWants)) as NotebookEntry;
}

describe("Notebook publication and provenance contract", () => {
  it("dates the shared presentation revision separately from source review", () => {
    for (const entry of publicNotebookEntries) {
      expect(entry.presentationUpdatedAt).toBe("2026-09-07");
      expect(entry.updatedAt < entry.presentationUpdatedAt!).toBe(true);
      expect(
        entry.sourceTrail.every(
          (source) => source.retrievedAt <= entry.updatedAt
        )
      ).toBe(true);
    }
  });
  it("publishes corrected entries and excludes drafts", () => {
    const corrected = {
      ...cloneEntry(),
      editorialStatus: "corrected" as const,
    };
    const draft = { ...cloneEntry(), editorialStatus: "draft" as const };

    expect(isPublicNotebookEntry(corrected)).toBe(true);
    expect(isPublicNotebookEntry(draft)).toBe(false);
  });

  it("looks up only public Notebook entries", () => {
    expect(getPublicNotebookEntry(whatXiJinpingWants.slug)).toStrictEqual(
      whatXiJinpingWants
    );
    expect(getPublicNotebookEntry("not-a-public-notebook")).toBeUndefined();
  });

  it("requires retrieval dates on formats and source records", () => {
    const missingFormatDate = cloneEntry() as unknown as Record<
      string,
      unknown
    >;
    delete (missingFormatDate.formats as Array<Record<string, unknown>>)[0]
      .retrievedAt;

    const missingSourceDate = cloneEntry() as unknown as Record<
      string,
      unknown
    >;
    delete (missingSourceDate.sourceTrail as Array<Record<string, unknown>>)[0]
      .retrievedAt;

    expect(NotebookEntrySchema.safeParse(missingFormatDate).success).toBe(
      false
    );
    expect(NotebookEntrySchema.safeParse(missingSourceDate).success).toBe(
      false
    );
  });

  it("requires every source record to state a limitation", () => {
    const entry = cloneEntry() as unknown as Record<string, unknown>;
    delete (entry.sourceTrail as Array<Record<string, unknown>>)[0].limitation;

    expect(NotebookEntrySchema.safeParse(entry).success).toBe(false);
  });

  it("rejects retrieval dates later than the Notebook revision", () => {
    const entry = cloneEntry();
    entry.formats[0].retrievedAt = "2026-07-24";

    const result = NotebookEntrySchema.safeParse(entry);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "retrievedAt must not follow entry updatedAt",
          }),
        ])
      );
    }
  });

  it("rejects source-link labels repeated anywhere in one Notebook", () => {
    const entry = cloneEntry();
    entry.sourceTrail[1].links[0].label =
      entry.sourceTrail[0].links[0].label.toUpperCase();

    const result = NotebookEntrySchema.safeParse(entry);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "source-link labels must be unique within a Notebook",
          }),
        ])
      );
    }
  });

  it("keeps public registry slugs and public route directories identical", () => {
    const routeRoot = path.join(process.cwd(), "src/app/notebook");
    const routeSlugs = fs
      .readdirSync(routeRoot, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          fs.existsSync(path.join(routeRoot, entry.name, "page.tsx"))
      )
      .map((entry) => entry.name)
      .sort();

    expect(routeSlugs).toEqual(
      publicNotebookEntries.map((entry) => entry.slug).sort()
    );
  });

  it("preserves registry uniqueness independently of publication status", () => {
    const duplicate = { ...cloneEntry(), editorialStatus: "draft" as const };

    expect(() => parseNotebookRegistry([cloneEntry(), duplicate])).toThrow(
      "Notebook slugs must be unique"
    );
  });
});
