import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { ProjectCover } from "@/components/project-cover";
import { KindBadge } from "@/components/kind-badge";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block no-underline"
      aria-label={`${project.title}: ${project.tagline}`}
    >
      <ProjectCover
        project={project}
        priority={priority}
        sizes={
          featured
            ? "(min-width: 1280px) 1200px, 100vw"
            : "(min-width: 1280px) 590px, (min-width: 768px) 46vw, 100vw"
        }
        className={`relative rounded-card border border-line transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
          featured ? "aspect-[16/9] md:aspect-[2.1/1]" : "aspect-[16/10]"
        }`}
      />
      <div
        className={`mt-5 grid gap-x-8 gap-y-3 ${
          featured ? "md:grid-cols-12" : ""
        }`}
      >
        <div className={featured ? "md:col-span-7" : ""}>
          <div className="flex items-center gap-3">
            <KindBadge kind={project.kind} />
            <span className="eyebrow">{project.year}</span>
          </div>
          <h3 className="display-md mt-3 flex items-start gap-2">
            {project.title}
            <LuArrowUpRight
              aria-hidden
              className="mt-1 size-5 shrink-0 text-mute transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </h3>
          <p className="lede mt-2 max-w-[44ch] text-mute">{project.tagline}</p>
        </div>
        <ul
          className={`flex flex-wrap content-start gap-2 ${
            featured ? "md:col-span-5 md:justify-end md:pt-8" : "mt-1"
          }`}
          aria-label="Scope"
        >
          {project.scope.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
