import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { KindBadge } from "@/components/kind-badge";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";

export function Work() {
  const visual = projects.filter((project) => project.cover.type !== "type");
  const written = projects.filter((project) => project.cover.type === "type");
  const [featured, ...rest] = visual;

  return (
    <section id="work" className="border-t border-line">
      <div className="wrap section">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">Selected work</p>
            <h2 className="display-lg mt-3">
              Products I designed and built, and concepts that show how I think.
            </h2>
          </div>
          <p className="copy text-mute md:col-span-4 md:col-start-9 md:self-end">
            Three live products I designed and built myself, and two concepts
            with screens. Every project is labelled as shipped or concept, so
            you always know what is real.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <Reveal>
            <ProjectCard project={featured} featured priority />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2">
            {rest.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        {written.length > 0 ? (
          <div className="mt-20 md:mt-28">
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <p className="eyebrow">Written case studies</p>
                <h3 className="display-md mt-3 max-w-[22ch]">
                  Four more concepts, written up in full.
                </h3>
              </div>
              <p className="copy text-mute md:col-span-4 md:col-start-9 md:self-end">
                No screens, only the thinking: the problem, the principles, the
                decisions and trade-offs, and how I would test each one.
              </p>
            </div>

            <ul className="mt-10">
              {written.map((project) => (
                <li key={project.slug}>
                  <Reveal>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group grid items-baseline gap-x-8 gap-y-3 border-t border-line py-7 no-underline md:grid-cols-12"
                    >
                      <div className="md:col-span-4">
                        <KindBadge kind={project.kind} />
                        <h4 className="display-md mt-3 flex items-start gap-2">
                          {project.title}
                          <LuArrowUpRight
                            aria-hidden
                            className="mt-1 size-5 shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </h4>
                      </div>
                      <div className="md:col-span-5">
                        <p className="font-medium">{project.tagline}</p>
                        <p className="copy mt-2 text-[0.9375rem] text-mute">
                          {project.summary}
                        </p>
                      </div>
                      <ul
                        className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end"
                        aria-label="Scope"
                      >
                        {project.scope.map((item) => (
                          <li key={item} className="chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="border-t border-line" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
