"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

import Model from "@/components/ascii/Model"
import AsciiRenderer from "@/components/ascii/AsciiRenderer"

export default function AsciiHolxer() {
  return (
    <Canvas camera={{ position: [0, 20, 0] }}>
      <Suspense fallback={null}>
        <color attach="background" args={["black"]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.455}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} />
        <ambientLight intensity={0.4} />
        <Model />
      </Suspense>
      <OrbitControls />
      <AsciiRenderer fgColor="white" bgColor="black" />
    </Canvas>
  )
}
