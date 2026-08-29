import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline, projects } from "@/lib/content";

export function HomePlates() {
  const total = String(projects.length).padStart(2, "0");

  return (
    <ul>
      {projects.map((project, i) => (
        <li key={project.slug} className="border-t border-rule/40">
          <Link
            href={`/work/${project.slug}`}
            className="group mx-auto block max-w-4xl px-4 py-10 no-underline md:px-7 md:py-14"
          >
            <p className="spec text-mute">
              Plate {String(i + 1).padStart(2, "0")} / {total}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <CoverStill
              project={project}
              priority={i < 2}
              sizes="(min-width: 896px) 56rem, 100vw"
              className="mt-4 aspect-16/10 w-full"
            />
            <h2 className="display-title mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] transition-colors duration-300 group-hover:text-mute">
              {project.title}
            </h2>
            <p className="mt-2 text-mute">{discipline(project)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
