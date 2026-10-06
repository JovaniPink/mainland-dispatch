import type { PublicDiscoveryResult } from "@/content/public-discovery";
import type { ArchiveContext } from "@/machines/archive-machine";

export function searchDiscovery(
  context: ArchiveContext,
  data: PublicDiscoveryResult[]
): PublicDiscoveryResult[] {
  const query = context.query.trim().toLocaleLowerCase("en-US");
  function rank(result: PublicDiscoveryResult) {
    const title = result.title.toLocaleLowerCase("en-US");
    return title === query
      ? 0
      : title.includes(query) ||
          result.publisher.toLocaleLowerCase("en-US").includes(query)
        ? 1
        : 2;
  }
  return data
    .filter((result) => {
      if (context.publisher !== "all" && result.publisher !== context.publisher)
        return false;
      if (
        context.year !== "all" &&
        result.publishedAt?.slice(0, 4) !== context.year
      )
        return false;
      if (
        query &&
        !`${result.title} ${result.publisher} ${result.searchText}`
          .toLocaleLowerCase("en-US")
          .includes(query)
      )
        return false;
      if (result.kind === "dispatch") {
        const d = result.record;
        if (
          context.vertical !== "all" &&
          !d.verticals.includes(context.vertical)
        )
          return false;
        if (context.kind !== "all" && d.kind !== context.kind) return false;
        if (
          context.evidence !== "all" &&
          !d.claims.some((claim) => claim.status === context.evidence)
        )
          return false;
        if (context.place !== "all" && !d.places.includes(context.place))
          return false;
      }
      return true;
    })
    .sort(
      (a, b) =>
        rank(a) - rank(b) ||
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") ||
        a.title.localeCompare(b.title) ||
        a.id.localeCompare(b.id)
    );
}
