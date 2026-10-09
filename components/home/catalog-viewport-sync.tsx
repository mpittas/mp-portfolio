"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Tailwind `lg` — Index/Columns start here; below is List-only. */
export const DESKTOP_CATALOG_MQ = "(min-width: 1024px)";

const DESKTOP_ONLY_ROUTES = new Set(["/v/index", "/v/columns"]);
const LIST_ROUTE = "/";

/**
 * Keeps catalog layout in sync with viewport on load and resize:
 * - below lg: Minimal only (desktop-only routes → /)
 * - lg+: Index (default) or Columns
 */
export function CatalogViewportSync() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_CATALOG_MQ);

    const sync = () => {
      if (!mq.matches && DESKTOP_ONLY_ROUTES.has(pathname)) {
        router.replace(LIST_ROUTE);
      }
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [pathname, router]);

  return null;
}
