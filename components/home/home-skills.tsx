"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
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

type PointerSample = {
  x: number;
  y: number;
  rawVx: number;
  rawVy: number;
  vx: number;
  vy: number;
  speed: number;
  acceleration: number;
  momentum: number;
  directionality: number;
  t: number;
};

const OPEN_CLIP = "inset(0% 0% 0% 0%)";
const CLOSED_CLIP = "inset(50% 50% 50% 50%)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function originFromEvent(el: HTMLElement, clientX: number, clientY: number) {
  const box = el.getBoundingClientRect();
  return {
    x: gsap.utils.clamp(4, 96, ((clientX - box.left) / box.width) * 100),
    y: gsap.utils.clamp(4, 96, ((clientY - box.top) / box.height) * 100),
    box,
  };
}

/** Iris reveal: a circle anchored to the pointer that blooms to cover the cell. */
function circleAt(x: number, y: number, radius: number) {
  return `circle(${radius}% at ${x}% ${y}%)`;
}

function motionFromSample(sample: PointerSample) {
  // Blend speed, acceleration and retained momentum. The smoothstep removes
  // visible threshold jumps between calm and fast pointer movement.
  const speedEnergy = gsap.utils.clamp(0, 1, sample.speed / 1.25);
  const accelerationEnergy = gsap.utils.clamp(
    0,
    1,
    sample.acceleration / 0.045,
  );
  const momentumEnergy = gsap.utils.clamp(0, 1, sample.momentum / 1.1);
  const rawIntensity =
    speedEnergy * 0.56 +
    accelerationEnergy * 0.18 +
    momentumEnergy * 0.26;
  const intensity = rawIntensity * rawIntensity * (3 - 2 * rawIntensity);
  const open = gsap.utils.interpolate(1.15, 0.62, intensity);
  const close = gsap.utils.interpolate(0.72, 0.4, intensity);
  const ease = intensity > 0.62 ? "power3.out" : "power2.inOut";
  const drift = gsap.utils.interpolate(3, 10, intensity);
  return { intensity, open, close, ease, drift };
}

