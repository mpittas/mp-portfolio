"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "@/lib/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="spec inline-flex size-9 items-center justify-center text-mute transition-colors hover:text-ink"
    >
      {isDark ? <LuSun size={18} aria-hidden /> : <LuMoon size={18} aria-hidden />}
    </button>
  );
}
