"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const layouts = [
  { href: "/", label: "Spreads" },
  { href: "/v/grid", label: "Grid" },
  { href: "/v/list", label: "List" },
  { href: "/v/index", label: "Index" },
  { href: "/v/plates", label: "Plates" },
  { href: "/v/sheets", label: "Sheets" },
  { href: "/v/tape", label: "Tape" },
  { href: "/v/folio", label: "Folio" },
  { href: "/v/wall", label: "Wall" },
  { href: "/v/columns", label: "Columns" },
];

export function LayoutSwitch() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Work layout"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule/40 px-4 py-3 md:gap-x-5 md:px-7"
    >
      {layouts.map((layout) => {
        const active =
          layout.href === "/" ? pathname === "/" : pathname === layout.href;
        return (
          <Link
            key={layout.href}
            href={layout.href}
            className={`spec no-underline ${
              active ? "text-ink" : "text-mute hover:text-ink"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {layout.label}
          </Link>
        );
      })}
    </nav>
  );
}
