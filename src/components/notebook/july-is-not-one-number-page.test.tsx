import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import JulyIsNotOneNumberPage, {
  generateMetadata,
} from "@/app/notebook/july-is-not-one-number/page";
import { EconomicSignalsFigure } from "@/components/notebook/economic-signals-figure";
import { julyIsNotOneNumber as entry } from "@/content/notebook/july-is-not-one-number";

describe("July Is Not One Number Notebook page", () => {
  it("renders a thesis-first layered signal figure without an economy verdict", () => {
    const { container } = render(<JulyIsNotOneNumberPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "July Is Not One Number" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("working-thesis")).toHaveTextContent(
      /industrial resilience.*property contraction.*household demand/i
    );

    const figure = screen.getByRole("figure", {
      name: /six July economic signals with separate definitions/i,
    });
    expect(within(figure).getAllByRole("listitem")).toHaveLength(6);
    const methodDetails = container.querySelectorAll(
      "details.economic-signal-details"
    );
    expect(methodDetails).toHaveLength(6);
    for (const details of methodDetails) {
      expect(details).not.toHaveAttribute("open");
      expect(details).toHaveTextContent("Method, contrasts, and source");
    }

    for (const indicator of entry.indicators) {
      expect(figure).toHaveTextContent(indicator.label);
      expect(figure).toHaveTextContent(indicator.display);
      expect(figure).toHaveTextContent(indicator.period);
      expect(figure).toHaveTextContent(indicator.basis);
      expect(figure).toHaveTextContent(indicator.reading);
      expect(figure).toHaveTextContent(indicator.counterReading);
      expect(figure).toHaveTextContent(indicator.caveat);
    }
    expect(figure).toHaveTextContent("Period");
    expect(figure).toHaveTextContent("Comparison");
    expect(figure).toHaveTextContent("Basis");
    expect(figure).toHaveTextContent("Observed reading:");
    expect(
      within(figure).getByRole("link", {
        name: /open primary observation - industrial output source record/i,
      })
    ).toHaveAttribute("href", "#notebook-source-july-output");
    expect(screen.queryByText(/^verdict$/i)).not.toBeInTheDocument();
  });

  it("leads with observations and labels the four source roles", () => {
    render(<JulyIsNotOneNumberPage />);

    const roles = screen.getByRole("region", { name: "Source roles" });
    expect(roles).toHaveTextContent("6 primary observations");
    expect(roles).toHaveTextContent("1 official synthesis");
    expect(roles).toHaveTextContent("3 independent institutional analyses");
    expect(roles).toHaveTextContent("1 technical study");

    const figure = screen.getByRole("figure", {
      name: /six July economic signals with separate definitions/i,
    });
    const contextLink = screen.getByRole("link", {
      name: /National Economy Maintained Steady Momentum/i,
    });
    expect(
      figure.compareDocumentPosition(contextLink) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    const contextHeading = screen.getByRole("heading", {
      name: "Three frames outside the primary releases",
    });
    const context = contextHeading.closest("aside");
    if (!(context instanceof HTMLElement)) {
      throw new Error("expected the institutional context aside");
    }
    expect(within(context).getAllByRole("link")).toHaveLength(3);
  });

  it("renders five alternative readings, explicit limits, and the source trail", () => {
    const { container } = render(<JulyIsNotOneNumberPage />);

    const readings = screen.getByTestId("alternative-readings");
    expect(within(readings).getAllByRole("listitem")).toHaveLength(5);
    expect(readings).toHaveTextContent(/resilience/i);
    expect(readings).toHaveTextContent(/concentrated/i);
    expect(readings).toHaveTextContent(/property/i);
    expect(
      screen.getByRole("heading", {
        name: /what these releases do not settle/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /eleven source stops/i })
    ).toBeInTheDocument();
    for (const source of entry.sourceTrail) {
      expect(container.querySelector(`#${source.id}`)).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: /inquiry.*What Gets Through/ })
    ).toHaveAttribute("href", "/notebook/what-gets-through");
    expect(
      screen.getByRole("link", { name: /Next inquiry.*Below Half Is Not Gone/ })
    ).toHaveAttribute("href", "/notebook/below-half-is-not-gone");
  });

  it("publishes canonical metadata, JSON-LD citations, and a sitemap entry", () => {
    const { container } = render(<JulyIsNotOneNumberPage />);
    const metadata = generateMetadata();

    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebook/july-is-not-one-number",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://mainlanddispatch.com/notebook/july-is-not-one-number",
      publishedTime: "2026-08-29T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd).toBeInTheDocument();
    expect(jsonLd?.textContent).toContain("citation");
    expect(jsonLd?.textContent).toContain(entry.sourceTrail[0].links[0].url);
    expect(sitemap().map((item) => item.url)).toContain(
      "https://mainlanddispatch.com/notebook/july-is-not-one-number"
    );
  });

  it("fails closed when a signal source cannot be resolved", () => {
    expect(() =>
      render(
        <EconomicSignalsFigure
          indicators={entry.indicators}
          sources={entry.sourceTrail.slice(1)}
        />
      )
    ).toThrow(/missing source notebook-source-july-output/);
  });

  it("expands signal methodology and hides disclosure controls in print", () => {
    const stylesheet = readFileSync("src/app/globals.css", "utf8");

    expect(stylesheet).toMatch(
      /@media print[\s\S]*\.economic-signal-details > :not\(summary\)[\s\S]*display: block !important/
    );
    expect(stylesheet).toMatch(
      /@media print[\s\S]*\.economic-signal-details > summary[\s\S]*display: none/
    );
  });
});
