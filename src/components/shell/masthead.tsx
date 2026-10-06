"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { TodayDate } from "./today-date";

export function Masthead() {
  const pathname = usePathname() ?? "/";
  function current(href: string): "page" | "location" | undefined {
    if (pathname === href) return "page";
    if (href === "/notebooks" && pathname.startsWith("/notebook/"))
      return "location";
    if (
      href === "/archive" &&
      ["/dispatch/", "/compare/", "/trace/", "/dossiers/"].some((prefix) =>
        pathname.startsWith(prefix)
      )
    )
      return "location";
    return undefined;
  }
  return (
    <header className="border-b border-rule">
      <div className="flex items-baseline justify-between gap-2 px-4 py-5 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="whitespace-nowrap font-serif text-[clamp(1rem,5.5vw,1.5rem)] font-semibold tracking-tight sm:text-3xl"
        >
          {site.name.toUpperCase()}
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs tracking-widest text-ink-muted sm:inline">
            <TodayDate />
            {site.volume}
          </span>
          <ThemeToggle />
        </div>
      </div>
      <p className="border-t border-rule px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted sm:px-6">
        Understand the argument. Follow the evidence.
      </p>
      <nav
        aria-label="Primary"
        className="chip-row overflow-x-auto border-t border-rule px-4 sm:px-6"
      >
        <ul className="flex flex-wrap gap-x-5 sm:gap-6">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={current(item.href)}
                className="inline-flex min-h-11 items-center border-b-2 border-transparent font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-signal aria-[current]:border-signal aria-[current]:text-signal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
