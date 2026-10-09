import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { KindBadge } from "@/components/kind-badge";
import { LoopVideo } from "@/components/loop-video";
import { Mock } from "@/components/mocks";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import type { Block, Decision, Project } from "@/lib/types";

function Section({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="grid gap-x-10 gap-y-8 border-t border-line py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-md mt-3">{heading}</h2>
          </div>
        </div>
        <div className="md:col-span-8">{children}</div>
      </section>
    </Reveal>
  );
}

function Intro({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="lede copy mb-8 text-mute">{text}</p>;
}

function DecisionItem({ item, index }: { item: Decision; index: number }) {
  return (
    <li className="border-t border-line py-7 first:border-t-0 first:pt-0">
      <div className="flex gap-5">
        <span className="eyebrow w-7 shrink-0 pt-2 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="display-md text-[1.375rem] md:text-[1.5rem]">
            {item.title}
          </h3>
          <p className="copy mt-3 text-mute">{item.why}</p>
          {item.tradeoff ? (
            <p className="copy mt-4 rounded-xl bg-sunken px-4 py-3 text-[0.9375rem]">
              <span className="font-semibold">Trade-off. </span>
              {item.tradeoff}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <div className="space-y-5">
            {block.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="lede copy">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      );

    case "points":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <ul
            className={`grid gap-4 ${
              block.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {block.items.map((item) => (
              <li key={item.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "decisions":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <ol>
            {block.items.map((item, index) => (
              <DecisionItem key={item.title} item={item} index={index} />
            ))}
          </ol>
        </Section>
      );

    case "copy":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <ul className="space-y-4">
            {block.pairs.map((pair) => (
              <li key={pair.before} className="card overflow-hidden">
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-line bg-sunken px-5 py-4 sm:border-b-0 sm:border-r">
                    <p className="eyebrow">Before</p>
                    <p className="mt-1.5 text-mute line-through decoration-mute/50">
                      {pair.before}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="eyebrow">After</p>
                    <p className="mt-1.5 font-medium">{pair.after}</p>
                  </div>
                </div>
                <p className="border-t border-line px-5 py-3 text-sm text-mute">
                  {pair.note}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "steps":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <ol className="space-y-3">
            {block.items.map((item, index) => (
              <li key={item.title} className="card flex gap-4 p-5 md:p-6">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-bg tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mute">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      );

    case "table":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <div className="card overflow-x-auto" tabIndex={0}>
            <table className="w-full min-w-[560px] border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr>
                  {block.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="eyebrow border-b border-line bg-sunken px-5 py-3"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr
                    key={row[0]}
                    className="border-b border-line last:border-b-0"
                  >
                    {row.map((cell, index) =>
                      index === 0 ? (
                        <th
                          key={cell}
                          scope="row"
                          className="px-5 py-4 align-top font-semibold"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td
                          key={cell}
                          className="px-5 py-4 align-top leading-relaxed text-mute"
                        >
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      );

    case "snippet":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <Intro text={block.intro} />
          <figure>
            <pre
              tabIndex={0}
              aria-label={block.caption}
              className="overflow-x-auto rounded-card bg-ink p-5 font-mono text-[0.8125rem] leading-relaxed text-bg md:p-6"
            >
              <code data-language={block.language}>{block.code}</code>
            </pre>
            <figcaption className="mt-3 text-sm text-mute">
              {block.caption}
            </figcaption>
          </figure>
        </Section>
      );

    case "next":
      return (
        <Section eyebrow={block.eyebrow} heading={block.heading}>
          <ul className="space-y-4">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 copy">
                <LuArrowRight
                  aria-hidden
                  className="mt-1.5 size-4 shrink-0 text-accent"
                />
                <span className="lede">{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "figure":
      return (
        <Reveal className="py-6 md:py-8">
          <figure>
            <div
              className="relative overflow-hidden rounded-card border border-line bg-sunken"
              style={{ aspectRatio: block.media.ratio }}
            >
              <Image
                src={block.media.src}
                alt={block.media.alt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 max-w-[70ch] text-sm text-mute">
              {block.caption}
            </figcaption>
          </figure>
        </Reveal>
      );

    case "mock":
      return (
        <Reveal className="py-6 md:py-8">
          <figure>
            <p className="eyebrow mb-3">{block.label}</p>
            <div className="overflow-hidden rounded-card">
              <Mock id={block.id} />
            </div>
            <figcaption className="mt-3 max-w-[70ch] text-sm text-mute">
              {block.caption}
            </figcaption>
          </figure>
        </Reveal>
      );
  }
}

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-snug">{children}</dd>
    </div>
  );
}

export function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const concept = project.kind === "concept";

  return (
    <article>
      <header className="wrap pb-10 pt-10 md:pb-14 md:pt-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-mute no-underline transition-colors hover:text-ink"
        >
          <LuArrowLeft aria-hidden className="size-4" /> All work
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <KindBadge kind={project.kind} />
          <span className="eyebrow">{project.year}</span>
        </div>
        <h1 className="display-xl mt-5 max-w-[16ch]">{project.title}</h1>
        <p className="display-md mt-6 max-w-[34ch] font-normal text-mute">
          {project.tagline}
        </p>

        <dl className="mt-12 grid gap-x-8 gap-y-7 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Meta label="Role">{project.role}</Meta>
          <Meta label="Platform">{project.platform}</Meta>
          <Meta label={concept ? "Made with" : "Built with"}>
            {project.tools.join(", ")}
          </Meta>
          <Meta label="Links">
            {project.links.length ? (
              <span className="flex flex-wrap gap-x-5 gap-y-1">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-u inline-flex items-center gap-1"
                  >
                    {link.label}
                    <LuArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                ))}
              </span>
            ) : (
              <span className="text-mute">
                {project.cover.type === "type"
                  ? "Written case study, no screens"
                  : "Screens are on this page"}
              </span>
            )}
          </Meta>
        </dl>
      </header>

      <div className="wrap">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-line">
          {project.video ? (
            <>
              <ProjectCover
                project={project}
                sizes="(min-width: 1280px) 1200px, 100vw"
                priority
                className="absolute inset-0"
              />
              <LoopVideo
                src={project.video.src}
                poster={project.video.poster}
                label={`${project.title} walkthrough, looping and silent`}
                className="absolute inset-0 size-full object-cover"
              />
            </>
          ) : (
            <ProjectCover
              project={project}
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
              className="absolute inset-0"
            />
          )}
        </div>

        {concept ? (
          <aside
            aria-label="About this project"
            className="mt-6 flex gap-4 rounded-card border border-line bg-surface p-5 md:p-6"
          >
            <span aria-hidden className="w-1 shrink-0 rounded-full bg-accent" />
            <p className="max-w-[78ch] text-[0.9375rem] leading-relaxed">
              <span className="font-semibold">Concept project. </span>
              Self-initiated design exercise, not built for a client. No real
              users, data or results are claimed.{" "}
              {project.cover.type === "type"
                ? "This is a written case study, so the reasoning, specs and test plan are the work."
                : "The screens are built in code so spacing and states are real, and every name and number is made up."}
            </p>
          </aside>
        ) : null}

        <div className="mt-10 md:mt-16">
          {project.blocks.map((block, index) => (
            <BlockView key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </div>

      <nav
        aria-label="More work"
        className="wrap mt-10 grid gap-4 border-t border-line pt-10 md:mt-16 md:grid-cols-2"
      >
        {[
          { label: "Previous", project: prev, align: "" },
          { label: "Next", project: next, align: "md:text-right" },
        ].map(({ label, project: p, align }) => (
          <Link
            key={label}
            href={`/work/${p.slug}`}
            className={`card group block p-6 no-underline transition-colors hover:border-ink md:p-8 ${align}`}
          >
            <p className="eyebrow">{label}</p>
            <p className="display-md mt-3">{p.title}</p>
            <p className="mt-2 text-mute">{p.tagline}</p>
          </Link>
        ))}
      </nav>
    </article>
  );
}
