"use client"
import React from "react"
import { gsap } from "gsap"

class AnimatedCircle extends React.Component {
  componentDidMount() {
    gsap.to(".c-circle", {
      y: -40,
      borderColor: "#d6d3d1",
      ease: "sine.inOut",
      stagger: { each: 0.06, from: "end", repeat: -1, yoyo: true },
    })
  }

  render() {
    return (
      <div className="h-[440px] select-none grid place-items-center text-white">
        <div
          className="c-circle-wrap w-96 h-96 relative grid place-items-center"
          style={{ transform: "rotateX(50deg)" }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="c-circle rounded-full absolute border border-neutral-100"
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
}

export default AnimatedCircle
