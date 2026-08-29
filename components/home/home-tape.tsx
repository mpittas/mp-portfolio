"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline, projects } from "@/lib/content";

export function HomeTape() {
  const scrollerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (scroller.scrollWidth <= scroller.clientWidth) return;
      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      ref={scrollerRef}
      aria-label="Work tape"
      data-lenis-prevent
      className="overflow-x-auto overscroll-x-contain pb-16 [scrollbar-color:var(--color-ink)_var(--color-board)]"
    >
      <ul className="flex w-max snap-x snap-mandatory gap-3 px-4 md:gap-4 md:px-7">
        {projects.map((project, i) => (
          <li key={project.slug} className="w-[min(82vw,38rem)] shrink-0 snap-start">
            <Link href={`/work/${project.slug}`} className="group block no-underline">
              <CoverStill
                project={project}
                priority={i < 3}
                sizes="(min-width: 768px) 38rem, 82vw"
                className="aspect-16/10 w-full"
              />
              <p className="spec mt-3 text-mute">
                {String(i + 1).padStart(2, "0")}
                {project.year ? ` · ${project.year}` : ""}
                {" · "}
                {discipline(project)}
              </p>
              <h2 className="display-title mt-2 text-[clamp(1.5rem,3vw,2.25rem)] group-hover:text-mute">
                {project.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
