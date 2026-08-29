"use client";

import { useRef } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { useCatalogMotion } from "@/components/home/use-catalog-motion";
import { discipline, projects } from "@/lib/content";

export function HomeSpread() {
  const root = useRef<HTMLUListElement>(null);
  useCatalogMotion(root, "spread");

  return (
    <ul ref={root}>
      {projects.map((project, i) => {
        const imageRight = i % 2 === 1;
        return (
          <li
            key={project.slug}
            data-item
            data-side={imageRight ? "right" : "left"}
            className="border-b border-rule/40"
          >
            <Link
              href={`/work/${project.slug}`}
              className="group grid items-end gap-5 px-4 py-8 no-underline md:grid-cols-12 md:gap-10 md:px-7 md:py-10"
            >
              <CoverStill
                project={project}
                priority={i < 2}
                sizes="(min-width: 768px) 55vw, 100vw"
                className={`aspect-16/10 w-full md:col-span-7 ${
                  imageRight ? "md:col-start-6 md:order-2" : "md:col-start-1"
                }`}
              />
              <div
                data-copy
                className={`md:col-span-5 ${
                  imageRight ? "md:col-start-1 md:row-start-1" : "md:col-start-8"
                }`}
              >
                <p className="spec text-mute transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
                  {String(i + 1).padStart(2, "0")}
                  {project.year ? ` · ${project.year}` : ""}
                  {" · "}
                  {discipline(project)}
                </p>
                <h2 className="display-title mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)]">
                  {project.title}
                </h2>
                <span
                  aria-hidden
                  className={`mt-4 block h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                    imageRight ? "md:origin-right" : ""
                  }`}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
