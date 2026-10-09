"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Lets a mock screen be authored in plain pixels at a fixed design size and
 * scales it to whatever box it lands in.
 *
 * - width: the box takes the parent's width and keeps the design aspect ratio.
 * - contain: the box fills its (positioned) parent and the design is centred.
 */
export function FitFrame({
  width,
  height,
  mode = "width",
  children,
}: {
  width: number;
  height: number;
  mode?: "width" | "contain";
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{
    scale: number;
    x: number;
    y: number;
  } | null>(null);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const scale =
        mode === "width" ? w / width : Math.min(w / width, h / height);
      setFit({
        scale,
        x: (w - width * scale) / 2,
        y: (h - height * scale) / 2,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width, height, mode]);

  return (
    <div
      ref={outer}
      className={
        mode === "contain"
          ? "absolute inset-0 overflow-hidden"
          : "relative w-full overflow-hidden"
      }
      style={
        mode === "width" ? { aspectRatio: `${width} / ${height}` } : undefined
      }
    >
      <div
        style={{
          position: "absolute",
          left: fit?.x ?? 0,
          top: fit?.y ?? 0,
          width,
          height,
          transform: `scale(${fit?.scale ?? 1})`,
          transformOrigin: "top left",
          opacity: fit ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
