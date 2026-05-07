import { applyTheme, cycleTheme } from "@/lib/theme";
import { describe, expect, it } from "vitest";

describe("theme", () => {
  it("cycles theme preference in order", () => {
    expect(cycleTheme("light")).toBe("dark");
    expect(cycleTheme("dark")).toBe("system");
    expect(cycleTheme("system")).toBe("light");
  });

  it("applies dark class and data-theme", () => {
    document.documentElement.classList.remove("dark");
    delete (document.documentElement as HTMLElement).dataset.theme;

    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});

