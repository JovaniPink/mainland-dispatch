"use client";

import type { SavedTarget } from "@/lib/saved-target";
import { useSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({
  id,
  target,
  title,
}: { title?: string } & (
  { id: string; target?: never } | { target: SavedTarget; id?: never }
)) {
  const reference = target ?? id;
  const { isSaved, toggle, error } = useSaved();
  const saved = isSaved(reference);
  return (
    <>
      <button
        type="button"
        aria-label={
          title
            ? `${saved ? "Remove from Saved" : "Save"}: ${title}`
            : undefined
        }
        onClick={() => toggle(reference)}
        className={cn(
          "font-mono text-xs uppercase tracking-widest border px-2 py-1",
          saved
            ? "border-signal text-signal"
            : "border-rule text-ink-muted hover:text-ink"
        )}
        aria-pressed={saved}
      >
        {saved ? "Saved ✓" : "Save"}
      </button>
      {error && (
        <span role="alert" className="block text-sm text-signal">
          {error}
        </span>
      )}
    </>
  );
}
