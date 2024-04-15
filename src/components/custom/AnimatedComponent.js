// Import React and GSAP
import React from "react"
import ReactDOM from "react-dom"
import HoverImgFx4 from "./ImageHover" // Path to your component

// Application component that uses the HoverImgFx4
export default function AnimatedComponent() {
  return (
    <div>
      <h1>Hover over the image below</h1>
      <HoverImgFx4 imgSrc="/posts/featured.jpg">
        <span>This is a hover effect!</span>
        <span>Move your mouse over me.</span>
      </HoverImgFx4>
    </div>
  )
}
