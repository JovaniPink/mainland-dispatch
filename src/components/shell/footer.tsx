import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-rule px-4 py-8 sm:px-6">
      <p className="max-w-xl font-serif text-sm italic text-ink-muted">
        {site.principle}
      </p>
      <Link
        href="/about"
        className="mt-5 inline-flex min-h-11 items-center text-sm text-signal underline underline-offset-4"
      >
        About · Editor and corrections
      </Link>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
        {site.name} - {site.volume}
      </p>
    </footer>
  );
}
