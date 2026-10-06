import type { Metadata } from "next";
import type { Dispatch } from "@/content/schema";
import type { NotebookEntry } from "@/content/notebook/schema";
import { site } from "@/content/site";

export const siteUrl = "https://mainlanddispatch.com";
export const socialImage = "/opengraph-image";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function canonicalUrl(path: string): string {
  const url = new URL(path, siteUrl);
  url.search = "";
  url.hash = "";
  return url.toString();
}

export function seoDescription(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const suffix = "...";
  const candidate = normalized.slice(0, maxLength - suffix.length);
  const boundary = candidate.lastIndexOf(" ");
  const cut = boundary > 110 ? boundary : candidate.length;
  return `${candidate.slice(0, cut)}${suffix}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const conciseDescription = seoDescription(description);
  const canonical = canonicalUrl(path);

  return {
    title,
    description: conciseDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.name,
      title,
      description: conciseDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: conciseDescription,
      images: [socialImage],
    },
  };
}

type ArticleMetadataInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
};

function articleMetadata({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  tags,
}: ArticleMetadataInput): Metadata {
  const base = pageMetadata({ title, description, path });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: `${publishedAt}T00:00:00.000Z`,
      modifiedTime: `${updatedAt}T00:00:00.000Z`,
      authors: [site.name],
      tags,
    },
  };
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls)];
}

type ArticleJsonLdInput = ArticleMetadataInput & {
  type: "Article" | "NewsArticle";
  citations: string[];
  about: string[];
  isBasedOn?: string;
  articleSection?: string;
  keywords?: string;
};

function articleJsonLd({
  type,
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  citations,
  about,
  isBasedOn,
  articleSection,
  keywords,
}: ArticleJsonLdInput): Record<string, unknown> {
  const canonical = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${canonical}#article`,
    headline: title,
    description: seoDescription(description),
    mainEntityOfPage: { "@id": canonical },
    url: canonical,
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: [absoluteUrl(socialImage)],
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    ...(isBasedOn ? { isBasedOn } : {}),
    citation: uniqueUrls(citations),
    about,
    ...(articleSection ? { articleSection } : {}),
    ...(keywords ? { keywords } : {}),
    inLanguage: "en-US",
  };
}

export function notebookArticleMetadata(entry: NotebookEntry): Metadata {
  return articleMetadata({
    title: entry.title,
    description: entry.description,
    path: `/notebook/${entry.slug}`,
    publishedAt: entry.publishedAt,
    updatedAt: entry.presentationUpdatedAt ?? entry.updatedAt,
    tags: entry.tags,
  });
}

export function notebookArticleJsonLd(
  entry: NotebookEntry
): Record<string, unknown> {
  return {
    ...articleJsonLd({
      type: "Article",
      title: entry.title,
      description: entry.description,
      path: `/notebook/${entry.slug}`,
      publishedAt: entry.publishedAt,
      updatedAt: entry.presentationUpdatedAt ?? entry.updatedAt,
      tags: entry.tags,
      citations: [
        ...entry.formats.map((format) => format.url),
        ...entry.sourceTrail.flatMap((source) =>
          source.links.map((link) => link.url)
        ),
      ],
      about: entry.tags,
    }),
    editor: {
      "@type": "Person",
      name: "Jovani Pink",
      url: absoluteUrl("/about"),
    },
  };
}

export function dispatchArticleMetadata(dispatch: Dispatch): Metadata {
  return articleMetadata({
    title: dispatch.title,
    description: dispatch.summary,
    path: `/dispatch/${dispatch.slug}`,
    publishedAt: dispatch.curatedAt,
    updatedAt: dispatch.updatedAt,
    tags: dispatch.tags,
  });
}

export function dispatchArticleJsonLd(
  dispatch: Dispatch
): Record<string, unknown> {
  return articleJsonLd({
    type: "NewsArticle",
    title: dispatch.title,
    description: dispatch.summary,
    path: `/dispatch/${dispatch.slug}`,
    publishedAt: dispatch.curatedAt,
    updatedAt: dispatch.updatedAt,
    tags: dispatch.tags,
    citations: [
      dispatch.canonicalSource.url,
      ...dispatch.supportingSources.map((source) => source.url),
    ],
    about: [...dispatch.people, ...dispatch.organizations, ...dispatch.places],
    isBasedOn: dispatch.canonicalSource.url,
    articleSection: dispatch.verticals.join(", "),
    keywords: dispatch.tags.join(", "),
  });
}
