#!/usr/bin/env node

// Public/private boundary audit for the production artifact.
//
// The source-lead inbox is a private review surface. After `next build`, this
// scans every emitted client chunk and every prerendered public document (HTML,
// RSC payloads, and route-handler bodies) and fails if a source-lead ID or a
// source-lead-only field or value appears in any of them.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Field names that carry source-lead data. They are flagged when they appear
// as a key holding a literal value (JSON, RSC, or a minified object literal),
// which is how serialized lead records look. Desk rendering code that merely
// reads these properties (`lead.decisionReason`) is not data and is allowed.
export const LEAD_DATA_FIELDS = [
  "sourceLeadId",
  "sourceOrigin",
  "claimedGrade",
  "decisionReason",
  "canonicalCheckedAt",
  "nextReviewAt",
];

// Enum values that exist only in the SourceLead schema and its taxonomy. Any
// occurrence means the private record shape or classifier reached the output.
export const LEAD_ONLY_VALUES = [
  "user-sourcebook",
  "prior-intake",
  "source-taxonomy-v1",
  "existing-metadata-rules",
];

// Serialized lead review fields with lead-only values.
export const LEAD_RECORD_PATTERNS = [
  /\bdisposition\\?["']?\s*:\s*\\?["'](?:pending|drafted|withheld|rejected)\b/,
  /\breviewState\\?["']?\s*:\s*\\?["'](?:supplied|metadata-checked|source-read)\b/,
];

function dataKeyPattern(field) {
  // `field:"x"`, `"field":"x"`, `\"field\":\"x\"`, `field:1`, `field:[`, `field:!0`
  return new RegExp(`\\b${field}\\\\?["']?\\s*:\\s*(?:\\\\?["'\`]|\\d|\\[|!)`);
}

const GENERIC_LEAD_ID = /\blead-(?:19|20)\d{2}-[a-z0-9]/;
const PUBLIC_DOCUMENT = /\.(?:html|rsc|body)$/;

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** Every string literal shaped like a lead ID in the private content sources. */
export function collectLeadIds(contentDirectory) {
  const ids = new Set();
  for (const file of walk(contentDirectory)) {
    if (!/\.tsx?$/.test(file) || /\.test\.tsx?$/.test(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(
      /["'](lead-[a-z0-9]+(?:-[a-z0-9]+)*)["']/g
    )) {
      ids.add(match[1]);
    }
  }
  return ids;
}

export function findViolations(text, leadIds) {
  const found = new Set();
  const generic = text.match(GENERIC_LEAD_ID);
  if (generic) found.add(`lead id pattern "${generic[0]}…"`);
  for (const match of text.matchAll(/lead-[a-z0-9]+(?:-[a-z0-9]+)*/g)) {
    if (leadIds.has(match[0])) {
      found.add(`lead id "${match[0]}"`);
      break;
    }
  }
  for (const field of LEAD_DATA_FIELDS) {
    const match = text.match(dataKeyPattern(field));
    if (match) found.add(`lead field "${match[0]}"`);
  }
  for (const value of LEAD_ONLY_VALUES) {
    if (text.includes(value)) found.add(`lead-only value "${value}"`);
  }
  for (const pattern of LEAD_RECORD_PATTERNS) {
    const match = text.match(pattern);
    if (match) found.add(`lead record "${match[0]}"`);
  }
  return [...found];
}

export function publicArtifactFiles(
  nextDirectory,
  { deskEnabled = false } = {}
) {
  const chunks = walk(path.join(nextDirectory, "static")).filter((file) =>
    file.endsWith(".js")
  );
  const appDirectory = path.join(nextDirectory, "server", "app");
  const documents = walk(appDirectory).filter((file) => {
    if (!PUBLIC_DOCUMENT.test(file)) return false;
    // A desk-enabled build is a local review artifact, not a public one; its
    // client chunks are still scanned above.
    const route = path.relative(appDirectory, file).split(path.sep)[0];
    return !(deskEnabled && /^desk(?:\.|$)/.test(route));
  });
  return { chunks, documents };
}

export function auditBuild({ root, deskEnabled = false }) {
  const nextDirectory = path.join(root, ".next");
  const leadIds = collectLeadIds(path.join(root, "src", "content"));
  const { chunks, documents } = publicArtifactFiles(nextDirectory, {
    deskEnabled,
  });
  if (chunks.length === 0 || documents.length === 0) {
    throw new Error(
      `No production artifact under ${nextDirectory}; run the build first.`
    );
  }
  const violations = [];
  for (const file of [...chunks, ...documents]) {
    const problems = findViolations(fs.readFileSync(file, "utf8"), leadIds);
    if (problems.length > 0) {
      violations.push({ file: path.relative(root, file), problems });
    }
  }
  return {
    leadIds: leadIds.size,
    chunks: chunks.length,
    documents: documents.length,
    violations,
  };
}

function main() {
  const root = process.cwd();
  const deskEnabled = process.env.ENABLE_EDITORIAL_DESK === "1";
  const result = auditBuild({ root, deskEnabled });
  const scope = `${result.chunks} client chunks and ${result.documents} public documents against ${result.leadIds} lead IDs`;
  if (result.violations.length > 0) {
    console.error(`Public boundary audit failed: scanned ${scope}.`);
    for (const { file, problems } of result.violations) {
      console.error(`- ${file}: ${problems.join("; ")}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log(`Public boundary audit passed: scanned ${scope}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main();
}
