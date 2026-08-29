"use client";

import { useRef } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { useCatalogMotion } from "@/components/home/use-catalog-motion";
import { discipline, projects } from "@/lib/content";

export function HomeList() {
  const root = useRef<HTMLUListElement>(null);
  useCatalogMotion(root, "list");

  return (
    <ul ref={root} className="border-t border-rule/40">
      {projects.map((project, i) => (
        <li key={project.slug} data-item>
          <Link
            href={`/work/${project.slug}`}
            className="group flex items-center gap-4 border-b border-rule/40 px-4 py-4 no-underline transition-colors hover:bg-paper md:gap-8 md:px-7 md:py-5"
          >
            <CoverStill
              project={project}
              priority={i < 6}
              sizes="180px"
              className="aspect-4/3 w-28 shrink-0 md:w-44"
            />
            <div data-copy className="min-w-0 flex-1">
              <p className="spec text-mute transition-colors duration-300 group-hover:text-ink">
                {String(i + 1).padStart(2, "0")}
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <h2 className="mt-1 font-display text-2xl font-normal leading-none tracking-tight md:text-3xl">
                {project.title.replace(" - ", " — ")}
              </h2>
              <p className="mt-2 text-mute">{discipline(project)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
