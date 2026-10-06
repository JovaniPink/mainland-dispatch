import {
  parseArchiveUrl as parse,
  serializeArchiveUrl as serialize,
} from "./archive-url";
import { publicArchiveCatalog } from "@/content/public-discovery";
import type { ArchiveContext } from "@/machines/archive-machine";
const parseArchiveUrl = (url: URL) => parse(url, publicArchiveCatalog);
const serializeArchiveUrl = (url: URL, context: ArchiveContext) =>
  serialize(url, context, publicArchiveCatalog);
import { latestNotebookEntry } from "@/content/notebook";

it("round-trips all existing parameters and unrelated link context", () => {
  const url = new URL(
    "https://mainlanddispatch.com/archive?view=relationships&inquiry=the-arctic-is-not-a-shortcut&focus=d-034&q=China&vertical=technology&kind=article&evidence=contested&publisher=ChinaFile&place=China&year=2016&campaign=reading#sources"
  );
  const parsed = parseArchiveUrl(url);
  expect(parsed.notice).toBe("");
  const restored = parseArchiveUrl(
    new URL(serializeArchiveUrl(url, parsed.context), url)
  );
  expect(restored.context).toEqual(parsed.context);
  expect(serializeArchiveUrl(url, parsed.context)).toContain(
    "campaign=reading"
  );
  expect(serializeArchiveUrl(url, parsed.context)).toContain("#sources");
});

it("rejects unknown or private selections with visible fallback information", () => {
  const parsed = parseArchiveUrl(
    new URL(
      "https://mainlanddispatch.com/archive?inquiry=private&focus=private&year=1800&view=invalid"
    )
  );
  expect(parsed.context.inquirySlug).toBe(latestNotebookEntry.slug);
  expect(parsed.context.focusId).toBe("");
  expect(parsed.context.year).toBe("all");
  expect(parsed.notice).not.toBe("");
});

it("keeps legacy relationship modes and dormant Dispatch selection", () => {
  const both = parseArchiveUrl(
    new URL(
      "https://mainlanddispatch.com/archive?view=relationships&inquiry=the-arctic-is-not-a-shortcut&focus=d-034"
    )
  );
  expect(both.context.relationshipMode).toBe("inquiry");
  expect(both.context.focusId).toBe("d-034");
  const dispatch = parseArchiveUrl(
    new URL(
      "https://mainlanddispatch.com/archive?view=relationships&focus=d-034"
    )
  );
  expect(dispatch.context.relationshipMode).toBe("dispatch");
  const url = new URL(
    "https://mainlanddispatch.com/archive?view=relationships&inquiry=the-arctic-is-not-a-shortcut&focus=d-034"
  );
  const switched = new URL(
    serializeArchiveUrl(url, { ...both.context, relationshipMode: "dispatch" }),
    url
  );
  expect(switched.searchParams.has("inquiry")).toBe(false);
  expect(parseArchiveUrl(switched).context.relationshipMode).toBe("dispatch");
  expect(switched.searchParams.get("focus")).toBe("d-034");
});
