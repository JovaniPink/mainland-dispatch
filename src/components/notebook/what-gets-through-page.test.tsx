import { fireEvent, render, screen } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import WhatGetsThroughPage, {
  generateMetadata,
} from "@/app/notebook/what-gets-through/page";
import { whatGetsThrough as entry } from "@/content/notebook/what-gets-through";

describe("What Gets Through corrected Notebook page", () => {
  it("renders the thesis-first reader and accessible two-gate figure", () => {
    render(<WhatGetsThroughPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "What Gets Through?" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("working-thesis")).toHaveTextContent(
      /networked attention.*national-security law/i
    );
    const figure = screen.getByRole("figure", {
      name: /two gates that shape circulation/i,
    });
    expect(figure).not.toHaveTextContent("Trade");
    expect(figure).toHaveTextContent("Culture");
    expect(figure).toHaveTextContent("Memory");
    expect(figure).toHaveTextContent(/not morally equivalent/i);
  });

  it("renders all moved-fragment notices and the reciprocal companion", () => {
    const { container } = render(<WhatGetsThroughPage />);

    for (const fragment of entry.legacyFragments ?? []) {
      expect(container.querySelector(`#${fragment.id}`)).toBeInTheDocument();
      expect(
        container.querySelector(
          `#${fragment.id} a[href="/notebook/${fragment.successorSlug}#${fragment.successorFragment}"]`
        )
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", {
        name: "Rules of origin and transshipment proof",
      })
    ).toHaveAttribute("href", "/notebook/where-does-origin-change");
  });

  it("retains zero-request audio consent and every audio state", () => {
    const { container } = render(<WhatGetsThroughPage />);

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
    expect(screen.getAllByText("Loading audio")[0]).toBeInTheDocument();

    fireEvent.canPlay(container.querySelector("audio")!);
    expect(screen.getByText("Ready to play")).toBeInTheDocument();
    fireEvent.error(container.querySelector("audio")!);
    expect(screen.getByText("Audio unavailable")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(screen.getAllByText("Loading audio")[0]).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Unload audio" }));
    expect(container.querySelector("audio, source")).toBeNull();
  });

  it("offers a fresh retry when Safari reports failure on the source element", () => {
    const { container } = render(<WhatGetsThroughPage />);
    fireEvent.click(
      screen.getByRole("button", {
        name: `Load external audio: ${entry.formats[0].title}`,
      })
    );
    const audio = container.querySelector("audio")!;
    fireEvent(
      container.querySelector("source")!,
      new Event("error", { bubbles: false })
    );
    expect(screen.getByText("Audio unavailable")).toBeInTheDocument();
    expect(audio).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(container.querySelector("audio")).not.toBe(audio);
    fireEvent.canPlay(container.querySelector("audio")!);
    expect(screen.getByText("Ready to play")).toBeInTheDocument();
  });

  it("preserves the consented audio element and position when playback becomes available", () => {
    const { container } = render(<WhatGetsThroughPage />);
    fireEvent.click(
      screen.getByRole("button", {
        name: `Load external audio: ${entry.formats[0].title}`,
      })
    );
    const audio = container.querySelector("audio")!;
    audio.currentTime = 12;

    fireEvent.canPlay(audio);

    expect(screen.getByText("Now available")).toBeInTheDocument();
    expect(container.querySelector("audio")).toBe(audio);
    expect(container.querySelector("audio")!.currentTime).toBe(12);
    fireEvent.canPlay(audio);
    expect(container.querySelector("audio")).toBe(audio);

    for (const [event, status] of [
      ["playing", "Playing"],
      ["pause", "Paused"],
      ["waiting", "Buffering"],
      ["playing", "Playing"],
      ["ended", "Playback complete"],
    ]) {
      fireEvent(audio, new Event(event));
      fireEvent.canPlay(audio);
      expect(screen.getByText(status)).toBeInTheDocument();
      expect(container.querySelector("audio")).toBe(audio);
      expect(audio.currentTime).toBe(12);
    }

    fireEvent.error(audio);
    expect(audio).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(container.querySelector("audio")).not.toBe(audio);
    expect(screen.getAllByText("Loading audio")[0]).toBeInTheDocument();
  });

  it("publishes canonical metadata, deduplicated JSON-LD citations, and both sitemap entries", () => {
    const { container } = render(<WhatGetsThroughPage />);
    const metadata = generateMetadata();
    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebook/what-gets-through",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://mainlanddispatch.com/notebook/what-gets-through",
      publishedTime: "2026-08-25T00:00:00.000Z",
      modifiedTime: "2026-09-07T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd).toBeInTheDocument();
    const payload = JSON.parse(jsonLd!.textContent!);
    expect(new Set(payload.citation).size).toBe(payload.citation.length);
    expect(sitemap().map((item) => item.url)).toEqual(
      expect.arrayContaining([
        "https://mainlanddispatch.com/notebook/what-gets-through",
        "https://mainlanddispatch.com/notebook/where-does-origin-change",
      ])
    );
  });

  it("renders Inquiry 06 in ASCII US English", () => {
    const { container } = render(<WhatGetsThroughPage />);
    expect(container.textContent).not.toMatch(/[^\x00-\x7F]/);
  });
});
