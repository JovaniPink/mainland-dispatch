import { publishedDispatches } from "@/content/dispatches";
import { publicNotebookEntries } from "@/content/notebook";
import { SavedCollection } from "@/components/dispatch/saved-collection";

export default function SavedPage() {
  const catalog = [
    ...publicNotebookEntries.map((entry) => ({
      reference: `notebook:${entry.slug}`,
      title: entry.title,
      kind: "Inquiry",
      date: entry.publishedAt,
      readTime: entry.readTime,
      href: `/notebook/${entry.slug}`,
    })),
    ...publishedDispatches
      .filter((record) => record.provenance === "verified")
      .map((record) => ({
        reference: record.id,
        title: record.title,
        kind: "Dispatch",
        date: record.canonicalSource.publishedAt,
        readTime: "",
        href: `/dispatch/${record.slug}`,
      })),
  ];
  return <SavedCollection catalog={catalog} />;
}
