"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const layouts = [
  { href: "/v/index", label: "Index" },
  { href: "/v/list", label: "List" },
  { href: "/v/columns", label: "Columns" },
];

export function LayoutSwitch() {
  const pathname = usePathname();

  return (
    <div className="px-4 pt-6 md:px-7 md:pt-8">
      <nav
        aria-label="Work layout"
        className="inline-flex flex-wrap border border-rule/40"
      >
        {layouts.map((layout, index) => {
          const active =
            layout.href === "/v/index"
              ? pathname === "/" || pathname === "/v/index"
              : pathname === layout.href;
          return (
            <Link
              key={layout.href}
              href={layout.href}
              role="tab"
              aria-selected={active}
              aria-current={active ? "page" : undefined}
              className={`spec no-underline px-2.5 py-1 transition-colors text-xs ${
                index < layouts.length - 1 ? "border-r border-rule/40" : ""
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
