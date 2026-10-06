import { fireEvent, render, screen } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import WhoAbsorbsTheShockPage, {
  generateMetadata,
} from "@/app/notebook/who-absorbs-the-shock/page";
import { whoAbsorbsTheShock as entry } from "@/content/notebook/who-absorbs-the-shock";

describe("Who Absorbs the Shock Notebook page", () => {
  it("renders the thesis-first reader and five-stage adjustment chain", () => {
    render(<WhoAbsorbsTheShockPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Who Absorbs the Shock?" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("working-thesis")).toHaveTextContent(
      /benefits and costs.*different groups/i
    );
    const figure = screen.getByRole("figure", {
      name: /five-stage adjustment chain/i,
    });
    for (const step of entry.mechanismSteps) {
      expect(figure).toHaveTextContent(step.label);
    }
  });

  it("renders distribution, policy, claim, and source boundaries", () => {
    render(<WhoAbsorbsTheShockPage />);
    expect(
      screen.getByRole("heading", { name: /who receives what/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /which tool targets which problem/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Excluded overstatement").length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /source trail and review boundary/i })
    ).toBeInTheDocument();
  });

  it("keeps publisher audio private until consent", () => {
    const { container } = render(<WhoAbsorbsTheShockPage />);
    expect(container.querySelector("audio, source")).toBeNull();
    expect(
      screen.getByText(/No publisher transcript available/)
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: `Load external audio: ${entry.formats[0].title}`,
      })
    );
    expect(container.querySelector("source")).toHaveAttribute(
      "src",
      entry.audio.mediaUrl
    );
    fireEvent.canPlay(container.querySelector("audio")!);
    expect(screen.getByText("Ready to play")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Unload audio" }));
    expect(container.querySelector("audio, source")).toBeNull();
  });

  it("publishes article metadata, citations, and a sitemap entry", () => {
    const { container } = render(<WhoAbsorbsTheShockPage />);
    const metadata = generateMetadata();
    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebook/who-absorbs-the-shock",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://mainlanddispatch.com/notebook/who-absorbs-the-shock",
      publishedTime: "2026-08-26T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd?.textContent).toContain("citation");
    expect(sitemap().map((item) => item.url)).toContain(
      "https://mainlanddispatch.com/notebook/who-absorbs-the-shock"
    );
  });

  it("links the adjacent inquiries and keeps authored copy ASCII", () => {
    const { container } = render(<WhoAbsorbsTheShockPage />);
    expect(
      screen.getByRole("link", {
        name: /Previous inquiry.*Routing Around Risk/,
      })
    ).toHaveAttribute("href", "/notebook/routing-around-risk");
    expect(
      screen.getByRole("link", { name: /inquiry.*What Gets Through/ })
    ).toHaveAttribute("href", "/notebook/what-gets-through");
    expect(container.textContent).not.toMatch(/[^\x00-\x7F]/);
  });
});
