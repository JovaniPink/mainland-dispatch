import { siteUrl } from "@/lib/seo";

export function correctionUrl(path?: string, title?: string): string {
  const query = new URLSearchParams({ template: "correction.yml" });
  if (path) query.set("article-url", `${siteUrl}${path}`);
  if (title) query.set("title", `Correction: ${title}`);
  return `https://github.com/JovaniPink/mainland-dispatch/issues/new?${query}`;
}
