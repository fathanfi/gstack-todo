export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "todo-gstack-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): ThemePreference {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") {
      return raw;
    }
    return "system";
  } catch {
    return "system";
  }
}

export function setStoredTheme(theme: ThemePreference): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors to keep UI responsive.
  }
}

export function applyTheme(theme: ThemePreference): void {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function initTheme(): void {
  applyTheme(getStoredTheme());
}

export function cycleTheme(current: ThemePreference): ThemePreference {
  if (current === "light") return "dark";
  if (current === "dark") return "system";
  return "light";
}

