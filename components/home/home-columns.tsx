"use client";

import { useRef } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { useCatalogMotion } from "@/components/home/use-catalog-motion";
import {
  discipline,
  projectLead,
  projectShortName,
  projects,
} from "@/lib/content";
import type { Project } from "@/lib/types";

export function HomeColumns() {
  const root = useRef<HTMLUListElement>(null);
  useCatalogMotion(root, "columns");

  return (
    <ul
      ref={root}
      className="grid grid-cols-1 border-t border-rule/40 pb-16 md:grid-cols-3"
    >
      {projects.map((project, i) => (
        <li
          key={project.slug}
          data-item
          className="h-full border-b border-rule/40 md:border-r md:nth-[3n]:border-r-0 md:last:border-r-0"
        >
          <ColumnCase
            project={project}
            index={i}
            lane={i % 3}
            priority={i < 3}
          />
        </li>
      ))}
    </ul>
  );
}

function ColumnCase({
  project,
  index,
  lane,
  priority,
}: {
  project: Project;
  index: number;
  lane: number;
  priority: boolean;
}) {
  const mark = String(index + 1).padStart(2, "0");
  const title = project.title.replace(" - ", " — ");
  const short = projectShortName(project);
  const rest = title.includes(" — ")
    ? title.slice(title.indexOf(" — ") + 3)
    : discipline(project);
  const reading = projectLead(project) ?? rest;

  const still = (
    <CoverStill
      project={project}
      priority={priority}
      sizes="(min-width: 768px) 33vw, 100vw"
      className="aspect-square w-full rounded-xl"
    />
  );

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col px-4 py-10 no-underline md:min-h-168 md:px-8 md:py-12 lg:min-h-[min(46rem,86svh)] lg:px-10"
    >
      {lane === 0 ? (
        <>
          <h2 className="spec text-ink transition-colors duration-300 group-hover:text-mute group-focus-visible:text-mute">
            {mark} {short}
          </h2>
          <p
            data-copy
            className="mt-8 max-w-[26ch] text-lg leading-snug md:mt-10 md:text-xl"
          >
            {reading}
          </p>
          <div className="mt-12 md:mt-auto md:pt-16">{still}</div>
        </>
      ) : null}

      {lane === 1 ? (
        <>
          <h2 className="spec text-ink transition-colors duration-300 group-hover:text-mute group-focus-visible:text-mute">
            {mark} {short}
          </h2>
          <div className="mt-10 md:mt-14">{still}</div>
          <p
            data-copy
            className="mt-10 max-w-[26ch] text-lg leading-snug md:mt-auto md:pt-12 md:text-xl"
          >
            {reading}
          </p>
        </>
      ) : null}

      {lane === 2 ? (
        <>
          <p className="spec text-ink transition-colors duration-300 group-hover:text-mute group-focus-visible:text-mute">
            {mark} {discipline(project)}
          </p>
          <div data-copy>
            <h2 className="display-title mt-7 max-w-[12ch] text-[clamp(2.15rem,4.2vw,3.4rem)] transition-colors duration-300 group-hover:text-mute group-focus-visible:text-mute">
              {short}
            </h2>
            <p className="mt-4 max-w-[28ch] leading-snug text-mute md:text-lg">
              {reading}
            </p>
          </div>
          <div className="mt-12 md:mt-auto md:pt-16">{still}</div>
        </>
      ) : null}
    </Link>
  );
}
