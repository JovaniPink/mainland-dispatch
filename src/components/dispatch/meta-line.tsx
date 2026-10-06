import type { PublicDispatch } from "@/content/schema";
import { kindLabels } from "@/content/site";

export function metaParts(d: PublicDispatch): string[] {
  const parts = [
    kindLabels[d.kind],
    d.canonicalSource.publisher,
    d.language,
    d.provenance === "prototype" ? "demo" : null,
  ].filter((part): part is string => part !== null);
  if (d.kind === "video" || d.kind === "audio") parts.push(d.duration);
  if (d.kind === "document") parts.push(`${d.pageCount} PP`);
  if (d.kind === "gallery") parts.push(`${d.imageCount} IMAGES`);
  return parts;
}

export function MetaLine({ dispatch }: { dispatch: PublicDispatch }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-jade">
      {metaParts(dispatch).join(" · ")}
    </p>
  );
}
