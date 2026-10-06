import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import BelowHalfIsNotGonePage, {
  generateMetadata,
} from "@/app/notebook/below-half-is-not-gone/page";
import { EnergySystemFigure } from "@/components/notebook/energy-system-figure";
import { belowHalfIsNotGone as entry } from "@/content/notebook/below-half-is-not-gone";

describe("Below Half Is Not Gone Notebook page", () => {
  it("renders four ordered layers and eight separately labeled measures", () => {
    const { container } = render(<BelowHalfIsNotGonePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Below Half Is Not Gone" })
    ).toBeInTheDocument();
    const figure = screen.getByRole("figure", {
      name: /one system, four different questions/i,
    });
    const layerHeadings = within(figure).getAllByRole("heading", { level: 3 });
    expect(layerHeadings.map((heading) => heading.textContent)).toEqual(
      entry.energyLayers.map((layer) => layer.label)
    );
    expect(within(figure).getAllByRole("heading", { level: 4 })).toHaveLength(
      8
    );
    expect(
      container.querySelectorAll("details.energy-system-details")
    ).toHaveLength(8);
    expect(figure).toHaveTextContent("Official measurement");
    expect(figure).toHaveTextContent("Independent analysis");
    expect(figure).toHaveTextContent("Modeled estimate");
    expect(figure).toHaveTextContent("Forecast");

    for (const measure of entry.energyLayers.flatMap(
      (layer) => layer.measures
    )) {
      expect(figure).toHaveTextContent(measure.label);
      expect(figure).toHaveTextContent(measure.display);
      expect(figure).toHaveTextContent(measure.unit);
      expect(figure).toHaveTextContent(measure.period);
      expect(figure).toHaveTextContent(measure.boundary);
    }
  });

  it("renders four readings, limits, formats, source records, and navigation", () => {
    const { container } = render(<BelowHalfIsNotGonePage />);

    expect(
      within(screen.getByTestId("alternative-readings")).getAllByRole(
        "listitem"
      )
    ).toHaveLength(4);
    expect(screen.getAllByText("Modeled estimate").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Forecast/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: "Eight source records, ten direct URLs",
      })
    ).toBeInTheDocument();
    for (const source of entry.sourceTrail) {
      expect(container.querySelector(`#${source.id}`)).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", {
        name: /Previous inquiry.*July Is Not One Number/,
      })
    ).toHaveAttribute("href", "/notebook/july-is-not-one-number");
  });

  it("publishes one canonical route with JSON-LD citations and sitemap custody", () => {
    const { container } = render(<BelowHalfIsNotGonePage />);
    const metadata = generateMetadata();
    const canonical =
      "https://mainlanddispatch.com/notebook/below-half-is-not-gone";

    expect(metadata.alternates).toEqual({ canonical });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: canonical,
      publishedTime: "2026-09-01T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd?.textContent).toContain("citation");
    expect(jsonLd?.textContent).toContain(
      "https://www.nea.gov.cn/20260730/6c60113d8ba5471eb0045cb7b314dee8/c.html"
    );
    expect(sitemap().filter((item) => item.url === canonical)).toHaveLength(1);
  });

  it("fails closed when a measure source cannot be resolved", () => {
    expect(() =>
      render(
        <EnergySystemFigure
          layers={entry.energyLayers}
          sources={entry.sourceTrail.slice(1)}
        />
      )
    ).toThrow(/missing source notebook-source-energy-nea-h1/);
  });

  it("expands energy methodology and hides disclosure controls in print", () => {
    const stylesheet = readFileSync("src/app/globals.css", "utf8");
    expect(stylesheet).toMatch(
      /@media print[\s\S]*\.energy-system-details > :not\(summary\)[\s\S]*display: block !important/
    );
    expect(stylesheet).toMatch(
      /@media print[\s\S]*\.energy-system-details > summary[\s\S]*display: none/
    );
  });
});
