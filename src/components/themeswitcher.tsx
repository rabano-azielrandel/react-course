import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, getSystemTheme } from "@/lib/theme";
import type { Theme } from "@/lib/theme";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme
  useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored || getSystemTheme();

    setTheme(initial);
    applyTheme(initial);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggleTheme}
      className="bg-card border border-border px-3 py-2 rounded-xl text-sm hover:bg-primary hover:text-primary-foreground transition"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
