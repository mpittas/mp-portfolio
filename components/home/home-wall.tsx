import Link from "next/link";
import { CoverStill } from "@/components/home/cover-still";
import { discipline, projects } from "@/lib/content";

const hangs = [
  { cell: "md:col-span-7", still: "aspect-16/10", sizes: "(min-width: 768px) 58vw, 100vw" },
  { cell: "md:col-span-5", still: "aspect-4/5", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-4", still: "aspect-4/5", sizes: "(min-width: 768px) 33vw, 100vw" },
  { cell: "md:col-span-8", still: "aspect-16/10", sizes: "(min-width: 768px) 66vw, 100vw" },
  { cell: "md:col-span-6", still: "aspect-5/4", sizes: "(min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-6", still: "aspect-5/4", sizes: "(min-width: 768px) 50vw, 100vw" },
] as const;

export function HomeWall() {
  return (
    <ul className="grid grid-cols-1 items-start gap-x-5 gap-y-10 px-4 pb-16 md:grid-cols-12 md:px-7">
      {projects.map((project, i) => {
        const hang = hangs[i % hangs.length];
        return (
          <li key={project.slug} className={hang.cell}>
            <Link href={`/work/${project.slug}`} className="group block no-underline">
              <CoverStill
                project={project}
                priority={i < 4}
                sizes={hang.sizes}
                className={`${hang.still} w-full`}
              />
              <p className="spec mt-3 text-mute">
                {String(i + 1).padStart(2, "0")}
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <h2 className="display-title mt-2 text-[clamp(1.35rem,2.2vw,1.85rem)] group-hover:text-mute">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-mute">{discipline(project)}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
