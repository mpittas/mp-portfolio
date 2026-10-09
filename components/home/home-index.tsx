"use client";

import { useState } from "react";
import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline, projects } from "@/lib/content";

export function HomeIndex() {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!active) return null;

  return (
    <div className="grid items-start gap-8 border-t border-rule/40 px-4 pb-16 md:grid-cols-12 md:gap-10 md:px-7">
      <ol className="md:col-span-7">
        {projects.map((project, i) => {
          const selected = project.slug === active.slug;
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className={`grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-b border-rule/40 py-3 no-underline md:grid-cols-[3rem_1fr_auto] md:gap-x-4 md:py-3.5 ${
                  selected ? "text-ink" : "text-mute hover:text-ink"
                }`}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
              >
                <span className="spec">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="font-display text-xl font-normal leading-none tracking-tight md:text-2xl">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-sm">{discipline(project)}</span>
                </span>
                <span className="spec">{project.year ?? "-"}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="hidden md:sticky md:top-24 md:col-span-5 md:block md:self-start">
        <Link
          href={`/work/${active.slug}`}
          className="group block no-underline"
          tabIndex={-1}
          aria-hidden="true"
        >
          <CoverStill
            project={active}
            priority
            sizes="(min-width: 768px) 80vw, 100vw"
            className="aspect-16/10 w-full"
          />
          <p className="spec mt-3 text-mute">
            {String(projects.findIndex((project) => project.slug === active.slug) + 1).padStart(2, "0")}
            {active.year ? ` · ${active.year}` : ""}
            {" · "}
            {discipline(active)}
          </p>
          <h2 className="display-title mt-2 text-[clamp(1.5rem,2.4vw,2rem)]">
            {active.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
