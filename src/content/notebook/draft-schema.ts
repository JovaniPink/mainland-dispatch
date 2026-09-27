import { z } from "zod";
import { NotebookClaimAuditSchema, NotebookTrailItemSchema } from "./schema";

const text = z.string().trim().min(1);
const date = z.iso.date();
const fragment = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const references = z.array(text).min(1);

/** Where an unverified phrase appears, so the preview can mark it in place. */
const UnverifiedLocationSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    kind: z.literal("paragraph"),
    sectionId: fragment,
    paragraph: z.number().int().nonnegative(),
  }),
  z.strictObject({
    kind: z.literal("case"),
    caseId: fragment,
    field: z.enum(["label", "activity", "attribution", "outcome"]),
  }),
]);

/**
 * A draft detail that no reviewed source record or ledger entry supports.
 * It stays in the text, visibly marked, until a primary source is recorded.
 */
export const NotebookDraftUnverifiedSchema = z.strictObject({
  id: text.regex(/^unverified-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  phrase: text,
  location: UnverifiedLocationSchema,
  status: z.literal("needs-primary-source"),
  note: text,
});

export type NotebookDraftUnverified = z.infer<
  typeof NotebookDraftUnverifiedSchema
>;

/** Drafts have revision dates, never publication dates or public registry entries. */
export const NotebookDraftSchema = z
  .strictObject({
    ordinal: z.number().int().positive(),
    slug: fragment,
    title: text,
    subtitle: text,
    thesis: text,
    editorialStatus: z.literal("draft"),
    reviewState: z.literal("editorial-review"),
    draftUpdatedAt: date,
    evidenceCutoff: date,
    tags: z.array(text).min(1),
    sections: z
      .array(
        z.object({
          id: fragment,
          title: text,
          eyebrow: text,
          paragraphs: z
            .array(
              z.object({
                text,
                sourceIds: references,
                claimIds: z.array(text),
              })
            )
            .min(1),
        })
      )
      .min(1),
    sourceTrail: z.array(NotebookTrailItemSchema).min(1),
    claimAudit: z.array(NotebookClaimAuditSchema).min(1),
    cases: z
      .array(
        z.object({
          id: fragment,
          label: text,
          activity: text,
          attribution: text,
          outcome: text,
          sourceIds: references,
          claimIds: references,
        })
      )
      .min(1),
    accessSteps: z
      .array(
        z.object({
          label: text,
          detail: text,
          sourceIds: references,
        })
      )
      .min(1),
    limitations: z.array(text).min(1),
    unverified: z.array(NotebookDraftUnverifiedSchema),
  })
  .superRefine((draft, ctx) => {
    const sources = new Set(draft.sourceTrail.map((source) => source.id));
    const claims = new Set(draft.claimAudit.map((claim) => claim.id));
    const ids = [
      ...sources,
      ...claims,
      ...draft.sections.map((section) => section.id),
      ...draft.cases.map((item) => item.id),
      ...draft.unverified.map((item) => item.id),
    ];
    if (
      sources.size !== draft.sourceTrail.length ||
      claims.size !== draft.claimAudit.length ||
      new Set(ids).size !== ids.length
    ) {
      ctx.addIssue({ code: "custom", message: "Draft IDs must be unique" });
    }
    const referenced = [
      ...draft.claimAudit,
      ...draft.cases,
      ...draft.accessSteps,
      ...draft.sections.flatMap((section) => section.paragraphs),
    ];
    for (const item of referenced) {
      if (item.sourceIds.some((id) => !sources.has(id))) {
        ctx.addIssue({
          code: "custom",
          message: "Unknown draft source reference",
        });
      }
      if ("claimIds" in item && item.claimIds.some((id) => !claims.has(id))) {
        ctx.addIssue({
          code: "custom",
          message: "Unknown draft claim reference",
        });
      }
    }
    const markedRanges = new Map<string, [number, number][]>();
    for (const item of draft.unverified) {
      const target = unverifiedTargetText(draft, item);
      if (target === undefined || target.split(item.phrase).length !== 2) {
        ctx.addIssue({
          code: "custom",
          message: `Unverified phrase must appear exactly once at its location: ${item.id}`,
        });
        continue;
      }
      const key = JSON.stringify(item.location);
      const start = target.indexOf(item.phrase);
      const end = start + item.phrase.length;
      const ranges = markedRanges.get(key) ?? [];
      if (ranges.some(([from, to]) => start < to && from < end)) {
        ctx.addIssue({
          code: "custom",
          message: `Unverified phrases must not overlap at one location: ${item.id}`,
        });
      }
      markedRanges.set(key, [...ranges, [start, end]]);
    }
    if (
      draft.evidenceCutoff > draft.draftUpdatedAt ||
      draft.sourceTrail.some(
        (source) =>
          source.retrievedAt > draft.draftUpdatedAt ||
          (source.publishedAt && source.publishedAt > draft.evidenceCutoff)
      )
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Draft dates exceed the recorded review or evidence cutoff",
      });
    }
  });

export type NotebookDraft = z.infer<typeof NotebookDraftSchema>;

type DraftText = {
  sections: { id: string; paragraphs: { text: string }[] }[];
  cases: {
    id: string;
    label: string;
    activity: string;
    attribution: string;
    outcome: string;
  }[];
};

/** The exact draft text an unverified entry points to, if it exists. */
export function unverifiedTargetText(
  draft: DraftText,
  item: Pick<NotebookDraftUnverified, "location">
): string | undefined {
  const { location } = item;
  if (location.kind === "paragraph") {
    return draft.sections.find((section) => section.id === location.sectionId)
      ?.paragraphs[location.paragraph]?.text;
  }
  return draft.cases.find((entry) => entry.id === location.caseId)?.[
    location.field
  ];
}
