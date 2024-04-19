"use client"
import React from "react"
import { gsap } from "gsap"

class AnimatedCircle extends React.Component {
  componentDidMount() {
    gsap.to(".circle", {
      y: -50,
      borderColor: "#ecaeae",
      ease: "sine.inOut",
      stagger: { each: 0.05, from: "end", repeat: -1, yoyo: true },
    })
  }

  render() {
    return (
      <main className="h-[320px] grid place-items-center text-white">
        <section
          className="w-96 h-96 relative grid place-items-center"
          style={{ transform: "rotateX(50deg)" }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="circle rounded-full absolute border border-neutral-200"
              style={{
                width: `${100 - 5 * i}%`,
                height: `${100 - 5 * i}%`,
              }}
            />
          ))}
        </section>
      </main>
    )
  }
}

export default AnimatedCircle
