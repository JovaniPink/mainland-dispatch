export const site = {
  name: "Mainland Dispatch",
  url: "https://mainlanddispatch.com",
  tagline:
    "A public research notebook built on a transparent, interactive evidence archive for understanding contemporary China.",
  volume: "VOL. 001",
  nav: [
    { label: "Latest", href: "/" },
    { label: "Notebooks", href: "/notebooks" },
    { label: "Evidence", href: "/archive" },
    { label: "Saved", href: "/saved" },
  ],
  principle:
    "Concern begins the inquiry; sources, counterarguments, and uncertainty keep it honest.",
} as const;

export const verticals = [
  { id: "bilateral", label: "Bilateral" },
  { id: "culture", label: "Culture" },
  { id: "mainland", label: "Mainland" },
  { id: "technology", label: "Technology" },
  { id: "economy", label: "Economy" },
] as const;

export type VerticalId = (typeof verticals)[number]["id"];

export const kindLabels: Record<string, string> = {
  article: "Article",
  video: "Video",
  audio: "Audio",
  document: "Document",
  social: "Social",
  gallery: "Gallery",
  data: "Data",
  original: "Original",
};

const monthLabels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (
    !/^\d{4}(-\d{2}){0,2}$/.test(iso) ||
    (month && !monthLabels[Number(month) - 1])
  )
    throw new Error(`Expected a source date, received: ${iso}`);
  return [day, month ? monthLabels[Number(month) - 1] : undefined, year]
    .filter(Boolean)
    .join(" ");
}

/** Historical collections always retain the year and original date precision. */
export const formatDateShort = formatDate;
