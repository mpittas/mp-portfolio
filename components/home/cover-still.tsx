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
  if (!project.cover) {
    return <div className={`bg-plate ${className ?? ""}`} data-still />;
  }

  const video = isVideoSrc(project.cover);
  const gif = project.cover.endsWith(".gif");

  return (
    <div
      className={`relative overflow-hidden bg-plate ${className ?? ""}`}
      data-still
    >
      <div
        data-still-media
        className="absolute inset-[-6%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.045] motion-safe:group-focus-visible:scale-[1.045]"
      >
        {video ? (
          <>
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
            />
            {project.coverPoster ? (
              <Image
                src={project.coverPoster}
                alt=""
                fill
                priority={priority}
                className="hidden object-cover motion-reduce:block"
                sizes={sizes}
              />
            ) : null}
          </>
        ) : (
          <Image
            src={project.cover}
            alt=""
            fill
            priority={priority}
            unoptimized={gif}
            className="object-cover"
            sizes={sizes}
          />
        )}
      </div>
    </div>
  );
}
