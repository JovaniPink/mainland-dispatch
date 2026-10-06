import "server-only";
import { z } from "zod";
import { isoDate, nonEmpty } from "./schema";

/*
 * Private source-lead record shape. Server-only: the source-lead inbox is a
 * review surface whose contents are not published.
 */

export const SourceLeadThemeSchema = z.enum([
  "governance-law",
  "security-geopolitics",
  "economy-finance",
  "trade-industry",
  "technology-digital",
  "science-health",
  "society-culture",
  "environment-resources",
  "infrastructure-mobility",
  "history-memory",
  "cross-cutting",
]);

export const SourceLeadRegionSchema = z.enum([
  "china-mainland",
  "hong-kong",
  "macau",
  "taiwan",
  "united-states",
  "canada",
  "europe",
  "asia-pacific",
  "africa",
  "latin-america",
  "middle-east",
  "global",
]);

export const SourceLeadTaxonomySchema = z
  .object({
    version: z.literal("source-taxonomy-v1"),
    status: z.literal("provisional"),
    method: z.literal("existing-metadata-rules"),
    primaryTheme: SourceLeadThemeSchema,
    themes: z.array(SourceLeadThemeSchema).min(1).max(4),
    regions: z.array(SourceLeadRegionSchema).min(1),
    publicationDecade: nonEmpty.regex(/^\d{4}s$/),
  })
  .superRefine((taxonomy, ctx) => {
    if (!taxonomy.themes.includes(taxonomy.primaryTheme)) {
      ctx.addIssue({
        code: "custom",
        path: ["primaryTheme"],
        message: "primary theme must be included in themes",
      });
    }
    if (new Set(taxonomy.themes).size !== taxonomy.themes.length) {
      ctx.addIssue({
        code: "custom",
        path: ["themes"],
        message: "taxonomy themes must be unique",
      });
    }
    if (new Set(taxonomy.regions).size !== taxonomy.regions.length) {
      ctx.addIssue({
        code: "custom",
        path: ["regions"],
        message: "taxonomy regions must be unique",
      });
    }
    if (
      taxonomy.themes.includes("cross-cutting") &&
      taxonomy.themes.length > 1
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["themes"],
        message: "cross-cutting must be the only theme when used",
      });
    }
  });

export const SourceLeadSchema = z.object({
  id: nonEmpty.regex(
    /^lead-[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a lead- prefixed id"
  ),
  title: nonEmpty,
  url: z.url(),
  publisher: nonEmpty,
  publishedAt: isoDate.optional(),
  publicationYear: z.number().int().min(1900).max(2100).optional(),
  accessedAt: isoDate,
  contentType: z.enum([
    "primary",
    "research",
    "reporting",
    "analysis",
    "podcast",
  ]),
  claimedGrade: z.enum(["A", "B", "C", "D"]).optional(),
  sourceOrigin: z.enum(["user-sourcebook", "web-research", "prior-intake"]),
  reviewState: z.enum([
    "supplied",
    "metadata-checked",
    "source-read",
    "evidence-reviewed",
  ]),
  disposition: z
    .enum(["pending", "drafted", "withheld", "rejected"])
    .default("pending"),
  accessStatus: z
    .enum(["reachable", "paywalled", "restricted", "unavailable", "unstable"])
    .default("reachable"),
  urlStatus: z
    .enum(["supplied", "redirect-resolved", "publisher-canonical"])
    .default("supplied"),
  canonicalCheckedAt: isoDate.optional(),
  byline: nonEmpty.optional(),
  language: nonEmpty.optional(),
  translationStatus: z
    .enum([
      "original-language",
      "original-english",
      "publisher-translation",
      "independent-translation",
    ])
    .optional(),
  reviewedAt: isoDate.optional(),
  decisionReason: nonEmpty.optional(),
  dispatchId: nonEmpty
    .regex(/^d-[a-z0-9]+(?:-[a-z0-9]+)*$/, "expected a d- prefixed id")
    .optional(),
  collectionId: nonEmpty.optional(),
  topics: z.array(nonEmpty).min(1),
  taxonomy: SourceLeadTaxonomySchema,
  evidenceStatus: z.enum([
    "confirmed",
    "vendor-claim",
    "disputed",
    "pending",
    "unverified",
  ]),
  paywall: z.boolean().default(false),
  archiveUrl: z.url().optional(),
  notes: nonEmpty,
  nextReviewAt: isoDate.optional(),
});

export type SourceLead = z.infer<typeof SourceLeadSchema>;
export type SourceLeadTheme = z.infer<typeof SourceLeadThemeSchema>;
export type SourceLeadRegion = z.infer<typeof SourceLeadRegionSchema>;
export type SourceLeadTaxonomy = z.infer<typeof SourceLeadTaxonomySchema>;
