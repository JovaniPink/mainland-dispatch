"use client";

import Link from "next/link";
import { correctionUrl } from "@/lib/corrections";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { NotebookShare } from "@/components/notebook/notebook-share";
import { SaveButton } from "@/components/dispatch/save-button";
import { formatDate } from "@/content/site";
import { cn } from "@/lib/utils";

export type NotebookSectionLink = readonly [id: string, label: string];

type NotebookReaderShellProps = {
  ordinal: number;
  title: string;
  subtitle: string;
  thesis: string;
  publishedAt: string;
  updatedAt: string;
  presentationUpdatedAt?: string;
  readTime: string;
  tags: string[];
  editorialLabel: string;
  path: string;
  campaign: string;
  sections: readonly NotebookSectionLink[];
  readingRule: string;
  readingRuleLabel?: string;
  contentClassName?: string;
  children: ReactNode;
};

function SectionList({
  sections,
  activeId,
  onNavigate,
  label,
}: {
  sections: readonly NotebookSectionLink[];
  activeId: string;
  onNavigate?: () => void;
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ol className="grid gap-2 border-l border-rule pl-3">
        {sections.map(([id, sectionLabel], index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              onClick={onNavigate}
              className={cn(
                "font-serif text-sm leading-snug text-ink-muted hover:text-signal",
                activeId === id && "text-signal"
              )}
            >
              <span className="mr-2 font-mono text-xs text-jade">
                {String(index + 1).padStart(2, "0")}
              </span>
              {sectionLabel}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function NotebookReaderShell({
  ordinal,
  title,
  subtitle,
  thesis,
  publishedAt,
  updatedAt,
  presentationUpdatedAt,
  readTime,
  tags,
  editorialLabel,
  path,
  campaign,
  sections,
  readingRule,
  readingRuleLabel = "Reading rule",
  contentClassName,
  children,
}: NotebookReaderShellProps) {
  const [activeId, setActiveId] = useState(sections[0]?.[0] ?? "");
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((item) => item.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 1] }
    );

    const nodes = sections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const updateProgress = () => {
      const node = contentRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      const next = Math.min(100, Math.max(0, (-rect.top / distance) * 100));
      setProgress(next);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSectionsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const activeLabel =
    sections.find(([id]) => id === activeId)?.[1] ?? sections[0]?.[1] ?? "";

  return (
    <>
      <header className="rise-in border-b border-rule px-4 py-7 sm:px-6 sm:py-12">
        <div className="max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            Notebook - Inquiry {String(ordinal).padStart(2, "0")}
          </p>
          <h1 className="mt-3 max-w-5xl font-serif text-4xl leading-[1.05] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-lg leading-relaxed text-ink-muted sm:text-xl">
            {subtitle}
          </p>
          <div
            data-testid="notebook-metadata"
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-ink-muted"
          >
            <span>{formatDate(publishedAt)}</span>
            <span aria-hidden>-</span>
            <span>{readTime}</span>
            <span aria-hidden>-</span>
            <span>{editorialLabel}</span>
            <Link
              href="/about"
              className="text-signal underline underline-offset-4"
            >
              Edited by Jovani Pink
            </Link>
            {updatedAt !== publishedAt && (
              <>
                <span aria-hidden>-</span>
                <span>Current through {formatDate(updatedAt)}</span>
              </>
            )}
          </div>
          {presentationUpdatedAt && (
            <p className="mt-3 text-sm text-ink-muted">
              Presentation updated {formatDate(presentationUpdatedAt)}. Evidence
              review date unchanged.
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <ul className="flex flex-wrap gap-2" aria-label="Topics">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-rule px-2 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <SaveButton
              target={{ kind: "notebook", id: path.split("/").pop()! }}
              title={title}
            />
            <NotebookShare title={title} path={path} campaign={campaign} />
          </div>
          <section
            data-testid="working-thesis"
            aria-labelledby="working-thesis-label"
            className="mt-6 max-w-[70ch] border-t border-rule pt-5"
          >
            <h2
              id="working-thesis-label"
              className="font-mono text-xs uppercase tracking-widest text-jade"
            >
              Working thesis
            </h2>
            <p className="mt-3 font-serif text-lg leading-[1.65]">{thesis}</p>
          </section>
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm lg:hidden">
        <div
          aria-hidden="true"
          className="h-0.5 bg-signal-fill"
          style={{ width: `${progress}%` }}
        />
        <div className="flex min-h-11 items-center justify-between gap-3 px-4 py-2">
          <p className="min-w-0 truncate font-mono text-xs uppercase tracking-widest text-ink-muted">
            {activeLabel}
          </p>
          <button
            type="button"
            aria-expanded={sectionsOpen}
            aria-controls="mobile-notebook-sections"
            onClick={() => setSectionsOpen((value) => !value)}
            className="shrink-0 border border-rule px-3 py-1.5 font-mono text-xs uppercase tracking-widest hover:border-signal"
          >
            Sections
          </button>
        </div>
        {sectionsOpen && (
          <div
            id="mobile-notebook-sections"
            className="max-h-[60dvh] overflow-y-auto border-t border-rule bg-paper px-4 py-4"
          >
            <SectionList
              sections={sections}
              activeId={activeId}
              onNavigate={() => setSectionsOpen(false)}
              label="Notebook sections mobile"
            />
          </div>
        )}
      </div>

      <div className="grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:justify-between lg:gap-12">
        <aside className="hidden self-start lg:sticky lg:top-5 lg:block">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            In this inquiry
          </p>
          <div className="mt-3">
            <SectionList
              sections={sections}
              activeId={activeId}
              label="Notebook sections"
            />
          </div>
          <div className="mt-6 border-l-2 border-signal bg-signal-soft/30 p-3">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              {readingRuleLabel}
            </p>
            <p className="mt-2 font-serif text-sm italic leading-relaxed">
              {readingRule}
            </p>
          </div>
        </aside>

        <div
          ref={contentRef}
          className={cn("min-w-0 w-full justify-self-end", contentClassName)}
        >
          {children}
          <footer className="mt-10 border-t border-rule pt-5 text-sm leading-6 text-ink-muted">
            <a
              target="_blank"
              rel="noreferrer"
              href={correctionUrl(path, title)}
              className="text-signal underline underline-offset-4"
            >
              Suggest a correction
            </a>
            <p>
              Submissions are public and require GitHub. You review and submit
              the issue yourself.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export function NotebookSecondarySection({
  id,
  legacyIds = [],
  eyebrow,
  title,
  summary,
  actionLabel,
  children,
}: {
  id: string;
  legacyIds?: string[];
  eyebrow: string;
  title: string;
  summary: string;
  actionLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const userChanged = useRef(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const media = window.matchMedia?.("(min-width: 64rem)");
    if (!media) return;
    const sync = () => {
      if (!userChanged.current) setOpen(media.matches);
    };
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const targets = new Set([id, ...legacyIds]);
    const openForHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const descendant = document.getElementById(hash);
      if (
        targets.has(hash) ||
        (descendant && detailsRef.current?.contains(descendant))
      ) {
        setOpen(true);
      }
    };
    const openForFocus = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        detailsRef.current?.contains(event.target)
      ) {
        setOpen(true);
      }
    };
    openForHash();
    window.addEventListener("hashchange", openForHash);
    document.addEventListener("focusin", openForFocus);
    return () => {
      window.removeEventListener("hashchange", openForHash);
      document.removeEventListener("focusin", openForFocus);
    };
  }, [id, legacyIds]);

  return (
    <section id={id} className="mt-12 scroll-mt-32">
      {legacyIds.map((legacyId) => (
        <span
          key={legacyId}
          id={legacyId}
          className="block scroll-mt-32"
          aria-hidden="true"
        />
      ))}
      <p className="font-mono text-xs uppercase tracking-widest text-jade">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl leading-tight">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-ink-muted">{summary}</p>
      <details
        ref={detailsRef}
        data-testid={`secondary-section-${id}`}
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
        className="notebook-secondary-details mt-5 border-y border-rule"
      >
        <summary
          onClick={() => {
            userChanged.current = true;
          }}
          className="cursor-pointer py-3 font-mono text-xs uppercase tracking-widest text-signal"
        >
          {open ? "Hide detail" : actionLabel}
        </summary>
        <div className="pb-2">{children}</div>
      </details>
    </section>
  );
}
