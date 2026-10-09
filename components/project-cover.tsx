import Image from "next/image";
import { Mock } from "@/components/mocks";
import type { Project } from "@/lib/types";

/**
 * Cover for written case studies: no screens, just type. Sizes use container
 * query units so it scales with the card or the case study header.
 */
function TypeCover({ title, mark }: { title: string; mark: string }) {
  return (
    <div
      className="absolute inset-0 text-[#151513] [container-type:inline-size]"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#151513 1px, transparent 1px), linear-gradient(90deg, #151513 1px, transparent 1px)",
          backgroundSize: "8cqw 8cqw",
        }}
      />
      <span className="absolute -right-[3cqw] -top-[7cqw] select-none font-display text-[44cqw] font-semibold leading-none tracking-[-0.06em] text-[#151513]/[0.08]">
        {mark}
      </span>
      <p className="absolute left-[6cqw] top-[6cqw] rounded-full border border-[#151513]/30 px-[1.6cqw] py-[0.6cqw] text-[1.7cqw] font-semibold uppercase leading-none tracking-[0.1em]">
        Written case study
      </p>
      <p className="absolute bottom-[6cqw] left-[6cqw] max-w-[16ch] font-display text-[8.5cqw] font-medium leading-[0.95] tracking-[-0.045em]">
        {title}
      </p>
    </div>
  );
}

/** The still that represents a project: a real screenshot, a screen built in code, or type. */
export function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { cover } = project;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ background: project.tone }}
    >
      {cover.type === "media" ? (
        <Image
          src={cover.media.src}
          alt={cover.media.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cover.fit === "cover" ? "object-cover" : "object-contain"}
        />
      ) : cover.type === "mock" ? (
        <Mock id={cover.id} />
      ) : (
        <TypeCover title={project.title} mark={cover.mark} />
      )}
    </div>
  );
}
