"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 whitespace-nowrap font-display text-base font-semibold tracking-tight no-underline sm:text-[1.0625rem]"
          aria-label={`${site.name}, home`}
        >
          <span aria-hidden className="size-2.5 rounded-full bg-accent" />
          {site.name}
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/#work"
                ? pathname.startsWith("/work")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium no-underline transition-colors ${
                  link.href === "/#work" ? "hidden min-[480px]:inline-flex" : ""
                } ${active ? "bg-sunken text-ink" : "text-mute hover:text-ink"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
