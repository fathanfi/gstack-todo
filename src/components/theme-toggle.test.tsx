import ThemeToggle from "@/components/theme-toggle";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("cycles theme and persists to localStorage", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /Theme:/i });
    expect(button).toHaveTextContent("System");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Light");
    expect(window.localStorage.getItem("todo-gstack-theme")).toBe("light");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Dark");
    expect(window.localStorage.getItem("todo-gstack-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

