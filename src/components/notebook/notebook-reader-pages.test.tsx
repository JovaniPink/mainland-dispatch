import WhereDoesOriginChangePage from "@/app/notebook/where-does-origin-change/page";
import TheArcticIsNotAShortcutPage from "@/app/notebook/the-arctic-is-not-a-shortcut/page";
import { render, screen } from "@testing-library/react";
import DominanceIsADashboardPage from "@/app/notebook/dominance-is-a-dashboard/page";
import OpenModelsClosedSystemPage from "@/app/notebook/open-models-closed-system/page";
import RoutingAroundRiskPage from "@/app/notebook/routing-around-risk/page";
import WhatGetsThroughPage from "@/app/notebook/what-gets-through/page";
import JulyIsNotOneNumberPage from "@/app/notebook/july-is-not-one-number/page";
import WhoAbsorbsTheShockPage from "@/app/notebook/who-absorbs-the-shock/page";
import WhatXiJinpingWantsPage from "@/app/notebook/what-xi-jinping-wants/page";
import BelowHalfIsNotGonePage from "@/app/notebook/below-half-is-not-gone/page";

const pages = [
  ["Inquiry 01", WhatXiJinpingWantsPage],
  ["Inquiry 02", OpenModelsClosedSystemPage],
  ["Inquiry 03", DominanceIsADashboardPage],
  ["Inquiry 04", RoutingAroundRiskPage],
  ["Inquiry 05", WhoAbsorbsTheShockPage],
  ["Inquiry 06", WhatGetsThroughPage],
  ["Inquiry 07", JulyIsNotOneNumberPage],
  ["Inquiry 08", BelowHalfIsNotGonePage],
  ["Inquiry 09", WhereDoesOriginChangePage],
  ["Inquiry 10", TheArcticIsNotAShortcutPage],
] as const;

describe("published Notebook reader routes", () => {
  it.each(pages)("gives %s the shared dated reader contract", (_, Page) => {
    const { container } = render(<Page />);

    const ids = [...container.querySelectorAll("[id]")].map((node) => node.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
    expect(container.querySelector("figure")).toBeInTheDocument();
    expect(
      screen.getAllByRole("navigation", { name: "Continue reading" })
    ).toHaveLength(1);
    expect(container.querySelector("audio, iframe")).not.toBeInTheDocument();
    const thesis = screen.getByTestId("working-thesis");
    const metadata = screen.getByTestId("notebook-metadata");
    expect(
      metadata.compareDocumentPosition(thesis) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sections" })
    ).toBeInTheDocument();
    expect(container.querySelector('a[href="#sources"]')).toBeInTheDocument();
    expect(container.querySelector("section#sources")).toBeInTheDocument();
  });
});
