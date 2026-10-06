import { render, screen } from "@testing-library/react";
import { Stream } from "./stream";
import { publishedDispatches, toPublicDispatch } from "@/content/dispatches";

describe("Stream publication boundary", () => {
  it("renders published entries and excludes review-stage material", () => {
    render(<Stream dispatches={publishedDispatches.map(toPublicDispatch)} />);

    expect(
      screen.getByText(/liang wenfeng described deepseek's playbook/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/who’s afraid of chinese models/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/kimi k3 arrives/i)).not.toBeInTheDocument();
  });
});
