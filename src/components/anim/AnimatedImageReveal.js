"use client"
import Image from "next/image"
import { useEffect } from "react"
import gsap from "gsap"

const AnimatedImageReveal = ({ featuredImage }) => {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(".overlay-1", { y: "-100%", duration: 0.8 })
      .to(".overlay-2", { y: "-100%", duration: 0.8 }, "-=0.6")
      .to(".overlay-3", { y: "-100%", duration: 0.8 }, "-=0.6")
      .to(".pr-image img", { opacity: 1, duration: 0.8 }, "-=0.6")
  }, [])

  return (
    <div className="bg-neutral-300 dark:bg-neutral-900 h-[400px] rounded-lg min-h-[200px] pr-image overflow-hidden sticky top-4">
      <div className="absolute inset-0 bg-black overlay-1"></div>
      <div className="absolute inset-0 bg-gray-700 overlay-2"></div>
      <div className="absolute inset-0 bg-gray-500 overlay-3"></div>
      <Image
        src={`/projects/${featuredImage}`}
        layout="fill"
        objectFit="cover"
        alt="project image"
        className="opacity-0"
      />
    </div>
  )
}

export default AnimatedImageReveal
