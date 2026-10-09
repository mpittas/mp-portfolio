import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { ProjectCover } from "@/components/project-cover";
import { getProject, site } from "@/lib/content";

const card =
  "absolute w-[82%] aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out";

/** Three real screens, fanned out. Spreads a little on hover. */
function Deck() {
  const clearing = getProject("clearing");

  return (
    <div
      className="group relative mx-auto aspect-[1/1.05] w-full max-w-[540px]"
      aria-hidden
    >
      <div
        className={`${card} right-0 top-0 rotate-[3deg] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[5deg]`}
      >
        <Image
          src="/media/notion/know-your-geo/home.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 450px, 80vw"
          className="object-cover"
        />
      </div>
      <div
        className={`${card} left-0 top-[27%] -rotate-[3deg] group-hover:-translate-x-2 group-hover:-rotate-[5deg]`}
      >
        <Image
          src="/media/notion/klndr/planner.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 450px, 80vw"
          className="origin-[50%_32%] scale-[1.7] object-cover"
        />
      </div>
      {clearing ? (
        <div
          className={`${card} bottom-0 right-[3%] rotate-[1.5deg] group-hover:translate-y-2 group-hover:rotate-[3deg]`}
        >
          <ProjectCover
            project={clearing}
            sizes="(min-width: 1024px) 450px, 80vw"
            className="absolute inset-0"
          />
        </div>
      ) : null}
    </div>
  );
}

export function Hero() {
  return (
    <section className="wrap pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="chip bg-surface">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </p>
          <h1 className="display-xl mt-7 max-w-[15ch]">{site.headline}</h1>
          <p className="lede mt-7 max-w-[50ch] text-mute">{site.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#work" className="btn btn-primary">
              See selected work
              <LuArrowRight aria-hidden className="size-4" />
            </Link>
            <a href={site.cvUrl} download className="btn btn-secondary">
              Download CV
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <Deck />
        </div>
      </div>

      <dl className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 md:mt-24">
        {site.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="display-lg">{stat.value}</dt>
            <dd className="mt-2 max-w-[28ch] text-[0.9375rem] leading-snug text-mute">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