export function HomeSkills() {
  const root = useRef<HTMLElement>(null);
  const pointer = useRef<PointerSample>({
    x: 0,
    y: 0,
    rawVx: 0,
    rawVy: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    acceleration: 0,
    momentum: 0,
    directionality: 0,
    t: 0,
  });
  const [active, setActive] = useState<Cell | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;

          const heading = el.querySelector<HTMLElement>("[data-heading-inner]");
          const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", el);
          const reveals = gsap.utils.toArray<HTMLElement>("[data-fade]", el);
          const fine = Boolean(ctx.conditions?.fine);

          if (heading) gsap.set(heading, { yPercent: 115 });
          gsap.set(reveals, { autoAlpha: 0, y: 16 });
          // Touch: keep cells visible so taps never hit an autoAlpha:0 layer.
          // Desktop: staggered reveal as before.
          if (fine) gsap.set(cells, { autoAlpha: 0, y: 24 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 78%",
            once: true,
            onEnter: () => {
              if (heading) {
                gsap.to(heading, {
                  yPercent: 0,
                  duration: fine ? 0.9 : 0.55,
                  ease: "power4.out",
                });
              }
              gsap.to(reveals, {
                autoAlpha: 1,
                y: 0,
                duration: fine ? 0.6 : 0.4,
                stagger: fine ? 0.08 : 0.04,
                delay: fine ? 0.12 : 0,
                ease: "power3.out",
              });
              if (fine) {
                gsap.to(cells, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                  stagger: { each: 0.04, grid: "auto", from: "start" },
                  delay: 0.2,
                });
              }
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (isCoarsePointer()) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let decay = 0;

    const onMove = (event: PointerEvent) => {
      const samples = event.getCoalescedEvents?.() ?? [event];
      for (const sample of samples) {
        const now = sample.timeStamp || performance.now();
        if (lastT) {
          const dt = gsap.utils.clamp(4, 40, now - lastT);
          const rawVx = (sample.clientX - lastX) / dt;
          const rawVy = (sample.clientY - lastY) / dt;
          const previous = pointer.current;

          // Time-corrected exponential smoothing behaves consistently at
          // 60Hz, 120Hz, and with high-polling-rate mice.
          const alpha = 1 - Math.exp(-dt / 34);
          const vx = gsap.utils.interpolate(previous.vx, rawVx, alpha);
          const vy = gsap.utils.interpolate(previous.vy, rawVy, alpha);
          const speed = Math.hypot(vx, vy);
          const previousSpeed = previous.speed;
          const acceleration = Math.abs(speed - previousSpeed) / dt;
          const momentum = Math.max(speed, previous.momentum * Math.exp(-dt / 150));
          const rawSpeed = Math.hypot(rawVx, rawVy);
          const directionality =
            rawSpeed > 0.001
              ? gsap.utils.clamp(
                  0,
                  1,
                  (rawVx * vx + rawVy * vy) / (rawSpeed * Math.max(speed, 0.001)),
                )
              : 0;

          pointer.current = {
            x: sample.clientX,
            y: sample.clientY,
            rawVx,
            rawVy,
            vx,
            vy,
            speed,
            acceleration:
              previous.acceleration * (1 - alpha) + acceleration * alpha,
            momentum,
            directionality,
            t: performance.now(),
          };
        } else {
          pointer.current = {
            x: sample.clientX,
            y: sample.clientY,
            rawVx: 0,
            rawVy: 0,
            vx: 0,
            vy: 0,
            speed: 0,
            acceleration: 0,
            momentum: 0,
            directionality: 0,
            t: performance.now(),
          };
        }
        lastX = sample.clientX;
        lastY = sample.clientY;
        lastT = now;
      }

      cancelAnimationFrame(decay);
      decay = requestAnimationFrame(function settle() {
        const sample = pointer.current;
        if (performance.now() - sample.t < 48) {
          decay = requestAnimationFrame(settle);
          return;
        }
        pointer.current = {
          ...sample,
          vx: sample.vx * 0.88,
          vy: sample.vy * 0.88,
          speed: sample.speed * 0.88,
          acceleration: sample.acceleration * 0.82,
          momentum: sample.momentum * 0.9,
        };
        if (pointer.current.speed > 0.01) {
          decay = requestAnimationFrame(settle);
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(decay);
    };
  }, []);

  const cells: Cell[] = SKILL_GROUPS.flatMap((group) =>
    group.tools.map((tool) => ({
      name: tool.name,
      detail: tool.detail,
      group: group.name,
    })),
  );

  return (
    <section
      ref={root}
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
        className="relative mt-12 grid grid-cols-2 border-t border-l border-rule/40 md:mt-16 md:grid-cols-4"
        onPointerLeave={(event) => {
          // Touch end fires pointerleave on Safari; that must not clear the open cell.
          if (event.pointerType === "touch" || isCoarsePointer()) return;
          setActive(null);
        }}
      >
        {cells.map((cell, idx) => (
          <SkillCell
            key={cell.name}
            cell={cell}
            index={idx}
            occupied={active?.name === cell.name}
            onActive={setActive}
            pointerRef={pointer}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <p data-fade className="spec text-mute">
          {active ? (
            `( ${active.group} ) ${active.name}`
          ) : (
            <>
              <span className="md:hidden">( 20 cells, one toolkit. Tap a cell )</span>
              <span className="hidden md:inline">
                ( 20 cells, one toolkit. Sweep the grid )
              </span>
            </>
          )}
        </p>
        <p data-fade className="spec text-mute">
          ( Always learning )
        </p>
      </div>
    </section>
  );
}

function SkillCell({
  cell,
  index,
  occupied,
  onActive,
  pointerRef,
}: {
  cell: Cell;
  index: number;
  occupied: boolean;
  onActive: Dispatch<SetStateAction<Cell | null>>;
  pointerRef: MutableRefObject<PointerSample>;
}) {
  const root = useRef<HTMLButtonElement>(null);
  const plate = useRef<HTMLSpanElement>(null);
  const rest = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const detail = useRef<HTMLSpanElement>(null);
  const meta = useRef<HTMLSpanElement>(null);
  const openTween = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      if (isCoarsePointer()) return;
      gsap.set([title.current, detail.current, meta.current], {
        yPercent: 110,
        autoAlpha: 0,
      });
    },
    { scope: root },
  );

  // contextSafe creates an event callback and never executes it during render.
  // eslint-disable-next-line react-hooks/refs
  const close = contextSafe((
    exitSpeed = 0,
    clientX?: number,
    clientY?: number,
    snap = false,
  ) => {
    const plateEl = plate.current;
    if (!plateEl || !openRef.current) return;
    openRef.current = false;
    setExpanded(false);
    onActive((prev) => (prev?.name === cell.name ? null : prev));

    if (isCoarsePointer()) {
      openTween.current?.kill();
      return;
    }

    const resetPlate = () => {
      gsap.set(plateEl, {
        clipPath: CLOSED_CLIP,
        scale: 1,
        autoAlpha: 1,
        willChange: "auto",
      });
      gsap.set(rest.current, { autoAlpha: 1, y: 0 });
      gsap.set([title.current, detail.current, meta.current], {
        yPercent: 110,
        x: 0,
        y: 0,
        autoAlpha: 0,
      });
    };

    if (prefersReducedMotion() || snap) {
      openTween.current?.kill();
      if (snap && !prefersReducedMotion()) {
        gsap.to(plateEl, {
          autoAlpha: 0,
          duration: 0.12,
          ease: "power1.in",
          overwrite: true,
          onComplete: resetPlate,
        });
        return;
      }
      resetPlate();
      return;
    }

    const sample = pointerRef.current;
    const { close: closeDur, intensity, drift } = motionFromSample({
      ...sample,
      speed: Math.max(sample.speed, exitSpeed),
      momentum: Math.max(sample.momentum, exitSpeed),
    });
    const current = openTween.current;

    if (current && current.progress() > 0 && current.progress() < 1) {
      // Mid-open: reverse from where we are, sped up by how hard we leave.
      current.timeScale(gsap.utils.interpolate(1.1, 1.55, intensity)).reverse();
      return;
    }

    // Fully open: the iris sinks back into the point where the cursor exited.
    const el = root.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { x, y } = originFromEvent(
      el,
      clientX ?? rect.left + rect.width / 2,
      clientY ?? rect.top + rect.height / 2,
    );
    const endClip = circleAt(x, y, 0);
    const speed = Math.max(sample.speed, 0.001);
    const exitX = (sample.vx / speed) * drift;
    const exitY = (sample.vy / speed) * drift;

    openTween.current?.kill();
    gsap.set(plateEl, { willChange: "clip-path" });

    const next = gsap.timeline({
      onComplete: () => {
        gsap.set(plateEl, { clipPath: CLOSED_CLIP, scale: 1, willChange: "auto" });
        gsap.set(rest.current, { autoAlpha: 1, y: 0 });
        gsap.set([title.current, detail.current, meta.current], {
          yPercent: 110,
          x: 0,
          y: 0,
          autoAlpha: 0,
        });
      },
    });

    next
      .to(
        [title.current, detail.current, meta.current],
        {
          yPercent: 30,
          x: exitX,
          y: exitY,
          autoAlpha: 0,
          duration: closeDur * 0.4,
          ease: "power2.in",
          stagger: 0.018,
        },
        0,
      )
      .to(
        plateEl,
        {
          clipPath: endClip,
          duration: closeDur,
          ease: "power2.inOut",
        },
        0.03,
      )
      .to(
        rest.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: closeDur * 0.4,
          ease: "power2.out",
        },
        closeDur * 0.6,
      )
      .set(plateEl, { clipPath: CLOSED_CLIP, scale: 1 });

    openTween.current = next;
  });

  // eslint-disable-next-line react-hooks/refs
  const open = contextSafe((clientX: number, clientY: number, snap = false) => {
    const el = root.current;
    const plateEl = plate.current;
    if (!el || !plateEl) return;

    onActive(cell);
    if (openRef.current) return;
    openRef.current = true;
    setExpanded(true);

    if (isCoarsePointer()) {
      openTween.current?.kill();
      return;
    }

    if (prefersReducedMotion() || snap) {
      openTween.current?.kill();
      gsap.set(plateEl, { clipPath: OPEN_CLIP, scale: 1, force3D: true });
      gsap.set(rest.current, { autoAlpha: 0, y: 0 });
      gsap.set([title.current, detail.current, meta.current], {
        yPercent: 0,
        x: 0,
        y: 0,
        autoAlpha: 1,
      });
      if (snap && !prefersReducedMotion()) {
        gsap.fromTo(
          plateEl,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.16, ease: "power1.out", overwrite: true },
        );
      }
      return;
    }

    const sample = pointerRef.current;
    const { open: openDur, ease, intensity, drift } =
      motionFromSample(sample);
    const { x, y } = originFromEvent(el, clientX, clientY);
    // 150% radius covers the farthest corner from any anchor inside the cell.
    const startClip = circleAt(x, y, 0);
    const endClip = circleAt(x, y, 150);
    const speed = Math.max(sample.speed, 0.001);
    const enterX = -(sample.vx / speed) * drift;
    const enterY = -(sample.vy / speed) * drift;

    openTween.current?.kill();
    gsap.set(plateEl, {
      clipPath: startClip,
      scale: 1.07,
      transformOrigin: `${x}% ${y}%`,
      willChange: "clip-path, transform",
    });
    gsap.set(rest.current, { autoAlpha: 1, y: 0 });
    gsap.set([title.current, detail.current, meta.current], {
      yPercent: 110,
      x: enterX,
      y: enterY,
      autoAlpha: 0,
    });

    const next = gsap.timeline({
      onReverseComplete: () => {
        gsap.set(plateEl, {
          clipPath: CLOSED_CLIP,
          scale: 1,
          willChange: "auto",
        });
        gsap.set(rest.current, { autoAlpha: 1, y: 0 });
        gsap.set([title.current, detail.current, meta.current], {
          yPercent: 110,
          x: 0,
          y: 0,
          autoAlpha: 0,
        });
      },
      onComplete: () => {
        gsap.set(plateEl, { willChange: "auto" });
      },
    });

    // Rest label lifts away as the iris blooms; copy rises once the plate has body.
    next
      .to(
        rest.current,
        {
          autoAlpha: 0,
          y: -8,
          duration: openDur * 0.3,
          ease: "power2.out",
        },
        0,
      )
      .to(
        plateEl,
        {
          clipPath: endClip,
          duration: openDur,
          ease,
        },
        0,
      )
      .to(
        plateEl,
        {
          scale: 1,
          duration: openDur * 1.25,
          ease: "expo.out",
        },
        0,
      )
      .to(
        meta.current,
        {
          yPercent: 0,
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: openDur * 0.55,
          ease: "power3.out",
        },
        openDur * gsap.utils.interpolate(0.3, 0.16, intensity),
      )
      .to(
        title.current,
        {
          yPercent: 0,
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: openDur * 0.62,
          ease: "power3.out",
        },
        openDur * gsap.utils.interpolate(0.38, 0.22, intensity),
      )
      .to(
        detail.current,
        {
          yPercent: 0,
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: openDur * 0.7,
          ease: "power3.out",
        },
        openDur * gsap.utils.interpolate(0.48, 0.3, intensity),
      );

    openTween.current = next;
  });

  // eslint-disable-next-line react-hooks/refs
  const openFromCenter = contextSafe(() => {
    const el = root.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    pointerRef.current = {
      ...pointerRef.current,
      rawVx: 0,
      rawVy: 0,
      vx: 0,
      vy: 0,
      speed: 0.08,
      acceleration: 0,
      momentum: 0.08,
      directionality: 0,
    };
    open(box.left + box.width / 2, box.top + box.height / 2, isCoarsePointer());
  });

  useEffect(() => {
    if (!occupied && openRef.current) close(0, undefined, undefined, true);
  }, [occupied, close]);

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || isCoarsePointer()) return;
    open(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || isCoarsePointer()) return;
    close(pointerRef.current.speed, event.clientX, event.clientY);
  };

  const toggleTouch = (clientX: number, clientY: number) => {
    if (openRef.current) close(0.2, clientX, clientY, true);
    else open(clientX, clientY, true);
  };

  // Touch / coarse: activate on click only. pointerup+click double-fire was
  // flashing the plate open then shut on Safari.
  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (!isCoarsePointer()) return;
    toggleTouch(event.clientX, event.clientY);
  };

  const handleFocus = (event: ReactFocusEvent<HTMLButtonElement>) => {
    // Avoid mouse/touch click focusing and double-toggling the plate.
    if (!event.currentTarget.matches(":focus-visible")) return;
    if (event.currentTarget.matches(":hover")) return;
    openFromCenter();
  };

  const handleBlur = () => {
    if (isCoarsePointer()) return;
    if (root.current?.matches(":hover")) return;
    close(0.12);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && openRef.current) {
      event.currentTarget.blur();
      close(0.2);
    }
  };

  const mark = String(index + 1).padStart(2, "0");

  return (
    <button
      ref={root}
      type="button"
      data-cell
      aria-label={`${cell.name}. ${cell.detail}`}
      aria-expanded={expanded}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="relative flex aspect-square cursor-pointer touch-manipulation items-center justify-center overflow-hidden border-r border-b border-rule/40 bg-transparent p-3 text-left font-sans select-none md:p-5"
    >
      <span
        ref={rest}
        data-skill-rest
        className="relative z-10 text-center text-[clamp(0.95rem,1.6vw,1.3rem)] tracking-[-0.01em] text-mute"
      >
        {cell.name}
      </span>
      <span
        ref={plate}
        aria-hidden
        className="skill-plate pointer-events-none absolute inset-0 z-20 flex flex-col justify-between bg-ink px-3 py-3 text-board md:px-5 md:py-5"
      >
        <span
          ref={meta}
          className="spec flex items-start justify-between gap-2 text-[0.625rem] text-board md:gap-3 md:text-[0.8125rem]"
        >
          <span className="shrink-0">{mark}</span>
          <span className="text-right">{cell.group}</span>
        </span>
        <span className="flex min-h-0 flex-col gap-1 md:gap-2">
          <span className="overflow-hidden">
            <span
              ref={title}
              className="block text-[1.0625rem] leading-[1.1] tracking-[-0.02em] md:text-[clamp(1.1rem,2vw,1.5rem)] md:leading-[1.08]"
            >
              {cell.name}
            </span>
          </span>
          <span className="overflow-hidden">
            <span
              ref={detail}
              className="line-clamp-4 block text-[0.8125rem] leading-[1.35] text-board/75 md:line-clamp-5 md:text-[1.0625rem] md:leading-[1.4]"
            >
              {cell.detail}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
