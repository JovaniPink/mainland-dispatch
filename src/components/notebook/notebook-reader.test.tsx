import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  NotebookReaderShell,
  NotebookSecondarySection,
} from "./notebook-reader";

const sections = [
  ["why", "Why this matters"],
  ["sources", "Sources"],
] as const;

function ReaderFixture() {
  return (
    <NotebookReaderShell
      ordinal={4}
      title="A test inquiry"
      subtitle="A short deck that names the question."
      thesis="The thesis is the first substantive answer and remains continuously readable."
      publishedAt="2026-08-18"
      updatedAt="2026-08-21"
      readTime="20 min"
      tags={["China", "Trade"]}
      editorialLabel="Source-backed interpretation"
      path="/notebook/a-test-inquiry"
      campaign="a-test-inquiry"
      sections={sections}
      readingRule="Keep unlike measures separate."
    >
      <section id="why">
        <h2>Why this matters</h2>
      </section>
      <NotebookSecondarySection
        id="sources"
        legacyIds={["source-trail-heading"]}
        eyebrow="Two bounded stops"
        title="Source trail and review boundary"
        summary="Two reviewed sources with explicit limits."
        actionLabel="Examine 2 sources"
      >
        <a id="primary-source-record" href="https://example.com/source">
          Primary source
        </a>
      </NotebookSecondarySection>
    </NotebookReaderShell>
  );
}

describe("Notebook reader shell", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/notebook/a-test-inquiry");
  });

  it("places dated metadata before the thesis and section navigation", () => {
    render(<ReaderFixture />);

    const thesis = screen.getByTestId("working-thesis");
    const metadata = screen.getByTestId("notebook-metadata");
    const sectionsButton = screen.getByRole("button", { name: "Sections" });

    expect(
      metadata.compareDocumentPosition(thesis) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      thesis.compareDocumentPosition(sectionsButton) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("opens and closes the mobile section navigator with accessible state", () => {
    render(<ReaderFixture />);

    const button = screen.getByRole("button", { name: "Sections" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Notebook sections mobile" })
    ).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("uses one Share disclosure while preserving all four actions", () => {
    render(<ReaderFixture />);

    const share = screen.getByRole("button", { name: "Share" });
    expect(share).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(share);
    expect(
      screen.getByRole("button", { name: "Copy link" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "email" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "linkedin" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "bluesky" })).toBeInTheDocument();
  });

  it("opens secondary evidence when a compatible fragment targets it", async () => {
    window.history.replaceState(
      {},
      "",
      "/notebook/a-test-inquiry#source-trail-heading"
    );
    render(<ReaderFixture />);

    const details = screen.getByTestId("secondary-section-sources");
    await waitFor(() => expect(details).toHaveAttribute("open"));
    expect(screen.getByText("Primary source")).toBeInTheDocument();
  });

  it("opens secondary evidence when a fragment targets a descendant record", async () => {
    window.history.replaceState(
      {},
      "",
      "/notebook/a-test-inquiry#primary-source-record"
    );
    render(<ReaderFixture />);

    const details = screen.getByTestId("secondary-section-sources");
    await waitFor(() => expect(details).toHaveAttribute("open"));
  });
});
