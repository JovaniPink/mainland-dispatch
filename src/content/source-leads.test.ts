import { sourceLeads, SourceLeadCatalogSchema } from "./source-leads";

describe("editorial article-candidate catalog", () => {
  it("holds a chronological article-source inbox", () => {
    expect(sourceLeads).toHaveLength(609);
    const datedYears = sourceLeads
      .map((lead) =>
        String(lead.publicationYear ?? lead.publishedAt?.slice(0, 4))
      )
      .sort();
    expect(datedYears[0]).toBe("2006");
    expect(datedYears.at(-1)).toBe("2026");
    expect(datedYears).not.toContain("undefined");
  });

  it("assigns versioned provisional taxonomy metadata to every source lead", () => {
    const taxonomies = sourceLeads.map((lead) => Reflect.get(lead, "taxonomy"));

    expect(taxonomies).toHaveLength(609);
    expect(
      taxonomies.every(
        (taxonomy) =>
          taxonomy?.version === "source-taxonomy-v1" &&
          taxonomy?.status === "provisional" &&
          taxonomy?.method === "existing-metadata-rules" &&
          taxonomy?.themes.length > 0 &&
          taxonomy?.themes.includes(taxonomy.primaryTheme) &&
          taxonomy?.regions.length > 0 &&
          /^\d{4}s$/.test(taxonomy.publicationDecade)
      )
    ).toBe(true);
    expect(
      taxonomies.every((taxonomy) => taxonomy.primaryTheme !== "cross-cutting")
    ).toBe(true);
  });

  it("classifies representative links without changing evidence authority", () => {
    const mineralAtlas = sourceLeads.find(
      (lead) => lead.id === "lead-2025-usgs-critical-minerals-atlas"
    );
    const economyReport = sourceLeads.find(
      (lead) => lead.id === "lead-2018-nyt-china-economy-slowdown"
    );
    const hongKongReport = sourceLeads.find(
      (lead) => lead.id === "lead-2019-hkfp-extradition-protest"
    );
    const modelRelease = sourceLeads.find(
      (lead) => lead.id === "lead-2024-meta-llama-3-1"
    );
    const dottedUnitedStatesLead = sourceLeads.find(
      (lead) => lead.id === "lead-2019-npr-businesses-cyber-espionage"
    );

    expect(Reflect.get(mineralAtlas!, "taxonomy")).toMatchObject({
      primaryTheme: "trade-industry",
      regions: expect.arrayContaining(["global"]),
    });
    expect(Reflect.get(economyReport!, "taxonomy")).toMatchObject({
      primaryTheme: "economy-finance",
      regions: expect.arrayContaining(["china-mainland"]),
    });
    expect(Reflect.get(hongKongReport!, "taxonomy")).toMatchObject({
      primaryTheme: "governance-law",
      regions: expect.arrayContaining(["hong-kong"]),
    });
    expect(Reflect.get(modelRelease!, "taxonomy")).toMatchObject({
      primaryTheme: "technology-digital",
    });
    expect(Reflect.get(dottedUnitedStatesLead!, "taxonomy")).toMatchObject({
      regions: expect.arrayContaining(["united-states"]),
    });
    expect(mineralAtlas).toMatchObject({
      disposition: "withheld",
      evidenceStatus: "unverified",
    });
  });

  it("retains insecure legacy URLs only inside the non-public review inbox", () => {
    const legacyHttpLeads = sourceLeads.filter((lead) =>
      lead.url.startsWith("http://")
    );

    expect(legacyHttpLeads.length).toBeGreaterThan(0);
    expect(
      legacyHttpLeads.every(
        (lead) =>
          (lead.disposition === "withheld" ||
            lead.disposition === "rejected") &&
          !lead.dispatchId
      )
    ).toBe(true);
  });

  it("accounts for the critical-minerals research batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-critical-minerals-2026-09-06"
    );

    expect(corpus).toHaveLength(29);
    expect(
      corpus.every(
        (lead) =>
          lead.reviewState === "metadata-checked" &&
          lead.disposition === "withheld" &&
          lead.evidenceStatus === "unverified" &&
          Boolean(lead.decisionReason) &&
          !lead.dispatchId
      )
    ).toBe(true);
    expect(corpus.every((lead) => lead.url.startsWith("https://"))).toBe(true);
  });

  it("accounts for the September 15 news intake without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-news-2026-09-15"
    );
    const ids = corpus.map((lead) => lead.id);
    const urls = corpus.map((lead) => lead.url);

    expect(corpus).toHaveLength(16);
    expect(new Set(ids).size).toBe(16);
    expect(new Set(urls).size).toBe(16);
    expect(
      corpus.every(
        (lead) =>
          lead.reviewState === "metadata-checked" &&
          lead.disposition === "withheld" &&
          lead.evidenceStatus === "unverified" &&
          lead.urlStatus === "publisher-canonical" &&
          lead.canonicalCheckedAt === "2026-09-15" &&
          lead.accessedAt === "2026-09-15" &&
          lead.url.startsWith("https://") &&
          Boolean(lead.decisionReason) &&
          Boolean(lead.nextReviewAt) &&
          !lead.dispatchId
      )
    ).toBe(true);
  });

  it("keeps the Anthropic China threat-report packet private and attributed", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "anthropic-china-threat-report-2026-09-15"
    );
    const ids = corpus.map((lead) => lead.id);
    const urls = corpus.map((lead) => lead.url);

    expect(corpus).toHaveLength(5);
    expect(new Set(ids).size).toBe(5);
    expect(new Set(urls).size).toBe(5);
    expect(
      corpus.every(
        (lead) =>
          lead.reviewState === "metadata-checked" &&
          lead.disposition === "withheld" &&
          lead.evidenceStatus === "unverified" &&
          lead.urlStatus === "publisher-canonical" &&
          lead.canonicalCheckedAt === "2026-09-15" &&
          lead.accessedAt === "2026-09-15" &&
          lead.nextReviewAt === "2026-09-22" &&
          lead.url.startsWith("https://") &&
          Boolean(lead.decisionReason) &&
          !lead.dispatchId
      )
    ).toBe(true);
    expect(
      corpus.find(
        (lead) => lead.id === "lead-2026-anthropic-september-threat-report"
      )?.notes
    ).toContain("Anthropic's claim");
    expect(
      corpus.find(
        (lead) =>
          lead.id === "lead-2026-hudson-china-insider-anthropic-threat-report"
      )?.notes
    ).toContain("complete audio audit");
  });

  it("accounts for the bounded 20-link HN discovery batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-quality-links-2026-08-14"
    );

    expect(corpus).toHaveLength(20);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(20);
    expect(corpus.every((lead) => !lead.dispatchId)).toBe(true);
    expect(corpus.every((lead) => !lead.url.includes("ycombinator.com"))).toBe(
      true
    );
  });

  it("accounts for the past-year HN discovery intake without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-hn-past-year-2026-09-15"
    );
    const ids = corpus.map((lead) => lead.id);
    const urls = corpus.map((lead) => lead.url);

    expect(corpus).toHaveLength(78);
    expect(new Set(ids).size).toBe(78);
    expect(new Set(urls).size).toBe(78);
    expect(
      corpus.every(
        (lead) =>
          lead.reviewState === "metadata-checked" &&
          lead.disposition === "withheld" &&
          lead.evidenceStatus === "unverified" &&
          lead.accessedAt === "2026-09-15" &&
          lead.url.startsWith("https://") &&
          Boolean(lead.decisionReason) &&
          !lead.dispatchId
      )
    ).toBe(true);
    expect(corpus.every((lead) => !lead.url.includes("ycombinator.com"))).toBe(
      true
    );
    expect(
      corpus.filter((lead) => lead.urlStatus === "redirect-resolved")
    ).toHaveLength(3);
    expect(
      corpus.filter((lead) => lead.accessStatus === "reachable")
    ).toHaveLength(47);
    expect(
      corpus.filter((lead) => lead.accessStatus === "paywalled")
    ).toHaveLength(12);
    expect(
      corpus.filter((lead) => lead.accessStatus === "restricted")
    ).toHaveLength(18);
    expect(
      corpus.filter((lead) => lead.accessStatus === "unstable")
    ).toHaveLength(1);
    expect(
      corpus.every((lead) =>
        lead.topics.some((topic) => topic.startsWith("story-cluster:"))
      )
    ).toBe(true);
    expect(corpus.every((lead) => !lead.url.includes("koi.ai"))).toBe(true);
  });

  it("accounts for the thirteenth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-13"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(2);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the twelfth 29-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-12"
    );

    expect(corpus).toHaveLength(29);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(26);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(3);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the eleventh 28-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-11"
    );

    expect(corpus).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(0);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the tenth 29-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-10"
    );

    expect(corpus).toHaveLength(29);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(26);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(3);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the ninth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-09"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(2);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the eighth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-08"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(26);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(4);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the seventh 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-07"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(27);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(3);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the sixth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-06"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(26);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(4);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the fifth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-05"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(24);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(6);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the fourth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-04"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(2);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for exactly 88 external article candidates", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07"
    );

    expect(corpus).toHaveLength(88);
    expect(
      corpus.every(
        (lead) =>
          lead.contentType !== undefined &&
          lead.disposition === "withheld" &&
          Boolean(lead.decisionReason) &&
          !lead.dispatchId
      )
    ).toBe(true);
  });

  it("links drafted candidates only after evidence review", () => {
    const drafted = sourceLeads.filter(
      (lead) => lead.disposition === "drafted"
    );

    expect(drafted).toHaveLength(24);
    expect(
      drafted.every(
        (lead) =>
          lead.reviewState === "evidence-reviewed" &&
          Boolean(lead.reviewedAt) &&
          Boolean(lead.dispatchId)
      )
    ).toBe(true);
    expect(new Set(drafted.map((lead) => lead.dispatchId)).size).toBe(24);
  });

  it("rejects duplicate URLs and invalid review outcomes", () => {
    expect(
      SourceLeadCatalogSchema.safeParse([sourceLeads[0], sourceLeads[0]])
        .success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-withheld",
          disposition: "withheld",
          decisionReason: undefined,
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-canonical-check",
          url: "https://www.loc.gov/",
          urlStatus: "publisher-canonical",
          canonicalCheckedAt: undefined,
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-draft-link",
          disposition: "drafted",
          dispatchId: "d-invalid",
          reviewState: "source-read",
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        sourceLeads.find((lead) => lead.dispatchId === "d-013")!,
        {
          ...sourceLeads.find((lead) => lead.dispatchId === "d-014")!,
          dispatchId: "d-013",
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          taxonomy: {
            ...sourceLeads[0].taxonomy,
            primaryTheme: "cross-cutting",
          },
        },
      ]).success
    ).toBe(false);
  });
});
