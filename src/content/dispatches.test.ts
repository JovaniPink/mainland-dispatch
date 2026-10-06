import { publishedDispatches, toPublicDispatch } from "./dispatches";

describe("toPublicDispatch", () => {
  it("removes the private source-lead link and keeps every public field", () => {
    const record = publishedDispatches[0];
    const projection = toPublicDispatch(record);

    expect(record.sourceLeadId).toMatch(/^lead-/);
    expect(projection).not.toHaveProperty("sourceLeadId");
    expect(JSON.stringify(projection)).not.toMatch(/lead-/);
    const { sourceLeadId, ...rest } = record;
    expect(sourceLeadId).toBeTruthy();
    expect(projection).toEqual(rest);
  });

  it("returns one projection per record so RSC payloads can deduplicate it", () => {
    const record = publishedDispatches[0];
    expect(toPublicDispatch(record)).toBe(toPublicDispatch(record));
  });
});
