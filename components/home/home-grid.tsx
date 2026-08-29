"use client";

import { useRef } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { useCatalogMotion } from "@/components/home/use-catalog-motion";
import { discipline, projects } from "@/lib/content";

export function HomeGrid() {
  const root = useRef<HTMLUListElement>(null);
  useCatalogMotion(root, "grid");

  return (
    <ul
      ref={root}
      className="grid grid-cols-1 gap-x-5 gap-y-10 px-4 pb-16 sm:grid-cols-2 md:px-7 lg:grid-cols-3"
    >
      {projects.map((project, i) => (
        <li
          key={project.slug}
          data-item
          className={i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
        >
          <Link href={`/work/${project.slug}`} className="group block no-underline">
            <CoverStill
              project={project}
              priority={i < 3}
              sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
              className={i === 0 ? "aspect-16/9" : "aspect-5/4"}
            />
            <div data-copy className="mt-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-normal leading-none tracking-tight transition-colors duration-300 group-hover:text-mute md:text-2xl">
                  {project.title.replace(" - ", " — ")}
                </h2>
                <span className="spec shrink-0 text-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-sm text-mute">{discipline(project)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
