import type { DispatchKind, PublicDispatch, Vertical } from "@/content/schema";

export function filterDispatches<T extends PublicDispatch>(
  all: T[],
  opts: {
    vertical: Vertical | "all";
    kind: DispatchKind | "all";
    query: string;
  }
): T[] {
  const q = opts.query.trim().toLowerCase();
  return all.filter((d) => {
    if (opts.vertical !== "all" && !d.verticals.includes(opts.vertical)) {
      return false;
    }
    if (opts.kind !== "all" && d.kind !== opts.kind) return false;
    if (q) {
      const haystack = [
        d.title,
        d.summary,
        d.commentary,
        d.canonicalSource.publisher,
        ...d.tags,
        ...d.people,
        ...d.organizations,
        ...d.places,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortByCuratedDesc<T extends PublicDispatch>(all: T[]): T[] {
  return [...all].sort((a, b) => b.curatedAt.localeCompare(a.curatedAt));
}
