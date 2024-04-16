"use client"
import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Model(props) {
  const ref = useRef()

  // Import model from file
  const { nodes, materials } = useGLTF("/banana.glb")

  // Rotate per frame
  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta / 5
    ref.current.rotation.y = ref.current.rotation.x += delta / 5
  })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.34}>
          <mesh
            ref={ref}
            geometry={nodes.Banana_Banana_0.geometry}
            material={materials.Banana}
          />
        </group>
      </group>
    </group>
  )
}
