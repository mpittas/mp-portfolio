"use client"
import React, { useEffect, useRef } from "react"
import { throttle } from "lodash"

const BlurryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawBlurryCircle = (
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number
  ) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Clear the canvas
    ctx.clearRect(0, 0, width, height)

    // Set the style for the blurred circle
    ctx.filter = "blur(220px)"
    ctx.fillStyle = "rgba(242,82,24,1)" // Soft black circle, change color as needed

    // Draw the circle at mouse position
    ctx.beginPath()
    ctx.arc(mouseX, mouseY, 200, 0, 2 * Math.PI)
    ctx.fill()
  }

  const handleMouseMove = throttle((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        drawBlurryCircle(ctx, event.clientX, event.clientY)
      }
    }
  }, 10)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Initial setup for full viewport coverage
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Initial circle in the center
        drawBlurryCircle(ctx, canvas.width / 2, canvas.height / 2)

        // Set up event listeners
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          drawBlurryCircle(ctx, window.innerWidth / 2, window.innerHeight / 2) // Redraw at center
        })

        // Cleanup on component unmount
        return () => {
          window.removeEventListener("mousemove", handleMouseMove)
          window.removeEventListener("resize", handleMouseMove)
        }
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  )
}

export default BlurryBackground
