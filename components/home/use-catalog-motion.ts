"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CatalogVariant = "spread" | "grid" | "list" | "columns";

function clipFrom(variant: CatalogVariant, side?: string) {
  if (variant === "spread") {
    return side === "right" ? "inset(0% 0% 0% 16%)" : "inset(0% 16% 0% 0%)";
  }
  if (variant === "list") {
    return "inset(0% 18% 0% 0%)";
  }
  if (variant === "columns") {
    return "inset(10% 8% 10% 8%)";
  }
  return "inset(7% 7% 7% 7%)";
}

export function useCatalogMotion(
  root: RefObject<HTMLElement | null>,
  variant: CatalogVariant,
) {
  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (mediaContext) => {
          const motion = Boolean(mediaContext.conditions?.motion);
          const fine = Boolean(mediaContext.conditions?.fine);
          if (!motion) return;

          const items = gsap.utils.toArray<HTMLElement>("[data-item]", el);
          if (!items.length) return;

          const cleanups: Array<() => void> = [];

          items.forEach((item) => {
            const still = item.querySelector<HTMLElement>("[data-still]");
            const media = item.querySelector<HTMLElement>("[data-still-media]");
            const copy = item.querySelector<HTMLElement>("[data-copy]");
            const side = item.dataset.side;

            if (still) {
              gsap.set(still, { clipPath: clipFrom(variant, side) });
            }
            if (media) {
              media.style.transition = "none";
              gsap.set(media, { scale: 1.08 });
            }
            if (copy) {
              gsap.set(copy, {
                autoAlpha: 0,
                y: variant === "list" ? 0 : 16,
                x: variant === "spread" ? (side === "right" ? -18 : 18) : 0,
              });
            }
          });

          ScrollTrigger.batch(items, {
            interval: 0.1,
            batchMax: variant === "grid" || variant === "columns" ? 3 : 2,
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              batch.forEach((item, i) => {
                const still = item.querySelector<HTMLElement>("[data-still]");
                const media = item.querySelector<HTMLElement>("[data-still-media]");
                const copy = item.querySelector<HTMLElement>("[data-copy]");
                const tl = gsap.timeline({
                  delay: i * 0.07,
                  defaults: { ease: "power3.out" },
                });

                if (still) {
                  tl.to(
                    still,
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
                    0,
                  );
                }
                if (media) {
                  tl.to(
                    media,
                    { scale: 1, duration: 1.05, ease: "power2.out" },
                    0,
                  );
                }
                if (copy) {
                  tl.to(
                    copy,
                    { autoAlpha: 1, x: 0, y: 0, duration: 0.55 },
                    0.16,
                  );
                }
              });
            },
          });

          if (fine) {
            items.forEach((item) => {
              const media = item.querySelector<HTMLElement>("[data-still-media]");
              const still = item.querySelector<HTMLElement>("[data-still]");
              if (!media || !still) return;

              const xTo = gsap.quickTo(media, "xPercent", {
                duration: 0.7,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(media, "yPercent", {
                duration: 0.7,
                ease: "power3.out",
              });
              const scaleTo = gsap.quickTo(media, "scale", {
                duration: 0.75,
                ease: "power2.out",
              });

              const pan = variant !== "list";

              const onEnter = contextSafe(() => scaleTo(1.045));
              const onLeave = contextSafe(() => {
                scaleTo(1);
                xTo(0);
                yTo(0);
              });
              const onMove = contextSafe((event: Event) => {
                if (!pan) return;
                const pointer = event as PointerEvent;
                const rect = still.getBoundingClientRect();
                xTo(
                  gsap.utils.mapRange(
                    0,
                    rect.width,
                    -1.8,
                    1.8,
                    pointer.clientX - rect.left,
                  ),
                );
                yTo(
                  gsap.utils.mapRange(
                    0,
                    rect.height,
                    -1.4,
                    1.4,
                    pointer.clientY - rect.top,
                  ),
                );
              });

              item.addEventListener("pointerenter", onEnter);
              item.addEventListener("pointerleave", onLeave);
              item.addEventListener("focusin", onEnter);
              item.addEventListener("focusout", onLeave);
              if (pan) item.addEventListener("pointermove", onMove);

              cleanups.push(() => {
                item.removeEventListener("pointerenter", onEnter);
                item.removeEventListener("pointerleave", onLeave);
                item.removeEventListener("focusin", onEnter);
                item.removeEventListener("focusout", onLeave);
                if (pan) item.removeEventListener("pointermove", onMove);
              });
            });
          }

          const images = el.querySelectorAll("img");
          const videos = el.querySelectorAll("video");
          let pending = images.length + videos.length;
          const refresh = () => ScrollTrigger.refresh();
          if (!pending) {
            requestAnimationFrame(refresh);
          } else {
            const done = () => {
              pending -= 1;
              if (pending <= 0) refresh();
            };
            images.forEach((image) => {
              if (image.complete) done();
              else {
                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });
              }
            });
            videos.forEach((video) => {
              if (video.readyState >= 1) done();
              else {
                video.addEventListener("loadedmetadata", done, { once: true });
                video.addEventListener("error", done, { once: true });
              }
            });
          }

          return () => {
            cleanups.forEach((fn) => fn());
          };
        },
        el,
      );

      return () => mm.revert();
    },
    { scope: root },
  );
}
