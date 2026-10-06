import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ArchiveExplorer } from "./archive-explorer";

describe("ArchiveExplorer publication boundary and views", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/archive");
  });

  it("renders only public reviewed records", () => {
    render(<ArchiveExplorer />);

    expect(
      screen.getByText(/10 inquiries.*sources.*13 Dispatches/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /liang wenfeng described deepseek's playbook/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/afraid of chinese models/i)
    ).not.toBeInTheDocument();
  });

  it("switches between timeline and relationship views", () => {
    render(<ArchiveExplorer />);

    fireEvent.click(screen.getByRole("button", { name: "Time" }));
    expect(screen.getByText(/see coverage accumulate/i)).toBeInTheDocument();
    expect(screen.getAllByText(/record/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "Relationships" }));
    expect(
      screen.getByRole("heading", {
        name: "The Arctic Is Not a Shortcut",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Inquiry and its sources" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
      "the-arctic-is-not-a-shortcut"
    );
    expect(
      screen.getByRole("option", {
        name: "Inquiry 07 - July Is Not One Number",
      })
    ).toHaveValue("july-is-not-one-number");
    expect(
      screen.getByRole("option", {
        name: "Inquiry 06 - What Gets Through?",
      })
    ).toHaveValue("what-gets-through");
    expect(
      screen.getByRole("option", {
        name: "Inquiry 05 - Who Absorbs the Shock?",
      })
    ).toHaveValue("who-absorbs-the-shock");

    fireEvent.change(screen.getByLabelText("Notebook inquiry"), {
      target: { value: "what-xi-jinping-wants" },
    });
    expect(
      screen.getByRole("heading", { name: "What Xi Jinping Wants" })
    ).toBeInTheDocument();
  });

  it("filters by evidence status and writes shareable URL state", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(
        screen.getByText(/10 inquiries.*sources.*13 Dispatches/)
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole("button", { name: /^Filters/ }));
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "contested" },
    });

    await waitFor(() =>
      expect(window.location.search).toContain("evidence=contested")
    );
    expect(
      screen.getByText(/^10 inquiries.*sources.*Dispatches$/)
    ).toBeInTheDocument();
  });

  it("keeps search and views visible while the machine owns the filter panel", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(
        screen.getByText(/10 inquiries.*sources.*13 Dispatches/)
      ).toBeInTheDocument()
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Results" })).toBeInTheDocument();

    const filters = screen.getByRole("button", { name: "Filters (0)" });
    expect(filters).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(filters);
    expect(filters).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("archive-filter-panel")).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(window.location.search).not.toContain("filterPanel");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(filters).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("archive-filter-panel")).toHaveAttribute(
      "data-state",
      "closed"
    );
  });

  it("shows removable applied filters outside the panel", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(
        screen.getByText(/10 inquiries.*sources.*13 Dispatches/)
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole("button", { name: "Filters (0)" }));
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "contested" },
    });
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "China" },
    });

    expect(
      screen.getByRole("button", { name: "Filters (2)" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Remove Evidence: Contested" })
    );
    expect(screen.getByLabelText("Evidence")).toHaveValue("all");
    expect(screen.getByLabelText("Search")).toHaveValue("China");

    fireEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: /^Remove / })
    ).not.toBeInTheDocument();
  });

  it("uses compact source records with native editorial-note disclosures", () => {
    render(<ArchiveExplorer />);

    expect(
      screen.getAllByRole("group", { name: "Editorial note" })
    ).toHaveLength(13);
    expect(screen.getAllByRole("button", { name: /^Save/ })).toHaveLength(23);
    expect(screen.getAllByText("Contested").length).toBeGreaterThan(0);
  });
});

it("preserves the latest inquiry and fragment through reload", async () => {
  window.history.replaceState(
    {},
    "",
    "/archive?view=relationships&inquiry=the-arctic-is-not-a-shortcut&campaign=test#sources"
  );
  const first = render(<ArchiveExplorer />);
  await waitFor(() =>
    expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
      "the-arctic-is-not-a-shortcut"
    )
  );
  await waitFor(() =>
    expect(window.location.search).toContain(
      "inquiry=the-arctic-is-not-a-shortcut"
    )
  );
  expect(window.location.hash).toBe("#sources");
  first.unmount();
  render(<ArchiveExplorer />);
  await waitFor(() =>
    expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
      "the-arctic-is-not-a-shortcut"
    )
  );
});

it("restores Back/Forward state without writing another history entry", async () => {
  window.history.replaceState({}, "", "/archive");
  render(<ArchiveExplorer />);
  await waitFor(() => expect(screen.getByLabelText("Search")).toHaveValue(""));
  const push = jest.spyOn(window.history, "pushState");
  fireEvent.click(screen.getByRole("button", { name: "Relationships" }));
  expect(push).toHaveBeenCalledTimes(1);
  fireEvent.change(screen.getByLabelText("Search"), {
    target: { value: "Arctic" },
  });
  expect(push).toHaveBeenCalledTimes(1);
  window.history.replaceState(
    {},
    "",
    "/archive?view=relationships&inquiry=what-xi-jinping-wants"
  );
  fireEvent.popState(window);
  expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
    "what-xi-jinping-wants"
  );
  expect(screen.getByLabelText("Search")).toHaveValue("");
  expect(push).toHaveBeenCalledTimes(1);
  push.mockRestore();
});

it("makes the default Relationships selection explicit without adding history", async () => {
  window.history.replaceState({}, "", "/archive?view=relationships#sources");
  const push = jest.spyOn(window.history, "pushState");
  render(<ArchiveExplorer />);
  await waitFor(() =>
    expect(window.location.search).toContain(
      "inquiry=the-arctic-is-not-a-shortcut"
    )
  );
  expect(window.location.hash).toBe("#sources");
  expect(push).not.toHaveBeenCalled();
  push.mockRestore();
});

it("searches Notebook sources and shows one relationship explorer at a time", async () => {
  window.history.replaceState({}, "", "/archive?q=Arctic");
  render(<ArchiveExplorer />);
  await waitFor(() =>
    expect(screen.getByLabelText("Search")).toHaveValue("Arctic")
  );
  expect(screen.getByRole("region", { name: "Inquiries" })).toHaveTextContent(
    "The Arctic Is Not a Shortcut"
  );
  expect(screen.getByRole("region", { name: "Sources" })).toHaveTextContent(
    "Arctic"
  );
  fireEvent.click(screen.getByRole("button", { name: "Relationships" }));
  expect(screen.queryByLabelText("Focus record")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Dispatch connections" }));
  expect(screen.getByLabelText("Focus record")).toBeInTheDocument();
  expect(screen.queryByLabelText("Notebook inquiry")).not.toBeInTheDocument();
});
