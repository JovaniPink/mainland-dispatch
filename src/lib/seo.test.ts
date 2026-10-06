import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import manifest from "@/app/manifest";
import {
  mainlandIconSizes,
  mainlandManifestIcons,
} from "@/app/metadata-contract";
import { publishedDispatches } from "@/content/dispatches";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";
import { openModelsClosedSystem } from "@/content/notebook/open-models-closed-system";
import { dominanceIsADashboard } from "@/content/notebook/dominance-is-a-dashboard";
import {
  newestNotebookRevision,
  publicNotebookEntries,
} from "@/content/notebook";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as atlasMetadata } from "@/app/atlas/page";
import { metadata as savedMetadata } from "@/app/saved/layout";
import { generateMetadata as generateDispatchMetadata } from "@/app/dispatch/[slug]/page";
import {
  absoluteUrl,
  dispatchArticleJsonLd,
  notebookArticleJsonLd,
  notebookArticleMetadata,
  organizationId,
  pageMetadata,
  seoDescription,
  siteUrl,
  socialImage,
  websiteId,
} from "./seo";

describe("SEO publication contract", () => {
  it("creates concise descriptions without splitting early", () => {
    const long = `${"Evidence-led reporting with source context. ".repeat(8)}End.`;
    const result = seoDescription(long);

    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith("...")).toBe(true);
    expect(seoDescription("  A   concise description. ")).toBe(
      "A concise description."
    );
    expect(seoDescription("x".repeat(200))).toHaveLength(160);
  });

  it("builds absolute canonicals and social metadata", () => {
    const metadata = pageMetadata({
      title: "Source Archive",
      description: "A reviewed source archive.",
      path: "/archive",
    });

    expect(absoluteUrl("/archive")).toBe(`${siteUrl}/archive`);
    expect(metadata.alternates).toEqual({ canonical: `${siteUrl}/archive` });
    expect(metadata.openGraph).toMatchObject({
      url: `${siteUrl}/archive`,
      title: "Source Archive",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });

    const queryMetadata = pageMetadata({
      title: "Clean canonical",
      description: "Canonical query state is removed.",
      path: "/archive?inquiry=one#sources",
    });
    expect(queryMetadata.alternates).toEqual({
      canonical: `${siteUrl}/archive`,
    });
  });

  it("builds consistent metadata and JSON-LD for every public Notebook", () => {
    for (const entry of publicNotebookEntries) {
      const metadata = notebookArticleMetadata(entry);
      const jsonLd = notebookArticleJsonLd(entry);
      const canonical = `${siteUrl}/notebook/${entry.slug}`;

      expect(metadata.alternates).toEqual({ canonical });
      expect(metadata.openGraph).toMatchObject({
        type: "article",
        url: canonical,
        publishedTime: `${entry.publishedAt}T00:00:00.000Z`,
        modifiedTime: `${entry.presentationUpdatedAt ?? entry.updatedAt}T00:00:00.000Z`,
      });
      expect(jsonLd).toMatchObject({
        "@type": "Article",
        "@id": `${canonical}#article`,
        url: canonical,
        datePublished: entry.publishedAt,
        dateModified: entry.presentationUpdatedAt ?? entry.updatedAt,
        image: [absoluteUrl(socialImage)],
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
      });
      expect(new Set(jsonLd.citation as string[]).size).toBe(
        (jsonLd.citation as string[]).length
      );
      expect(JSON.stringify({ metadata, jsonLd })).not.toContain("utm_");
    }
  });

  it("deduplicates Notebook citations by exact clean URL", () => {
    const entry = JSON.parse(
      JSON.stringify(whatXiJinpingWants)
    ) as typeof whatXiJinpingWants;
    entry.formats[0].url = entry.sourceTrail[0].links[0].url;

    const citations = notebookArticleJsonLd(entry).citation as string[];

    expect(
      citations.filter((url) => url === entry.formats[0].url)
    ).toHaveLength(1);
  });

  it("indexes public editorial routes and excludes private utility routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(siteUrl);
    expect(urls).toContain(`${siteUrl}/notebook/${whatXiJinpingWants.slug}`);
    expect(urls).toContain(
      `${siteUrl}/notebook/${openModelsClosedSystem.slug}`
    );
    expect(
      publicNotebookEntries.every((entry) =>
        urls.includes(`${siteUrl}/notebook/${entry.slug}`)
      )
    ).toBe(true);
    expect(urls.filter((url) => url.includes("/notebook/"))).toEqual(
      publicNotebookEntries.map((entry) => `${siteUrl}/notebook/${entry.slug}`)
    );
    expect(urls).toContain(`${siteUrl}/notebook/${dominanceIsADashboard.slug}`);
    expect(urls).toContain(`${siteUrl}/archive`);
    expect(urls).not.toContain(`${siteUrl}/atlas`);
    expect(urls.some((url) => url.includes("/atlas?"))).toBe(false);
    expect(urls).not.toContain(`${siteUrl}/saved`);
    expect(urls.some((url) => url.includes("/desk"))).toBe(false);
    expect(
      publishedDispatches.every((dispatch) =>
        urls.includes(`${siteUrl}/dispatch/${dispatch.slug}`)
      )
    ).toBe(true);
    expect(entries.every((entry) => Boolean(entry.lastModified))).toBe(true);
    expect(newestNotebookRevision).toBe("2026-09-01");
    expect(entries.find((entry) => entry.url === siteUrl)?.lastModified).toBe(
      newestNotebookRevision
    );
    expect(
      entries.find((entry) => entry.url === `${siteUrl}/notebooks`)
        ?.lastModified
    ).toBe(newestNotebookRevision);
  });

  it("publishes consistent crawler and application metadata", () => {
    expect(mainlandIconSizes).toEqual({
      favicon: 64,
      small: 48,
      large: 192,
      app: 512,
      apple: 180,
    });
    expect(robots()).toMatchObject({
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    });
    expect(JSON.stringify(robots())).toContain("/desk");
    expect(manifest()).toMatchObject({
      id: "/",
      start_url: "/",
      scope: "/",
      lang: "en-US",
      icons: mainlandManifestIcons,
    });
    expect(homeMetadata.title).toEqual({ absolute: "Mainland Dispatch" });
    expect(savedMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      noarchive: true,
    });
    expect(atlasMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      noarchive: true,
    });
  });

  it("dates and attributes Dispatch metadata to the editorial page", async () => {
    const dispatch = publishedDispatches[0];
    const metadata = await generateDispatchMetadata({
      params: Promise.resolve({ slug: dispatch.slug }),
    });
    const jsonLd = dispatchArticleJsonLd(dispatch);

    expect(metadata.alternates).toEqual({
      canonical: `${siteUrl}/dispatch/${dispatch.slug}`,
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: `${dispatch.curatedAt}T00:00:00.000Z`,
      authors: ["Mainland Dispatch"],
    });
    expect(jsonLd).toMatchObject({
      "@type": "NewsArticle",
      image: [absoluteUrl(socialImage)],
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      isPartOf: { "@id": websiteId },
      isBasedOn: dispatch.canonicalSource.url,
    });
    expect(new Set(jsonLd.citation as string[]).size).toBe(
      (jsonLd.citation as string[]).length
    );
  });
});
