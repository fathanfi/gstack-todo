import Home from "@/app/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const storageKey = "todo-gstack-items";

describe("Home page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("id-1");
  });

  it("adds, toggles, and deletes todo items", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Todo input"), {
      target: { value: "Ship feature" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Ship feature")).toBeVisible();
    fireEvent.click(screen.getByRole("checkbox", { name: "Toggle Ship feature" }));
    fireEvent.click(screen.getByRole("button", { name: "Delete Ship feature" }));

    expect(screen.queryByText("Ship feature")).not.toBeInTheDocument();
  });

  it("applies filter from URL and persists tasks", () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify([
        { id: "1", text: "Done", completed: true, createdAt: 1 },
        { id: "2", text: "Open", completed: false, createdAt: 2 },
      ]),
    );
    window.history.replaceState({}, "", "/?filter=completed");

    render(<Home />);

    expect(screen.getByText("Done")).toBeVisible();
    expect(screen.queryByText("Open")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "active" }));
    expect(window.location.search).toContain("filter=active");
  });
});
