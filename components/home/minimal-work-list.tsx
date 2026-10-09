"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline } from "@/lib/content";
import type { Project } from "@/lib/types";

// Offset of the preview from the cursor, and how quickly it catches up (0 to 1)
const OFFSET_X = 28;
const EASE = 0.18;

export function MinimalWorkList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  function render() {
    const p = position.current;
    const t = target.current;
    p.x += (t.x - p.x) * EASE;
    p.y += (t.y - p.y) * EASE;
    if (preview.current) {
      preview.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translateY(-50%)`;
    }
    // Stop once the preview has settled on the cursor
    if (Math.abs(t.x - p.x) < 0.5 && Math.abs(t.y - p.y) < 0.5) {
      frame.current = null;
      return;
    }
    frame.current = requestAnimationFrame(render);
  }

  function follow(event: React.MouseEvent) {
    target.current = { x: event.clientX + OFFSET_X, y: event.clientY };
    if (frame.current === null) {
      frame.current = requestAnimationFrame(render);
    }
  }

  function stop() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setHovered(null);
  }

  return (
    <>
      <ul
        className="mt-4 border-t border-rule/40"
        onMouseLeave={stop}
        onMouseMove={follow}
      >
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={(event) => {
                follow(event);
                setHovered(project);
              }}
              onFocus={() => setHovered(project)}
              onBlur={() => setHovered(null)}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-rule/40 py-5 no-underline transition-colors hover:text-ink md:py-6"
            >
              <span className="spec col-span-2 text-mute md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 font-display text-2xl leading-none md:col-span-5 md:text-3xl">
                {project.title}
              </span>
              <span className="col-span-10 col-start-3 text-mute md:col-span-4 md:col-start-auto">
                {discipline(project)}
              </span>
              <span className="spec col-span-12 text-end text-mute transition-colors group-hover:text-ink md:col-span-2 md:col-start-auto">
                {project.year} &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview. Desktop only; pointer-events off so it never blocks a click */}
      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 hidden w-72 transition-opacity duration-200 md:block xl:w-80 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {hovered && (
          <CoverStill
            project={{
              ...hovered,
              cover: hovered.coverPoster ?? hovered.cover,
              coverPoster: null,
            }}
            sizes="320px"
            className="aspect-4/3 w-full"
          />
        )}
      </div>
    </>
  );
}
