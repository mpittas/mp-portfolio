import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline, projects } from "@/lib/content";

export function HomeFolio() {
  return (
    <ul>
      {projects.map((project, i) => (
        <li key={project.slug} className="border-t border-rule/40">
          <Link
            href={`/work/${project.slug}`}
            className="group relative block no-underline"
          >
            <CoverStill
              project={project}
              priority={i < 2}
              sizes="100vw"
              className="aspect-4/3 w-full md:aspect-2/1"
            />
            <div className="absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-0 md:left-0">
              <div className="max-w-xl bg-board px-4 py-4 md:m-7 md:px-6 md:py-5">
                <p className="spec text-mute">
                  {String(i + 1).padStart(2, "0")}
                  {project.year ? ` · ${project.year}` : ""}
                  {" · "}
                  {discipline(project)}
                </p>
                <h2 className="display-title mt-2 text-[clamp(1.75rem,4vw,3rem)] group-hover:text-mute">
                  {project.title.replace(" - ", " — ")}
                </h2>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
