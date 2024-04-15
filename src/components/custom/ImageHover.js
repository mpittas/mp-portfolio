"use client"
import React, { useRef, useState } from "react"
import { gsap } from "gsap"

function HoverImgFx4({ imgSrc, children }) {
  const containerRef = useRef(null)
  const revealRef = useRef(null)
  const revealInnerRef = useRef(null)
  const revealImgRef = useRef(null)

  const [letters, setLetters] = useState([])

  // On component mount, set up the hover effect
  React.useEffect(() => {
    if (containerRef.current) {
      const spans = Array.from(containerRef.current.querySelectorAll("span"))
      setLetters(spans)
    }

    const revealDiv = document.createElement("div")
    revealDiv.className = "hover-reveal"
    revealDiv.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${imgSrc})"></div></div>`
    containerRef.current.appendChild(revealDiv)
    revealRef.current = revealDiv
    revealInnerRef.current = revealDiv.querySelector(".hover-reveal__inner")
    revealImgRef.current =
      revealInnerRef.current.querySelector(".hover-reveal__img")
  }, [imgSrc])

  const positionElement = (ev) => {
    const mousePos = {
      x: ev.clientX,
      y: ev.clientY,
    }
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
    revealRef.current.style.top = `${mousePos.y + 20 - docScrolls.top}px`
    revealRef.current.style.left = `${mousePos.x + 20 - docScrolls.left}px`
  }

  const handleMouseEnter = (ev) => {
    positionElement(ev)
    showImage()
    animateLetters()
  }

  const handleMouseMove = (ev) => {
    gsap.ticker.add(() => {
      positionElement(ev)
    })
  }

  const handleMouseLeave = () => {
    hideImage()
  }

  const showImage = () => {
    gsap.set(revealRef.current, { zIndex: 1000, opacity: 1 })
    gsap.fromTo(
      revealInnerRef.current,
      { opacity: 0, y: "50%", rotation: -15, scale: 1 },
      {
        duration: 0.8,
        y: "0%",
        rotation: 0,
        opacity: 1,
        scale: 1,
        ease: "expo.out",
      }
    )
    gsap.fromTo(
      revealImgRef.current,
      { rotation: 15, scale: 2 },
      { duration: 0.8, rotation: 0, scale: 1, ease: "expo.out" }
    )
  }

  const hideImage = () => {
    gsap.to(revealInnerRef.current, {
      duration: 0.15,
      y: "-40%",
      rotation: 10,
      scale: 0.9,
      opacity: 0,
      ease: "sine.out",
    })
    gsap.to(revealImgRef.current, {
      duration: 0.15,
      rotation: -10,
      scale: 1.5,
      ease: "sine.out",
      onComplete: () => {
        gsap.set(revealRef.current, { zIndex: 999, opacity: 0 })
      },
    })
  }

  const animateLetters = () => {
    gsap.fromTo(
      letters,
      { opacity: 0, y: "50%" },
      { duration: 0.8, stagger: 0.03, y: "0%", opacity: 1, ease: "expo.out" }
    )
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default HoverImgFx4
