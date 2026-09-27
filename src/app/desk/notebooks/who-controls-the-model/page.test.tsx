import { fireEvent, render, screen } from "@testing-library/react";
import Preview, { metadata } from "./page";

jest.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

describe("gated Notebook preview", () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
  });
  it("fails closed in production without the Desk switch", async () => {
    process.env = { ...originalEnv, NODE_ENV: "production" };
    delete process.env.ENABLE_EDITORIAL_DESK;
    await expect(Preview()).rejects.toThrow("NEXT_NOT_FOUND");
  });
  it("renders a no-index draft with source anchors and no publication actions", async () => {
    process.env = {
      ...originalEnv,
      NODE_ENV: "production",
      ENABLE_EDITORIAL_DESK: "1",
    };
    const { container } = render(await Preview());
    expect(
      screen.getByRole("heading", { name: "Who Controls the Model?" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Draft revised/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /save|share/i })
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('script[type="application/ld+json"]')
    ).toBeNull();
    for (const link of container.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]'
    )) {
      expect(
        container.querySelector(`[id="${link.hash.slice(1)}"]`)
      ).not.toBeNull();
    }
    expect(screen.getAllByRole("link", { name: /^Unverified: / })).toHaveLength(
      9
    );
    expect(
      screen.getByRole("link", { name: "Unverified: GTG-17003" })
    ).toHaveTextContent("[unverified]");
    expect(screen.getByText(/Unverified details \(9\)/)).toBeInTheDocument();
    expect(
      screen.getAllByText(/needs primary source/).length
    ).toBeGreaterThanOrEqual(9);
    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    });
    const toggle = screen.getByRole("button", { name: "Sections" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
