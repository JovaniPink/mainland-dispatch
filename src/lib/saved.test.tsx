import { act, fireEvent, render, screen } from "@testing-library/react";
import SavedPage from "@/app/saved/page";
import { SaveButton } from "@/components/dispatch/save-button";
import { publishedDispatches } from "@/content/dispatches";
import { latestNotebookEntry } from "@/content/notebook";

beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());
it("keeps legacy saves and unknown references while adding Notebook reading", () => {
  const legacy = publishedDispatches[0];
  localStorage.setItem(
    "md-saved",
    JSON.stringify([legacy.id, "notebook:withdrawn", "unrecognized"])
  );
  render(
    <>
      <SaveButton
        target={{ kind: "notebook", id: latestNotebookEntry.slug }}
        title={latestNotebookEntry.title}
      />
      <SavedPage />
    </>
  );
  fireEvent.click(
    screen.getByRole("button", { name: `Save: ${latestNotebookEntry.title}` })
  );
  expect(JSON.parse(localStorage.getItem("md-saved")!)).toEqual([
    legacy.id,
    "notebook:withdrawn",
    "unrecognized",
    `notebook:${latestNotebookEntry.slug}`,
  ]);
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((node) => node.textContent)
  ).toEqual([latestNotebookEntry.title, legacy.title]);
  expect(
    screen.queryByRole("link", { name: /withdrawn/ })
  ).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: `Remove: ${latestNotebookEntry.title}` })
  );
  expect(
    screen.queryByRole("link", { name: latestNotebookEntry.title })
  ).not.toBeInTheDocument();
});
it("restores after remount and responds to cross-tab storage updates", () => {
  const reference = `notebook:${latestNotebookEntry.slug}`;
  localStorage.setItem("md-saved", JSON.stringify([reference]));
  const first = render(<SavedPage />);
  expect(
    screen.getByRole("link", { name: latestNotebookEntry.title })
  ).toBeInTheDocument();
  first.unmount();
  render(<SavedPage />);
  expect(
    screen.getByRole("link", { name: latestNotebookEntry.title })
  ).toBeInTheDocument();
  act(() => {
    localStorage.setItem("md-saved", "[]");
    window.dispatchEvent(new StorageEvent("storage", { key: "md-saved" }));
  });
  expect(
    screen.queryByRole("link", { name: latestNotebookEntry.title })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Browse Notebooks" })
  ).toBeInTheDocument();
});
it("reports failed writes without showing a false saved state", () => {
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("full");
  });
  render(<SaveButton id="d-test" />);
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );
  expect(screen.getByRole("alert")).toHaveTextContent("could not be saved");
});
it.each(["not json", "{}"])(
  "reports malformed storage without overwriting it: %s",
  (raw) => {
    localStorage.setItem("md-saved", raw);
    render(
      <>
        <SaveButton id="d-test" />
        <SavedPage />
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(localStorage.getItem("md-saved")).toBe(raw);
    expect(screen.getAllByRole("alert")[0]).toHaveTextContent(
      "could not be read"
    );
  }
);
it("reports unavailable storage", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("denied");
  });
  render(<SavedPage />);
  expect(screen.getByRole("alert")).toHaveTextContent("could not be read");
});
