import { formatDate, formatDateShort } from "./site";

describe("editorial date formatting", () => {
  it("uses deterministic month labels across server and browser runtimes", () => {
    expect(formatDate("2026-09-17")).toBe("17 SEP 2026");
    expect(formatDateShort("2026-09-17")).toBe("17 SEP 2026");
  });

  it("rejects malformed dates instead of formatting them inconsistently", () => {
    expect(() => formatDate("not-a-date")).toThrow(/Expected a source date/);
  });
});

it("preserves partial publication dates", () => {
  expect(formatDate("2026")).toBe("2026");
  expect(formatDate("2026-07")).toBe("JUL 2026");
});
