"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "@/lib/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="ml-1 inline-flex size-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-sunken hover:text-ink"
    >
      {isDark ? (
        <LuSun className="size-[18px]" aria-hidden />
      ) : (
        <LuMoon className="size-[18px]" aria-hidden />
      )}
    </button>
  );
}
