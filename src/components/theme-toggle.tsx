"use client";

import {
  applyTheme,
  cycleTheme,
  getStoredTheme,
  setStoredTheme,
  ThemePreference,
} from "@/lib/theme";
import { useEffect, useState } from "react";

function label(theme: ThemePreference): string {
  if (theme === "light") return "Light";
  if (theme === "dark") return "Dark";
  return "System";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleClick = () => {
    const next = cycleTheme(theme);
    setTheme(next);
    setStoredTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Theme: ${label(theme)}. Activate to change theme.`}
      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
    >
      {label(theme)}
    </button>
  );
}

