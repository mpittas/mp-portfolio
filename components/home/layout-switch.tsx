"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopLayouts = [
  { href: "/v/index", label: "Index" },
  { href: "/v/columns", label: "Columns" },
] as const;

const mobileLayouts = [
  { href: "/v/list", label: "List" },
  { href: "/v/columns", label: "Columns" },
] as const;

function isLayoutActive(pathname: string, href: string) {
  if (href === "/v/index") {
    return pathname === "/" || pathname === "/v/index";
  }
  return pathname === href;
}

function LayoutNav({
  layouts,
  pathname,
  className,
}: {
  layouts: ReadonlyArray<{ href: string; label: string }>;
  pathname: string;
  className: string;
}) {
  return (
    <nav
      aria-label="Work layout"
      className={`inline-flex flex-wrap border border-rule/40 ${className}`}
    >
      {layouts.map((layout, index) => {
        const active = isLayoutActive(pathname, layout.href);
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
  );
}

export function LayoutSwitch() {
  const pathname = usePathname();

  return (
    <div className="px-4 pt-6 md:px-7 md:pt-8">
      <LayoutNav
        layouts={desktopLayouts}
        pathname={pathname}
        className="hidden md:inline-flex"
      />
      <LayoutNav
        layouts={mobileLayouts}
        pathname={pathname}
        className="inline-flex md:hidden"
      />
    </div>
  );
}
