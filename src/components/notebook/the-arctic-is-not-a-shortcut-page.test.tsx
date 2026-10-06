import { fireEvent, render, screen } from "@testing-library/react";
import TheArcticIsNotAShortcutPage from "@/app/notebook/the-arctic-is-not-a-shortcut/page";

describe("The Arctic Is Not a Shortcut Notebook page", () => {
  it("renders the bounded Arctic evidence and reciprocal companion", () => {
    render(<TheArcticIsNotAShortcutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "The Arctic Is Not a Shortcut",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("3.2 million")).toBeInTheDocument();
    expect(screen.getByText("37.02 million")).toBeInTheDocument();
    expect(screen.getByText("8 scheduled")).toBeInTheDocument();
    expect(screen.getAllByText(/^Retrieved 2026-08-/)).toHaveLength(14);
    expect(
      screen.getByRole("link", {
        name: "The non-Arctic chokepoint portfolio",
      })
    ).toHaveAttribute("href", "/notebook/routing-around-risk");
    expect(document.getElementById("arctic")).toBeInTheDocument();
  });

  it("offers only the Arctic map subset behind explicit consent", () => {
    render(<TheArcticIsNotAShortcutPage />);

    expect(
      screen.queryByRole("button", { name: "Arctic hedge" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Portfolio" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Scheduled Arctic container hedge/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("chokepoint-map-container")
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Scheduled Arctic container hedge/i })
    );
    expect(screen.getByText("Selected corridor")).toBeInTheDocument();
    expect(
      screen.queryByTestId("chokepoint-map-container")
    ).not.toBeInTheDocument();
  });

  it("has no audio, embed, live feed, or publisher-player surface", () => {
    render(<TheArcticIsNotAShortcutPage />);

    expect(screen.queryByText(/Load publisher audio/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /audio/i })
    ).not.toBeInTheDocument();
    expect(document.querySelector("audio, iframe")).not.toBeInTheDocument();
    expect(screen.getAllByText("Excluded overstatement")).toHaveLength(4);
  });
});
