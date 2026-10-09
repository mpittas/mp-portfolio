import Link from "next/link";
import { MinimalWorkList } from "@/components/home/minimal-work-list";
import { projects, site } from "@/lib/content";

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
        <MinimalWorkList projects={projects} />
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
