import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

const HoverImgFx4 = ({ imageSrc }) => {
  const containerRef = useRef(null)
  const revealRef = useRef(null)
  const revealInnerRef = useRef(null)
  const revealImgRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    const reveal = revealRef.current
    const revealInner = revealInnerRef.current
    const revealImg = revealImgRef.current

    const mouseEnterHandler = (ev) => {
      positionElement(ev)
      showImage()
    }
    const mouseMoveHandler = (ev) =>
      requestAnimationFrame(() => positionElement(ev))
    const mouseLeaveHandler = () => hideImage()

    el.addEventListener("mouseenter", mouseEnterHandler)
    el.addEventListener("mousemove", mouseMoveHandler)
    el.addEventListener("mouseleave", mouseLeaveHandler)

    return () => {
      el.removeEventListener("mouseenter", mouseEnterHandler)
      el.removeEventListener("mousemove", mouseMoveHandler)
      el.removeEventListener("mouseleave", mouseLeaveHandler)
    }
  }, [])

  const positionElement = (ev) => {
    const mousePos = getMousePos(ev)
    const reveal = revealRef.current
    reveal.style.top = `${mousePos.y + 20}px`
    reveal.style.left = `${mousePos.x + 20}px`
  }

  const showImage = () => {
    const revealInner = revealInnerRef.current
    const revealImg = revealImgRef.current
    gsap
      .timeline()
      .set(revealInner, { x: "-100%" })
      .to(revealInner, { x: "0%", duration: 0.8, ease: "expo.out" })
      .set(revealImg, { x: "100%" })
      .to(revealImg, { x: "0%", duration: 0.8, ease: "expo.out" })
  }

  const hideImage = () => {
    const revealInner = revealInnerRef.current
    const revealImg = revealImgRef.current
    gsap
      .timeline()
      .to(revealInner, { x: "100%", duration: 0.15, ease: "sine.out" })
      .to(revealImg, { x: "-100%", duration: 0.15, ease: "sine.out" })
  }

  const getMousePos = (e) => {
    return { x: e.clientX, y: e.clientY }
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        ref={revealRef}
        className="hover-reveal"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <div ref={revealInnerRef} className="hover-reveal__inner">
          <div
            ref={revealImgRef}
            className="hover-reveal__img"
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default HoverImgFx4
