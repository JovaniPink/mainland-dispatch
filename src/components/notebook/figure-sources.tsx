import type { NotebookEntry } from "@/content/notebook/schema";

export function FigureSources({
  ids,
  sources,
}: {
  ids: string[];
  sources: NotebookEntry["sourceTrail"];
}) {
  return (
    <nav
      aria-label="Figure sources"
      className="mt-4 flex flex-wrap gap-x-4 gap-y-3"
    >
      {ids.map((id) => {
        const source = sources.find((item) => item.id === id);
        if (!source) throw new Error(`Missing figure source: ${id}`);
        return (
          <a
            key={id}
            href={`#${id}`}
            className="text-sm text-signal underline underline-offset-4"
          >
            {source.publisher}
          </a>
        );
      })}
    </nav>
  );
}
