"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopLayouts = [
  { href: "/", label: "Minimal" },
  { href: "/v/index", label: "Index" },
  { href: "/v/columns", label: "Columns" },
] as const;

function isLayoutActive(pathname: string, href: string) {
  return pathname === href;
}

export function LayoutSwitch() {
  const pathname = usePathname();

  return (
    <div className="hidden px-7 pt-8 lg:block">
      <nav
        aria-label="Work layout"
        className="inline-flex flex-wrap border border-rule/40"
      >
        {desktopLayouts.map((layout, index) => {
          const active = isLayoutActive(pathname, layout.href);
          return (
            <Link
              key={layout.href}
              href={layout.href}
              role="tab"
              aria-selected={active}
              aria-current={active ? "page" : undefined}
              className={`spec no-underline px-2.5 py-1 transition-colors text-xs ${
                index < desktopLayouts.length - 1
                  ? "border-r border-rule/40"
                  : ""
              } ${
                active
                  ? "bg-ink text-board"
                  : "text-mute hover:bg-paper hover:text-ink"
              }`}
            >
              {layout.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
