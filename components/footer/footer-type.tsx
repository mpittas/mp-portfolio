"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/content";
import {
  ContactLink,
  ExternalArrow,
  SocialLinks,
  footerNav,
} from "@/components/footer/footer-socials";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MARK = site.shortName.toLowerCase();
const LOCATION = "Vratsa, Bulgaria";
const CTA = site.contactBody.match(/^[^.!?]+[.!?]/)?.[0]?.trim() ?? site.contactBody;

export function FooterType() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe) return;

      const crop = el.querySelector<HTMLElement>("[data-crop]");
      const row = el.querySelector<HTMLElement>("[data-mark]");
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", el);
      if (!crop || !row || letters.length === 0) return;

      let fitting = false;
      const fit = () => {
        if (fitting) return;
        fitting = true;
        const probe = 200;
        crop.style.fontSize = `${probe}px`;
        const next = (crop.clientWidth / row.scrollWidth) * probe;
        crop.style.fontSize = `${next}px`;
        requestAnimationFrame(() => {
          fitting = false;
          ScrollTrigger.refresh();
        });
      };

      fit();
      window.addEventListener("resize", fit);
      void document.fonts.ready.then(fit);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          letters,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.35,
            ease: "expo.out",
            stagger: { each: 0.05, ease: "power2.out" },
            paused: true,
            immediateRender: true,
          },
        );

        const play = contextSafe(() => {
          tween.play();
        });
        const rewind = contextSafe(() => {
          tween.reverse();
        });
        const reset = contextSafe(() => {
          tween.pause(0);
        });

        ScrollTrigger.create({
          trigger: crop,
          start: "top bottom",
          end: "bottom top",
          invalidateOnRefresh: true,
          onEnter: play,
          onEnterBack: play,
          onLeave: reset,
          onLeaveBack: reset,
          onUpdate: (self) => {
            if (self.direction === 1) play();
            else rewind();
          },
        });
      });

      return () => {
        window.removeEventListener("resize", fit);
      };
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="overflow-x-clip bg-board">
      <div className="flex min-h-[min(68vh,38rem)] flex-col justify-between border-t border-rule/40 px-4 pt-10 md:px-7 md:pt-14">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-xl">
            <p className="text-[clamp(1.75rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-ink">
              {CTA}
            </p>
            <ContactLink className="spec mt-7 inline-block border border-ink px-6 py-3 text-ink no-underline transition-colors hover:bg-ink hover:text-board" />
          </div>

          <div className="flex gap-16 sm:gap-24 md:gap-28">
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink no-underline transition-colors hover:text-mute"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2">
              {site.cvUrl ? (
                <a
                  href={site.cvUrl}
                  className="text-ink no-underline transition-colors hover:text-mute"
                  target="_blank"
                  rel="noreferrer"
                >
                  CV
                  <ExternalArrow />
                </a>
              ) : null}
              <SocialLinks
                className="flex flex-col gap-2"
                itemClassName="text-ink no-underline transition-colors hover:text-mute"
                withArrow
              />
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-6 pb-6 pt-20 text-ink md:pt-28">
          <p>
            <span className="block">{LOCATION}</span>
            <span className="block">{site.role}</span>
          </p>
          <p className="shrink-0">©{new Date().getFullYear()}</p>
        </div>
      </div>

      <p className="sr-only">{MARK}</p>
      <div data-crop className="overflow-hidden leading-none h-[0.62em]">
        <p
          data-mark
          aria-hidden="true"
          className="display-title flex w-max flex-nowrap text-ink"
        >
          {Array.from(MARK).map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block overflow-hidden">
              <span data-letter className="inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
