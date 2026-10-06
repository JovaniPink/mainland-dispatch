import type { MetadataRoute } from "next";
import { publishedDispatches } from "@/content/dispatches";
import { comparisons } from "@/content/comparisons";
import { traces } from "@/content/traces";
import { dossiers } from "@/content/dossiers";
import { siteUrl } from "@/lib/seo";
import {
  latestNotebookEntry,
  newestNotebookRevision,
  publicNotebookEntries,
} from "@/content/notebook";

const newest = (dates: string[]) => [...dates].sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const dispatchEntries: MetadataRoute.Sitemap = publishedDispatches.map(
    (item) => ({
      url: `${siteUrl}/dispatch/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((item) => ({
    url: `${siteUrl}/compare/${item.slug}`,
    lastModified: newest(
      item.relatedDispatchIds
        .map((id) => publishedDispatches.find((dispatch) => dispatch.id === id))
        .filter((dispatch) => dispatch !== undefined)
        .map((dispatch) => dispatch.updatedAt)
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const traceEntries: MetadataRoute.Sitemap = traces.map((item) => ({
    url: `${siteUrl}/trace/${item.slug}`,
    lastModified: newest(item.entries.map((entry) => entry.date)),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dossierEntries: MetadataRoute.Sitemap = dossiers.map((item) => ({
    url: `${siteUrl}/dossiers/${item.slug}`,
    lastModified: item.lastReviewed,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const archiveUpdated = newest(
    publishedDispatches.map((item) => item.updatedAt)
  );
  const notebookEntries: MetadataRoute.Sitemap = publicNotebookEntries.map(
    (entry) => ({
      url: `${siteUrl}/notebook/${entry.slug}`,
      lastModified: entry.presentationUpdatedAt ?? entry.updatedAt,
      changeFrequency: "monthly",
      priority: entry.slug === latestNotebookEntry.slug ? 0.95 : 0.85,
    })
  );

  return [
    {
      url: `${siteUrl}/about`,
      lastModified: "2026-09-07",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: siteUrl,
      lastModified: newestNotebookRevision,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/notebooks`,
      lastModified: newestNotebookRevision,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...notebookEntries,
    {
      url: `${siteUrl}/archive`,
      lastModified: archiveUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...dispatchEntries,
    ...comparisonEntries,
    ...traceEntries,
    ...dossierEntries,
  ];
}
