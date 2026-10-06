import { verticals } from "@/content/site";
import { evidenceStatusLabels } from "@/content/dossiers";
import {
  initialArchiveContext,
  type ArchiveContext,
} from "@/machines/archive-machine";

export type ArchiveUrlCatalog = {
  latestInquirySlug: string;
  inquirySlugs: string[];
  focusIds: string[];
  publishers: string[];
  years: string[];
  kinds: string[];
  places: string[];
};

export function parseArchiveUrl(
  url: URL,
  catalog: ArchiveUrlCatalog
): {
  context: ArchiveContext;
  notice: string;
} {
  const context = {
    ...initialArchiveContext,
    inquirySlug: catalog.latestInquirySlug,
    defaultInquirySlug: catalog.latestInquirySlug,
  };
  const allowed: Record<string, readonly string[]> = {
    view: ["cards", "timeline", "relationships"],
    vertical: ["all", ...verticals.map((item) => item.id)],
    kind: ["all", ...catalog.kinds],
    evidence: ["all", ...Object.keys(evidenceStatusLabels)],
    publisher: ["all", ...catalog.publishers],
    place: ["all", ...catalog.places],
    year: ["all", ...catalog.years],
    resultType: ["all", "inquiry", "source", "dispatch"],
    inquirySlug: catalog.inquirySlugs,
    focusId: catalog.focusIds,
  };
  const invalid: string[] = [];
  for (const [key, values] of Object.entries(allowed)) {
    const parameter =
      key === "inquirySlug"
        ? "inquiry"
        : key === "focusId"
          ? "focus"
          : key === "resultType"
            ? "type"
            : key;
    const value = url.searchParams.get(parameter);
    if (value === null) continue;
    if (values.includes(value)) Object.assign(context, { [key]: value });
    else invalid.push(parameter);
  }
  context.relationshipMode = url.searchParams.has("inquiry")
    ? "inquiry"
    : url.searchParams.has("focus")
      ? "dispatch"
      : "inquiry";
  context.query = url.searchParams.get("q") ?? "";
  return {
    context,
    notice: invalid.length
      ? "Some selections are unavailable in the public archive. Public defaults are shown."
      : "",
  };
}

export function serializeArchiveUrl(
  current: URL,
  context: ArchiveContext,
  catalog: ArchiveUrlCatalog
): string {
  const url = new URL(current);
  const values = {
    view: context.view,
    type: context.resultType,
    vertical: context.vertical,
    kind: context.kind,
    evidence: context.evidence,
    publisher: context.publisher,
    place: context.place,
    year: context.year,
    q: context.query,
    focus:
      context.focusId ||
      (context.relationshipMode === "dispatch"
        ? (catalog.focusIds[0] ?? "")
        : ""),
    inquiry: context.relationshipMode === "dispatch" ? "" : context.inquirySlug,
  };
  for (const [key, value] of Object.entries(values)) {
    if (
      !value ||
      value === "all" ||
      (key === "view" && value === "cards") ||
      (key === "inquiry" &&
        context.view !== "relationships" &&
        !current.searchParams.has("inquiry"))
    )
      url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
