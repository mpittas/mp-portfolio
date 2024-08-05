"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedImageRevealProps {
  featuredImage: string;
  isHovered: boolean;
}

const AnimatedImageReveal: React.FC<AnimatedImageRevealProps> = ({
  featuredImage,
  isHovered,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInnerRef = useRef<HTMLDivElement>(null);
  const revealDecoRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (featuredImage) {
      const imgUrl = `/projects/${featuredImage}`;
      if (revealImgRef.current) {
        revealImgRef.current.style.backgroundImage = `url(${imgUrl})`;
      }
      if (isHovered) {
        startAnimation();
      } else {
        hideImage();
      }
    }
  }, [featuredImage, isHovered]);

  const startAnimation = () => {
    gsap.killTweensOf([
      revealInnerRef.current,
      revealImgRef.current,
      revealDecoRef.current,
    ]);

    tl.current = gsap
      .timeline({
        onStart: () => {
          if (revealRef.current) {
            revealRef.current.style.opacity = "1";
            gsap.set(revealRef.current, { zIndex: 1000 });
          }
        },
      })
      .set(revealInnerRef.current, { opacity: 0 })
      .add("begin")
      .set(revealDecoRef.current, { transformOrigin: "50% 0%" })
      .to(
        revealDecoRef.current,
        {
          duration: 0.6,
          ease: "cubic.inOut",
          opacity: 1,
          x: "-3%",
          y: "-4%",
          scaleY: 1,
          startAt: { opacity: 0, x: "0%", y: "50%", scaleY: 3 },
        },
        "begin"
      )
      .to(
        revealInnerRef.current,
        {
          duration: 0.8,
          ease: "expo.out",
          opacity: 1,
          y: "0%",
          rotation: 0,
          startAt: { y: "100%", rotation: 3 },
        },
        "begin+=0.4"
      )
      .to(
        revealImgRef.current,
        {
          duration: 1.3,
          ease: "expo.out",
          scale: 1,
          startAt: { scale: 1.4 },
        },
        "begin+=0.4"
      );
  };

  const hideImage = () => {
    gsap.killTweensOf([
      revealInnerRef.current,
      revealImgRef.current,
      revealDecoRef.current,
    ]);

    tl.current = gsap
      .timeline({
        onStart: () => {
          if (revealRef.current) {
            gsap.set(revealRef.current, { zIndex: 999 });
          }
        },
        onComplete: () => {
          if (revealRef.current) {
            gsap.set(revealRef.current, { zIndex: "" });
            gsap.set(revealRef.current, { opacity: 0 });
          }
        },
      })
      .add("begin")
      .to(
        [revealDecoRef.current, revealInnerRef.current],
        {
          duration: 0.2,
          ease: "expo.out",
          opacity: 0,
        },
        "begin"
      );
  };

  return (
    <div className="relative">
      <div
        className="hover-reveal w-full h-[400px] top-0 left-0 pointer-events-none opacity-0"
        ref={revealRef}
      >
        <div
          className="hover-reveal__deco w-full h-full rounded-lg absolute top-0 left-0 border-2 border-dashed border-neutral-400/[0.3] dark:border-neutral-700/[0.6]"
          ref={revealDecoRef}
        ></div>
        <div
          className="hover-reveal__inner w-full h-full relative"
          ref={revealInnerRef}
        >
          <div
            className="hover-reveal__img w-full h-full relative bg-cover bg-center rounded-lg shadow-2xl"
            ref={revealImgRef}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedImageReveal;
