"use client"
import * as THREE from "three"
import { Suspense, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Preload, useCursor } from "@react-three/drei"
import { Model, Fragments } from "./Text"
import { useTheme } from "next-themes"

function Scene() {
  const { theme } = useTheme()
  const vec = new THREE.Vector3()
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const [intensity, setIntensity] = useState(theme === "dark" ? 40 : 1)

  useEffect(() => {
    console.log(`Scene theme changed: ${theme}`)
    setIntensity(theme === "dark" ? 40 : 1)
  }, [theme])

  useFrame((state) => {
    state.camera.position.lerp(
      vec.set(clicked ? -10 : 0, clicked ? 10 : 0, 20),
      0.1
    )
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <directionalLight
        position={[0, 3, 5]}
        color="#ffffff"
        intensity={intensity}
      />
      <Fragments visible={clicked} />
      <Model
        visible={!clicked}
        onClick={() => setClicked(true)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </group>
  )
}

export default function TextScene() {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [intensity, setIntensity] = useState(theme === "dark" ? 40 : 1)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640) // Tailwind's default breakpoint for 'sm'
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    console.log(`TextScene theme changed: ${theme}`)
    setIntensity(theme === "dark" ? 40 : 1)
  }, [theme])

  return (
    <Canvas dpr={[1, 2]} orthographic camera={{ zoom: isMobile ? 180 : 260 }}>
      <directionalLight
        position={[0, 3, 5]}
        color="#ffffff"
        intensity={intensity}
      />
      <Suspense fallback={null}>
        <Scene />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
