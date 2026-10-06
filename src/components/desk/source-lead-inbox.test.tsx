import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SourceLeadInbox } from "./source-lead-inbox";
import { sourceLeads } from "@/content/source-leads";

describe("SourceLeadInbox", () => {
  it("presents the long chronology as collapsed decade groups", () => {
    render(<SourceLeadInbox sourceLeads={sourceLeads} />);

    expect(
      screen.getByText(/526 article-source candidates/)
    ).toBeInTheDocument();
    expect(screen.getByText("2000s")).toBeInTheDocument();
    expect(screen.getByText("2010s")).toBeInTheDocument();
    expect(screen.getByText("2020s")).toBeInTheDocument();
    expect(screen.queryByText("Date pending")).not.toBeInTheDocument();
  });

  it("retains canonical links and shows evidence dispositions", () => {
    render(<SourceLeadInbox sourceLeads={sourceLeads} />);

    expect(
      screen
        .getByText(
          /National Medium- and Long-Term Program for Science and Technology Development/
        )
        .closest("a")
    ).toHaveAttribute(
      "href",
      "https://www.itu.int/en/ITU-D/Cybersecurity/Documents/National_Strategies_Repository/China_2006.pdf"
    );
    expect(
      screen.getByText(/Candidate URLs · fail closed/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Disposition" })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Theme" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Geographic scope" })
    ).toBeInTheDocument();
  });

  it("filters a large inbox without changing its publication boundary", () => {
    render(<SourceLeadInbox sourceLeads={sourceLeads} />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Search source leads" }),
      { target: { value: "no-source-can-match-this" } }
    );

    expect(screen.getByText("0 of 526 leads shown")).toBeInTheDocument();
    expect(
      screen.getByText("No source leads match this editorial filter.")
    ).toBeInTheDocument();
  });

  it("filters and presents the controlled link taxonomy", () => {
    render(<SourceLeadInbox sourceLeads={sourceLeads} />);

    fireEvent.change(screen.getByRole("combobox", { name: "Theme" }), {
      target: { value: "trade-industry" },
    });

    expect(
      screen.getByText(/The Mineral Industry of China/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/China’s Economy Slows Sharply/)
    ).not.toBeInTheDocument();
    expect(screen.getAllByText(/Trade and industry/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Provisional taxonomy/).length).toBeGreaterThan(
      0
    );
  });
});
