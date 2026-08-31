"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule/40 bg-board">
      <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-7">
        <Link
          href="/"
          className="shrink-0 no-underline"
          aria-label={`${site.shortName} home`}
        >
          <Image
            src="/logo-dark.png"
            alt=""
            width={338}
            height={122}
            priority
            className="h-6 w-auto dark:invert md:h-7"
          />
        </Link>
        <nav className="flex items-center gap-2.5 md:gap-8" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" ||
                  pathname.startsWith("/work") ||
                  pathname.startsWith("/v/")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`spec no-underline transition-colors text-xs md:text-sm ${
                  active ? "text-ink" : "text-mute hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
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
