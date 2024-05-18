"use client"
import React, { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface HoverTextProps {
  text: string
}

const HoverText: React.FC<HoverTextProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-{}[];:"<>,.?/0123456789'

    const scrambleText = () => {
      return text
        .split("")
        .map(() =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        )
        .join("")
    }

    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setDisplayText(scrambleText())
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setDisplayText(text)
    }

    // Cleanup function to clear the interval when the component unmounts or stops hovering
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, text])

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className="font-medium"
    >
      {displayText}
    </div>
  )
}

export default HoverText
