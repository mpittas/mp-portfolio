"use client";

import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SKILL_GROUPS,
  SKILL_INTRO,
  type Skill,
} from "@/components/home/skills-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeSkills() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Skill | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;

          const elements = el.querySelectorAll("[data-fade]");
          gsap.set(elements, { autoAlpha: 0, y: 12 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "power3.out",
              });
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby={`${sectionId}-heading`}
      className="border-t border-rule/40 px-4 py-12 md:px-7 md:py-16"
    >
      {/* Header */}
      <div
        data-fade
        className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between"
      >
        <h2
          id={`${sectionId}-heading`}
          className="text-xl font-normal tracking-tight text-ink md:text-2xl"
        >
          What I build with.
        </h2>
        <p className="max-w-md text-sm text-mute leading-relaxed">
          {SKILL_INTRO}
        </p>
      </div>

      {/* 5-Column Minimal Grid */}
      <div
        data-fade
        className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5 md:gap-x-8 border-t border-rule/40 pt-8"
      >
        {SKILL_GROUPS.map((group, idx) => (
          <div key={group.name} className="flex flex-col">
            <div className="flex items-baseline gap-2 border-b border-rule/30 pb-2.5">
              <span className="spec text-xs text-mute">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-medium tracking-tight text-ink">
                {group.name}
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {group.tools.map((tool) => {
                const isSelected = active?.name === tool.name;
                return (
                  <li key={tool.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setActive((prev) =>
                          prev?.name === tool.name ? null : tool,
                        )
                      }
                      onPointerEnter={(e) => {
                        if (e.pointerType === "touch") return;
                        setActive(tool);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "touch") return;
                        setActive((prev) =>
                          prev?.name === tool.name ? null : prev,
                        );
                      }}
                      onFocus={() => setActive(tool)}
                      onBlur={() =>
                        setActive((prev) =>
                          prev?.name === tool.name ? null : prev,
                        )
                      }
                      className={`text-left transition-colors cursor-pointer select-none ${
                        isSelected
                          ? "text-ink font-medium"
                          : "text-mute hover:text-ink"
                      }`}
                    >
                      {tool.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Quiet Detail Caption */}
      <div
        data-fade
        className="mt-8 flex min-h-[2.5rem] items-baseline justify-between border-t border-rule/40 pt-4 text-xs text-mute"
      >
        <span className="transition-opacity duration-150">
          {active ? (
            <>
              <span className="font-medium text-ink">{active.name}</span>
              <span className="mx-2 text-rule">—</span>
              <span className="text-ink/80">{active.detail}</span>
            </>
          ) : (
            <span className="spec">( 20 tools across 5 disciplines )</span>
          )}
        </span>
        <span className="spec hidden md:inline">( Always learning )</span>
      </div>
    </section>
  );
}
