import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";
import { Masthead } from "@/components/shell/masthead";

jest.mock("next/navigation", () => ({ usePathname: jest.fn(() => "/") }));

describe("Masthead", () => {
  it("uses publication-first navigation and a non-wrapping name", () => {
    render(<Masthead />);

    const name = screen.getByRole("link", { name: "MAINLAND DISPATCH" });
    expect(name).toHaveClass("whitespace-nowrap");
    expect(
      screen.getByRole("navigation", { name: "Primary" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual(
      ["MAINLAND DISPATCH", "Latest", "Notebooks", "Evidence", "Saved"]
    );
    expect(
      screen.getByText("Understand the argument. Follow the evidence.")
    ).toBeInTheDocument();
  });
});

it.each([
  ["/", "Latest", "page"],
  ["/notebooks", "Notebooks", "page"],
  ["/notebook/the-arctic-is-not-a-shortcut", "Notebooks", "location"],
  ["/archive", "Evidence", "page"],
  ["/dispatch/public-record", "Evidence", "location"],
  ["/compare/public-record", "Evidence", "location"],
  ["/trace/public-record", "Evidence", "location"],
  ["/dossiers/public-record", "Evidence", "location"],
  ["/saved", "Saved", "page"],
])("identifies %s in persistent navigation", (pathname, name, current) => {
  jest.mocked(usePathname).mockReturnValue(pathname);
  render(<Masthead />);
  expect(screen.getByRole("link", { name })).toHaveAttribute(
    "aria-current",
    current
  );
});
