import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: site.aboutSub,
};

export default function AboutPage() {
  return (
    <main>
      <section className="wrap pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow">About</p>
            <h1 className="display-lg mt-4 max-w-[18ch]">{site.aboutSub}</h1>
            <div className="mt-8 space-y-5">
              {site.aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="lede copy text-mute first:text-ink"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.cvUrl} download className="btn btn-primary">
                <LuDownload aria-hidden className="size-4" />
                Download CV
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Get in touch
              </Link>
            </div>
          </div>
          <figure className="md:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-sunken">
              <Image
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-mute">
              {site.location}. {site.interests}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow">What I am looking for</p>
              <h2 className="display-md mt-3">The next role.</h2>
            </Reveal>
            <ul className="space-y-4 md:col-span-8">
              {site.lookingFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <LuArrowRight
                    aria-hidden
                    className="mt-2 size-4 shrink-0 text-accent"
                  />
                  <Reveal>
                    <span className="lede copy">{item}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow">Toolbox</p>
              <h2 className="display-md mt-3">What I work with.</h2>
            </Reveal>
            <div className="space-y-8 md:col-span-8">
              {site.toolbox.map((group) => (
                <Reveal key={group.group}>
                  <h3 className="eyebrow">{group.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="chip bg-surface">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow">Experience</p>
              <h2 className="display-md mt-3">Where I have worked.</h2>
            </Reveal>
            <ul className="md:col-span-8">
              {site.experience.map((job) => (
                <li key={`${job.org}-${job.dates}`}>
                  <Reveal>
                    <div className="border-t border-line py-8 first:border-t-0 first:pt-0">
                      <p className="eyebrow tabular-nums">{job.dates}</p>
                      <h3 className="display-md mt-2 text-[1.5rem]">
                        {job.role}
                        <span className="text-mute"> at {job.org}</span>
                      </h3>
                      <p className="copy mt-2 text-mute">{job.summary}</p>
                      <ul className="copy mt-4 space-y-2">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-[0.9375rem]"
                          >
                            <span
                              aria-hidden
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow">Education and languages</p>
              <h2 className="display-md mt-3">How I learned.</h2>
            </Reveal>
            <div className="grid gap-10 sm:grid-cols-2 md:col-span-8">
              <Reveal>
                <ul className="space-y-5">
                  {site.education.map((item) => (
                    <li key={item.title}>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-[0.9375rem] text-mute">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <ul className="space-y-5">
                  {site.languages.map((item) => (
                    <li key={item.name}>
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-[0.9375rem] text-mute">
                        {item.level}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
