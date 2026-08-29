import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { projects } from "@/lib/content";

export function HomeSheets() {
  return (
    <ul className="grid grid-cols-2 gap-2 px-4 pb-16 sm:grid-cols-3 md:grid-cols-4 md:px-7 lg:grid-cols-5">
      {projects.map((project, i) => (
        <li key={project.slug}>
          <Link href={`/work/${project.slug}`} className="group block no-underline">
            <div className="relative">
              <CoverStill
                project={project}
                priority={i < 10}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                className="aspect-4/3 w-full"
              />
              <span className="absolute top-0 left-0 spec bg-board px-1.5 py-0.5 text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-2 truncate font-display text-base font-normal leading-none tracking-tight group-hover:text-mute md:text-lg">
              {project.title.replace(" - ", " — ")}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
