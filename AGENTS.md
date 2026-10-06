# AGENTS.md

## Purpose

Mainland Dispatch is a Next.js editorial product prototype for contextual China
and US–China coverage. Preserve the Correspondent's Notebook visual identity,
the explicit evidence posture, and the distinction between prototype content and
verified reporting.

## Prerequisites

- Node 22.22.2+ or 24.15.0+
- Corepack with the integrity-pinned npm 12.0.2 release from `package.json`
- Bootstrap with `corepack npm ci`

## Canonical commands

| Command                         | Purpose                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                   | Start local development with State Lab inspectors                |
| `npm run lint`                  | Run ESLint                                                       |
| `npm run baseline:check`        | Validate metadata, favicon, generated types, and install hooks   |
| `npm run toolchain:check`       | Validate the TypeScript 7 CLI and TypeScript 6 API contract      |
| `npm run typecheck`             | Generate route types and check with the TypeScript 7 CLI         |
| `npm run typecheck:compat`      | Generate route types and check with the TypeScript 6 API line    |
| `npm test`                      | Run Jest and Testing Library tests                               |
| `npm run audit:production`      | Reject high-severity advisories in deployed dependencies         |
| `npm run audit:dependencies`    | Reject high-severity advisories in the complete dependency graph |
| `npm run build`                 | Build and validate the Next.js production artifact               |
| `npm run audit:public-boundary` | Reject source-lead data in client chunks and public documents    |
| `npm run test-all`              | Run formatting, lint, types, tests, and the production build     |
| `npm run format`                | Format source files with Prettier                                |

## Working rules

- Public pages may consume only `publishedDispatches`; never import all Desk
  records into a public stream, route generator, relation, or saved view.
- Source-lead data is private. `source-leads.ts`, its schema, taxonomy, and
  `dispatches.ts` are `server-only`; client components receive resolved,
  minimal props, and Dispatches cross into client props only through
  `toPublicDispatch`. `audit:public-boundary` enforces this on the build.
- Do not change `provenance` from `prototype` to `verified` without replacing
  every sample claim and URL with reviewed source material.
- Keep the Desk out of public navigation. It is a local sandbox, not an
  authenticated CMS.
- Add content through the Zod schemas and preserve the catalog-level uniqueness,
  date-order, chronology, and cross-reference checks.
- Keep public evidence URLs on HTTPS. Legacy HTTP records may remain in the
  private source-lead inbox, but cannot be promoted directly into a Dispatch,
  Compare, Trace, or Dossier.
- XState must own real transition behavior. Do not add states that the interface
  cannot enter or report successful media loading before load/error evidence.
- Preserve click-to-load privacy for third-party embeds.
- Use system font stacks or committed local fonts; production builds must not
  depend on fetching Google Fonts.
- Keep filenames kebab-case and reusable components as named exports.
- Keep TypeScript 7 as the explicit primary CLI and TypeScript 6 as the
  compiler-API compatibility line. Never replace the explicit compiler paths
  with a bare `tsc` or `npx tsc` command.

## Quality gate

Before finishing any change, run `corepack npm install-scripts ls`,
`corepack npm run audit:production`, `corepack npm run audit:dependencies`, and
`corepack npm run test-all`. The repository gate fails
closed unless the expected TypeScript majors and both compiler checks pass. For
changes that affect layout, themes, media, Compare, Trace, or the Desk, also
inspect the production build at desktop and mobile widths.

## Publication safety

- Inspect the staged diff and every commit being pushed. Do not publish credentials, private
  data, unapproved source artifacts, or private workstation and user identifiers.
- Use synthetic fixtures for public examples. Automated secret scanning is a backstop, not proof;
  rotate or revoke an exposed credential before attempting history cleanup.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
