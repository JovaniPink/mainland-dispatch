import type { NotebookEvidenceStatus } from "@/content/notebook/schema";
import { cn } from "@/lib/utils";

const labels: Record<NotebookEvidenceStatus, string> = {
  observed: "Observed",
  "official-position": "Official position",
  interpretation: "Interpretation",
  contested: "Contested",
  scenario: "Scenario",
};

export function NotebookStatus({ status }: { status: NotebookEvidenceStatus }) {
  return (
    <span
      className={cn(
        "inline-flex border px-2 py-1 font-mono text-xs uppercase tracking-widest",
        status === "observed" && "border-jade bg-jade-soft/60 text-jade",
        status === "official-position" &&
          "border-ink-muted bg-paper-warm text-ink",
        status === "interpretation" &&
          "border-signal bg-signal-soft/55 text-signal",
        status === "contested" && "border-signal bg-paper text-signal",
        status === "scenario" &&
          "border-ink-muted border-dashed bg-paper text-ink-muted"
      )}
    >
      {labels[status]}
    </span>
  );
}
