"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { subscribeToPromiseState } from "@/lib/notebook-promise";
import {
  buildNotebookShareUrl,
  shareActionUrl,
  type ShareChannel,
} from "@/lib/share-url";

const channels: Array<Exclude<ShareChannel, "copy">> = [
  "email",
  "linkedin",
  "bluesky",
];

export function NotebookShare({
  title,
  path,
  campaign,
  content = "notebook-header",
  promiseId,
}: {
  title: string;
  path: string;
  campaign: string;
  content?: string;
  promiseId?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const search = useSyncExternalStore(
    subscribeToPromiseState,
    () => window.location.search,
    () => ""
  );

  function selectedPromise(): string | undefined {
    return new URLSearchParams(search).get("promise") ?? undefined;
  }

  function trackedUrl(channel: ShareChannel) {
    return buildNotebookShareUrl({
      path,
      campaign,
      channel,
      content,
      promiseId: promiseId ?? selectedPromise(),
    });
  }

  async function copyLink() {
    await navigator.clipboard.writeText(trackedUrl("copy"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="relative" aria-label="Share inquiry">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="border border-rule px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal"
      >
        Share
      </button>
      {open && (
        <div
          id={panelId}
          className="mt-2 flex flex-wrap items-center gap-2 border border-rule bg-paper p-2 sm:absolute sm:right-0 sm:z-20 sm:min-w-max"
        >
          <button
            type="button"
            onClick={copyLink}
            className="border border-rule px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
          {channels.map((channel) => {
            const url = trackedUrl(channel);
            return (
              <a
                key={channel}
                href={shareActionUrl({ channel, url, title })}
                target={channel === "email" ? undefined : "_blank"}
                rel={channel === "email" ? undefined : "noreferrer"}
                className="border border-rule px-3 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal"
              >
                {channel}
              </a>
            );
          })}
        </div>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Tracked share link copied." : ""}
      </span>
    </div>
  );
}
