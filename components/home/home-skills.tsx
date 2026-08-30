"use client";

import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GROUPS = [
  {
    name: "Interface",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Motion",
    tools: ["GSAP", "Lenis", "CSS Animation", "Micro-interactions"],
  },
  {
    name: "Design",
    tools: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
  },
  {
    name: "Platforms",
    tools: ["Webflow", "WordPress", "Strapi", "Headless CMS"],
  },
  {
    name: "Craft",
    tools: ["Accessibility", "Performance", "SEO", "Testing"],
  },
] as const;

const TOTAL = String(GROUPS.length).padStart(2, "0");

export function HomeSkills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.utils.toArray<HTMLElement>("[data-aside]", el);
        const items = gsap.utils.toArray<HTMLElement>("[data-item]", el);

        gsap.set(intro, { autoAlpha: 0, y: 26 });
        items.forEach((item) => {
          const name = item.querySelector<HTMLElement>("[data-name-inner]");
          const meta = item.querySelectorAll<HTMLElement>("[data-meta]");
          if (name) gsap.set(name, { yPercent: 115 });
          if (meta.length) gsap.set(meta, { autoAlpha: 0, y: 12 });
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(intro, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.09,
            });
          },
        });

        items.forEach((item) => {
          const name = item.querySelector<HTMLElement>("[data-name-inner]");
          const meta = item.querySelectorAll<HTMLElement>("[data-meta]");

          ScrollTrigger.create({
            trigger: item,
            start: "top 86%",
            once: true,
            onEnter: () => {
              const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
              if (name) {
                tl.to(name, { yPercent: 0, duration: 0.9, ease: "power4.out" }, 0);
              }
              if (meta.length) {
                tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.18);
              }
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="skills-heading"
      className="px-4 pt-24 pb-20 md:px-7 md:pt-36 md:pb-28"
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-x-10">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p data-aside className="spec text-mute">(Toolkit)</p>
            <h2
              id="skills-heading"
              data-aside
              className="mt-4 max-w-sm text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.05] font-normal tracking-[-0.02em]"
            >
              What I build with.
            </h2>
            <p data-aside className="mt-5 max-w-sm text-mute">
              Ten years between design files and the browser. I reach for tools
              that keep ideas moving: fast to prototype, clean to ship, simple
              to maintain.
            </p>
            <div data-aside aria-hidden className="mt-10 flex items-end gap-2">
              <span className="block h-[0.9em] overflow-hidden text-[2.25rem] leading-[0.9]">
                <span
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateY(-${active * 0.9}em)` }}
                >
                  {GROUPS.map((group, i) => (
                    <span
                      key={group.name}
                      className="flex h-[0.9em] items-end justify-start"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ))}
                </span>
              </span>
              <span className="text-[2.25rem] leading-[0.9] text-mute">
                /{TOTAL}
              </span>
            </div>
            <p data-aside aria-hidden className="spec mt-3 text-mute">
              {GROUPS[active].name}
            </p>
          </div>
        </aside>

        <ul className="md:col-span-8">
          {GROUPS.map((group, i) => (
            <li
              key={group.name}
              data-item
              className="group py-7 md:py-9"
              onPointerEnter={() => setActive(i)}
            >
              <div className="overflow-hidden">
                <h3
                  data-name-inner
                  className="skill-name pb-[0.16em] text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[0.95] font-normal tracking-[-0.03em]"
                >
                  {group.name}
                </h3>
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {group.tools.map((tool, ti) => (
                  <li
                    key={tool}
                    data-meta
                    className="spec text-mute transition-colors duration-300 [transition-delay:calc(var(--i)*35ms)] group-hover:text-ink"
                    style={{ "--i": ti } as CSSProperties}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 flex flex-col gap-2 md:mt-28 md:flex-row md:items-baseline md:justify-between">
        <p className="spec text-mute">( Always learning )</p>
        <p className="spec text-mute">
          Now exploring WebGL, shaders, and AI-assisted workflows
        </p>
      </div>
    </section>
  );
}
