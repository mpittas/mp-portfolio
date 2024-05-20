// BlurryBg2.tsx
"use client"
import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function BlurryBg2() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const position = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set isClient to true after the component mounts
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const color = theme === "dark" ? "#111" : "#ccc"

    let animationFrameId: number

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.beginPath()
      context.arc(position.current.x, position.current.y, 600, 0, 2 * Math.PI)
      context.fillStyle = color
      context.filter = "blur(120px)"
      context.fill()
      animationFrameId = requestAnimationFrame(render)
    }

    const handleMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, isClient])

  return isClient ? (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  ) : null
}
