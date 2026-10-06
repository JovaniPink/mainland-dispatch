import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditBuild, findViolations } from "./public-boundary-audit.mjs";

const leadIds = new Set([
  "lead-2026-synthetic-wire",
  "lead-synthetic-registry",
]);

test("flags lead IDs, serialized lead fields, and lead-only values", () => {
  assert.ok(findViolations('x="lead-2031-anything"', leadIds).length > 0);
  assert.ok(
    findViolations('{"id":"lead-synthetic-registry"}', leadIds).length > 0
  );
  assert.ok(
    findViolations('{id:"x",sourceOrigin:"web-research"}', leadIds).length > 0
  );
  assert.ok(findViolations('\\"sourceLeadId\\":\\"x\\"', leadIds).length > 0);
  assert.ok(findViolations('{disposition:"withheld"}', leadIds).length > 0);
  assert.ok(
    findViolations('"reviewState":"metadata-checked"', leadIds).length > 0
  );
  assert.ok(findViolations('z.literal("source-taxonomy-v1")', leadIds).length);
});

test("allows code that only reads lead properties and unrelated review states", () => {
  assert.deepEqual(
    findViolations("m?.decisionReason&&m.decisionReason", leadIds),
    []
  );
  assert.deepEqual(
    findViolations("sourceLeadId:u.regex(/^lead-/)", leadIds),
    []
  );
  assert.deepEqual(
    findViolations('"reviewState":"source-reviewed"', leadIds),
    []
  );
  assert.deepEqual(findViolations('className:"leading-snug"', leadIds), []);
});

test("scans client chunks and public documents, and fails closed without a build", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "boundary-audit-"));
  try {
    const content = path.join(root, "src", "content");
    fs.mkdirSync(content, { recursive: true });
    fs.writeFileSync(
      path.join(content, "source-leads.ts"),
      'export const leads = [{ id: "lead-synthetic-registry" }];\n'
    );
    assert.throws(() => auditBuild({ root }), /run the build first/);

    const chunks = path.join(root, ".next", "static", "chunks");
    const app = path.join(root, ".next", "server", "app");
    fs.mkdirSync(chunks, { recursive: true });
    fs.mkdirSync(path.join(app, "desk.segments"), { recursive: true });
    fs.writeFileSync(path.join(chunks, "a.js"), "console.log(1)");
    fs.writeFileSync(path.join(app, "index.html"), "<p>public</p>");
    fs.writeFileSync(
      path.join(app, "desk.rsc"),
      '{"id":"lead-synthetic-registry"}'
    );
    assert.equal(auditBuild({ root }).violations.length, 1);
    assert.equal(auditBuild({ root, deskEnabled: true }).violations.length, 0);

    fs.writeFileSync(
      path.join(chunks, "b.js"),
      'e.exports=[{id:"lead-synthetic-registry"}]'
    );
    assert.deepEqual(
      auditBuild({ root, deskEnabled: true }).violations.map(
        (violation) => violation.file
      ),
      [path.join(".next", "static", "chunks", "b.js")]
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
