import { TraceSchema, type Trace } from "./schema";

const seed = {
  slug: "open-model-release-chronology",
  title: "The open-weight strategy before Kimi K3",
  intro:
    "A source-linked chronology of how American and Chinese model developers described weight access, licenses, ecosystems, and technical advantage before the current Kimi K3 debate.",
  assessmentAsOf: "2026-07-22",
  currentAssessment:
    "The record confirms that open-weight distribution is a strategy used by both US and Chinese developers. It does not support a simple open-versus-closed national divide, and Kimi's announced July 27 artifact release remains an announcement until the promised files and license can be inspected.",
  assessmentStatus: "contested",
  entries: [
    {
      id: "open-model-01",
      date: "2023-07-18",
      phase: "originalEvent",
      title: "Meta releases Llama 2 weights and starting code",
      detail:
        "Meta announces research and commercial availability under its custom community license, creating a major American open-weight precedent while retaining use conditions.",
      sourceLabel: "Meta AI",
      sourceUrl: "https://ai.meta.com/blog/llama-2/",
      critical: true,
      dispatchId: "d-032",
    },
    {
      id: "open-model-02",
      date: "2024-07-23",
      phase: "usReporting",
      title: "Llama 3.1 expands Meta's ecosystem case",
      detail:
        "Meta pairs a 405-billion-parameter release with cloud and inference partners, safety tools, derivative-model permissions, and a proposed common stack.",
      sourceLabel: "Meta AI",
      sourceUrl: "https://ai.meta.com/blog/meta-llama-3-1/",
      critical: true,
      dispatchId: "d-033",
    },
    {
      id: "open-model-03",
      date: "2024-11-27",
      phase: "mainlandReporting",
      title: "Liang Wenfeng describes DeepSeek's release logic",
      detail:
        "An annotated translation of a 36Kr interview records Liang linking open releases to talent, foundational research, ecosystem formation, and the short life of technical moats.",
      sourceLabel: "ChinaTalk / 36Kr",
      sourceUrl:
        "https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas",
      critical: true,
      dispatchId: "d-034",
    },
    {
      id: "open-model-04",
      date: "2026-07-20",
      phase: "officialResponse",
      title: "Moonshot AI announces Kimi K3",
      detail:
        "Moonshot publishes benchmark, pricing, architecture, and product claims and says model artifacts will be released July 27. The future release is recorded as a promise, not a completed event.",
      sourceLabel: "Moonshot AI",
      sourceUrl: "https://www.kimi.com/blog/kimi-k3",
      critical: true,
    },
    {
      id: "open-model-05",
      date: "2026-07-22",
      phase: "editorialAssessment",
      title: "Current evidence boundary",
      detail:
        "Release posts and interviews establish declared strategy. License text, downloadable artifacts, reproducible evaluations, deployment cost, adoption, and continued availability require separate observation.",
      critical: false,
    },
  ],
  provenance: "verified",
};

export const traces: Trace[] = [TraceSchema.parse(seed)];

export function getTrace(slug: string): Trace | undefined {
  return traces.find((t) => t.slug === slug);
}

export const phaseLabels: Record<string, string> = {
  originalEvent: "Original event",
  mainlandReporting: "Mainland reporting",
  usReporting: "US reporting",
  officialResponse: "Official response",
  followUpEvidence: "Follow-up evidence",
  editorialAssessment: "Editorial assessment",
};
