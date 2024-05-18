"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTheme } from "next-themes"

const AnimatedCircle: React.FC = () => {
  const { theme } = useTheme()
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      const circles =
        circleRef.current.querySelectorAll<HTMLDivElement>(".c-circle")
      const borderColor =
        theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"

      gsap.to(circles, {
        y: -40,
        borderColor: borderColor,
        ease: "sine.inOut",
        stagger: { each: 0.06, from: "end", repeat: -1, yoyo: true },
      })
    }
  }, [theme])

  return (
    <div className="h-[440px] mt-[-80px] select-none grid place-items-center text-white">
      <div
        ref={circleRef}
        className="c-circle-wrap w-96 h-96 relative grid place-items-center"
        style={{ transform: "rotateX(50deg)" }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="c-circle rounded-full absolute border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.01)]"
            style={{
              width: `${100 - 5 * i}%`,
              height: `${100 - 5 * i}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AnimatedCircle
