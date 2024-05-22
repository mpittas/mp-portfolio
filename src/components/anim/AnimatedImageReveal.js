"use client"
import Image from "next/image"
import {useEffect, useRef} from "react"
import gsap from "gsap"

const AnimatedImageReveal = ({featuredImage}) => {
  const overlayRef = useRef(null)
  const revealRef = useRef(null)
  const revealInnerRef = useRef(null)
  const revealDecoRef = useRef(null)
  const revealImgRef = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    if (featuredImage) {
      const imgUrl = `/projects/${featuredImage}`
      revealImgRef.current.style.backgroundImage = `url(${imgUrl})`
      startAnimation()
    }
  }, [featuredImage])

  const startAnimation = () => {
    gsap.killTweensOf([
      revealInnerRef.current,
      revealImgRef.current,
      revealDecoRef.current,
    ])

    tl.current = gsap
      .timeline({
        onStart: () => {
          revealRef.current.style.opacity = 1
          gsap.set(revealRef.current, {zIndex: 1000})
        },
      })
      .set(revealInnerRef.current, {opacity: 0})
      .add("begin")
      .set(revealDecoRef.current, {transformOrigin: "50% 0%"})
      .to(
        revealDecoRef.current,
        {
          duration: 0.6,
          ease: "Cubic.easeInOut",
          opacity: 1,
          x: "0%",
          y: "-15%",
          scaleY: 1,
          startAt: {opacity: 0, x: "15%", y: "50%", scaleY: 3},
        },
        "begin"
      )
      .to(
        revealInnerRef.current,
        {
          duration: 0.8,
          ease: "Expo.easeOut",
          opacity: 1,
          y: "0%",
          rotation: 0,
          startAt: {y: "100%", rotation: 3},
        },
        "begin+=0.4"
      )
      .to(
        revealImgRef.current,
        {
          duration: 1.3,
          ease: "Expo.easeOut",
          scale: 1,
          startAt: {scale: 1.4},
        },
        "begin+=0.4"
      )
  }

  const hideImage = () => {
    gsap.killTweensOf([
      revealInnerRef.current,
      revealImgRef.current,
      revealDecoRef.current,
    ])

    tl.current = gsap
      .timeline({
        onStart: () => {
          gsap.set(revealRef.current, {zIndex: 999})
        },
        onComplete: () => {
          gsap.set(revealRef.current, {zIndex: ""})
          gsap.set(revealRef.current, {opacity: 0})
        },
      })
      .add("begin")
      .to(
        [revealDecoRef.current, revealInnerRef.current],
        {
          duration: 0.2,
          ease: "Expo.easeOut",
          opacity: 0,
        },
        "begin"
      )
  }

  const handleMouseEnter = (ev) => {
    positionElement(ev)
    startAnimation()
  }

  const handleMouseMove = (ev) => {
    requestAnimationFrame(() => {
      positionElement(ev)
    })
  }

  const handleMouseLeave = () => {
    hideImage()
  }

  const positionElement = (ev) => {
    const mousePos = {x: ev.clientX, y: ev.clientY}
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
    revealRef.current.style.top = `${mousePos.y + 20 - docScrolls.top}px`
    revealRef.current.style.left = `${mousePos.x + 20 - docScrolls.left}px`
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hover-reveal" ref={revealRef}>
        <div className="hover-reveal__deco" ref={revealDecoRef}></div>
        <div className="hover-reveal__inner" ref={revealInnerRef}>
          <div className="hover-reveal__img" ref={revealImgRef}></div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedImageReveal
