"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS, SKILL_INTRO } from "@/components/home/skills-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Cell = {
  name: string;
  detail: string;
  group: string;
};

type PointerDynamics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  momentum: number;
  acceleration: number;
  time: number;
};

const CELLS: Cell[] = SKILL_GROUPS.flatMap((group) =>
  group.tools.map((tool) => ({
    name: tool.name,
    detail: tool.detail,
    group: group.name,
  })),
);

const CLOSED_CLIP = "inset(50% 50% 50% 50%)";
const OPEN_CLIP = "inset(0% 0% 0% 0%)";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function energyOf(pointer: PointerDynamics) {
  const speed = gsap.utils.clamp(0, 1, pointer.speed / 1.2);
  const momentum = gsap.utils.clamp(0, 1, pointer.momentum / 1.15);
  const acceleration = gsap.utils.clamp(0, 1, pointer.acceleration / 0.04);
  const raw = speed * 0.52 + momentum * 0.34 + acceleration * 0.14;
  return raw * raw * (3 - 2 * raw);
}

function directionalClip(
  pointer: PointerDynamics,
  target: DOMRect,
  entering: boolean,
) {
  const localX = pointer.x - target.left;
  const localY = pointer.y - target.top;
  const distances = {
    left: Math.abs(localX),
    right: Math.abs(target.width - localX),
    top: Math.abs(localY),
    bottom: Math.abs(target.height - localY),
  };

  let edge = (Object.entries(distances).sort(
    (a, b) => a[1] - b[1],
  )[0]?.[0] ?? "left") as keyof typeof distances;

  if (pointer.speed > 0.12) {
    if (Math.abs(pointer.vx) >= Math.abs(pointer.vy)) {
      edge = pointer.vx >= 0 ? "left" : "right";
    } else {
      edge = pointer.vy >= 0 ? "top" : "bottom";
    }
    if (!entering) {
      edge =
        edge === "left"
          ? "right"
          : edge === "right"
            ? "left"
            : edge === "top"
              ? "bottom"
              : "top";
    }
  }

  if (edge === "left") return "inset(0% 100% 0% 0%)";
  if (edge === "right") return "inset(0% 0% 0% 100%)";
  if (edge === "top") return "inset(0% 0% 100% 0%)";
  return "inset(100% 0% 0% 0%)";
}

export function HomeSkills() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number | null>(null);
  const interactionRef = useRef(0);
  const pointerRef = useRef<PointerDynamics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    momentum: 0,
    acceleration: 0,
    time: 0,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);

  const active = activeIndex === null ? null : CELLS[activeIndex];
  const displayed = displayIndex === null ? null : CELLS[displayIndex];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.querySelector<HTMLElement>("[data-heading-inner]");
        const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", root);
        const reveals = gsap.utils.toArray<HTMLElement>("[data-fade]", root);

        if (heading) gsap.set(heading, { yPercent: 115 });
        gsap.set(cells, { autoAlpha: 0, y: 24 });
        gsap.set(reveals, { autoAlpha: 0, y: 16 });

        ScrollTrigger.create({
          trigger: root,
          start: "top 78%",
          once: true,
          onEnter: () => {
            if (heading) {
              gsap.to(heading, {
                yPercent: 0,
                duration: 0.9,
                ease: "power4.out",
              });
            }
            gsap.to(reveals, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              delay: 0.12,
              ease: "power3.out",
            });
            gsap.to(cells, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: { each: 0.04, grid: "auto", from: "start" },
              delay: 0.2,
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let decayFrame = 0;

    const onPointerMove = (event: PointerEvent) => {
      const samples = event.getCoalescedEvents?.() ?? [event];
      for (const sample of samples) {
        const now = sample.timeStamp || performance.now();
        if (lastTime) {
          const dt = gsap.utils.clamp(4, 40, now - lastTime);
          const rawVx = (sample.clientX - lastX) / dt;
          const rawVy = (sample.clientY - lastY) / dt;
          const previous = pointerRef.current;
          const alpha = 1 - Math.exp(-dt / 38);
          const vx = gsap.utils.interpolate(previous.vx, rawVx, alpha);
          const vy = gsap.utils.interpolate(previous.vy, rawVy, alpha);
          const speed = Math.hypot(vx, vy);
          const acceleration = Math.abs(speed - previous.speed) / dt;

          pointerRef.current = {
            x: sample.clientX,
            y: sample.clientY,
            vx,
            vy,
            speed,
            momentum: Math.max(
              speed,
              previous.momentum * Math.exp(-dt / 170),
            ),
            acceleration:
              previous.acceleration * (1 - alpha) + acceleration * alpha,
            time: performance.now(),
          };
        } else {
          pointerRef.current = {
            ...pointerRef.current,
            x: sample.clientX,
            y: sample.clientY,
            time: performance.now(),
          };
        }
        lastX = sample.clientX;
        lastY = sample.clientY;
        lastTime = now;
      }

      cancelAnimationFrame(decayFrame);
      decayFrame = requestAnimationFrame(function decay() {
        const pointer = pointerRef.current;
        if (performance.now() - pointer.time < 52) {
          decayFrame = requestAnimationFrame(decay);
          return;
        }
        pointerRef.current = {
          ...pointer,
          vx: pointer.vx * 0.9,
          vy: pointer.vy * 0.9,
          speed: pointer.speed * 0.9,
          momentum: pointer.momentum * 0.92,
          acceleration: pointer.acceleration * 0.84,
        };
        if (pointerRef.current.momentum > 0.01) {
          decayFrame = requestAnimationFrame(decay);
        }
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(decayFrame);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || displayIndex === null) return;

    if (reducedMotion()) {
      gsap.set(content, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    const pointer = pointerRef.current;
    const energy = energyOf(pointer);
    const speed = Math.max(pointer.speed, 0.001);
    const drift = gsap.utils.interpolate(5, 15, energy);

    gsap.fromTo(
      content,
      {
        autoAlpha: 0,
        x: -(pointer.vx / speed) * drift,
        y: -(pointer.vy / speed) * drift + 8,
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: gsap.utils.interpolate(0.46, 0.25, energy),
        ease: "power4.out",
        overwrite: true,
      },
    );
  }, [displayIndex]);

  useEffect(() => {
    const grid = gridRef.current;
    const plate = plateRef.current;
    if (!grid || !plate) return;

    const observer = new ResizeObserver(() => {
      const index = activeIndexRef.current;
      if (index === null) return;
      const target = grid.querySelector<HTMLElement>(
        `[data-cell-index="${index}"]`,
      );
      if (!target) return;
      const gridBox = grid.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      gsap.set(plate, {
        x: box.left - gridBox.left,
        y: box.top - gridBox.top,
        width: box.width,
        height: box.height,
      });
    });

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      gsap.killTweensOf([plateRef.current, contentRef.current]);
    },
    [],
  );

  const handleActivate = (
    index: number,
    target: HTMLElement,
    clientX?: number,
    clientY?: number,
  ) => {
    const grid = gridRef.current;
    const plate = plateRef.current;
    if (!grid || !plate || activeIndexRef.current === index) return;

    const id = ++interactionRef.current;
    const previousIndex = activeIndexRef.current;
    const gridBox = grid.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const targetX = targetBox.left - gridBox.left;
    const targetY = targetBox.top - gridBox.top;
    const pointer = pointerRef.current;

    if (clientX !== undefined && clientY !== undefined) {
      pointer.x = clientX;
      pointer.y = clientY;
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
    gsap.killTweensOf([plate, contentRef.current]);

    if (reducedMotion()) {
      gsap.set(plate, {
        autoAlpha: 1,
        clipPath: OPEN_CLIP,
        x: targetX,
        y: targetY,
        width: targetBox.width,
        height: targetBox.height,
        scaleX: 1,
        scaleY: 1,
      });
      setDisplayIndex(index);
      return;
    }

    const energy = energyOf(pointer);
    if (previousIndex === null) {
      gsap.set(plate, {
        autoAlpha: 1,
        x: targetX,
        y: targetY,
        width: targetBox.width,
        height: targetBox.height,
        scaleX: 1,
        scaleY: 1,
        clipPath: directionalClip(pointer, targetBox, true),
        willChange: "transform, clip-path",
      });
      setDisplayIndex(index);
      gsap.to(plate, {
        clipPath: OPEN_CLIP,
        duration: gsap.utils.interpolate(0.64, 0.38, energy),
        ease: "expo.out",
        overwrite: true,
        onComplete: () => gsap.set(plate, { willChange: "auto" }),
      });
      return;
    }

    const currentX = Number(gsap.getProperty(plate, "x")) || 0;
    const currentY = Number(gsap.getProperty(plate, "y")) || 0;
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const distance = Math.hypot(dx, dy);
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const stretch = gsap.utils.clamp(
      1.015,
      1.065,
      1 + distance / 5200 + energy * 0.025,
    );
    const duration = gsap.utils.clamp(
      0.3,
      0.56,
      0.32 + distance / 1800 - energy * 0.08,
    );

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        autoAlpha: 0,
        x: gsap.utils.clamp(-14, 14, dx * 0.08),
        y: gsap.utils.clamp(-10, 10, dy * 0.08),
        duration: 0.12,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          if (interactionRef.current === id) setDisplayIndex(index);
        },
      });
    } else {
      setDisplayIndex(index);
    }

    const travel = gsap.timeline({
      onComplete: () => gsap.set(plate, { willChange: "auto" }),
    });
    gsap.set(plate, { willChange: "transform" });
    travel
      .to(
        plate,
        {
          x: targetX,
          y: targetY,
          width: targetBox.width,
          height: targetBox.height,
          duration,
          ease: "power4.out",
          overwrite: true,
        },
        0,
      )
      .to(
        plate,
        {
          scaleX: horizontal ? stretch : 1 / stretch,
          scaleY: horizontal ? 1 / stretch : stretch,
          duration: Math.min(0.16, duration * 0.38),
          ease: "power2.out",
        },
        0,
      )
      .to(
        plate,
        {
          scaleX: 1,
          scaleY: 1,
          duration: duration * 0.72,
          ease: "power4.out",
        },
        duration * 0.25,
      );
  };

  const handleDeactivate = () => {
    const plate = plateRef.current;
    if (!plate || activeIndexRef.current === null) return;

    ++interactionRef.current;
    activeIndexRef.current = null;
    setActiveIndex(null);
    gsap.killTweensOf([plate, contentRef.current]);

    if (reducedMotion()) {
      gsap.set(plate, { autoAlpha: 0, clipPath: CLOSED_CLIP });
      setDisplayIndex(null);
      return;
    }

    const pointer = pointerRef.current;
    const energy = energyOf(pointer);
    const displayedCell = gridRef.current?.querySelector<HTMLElement>(
      `[data-cell-index="${displayIndex ?? 0}"]`,
    );
    const targetBox = displayedCell?.getBoundingClientRect();

    if (contentRef.current) {
      const speed = Math.max(pointer.speed, 0.001);
      gsap.to(contentRef.current, {
        autoAlpha: 0,
        x: (pointer.vx / speed) * 10,
        y: (pointer.vy / speed) * 10,
        duration: 0.16,
        ease: "power2.in",
      });
    }

    gsap.to(plate, {
      clipPath: targetBox
        ? directionalClip(pointer, targetBox, false)
        : CLOSED_CLIP,
      duration: gsap.utils.interpolate(0.46, 0.27, energy),
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        if (activeIndexRef.current !== null) return;
        gsap.set(plate, {
          autoAlpha: 0,
          clipPath: CLOSED_CLIP,
          scaleX: 1,
          scaleY: 1,
        });
        setDisplayIndex(null);
      },
    });
  };

  return (
    <section
      ref={rootRef}
      aria-labelledby="skills-heading"
      className="px-4 py-20 md:px-7 md:py-28"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2
          id="skills-heading"
          className="overflow-hidden text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-normal tracking-[-0.03em]"
        >
          <span data-heading-inner className="block">
            What I build with.
          </span>
        </h2>
        <p data-fade className="max-w-sm text-mute">
          {SKILL_INTRO}
        </p>
      </div>

      <div
        ref={gridRef}
        className="relative mt-12 grid grid-cols-2 border-t border-l border-rule/40 md:mt-16 md:grid-cols-4"
        onPointerLeave={(event) => {
          if (
            event.pointerType !== "touch" &&
            !event.currentTarget.querySelector(":focus-visible")
          ) {
            handleDeactivate();
          }
        }}
      >
        {CELLS.map((cell, index) => (
          <button
            key={cell.name}
            type="button"
            data-cell
            data-cell-index={index}
            aria-label={`${cell.name}. ${cell.detail}`}
            aria-expanded={activeIndex === index}
            onPointerEnter={(event) => {
              if (event.pointerType === "touch") return;
              handleActivate(
                index,
                event.currentTarget,
                event.clientX,
                event.clientY,
              );
            }}
            onPointerUp={(event: ReactPointerEvent<HTMLButtonElement>) => {
              if (event.pointerType !== "touch") return;
              if (activeIndexRef.current === index) handleDeactivate();
              else {
                handleActivate(
                  index,
                  event.currentTarget,
                  event.clientX,
                  event.clientY,
                );
              }
            }}
            onFocus={(event) => {
              if (activeIndexRef.current === index) return;
              const box = event.currentTarget.getBoundingClientRect();
              pointerRef.current = {
                ...pointerRef.current,
                x: box.left + box.width / 2,
                y: box.top + box.height / 2,
                vx: 0,
                vy: 0,
                speed: 0,
                momentum: 0,
                acceleration: 0,
              };
              handleActivate(index, event.currentTarget);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.matches(":hover")) handleDeactivate();
            }}
            onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => {
              if (event.key !== "Escape") return;
              event.currentTarget.blur();
              handleDeactivate();
            }}
            className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden border-r border-b border-rule/40 bg-transparent p-3 text-center font-sans select-none md:p-5"
          >
            <span className="relative z-10 text-[clamp(0.95rem,1.6vw,1.3rem)] tracking-[-0.01em] text-mute">
              {cell.name}
            </span>
          </button>
        ))}

        <div
          ref={plateRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 overflow-hidden bg-ink text-board opacity-0"
          style={{ clipPath: CLOSED_CLIP, transformOrigin: "center" }}
        >
          {displayed ? (
            <div
              ref={contentRef}
              className="flex h-full flex-col justify-between px-3 py-3 md:px-5 md:py-5"
            >
              <div className="spec flex items-start justify-between gap-3 text-board">
                <span>{String(displayIndex! + 1).padStart(2, "0")}</span>
                <span>{displayed.group}</span>
              </div>
              <div className="flex min-h-0 flex-col gap-1.5 md:gap-2">
                <span className="text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.08] tracking-[-0.02em]">
                  {displayed.name}
                </span>
                <span className="line-clamp-4 text-[1.0625rem] leading-snug text-board/75 md:line-clamp-5 md:leading-[1.4]">
                  {displayed.detail}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <p data-fade className="spec text-mute">
          {active
            ? `( ${active.group} ) ${active.name}`
            : "( 20 cells, one toolkit. Sweep the grid )"}
        </p>
        <p data-fade className="spec text-mute">
          ( Always learning )
        </p>
      </div>
    </section>
  );
}
