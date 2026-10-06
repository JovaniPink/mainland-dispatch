"use client";

import Link from "next/link";
import { useSaved } from "@/lib/saved";
import { decodeSavedTarget } from "@/lib/saved-target";
import { formatDate } from "@/content/site";

export type SavedReadingItem = {
  reference: string;
  title: string;
  kind: string;
  date: string;
  readTime: string;
  href: string;
};
export function SavedCollection({ catalog }: { catalog: SavedReadingItem[] }) {
  const { saved, toggle, error } = useSaved();
  const items = [...saved].reverse().flatMap((reference) => {
    const target = decodeSavedTarget(reference);
    if (!target) return [];
    const item = catalog.find((item) => item.reference === reference);
    return item ? [item] : [];
  });
  return (
    <div className="px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Saved reading
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
          Your collection
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-muted">
          Saved in this browser only. Inquiries and Dispatches appear with the
          most recently saved first.
        </p>
      </header>
      {error && (
        <p role="alert" className="mt-5 text-sm text-signal">
          {error}
        </p>
      )}
      {items.length === 0 ? (
        <div className="py-12">
          <p className="font-serif text-xl">
            Nothing available in your reading list yet.
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <Link
              href="/notebooks"
              className="inline-flex min-h-11 items-center text-signal"
            >
              Browse Notebooks
            </Link>
            <Link
              href="/archive"
              className="inline-flex min-h-11 items-center text-signal"
            >
              Explore Evidence
            </Link>
          </div>
        </div>
      ) : (
        <ol className="mt-8 max-w-4xl divide-y divide-rule border-y border-rule">
          {items.map((item) => (
            <li
              key={item.reference}
              className="flex flex-wrap items-center justify-between gap-4 py-5"
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs uppercase tracking-widest text-jade">
                  {item.kind} · {formatDate(item.date)}
                  {item.readTime && ` · ${item.readTime}`}
                </p>
                <h2 className="mt-2 font-serif text-2xl">
                  <Link href={item.href} className="hover:text-signal">
                    {item.title}
                  </Link>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => toggle(item.reference)}
                aria-label={`Remove: ${item.title}`}
                className="border border-rule px-3 text-sm text-ink-muted hover:text-signal"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
