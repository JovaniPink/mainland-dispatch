import { z } from "zod";

const CorpusTransparencySchema = z
  .object({
    auditedAt: z.string().date(),
    collectedLeads: z.number().int().nonnegative(),
    generalChinaCandidates: z.number().int().nonnegative(),
    generalChinaWithheld: z.number().int().nonnegative(),
    generalChinaRejected: z.number().int().nonnegative(),
    evidenceReviewedMappings: z.number().int().nonnegative(),
    publishedRecords: z.number().int().nonnegative(),
    sourceReviewRecords: z.number().int().nonnegative(),
  })
  .superRefine((snapshot, ctx) => {
    if (
      snapshot.generalChinaWithheld + snapshot.generalChinaRejected !==
      snapshot.generalChinaCandidates
    ) {
      ctx.addIssue({
        code: "custom",
        message: "general-China dispositions must account for every candidate",
      });
    }
    if (
      snapshot.publishedRecords + snapshot.sourceReviewRecords !==
      snapshot.evidenceReviewedMappings
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "published and source-review records must account for reviewed mappings",
      });
    }
  });

/**
 * Public, aggregate-only snapshot of the private editorial reservoir.
 *
 * Public routes may explain the size and disposition of the research corpus,
 * but they must not import or render the underlying non-public SourceLead
 * records. Update this snapshot only alongside the catalog tests and docs.
 */
export const corpusTransparency = CorpusTransparencySchema.parse({
  auditedAt: "2026-09-15",
  collectedLeads: 526,
  generalChinaCandidates: 404,
  generalChinaWithheld: 375,
  generalChinaRejected: 29,
  evidenceReviewedMappings: 24,
  publishedRecords: 13,
  sourceReviewRecords: 11,
});
