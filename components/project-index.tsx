import Image from "next/image";
import Link from "next/link";
import { discipline, projects } from "@/lib/content";

const spans = [
  "md:col-span-8",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-12",
];

export function ProjectIndex() {
  return (
    <section id="index" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="spec text-mute">Full catalog</p>
          <h2 className="display-title mt-3 text-[clamp(2.8rem,8vw,6rem)]">
            All {projects.length} works
          </h2>
        </div>
        <p className="max-w-sm text-mute">
          Logo, packaging, identity, editorial, and motion.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {projects.map((project, i) => {
          const gif = project.cover?.endsWith(".gif");
          return (
            <li key={project.slug} className={spans[i % spans.length]}>
              <Link href={`/work/${project.slug}`} className="group block no-underline">
                <div className="relative aspect-4/3 overflow-hidden bg-plate">
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      unoptimized={gif}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 60vw, 100vw"
                    />
                  ) : null}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-normal leading-none tracking-tight text-ink md:text-3xl">
                    {project.title.replace(" - ", " — ")}
                  </h3>
                  <span className="spec shrink-0 text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-mute">{discipline(project)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
