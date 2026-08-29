"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectModules } from "@/components/project-modules";
import { discipline } from "@/lib/content";
import type { Project } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectCase({
  project,
  index,
  total,
  prev,
  next,
}: {
  project: Project;
  index: number;
  total: number;
  prev: Project;
  next: Project;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const spec = el.querySelector<HTMLElement>("[data-case-spec]");
          const title = el.querySelector<HTMLElement>("[data-case-title]");
          const rule = el.querySelector<HTMLElement>("[data-case-rule]");
          const plates = gsap.utils.toArray<HTMLElement>("[data-film]", el);
          const texts = gsap.utils.toArray<HTMLElement>("[data-film-text]", el);

          const open = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          if (spec) {
            open.fromTo(
              spec,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.45 },
              0,
            );
          }

          if (title) {
            open.fromTo(
              title,
              { clipPath: "inset(0% 12% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                onComplete: () => {
                  gsap.set(title, { clearProps: "clipPath" });
                },
              },
              0.06,
            );
          }

          if (rule) {
            open.fromTo(
              rule,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.55, ease: "power2.out" },
              0.22,
            );
          }

          plates.forEach((plate) => {
            const media = plate.querySelector<HTMLElement>("[data-film-media]");
            if (!media) return;

            gsap.fromTo(
              media,
              { scale: 1.08 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: plate,
                  start: "top 92%",
                  end: "top 28%",
                  scrub: 1.1,
                },
              },
            );
          });

          texts.forEach((block) => {
            gsap.fromTo(
              block,
              { clipPath: "inset(0% 0% 18% 0%)", autoAlpha: 0.35 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top 92%",
                  end: "top 62%",
                  scrub: 0.7,
                },
              },
            );
          });

          const images = el.querySelectorAll("img");
          let pending = images.length;
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
          }
        },
        el,
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [project.slug] },
  );

  return (
    <article ref={root}>
      <header className="bg-paper px-4 py-12 md:px-7 md:py-16">
        <p data-case-spec className="spec text-mute">
          Plate {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {project.year ? ` · ${project.year}` : ""}
          {" · "}
          {discipline(project)}
        </p>
        <h1
          data-case-title
          className="display-title mt-4 max-w-6xl text-[clamp(2.8rem,8vw,6.5rem)]"
        >
          {project.title.replace(" - ", " — ")}
        </h1>
        <span
          data-case-rule
          aria-hidden
          className="mt-8 block h-px origin-left bg-ink/40"
        />
      </header>

      <ProjectModules modules={project.modules} title={project.title} />

      {total > 1 ? (
        <nav
          data-case-nav
          className="relative z-10 grid border-t border-rule/40 bg-board md:grid-cols-2"
          aria-label="Adjacent projects"
        >
          <Link
            href={`/work/${prev.slug}`}
            className="group border-b border-rule/40 px-4 py-10 no-underline transition-colors duration-300 hover:bg-paper md:border-b-0 md:border-r md:px-7"
          >
            <p className="spec text-mute transition-colors duration-300 group-hover:text-ink">
              Previous
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-tight transition-transform duration-500 ease-out motion-safe:group-hover:-translate-x-1 md:text-4xl">
              {prev.title.replace(" - ", " — ")}
            </p>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group px-4 py-10 no-underline transition-colors duration-300 hover:bg-paper md:px-7 md:text-right"
          >
            <p className="spec text-mute transition-colors duration-300 group-hover:text-ink">
              Next
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-tight transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1 md:text-4xl">
              {next.title.replace(" - ", " — ")}
            </p>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
