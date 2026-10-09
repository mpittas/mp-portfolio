"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isVideoSrc } from "@/lib/content";
import type { Project } from "@/lib/types";

export function CoverStill({
  project,
  sizes,
  className,
  priority = false,
}: {
  project: Project;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  // SSR and the first client render assume Safari: only the poster goes into the HTML,
  // so WebKit never parses a <video> and never speculatively fetches it. Non-Safari
  // browsers mount the video after hydration; Safari keeps the static poster.
  const [staticCover, setStaticCover] = useState(true);

  useEffect(() => {
    // [data-safari] is set before first paint by an inline script in the root layout.
    if (!document.documentElement.hasAttribute("data-safari")) {
      setStaticCover(false);
    }
  }, []);

  if (!project.cover) {
    return <div className={`bg-plate ${className ?? ""}`} data-still />;
  }

  const video = isVideoSrc(project.cover);
  const gif = project.cover.endsWith(".gif");
  // Without a poster there is nothing static to show, so keep the video everywhere.
  const showVideo = video && (!staticCover || !project.coverPoster);

  return (
    <div
      className={`relative overflow-hidden bg-plate ${className ?? ""}`}
      data-still
    >
      <div
        data-still-media
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.045] motion-safe:group-focus-visible:scale-[1.045]"
      >
        {showVideo ? (
          <video
            src={project.cover}
            poster={project.coverPoster ?? undefined}
            muted
            loop
            playsInline
            autoPlay
            preload={priority ? "auto" : "metadata"}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            data-cover-video
          />
        ) : null}
        {video && project.coverPoster ? (
          <Image
            src={project.coverPoster}
            alt=""
            fill
            priority={priority}
            className={`object-cover ${staticCover ? "" : "hidden motion-reduce:block"}`}
            sizes={sizes}
            quality={90}
            data-cover-poster
          />
        ) : null}
        {!video ? (
          <Image
            src={project.cover}
            alt=""
            fill
            priority={priority}
            unoptimized={gif}
            className="object-cover"
            sizes={sizes}
            quality={90}
          />
        ) : null}
      </div>
    </div>
  );
}
