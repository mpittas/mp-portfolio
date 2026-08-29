import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: site.aboutSub,
};

export default function AboutPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-rule/40 px-4 py-16 md:px-7 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-7">
          <div className={site.portrait ? "md:col-span-7" : "md:col-span-8"}>
            <p className="spec text-mute">{site.role}</p>
            <h1 className="display-title mt-4 text-[clamp(3.5rem,10vw,7rem)]">
              {site.aboutHeading}
            </h1>
            <p className="mt-6 max-w-xl text-2xl leading-snug">{site.aboutSub}</p>
            {(site.aboutParagraphs ?? []).map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-6 max-w-xl text-lg leading-snug text-mute"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {site.portrait ? (
            <figure className="md:col-span-5">
              <div className="relative aspect-square overflow-hidden bg-plate">
                <Image
                  src={site.portrait}
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 768px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
              {(site.aboutPhotos ?? []).map((photo) => (
                <div
                  key={photo}
                  className="relative mt-7 aspect-square overflow-hidden bg-plate"
                >
                  <Image
                    src={photo}
                    alt={`Photo of ${site.name}`}
                    fill
                    quality={90}
                    loading="lazy"
                    sizes="(min-width: 768px) 40vw, 92vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </figure>
          ) : null}
        </div>
      </section>

      {site.experience.length > 0 ? (
        <section className="grid gap-16 px-4 py-16 md:grid-cols-12 md:px-7 md:py-24">
          <div className="md:col-span-7">
            <h2 className="spec text-mute">Work experience</h2>
            <ul className="mt-8 divide-y divide-rule/40 border-y border-rule/40">
              {site.experience.map((job) => (
                <li key={`${job.role}-${job.dates}`} className="py-6">
                  <p className="text-2xl font-display font-normal leading-none tracking-tight">
                    {job.role}
                  </p>
                  <p className="mt-2 text-ink">{job.org}</p>
                  <p className="spec mt-2 text-mute">{job.dates}</p>
                </li>
              ))}
            </ul>
          </div>
          {site.education.length > 0 || site.cvUrl ? (
            <div className="md:col-span-4 md:col-start-9">
              {site.education.length > 0 ? (
                <>
                  <h2 className="spec text-mute">Education</h2>
                  <ul className="mt-8 space-y-5">
                    {site.education.map((item) => (
                      <li key={item} className="text-lg leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {site.cvUrl ? (
                <a
                  href={site.cvUrl}
                  className="spec mt-10 inline-block bg-ink px-7 py-4 text-board no-underline hover:bg-mute"
                  download="Marios_Pittas_CV.pdf"
                >
                  Download CV
                </a>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {site.other.length > 0 ? (
        <section className="border-t border-rule/40 px-4 py-16 md:px-7 md:py-24">
          <h2 className="spec text-mute">Teaching, jury, workshops</h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {site.other.map((item) => (
              <li key={item.text} className="text-lg leading-snug">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-ink underline decoration-rule underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="border-t border-rule/40 px-4 py-16 md:px-7 md:py-24">
        <Link
          href="/contact"
          className="spec inline-block border border-ink px-7 py-4 text-ink no-underline hover:bg-ink hover:text-board"
        >
          Contact me
        </Link>
      </section>
    </main>
  );
}
