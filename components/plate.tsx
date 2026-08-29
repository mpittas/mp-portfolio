"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/types";
import { discipline } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Plate({
  project,
  index,
  total,
  featured = false,
}: {
  project: Project;
  index: number;
  total: number;
  featured?: boolean;
}) {
  const frame = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = el.querySelector("[data-plate-media]");
    if (!media) return;

    const tween = gsap.fromTo(
      media,
      { yPercent: featured ? 0 : 8, scale: featured ? 1 : 1.06 },
      {
        yPercent: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [featured]);

  if (!project.cover) return null;

  const gif = project.cover.endsWith(".gif");

  return (
    <Link
      ref={frame}
      href={`/work/${project.slug}`}
      className="group relative block min-h-[88vh] overflow-hidden bg-plate text-ink no-underline"
    >
      <div data-plate-media className="absolute inset-0 will-change-transform">
        <Image
          src={project.cover}
          alt=""
          fill
          priority={featured}
          unoptimized={gif}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-plate/80 via-plate/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 md:flex-row md:items-end md:justify-between md:p-7">
        <div>
          <p className="spec text-ink/70">
            Plate {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h2 className="display-title mt-2 max-w-5xl text-[clamp(2.4rem,7vw,5.5rem)] text-ink">
            {project.title}
          </h2>
        </div>
        <p className="spec shrink-0 text-ink/80">{discipline(project)}</p>
      </div>
    </Link>
  );
}
