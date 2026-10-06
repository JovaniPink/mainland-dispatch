"use client";

import { useState } from "react";
import { useMachine } from "@xstate/react";
import { intakeMachine, type KnownSource } from "@/machines/intake-machine";
import { DispatchSchema } from "@/content/schema";
import { verticals } from "@/content/site";
import { StateLab } from "@/components/state-lab/state-lab";

const kinds = [
  "article",
  "video",
  "audio",
  "document",
  "social",
  "gallery",
  "data",
  "original",
] as const;

type KindExtra = { name: string; label: string; type: "text" | "number" };

const kindExtras: Record<string, KindExtra[]> = {
  article: [],
  original: [],
  video: [
    {
      name: "provider",
      label: "Provider (youtube/vimeo/bilibili)",
      type: "text",
    },
    { name: "embedId", label: "Embed ID", type: "text" },
    { name: "duration", label: "Duration (mm:ss)", type: "text" },
  ],
  audio: [
    { name: "showName", label: "Show name", type: "text" },
    { name: "duration", label: "Duration (mm:ss)", type: "text" },
  ],
  document: [
    { name: "issuingBody", label: "Issuing body", type: "text" },
    { name: "pageCount", label: "Page count", type: "number" },
    { name: "documentDate", label: "Document date (YYYY-MM-DD)", type: "text" },
  ],
  social: [
    {
      name: "platform",
      label: "Platform (weibo/x/wechat/xiaohongshu/douyin)",
      type: "text",
    },
    { name: "account", label: "Account", type: "text" },
    { name: "captureDate", label: "Capture date (YYYY-MM-DD)", type: "text" },
    { name: "archivalUrl", label: "Archival URL", type: "text" },
  ],
  gallery: [{ name: "imageCount", label: "Image count", type: "number" }],
  data: [
    { name: "methodology", label: "Methodology", type: "text" },
    { name: "measurementPeriod", label: "Measurement period", type: "text" },
  ],
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyForm() {
  return {
    kind: "article",
    title: "",
    summary: "",
    commentary: "",
    whyItMatters: "",
    source: "",
    sourceUrl: "",
    sourceDate: today(),
    language: "en",
    translationStatus: "original-english",
    vertical: "bilateral",
    tags: "",
    extras: {} as Record<string, string>,
  };
}

type ComposerForm = ReturnType<typeof createEmptyForm>;

export function Composer({ knownSources }: { knownSources: KnownSource[] }) {
  const [state, send] = useMachine(intakeMachine, { input: { knownSources } });
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [form, setForm] = useState<ComposerForm>(createEmptyForm);

  function dispatch(event: Parameters<typeof send>[0]) {
    send(event);
    setLastEvent(event.type);
    setHistory((h) => [...h, event.type]);
  }

  function buildDraft(f: ComposerForm): Record<string, unknown> {
    const extras: Record<string, unknown> = {};
    for (const field of kindExtras[f.kind] ?? []) {
      const raw = f.extras[field.name] ?? "";
      extras[field.name] = field.type === "number" ? Number(raw) : raw;
    }
    if (f.kind === "video") extras.captions = [];
    const sourceLeadId = `lead-${slugify(f.source || f.title) || "new"}`;
    return {
      kind: f.kind,
      id: `d-${slugify(f.title) || "new"}`,
      slug: slugify(f.title),
      title: f.title,
      summary: f.summary,
      commentary: f.commentary,
      whyItMatters: f.whyItMatters,
      sourceLeadId,
      canonicalSource: {
        id: "source-canonical",
        title: f.title || "Unresolved canonical title",
        publisher: f.source || "Unresolved publisher",
        url: f.sourceUrl,
        publishedAt: f.sourceDate,
        retrievedAt: today(),
        language: f.language,
        translationStatus: f.translationStatus,
        limitations: ["Canonical source requires editorial verification."],
      },
      supportingSources: [],
      claims: [
        {
          id: "claim-source-report",
          statement: f.summary || "Claim requires editorial review.",
          status: "reported",
          sourceIds: ["source-canonical"],
          limitations: ["Supporting evidence has not been added."],
        },
      ],
      excerpts: [],
      curatedAt: today(),
      updatedAt: today(),
      language: f.language,
      translationStatus: f.translationStatus,
      verticals: [f.vertical],
      tags: f.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      people: [],
      organizations: [],
      places: [],
      relatedDispatchIds: [],
      editorialStatus: "draft",
      provenance: "prototype",
      ...extras,
    };
  }

  function update(patch: Partial<ComposerForm>) {
    const next = { ...form, ...patch };
    setForm(next);
    dispatch({ type: "EDIT", draft: buildDraft(next) });
  }

  function submitUrl() {
    dispatch({ type: "SUBMIT_URL", url });
    const looksLikeUrl = /^https?:\/\//.test(url);
    if (looksLikeUrl) {
      const next = { ...createEmptyForm(), sourceUrl: url };
      setForm(next);
      dispatch({ type: "RESOLVED", draft: buildDraft(next) });
    } else {
      dispatch({ type: "RESOLVE_FAILED" });
    }
  }

  const draft = buildDraft(form);
  const zodResult = DispatchSchema.safeParse(draft);
  const issues = zodResult.success
    ? []
    : zodResult.error.issues.map(
        (i) => `${i.path.join(".") || "(root)"}: ${i.message}`
      );

  const inputCls =
    "w-full border border-rule bg-paper px-3 py-1.5 text-sm focus:border-jade focus:outline-none";
  const labelCls =
    "font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";

  const showForm =
    state.matches("editing") ||
    state.matches("invalid") ||
    state.matches("manualEntry") ||
    state.matches("possibleDuplicate");

  return (
    <section className="border border-rule p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        Composer · link intake
      </p>

      {state.matches("idle") && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a source URL to begin…"
            className={inputCls}
          />
          <button
            onClick={submitUrl}
            className="shrink-0 border border-ink bg-ink px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-paper hover:border-signal hover:bg-signal"
          >
            Start capture
          </button>
        </div>
      )}

      {state.matches("possibleDuplicate") && (
        <div className="mt-4 border border-signal bg-signal-soft/50 p-3">
          <p className="text-sm">
            A dispatch with this source URL already exists (
            <span className="font-mono">{state.context.duplicateOf}</span>).
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => dispatch({ type: "CONFIRM_NOT_DUPLICATE" })}
              className="border border-rule px-3 py-1 font-mono text-xs uppercase tracking-widest"
            >
              Not a duplicate
            </button>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="border border-rule px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {showForm && !state.matches("possibleDuplicate") && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className={labelCls}>Kind</span>
            <select
              value={form.kind}
              onChange={(e) => update({ kind: e.target.value, extras: {} })}
              className={inputCls}
            >
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Title</span>
            <input
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Summary</span>
            <textarea
              value={form.summary}
              onChange={(e) => update({ summary: e.target.value })}
              rows={2}
              className={inputCls}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Commentary</span>
            <textarea
              value={form.commentary}
              onChange={(e) => update({ commentary: e.target.value })}
              rows={2}
              className={inputCls}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Why it matters</span>
            <textarea
              value={form.whyItMatters}
              onChange={(e) => update({ whyItMatters: e.target.value })}
              rows={2}
              className={inputCls}
            />
          </label>
          <label>
            <span className={labelCls}>Source (outlet)</span>
            <input
              value={form.source}
              onChange={(e) => update({ source: e.target.value })}
              className={inputCls}
            />
          </label>
          <label>
            <span className={labelCls}>Source URL</span>
            <input
              value={form.sourceUrl}
              onChange={(e) => update({ sourceUrl: e.target.value })}
              className={inputCls}
            />
          </label>
          <label>
            <span className={labelCls}>Published (YYYY-MM-DD)</span>
            <input
              value={form.sourceDate}
              onChange={(e) => update({ sourceDate: e.target.value })}
              className={inputCls}
            />
          </label>
          <label>
            <span className={labelCls}>Language</span>
            <input
              value={form.language}
              onChange={(e) => update({ language: e.target.value })}
              className={inputCls}
            />
          </label>
          <label>
            <span className={labelCls}>Translation status</span>
            <select
              value={form.translationStatus}
              onChange={(e) => update({ translationStatus: e.target.value })}
              className={inputCls}
            >
              {[
                "original-english",
                "original-chinese",
                "machine-translated",
                "human-translated",
                "bilingual",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelCls}>Vertical</span>
            <select
              value={form.vertical}
              onChange={(e) => update({ vertical: e.target.value })}
              className={inputCls}
            >
              {verticals.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Tags (comma-separated)</span>
            <input
              value={form.tags}
              onChange={(e) => update({ tags: e.target.value })}
              className={inputCls}
            />
          </label>
          {(kindExtras[form.kind] ?? []).map((field) => (
            <label key={field.name}>
              <span className={labelCls}>{field.label}</span>
              <input
                type={field.type}
                value={form.extras[field.name] ?? ""}
                onChange={(e) =>
                  update({
                    extras: { ...form.extras, [field.name]: e.target.value },
                  })
                }
                className={inputCls}
              />
            </label>
          ))}
          <div className="sm:col-span-2">
            <button
              onClick={() => dispatch({ type: "SAVE" })}
              disabled={issues.length > 0}
              className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper disabled:cursor-not-allowed disabled:border-rule disabled:bg-paper-warm disabled:text-ink-muted"
            >
              {issues.length > 0
                ? `${issues.length} validation issue(s)`
                : "Save dispatch"}
            </button>
          </div>
        </div>
      )}

      {state.matches("saved") && state.context.savedJson && (
        <div className="mt-4">
          <p className="font-mono text-xs uppercase tracking-widest text-jade">
            Validated dispatch. Copy into src/content/dispatches.ts
          </p>
          <pre className="chip-row mt-2 max-h-80 overflow-auto border border-rule bg-paper-warm/60 p-3 font-mono text-xs leading-relaxed">
            {state.context.savedJson}
          </pre>
          <button
            onClick={() => {
              setForm(createEmptyForm());
              setUrl("");
              dispatch({ type: "RESET" });
            }}
            className="mt-3 border border-rule px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-ink"
          >
            New intake
          </button>
        </div>
      )}

      <StateLab
        title="Intake machine"
        state={state.value}
        lastEvent={lastEvent}
        nextEvents={[
          "SUBMIT_URL",
          "EDIT",
          "SAVE",
          "CONFIRM_NOT_DUPLICATE",
          "RESET",
        ]}
        history={history}
        zodResult={showForm ? { ok: issues.length === 0, issues } : null}
      />
    </section>
  );
}
