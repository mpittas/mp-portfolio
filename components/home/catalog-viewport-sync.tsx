"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Tailwind `lg` — Index/Columns start here; below is List-only. */
export const DESKTOP_CATALOG_MQ = "(min-width: 1024px)";

const DESKTOP_ONLY_ROUTES = new Set(["/v/index", "/v/columns"]);
const LIST_ROUTE = "/v/list";
const DESKTOP_DEFAULT = "/v/index";

/**
 * Keeps catalog layout in sync with viewport on load and resize:
 * - below lg: List only (desktop-only routes → /v/list)
 * - lg+: Index (default) or Columns (/v/list → /v/index)
 */
export function CatalogViewportSync() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_CATALOG_MQ);

    const sync = () => {
      if (!mq.matches && DESKTOP_ONLY_ROUTES.has(pathname)) {
        router.replace(LIST_ROUTE);
        return;
      }
      if (mq.matches && pathname === LIST_ROUTE) {
        router.replace(DESKTOP_DEFAULT);
      }
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [pathname, router]);

  return null;
}
