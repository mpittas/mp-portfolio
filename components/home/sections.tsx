import Link from "next/link";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export function Capabilities() {
  return (
    <section className="border-t border-line">
      <div className="wrap section">
        <Reveal>
          <p className="eyebrow">What I do</p>
          <h2 className="display-lg mt-3 max-w-[20ch]">
            Four skills that make the handoff disappear.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {site.capabilities.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 2) * 90} className="h-full">
                <div className="card flex h-full flex-col p-7 md:p-9">
                  <span className="eyebrow tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-4">{item.title}</h3>
                  <p className="copy mt-3 text-mute">{item.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="border-t border-line">
      <div className="wrap section">
        <Reveal>
          <p className="eyebrow">How I work</p>
          <h2 className="display-lg mt-3 max-w-[18ch]">
            Understand first. Polish last.
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {site.process.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 70}>
                <div className="border-t-2 border-ink pt-4">
                  <span className="eyebrow tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-3 text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="border-t border-line">
      <div className="wrap section">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Experience</p>
            <h2 className="display-lg mt-3">From pixels to product.</h2>
            <p className="copy mt-5 text-mute">
              Design and front-end roles since 2016, with design-led work at the
              centre.
            </p>
            <Link
              href="/about"
              className="link-u mt-6 inline-flex items-center gap-2 font-medium"
            >
              More about me <LuArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
          <ul className="md:col-span-8">
            {site.experience.map((job) => (
              <li key={`${job.org}-${job.dates}`}>
                <Reveal>
                  <div className="grid gap-2 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-8">
                    <p className="eyebrow pt-1.5 tabular-nums">{job.dates}</p>
                    <div>
                      <h3 className="display-md text-[1.375rem]">
                        {job.role}
                        <span className="text-mute"> at {job.org}</span>
                      </h3>
                      <p className="copy mt-2 text-mute">{job.summary}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function OtherWork() {
  return (
    <section className="border-t border-line">
      <div className="wrap section">
        <Reveal>
          <p className="eyebrow">More work</p>
          <h2 className="display-lg mt-3 max-w-[20ch]">
            Websites and UI concepts.
          </h2>
        </Reveal>
        <ul className="mt-10">
          {site.otherWork.map((item) => (
            <li key={item.title}>
              <Reveal>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid items-baseline gap-x-8 gap-y-2 border-t border-line py-6 no-underline last:border-b md:grid-cols-12"
                >
                  <h3 className="display-md md:col-span-3">{item.title}</h3>
                  <p className="eyebrow md:col-span-3">
                    {item.kind}, {item.year}
                  </p>
                  <p className="copy text-mute md:col-span-4">{item.note}</p>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium md:col-span-2 md:justify-end">
                    <span className="link-u">{item.linkLabel}</span>
                    <LuArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="wrap pb-20 md:pb-28">
      <Reveal>
        <div className="rounded-card bg-ink p-8 text-bg md:p-16">
          <p className="eyebrow !text-bg/60">Hiring a product designer?</p>
          <h2 className="display-lg mt-4 max-w-[18ch]">
            Let&apos;s design something people understand on the first try.
          </h2>
          <p className="lede mt-5 max-w-[48ch] text-bg/70">
            Email is the fastest way to reach me.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="btn bg-accent text-accent-ink hover:bg-bg"
            >
              Email me
            </a>
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer"
              className="btn border-bg/40 text-bg hover:bg-bg hover:text-ink"
            >
              Connect on LinkedIn
            </a>
            <Link
              href="/contact"
              className="btn border-transparent text-bg/80 hover:text-bg"
            >
              Use the form
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
