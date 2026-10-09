import Link from "next/link";
import { discipline, projects, site } from "@/lib/content";

export function HomeMinimal() {
  return (
    <main className="px-4 md:px-7">
      <section className="border-b border-rule/40 pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="spec text-mute">{site.role}</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
          {site.intro}
        </p>
      </section>

      <section aria-labelledby="work-heading" className="pt-10 pb-16">
        <h2 id="work-heading" className="spec text-mute">
          Selected work
        </h2>
        <ul className="mt-4 border-t border-rule/40">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-rule/40 py-5 no-underline transition-colors hover:text-ink md:py-6"
              >
                <span className="spec col-span-2 text-mute md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 font-display text-2xl leading-none md:col-span-5 md:text-3xl">
                  {project.title}
                </span>
                <span className="col-span-10 col-start-3 text-mute md:col-span-4 md:col-start-auto">
                  {discipline(project)}
                </span>
                <span className="spec col-span-12 text-end text-mute transition-colors group-hover:text-ink md:col-span-2 md:col-start-auto">
                  {project.year} &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="spec flex flex-wrap gap-x-8 gap-y-3 border-t border-rule/40 py-10">
        <Link href="/contact" className="no-underline hover:underline">
          Contact
        </Link>
        <a href={site.cvUrl} className="no-underline hover:underline">
          CV
        </a>
        {site.socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
          >
            {social.label}
          </a>
        ))}
      </section>
    </main>
  );
}
