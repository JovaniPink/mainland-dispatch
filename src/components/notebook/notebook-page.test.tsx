import { render, screen } from "@testing-library/react";
import WhatXiJinpingWantsPage from "@/app/notebook/what-xi-jinping-wants/page";

describe("What Xi Jinping Wants Notebook page", () => {
  it("renders one coherent inquiry with visible evidence labels", () => {
    render(<WhatXiJinpingWantsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What Xi Jinping Wants",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Interpretation")).toBeInTheDocument();
    expect(screen.getAllByText("Scenario").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contested").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: "2027, 2028, and 2049 are different claims",
      })
    ).toBeInTheDocument();
  });

  it("exposes all three canonical formats and the bounded source trail", () => {
    render(<WhatXiJinpingWantsPage />);

    expect(screen.getByRole("link", { name: /Listen/ })).toHaveAttribute(
      "href",
      expect.stringContaining("podcasts.apple.com")
    );
    expect(screen.getByRole("link", { name: /Watch/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=DprKDXRlubw"
    );
    expect(
      screen.getByRole("link", { name: /^Read.*What Xi Jinping Wants/ })
    ).toHaveAttribute("href", expect.stringContaining("nytimes.com"));
    expect(
      screen.getByRole("heading", { name: "A short, real source trail" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Explore database|Read official|Read review/).length
    ).toBeGreaterThan(0);
  });

  it("keeps unpublished Atlas work out of the public reading path", () => {
    render(<WhatXiJinpingWantsPage />);

    expect(
      screen.getByRole("link", {
        name: /Next inquiry.*Open Models/,
      })
    ).toHaveAttribute("href", "/notebook/open-models-closed-system");
    expect(screen.queryByRole("link", { name: /source lab/i })).toBeNull();
  });
});
