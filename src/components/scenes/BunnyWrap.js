"use client"
import { Canvas } from "@react-three/fiber"
import {
  useGLTF,
  useTexture,
  Decal,
  Environment,
  OrbitControls,
  Environment as DreiEnvironment,
  PresentationControls,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei"

export const BunnyWrap = () => (
  <Canvas shadows camera={{ position: [2, 2, 10], fov: 20 }}>
    <ambientLight intensity={5} />
    <directionalLight position={[20, 200, 20]} intensity={5} />
    <spotLight
      position={[0, 10, 0]}
      angle={0.3}
      penumbra={0.4}
      intensity={2}
      castShadow
    />
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }} // Configure the spring physics
      snap={{ mass: 4, tension: 1500 }} // Configure snap when released
      rotation={[0, 0, 0]} // Default rotation
      polar={[-Math.PI / 3, Math.PI / 3]} // Vertical limits
      azimuth={[-Math.PI / 1.4, Math.PI / 2]} // Horizontal limits
    >
      <group position={[0.25, -1, 0]}>
        <Bun />
      </group>
    </PresentationControls>
    {/* Adds realistic environmental reflections */}
    <OrbitControls makeDefault enableZoom={false} />
  </Canvas>
)

function Bun(props) {
  const { nodes } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bunny/model.gltf"
  )
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.bunny.geometry}
      {...props}
      dispose={null}
    >
      <meshPhysicalMaterial
        color="#050505" // Light color for glass
        metalness={0.1} // Lower metalness for non-metallic feel
        roughness={0.5} // Smooth surface
        clearcoat={1} // Glossy clearcoat layer
        reflectivity={0.1} // High reflectivity for glass-like look
        transparency={0.1} // Semi-transparent
        transparent={true} // Enable transparency
        ior={1.25} // Index of Refraction similar to glass
        envMapIntensity={1} // Strength of reflections
      />
      {/* <meshStandardMaterial color="#050505" /> */}
      <Sticker
        url="/Sticjer_1024x1024@2x.png"
        position={[-0.1, 1.3, 0.55]}
        rotation={Math.PI * 1.2}
        scale={0.45}
      />
      <Sticker
        url="/Twemoji_1f600.svg.png"
        position={[0.4, 1, 0.55]}
        rotation={Math.PI * 0.9}
        scale={0.3}
      />
      <Sticker
        url="/D64aIWkXoAAFI08.png"
        position={[0, 0.7, 0.85]}
        rotation={Math.PI * 1.2}
        scale={0.35}
      />
      <Sticker
        url="/three.png"
        position={[-0.54, 1.1, 0.57]}
        rotation={-1.2}
        scale={0.2}
      />
    </mesh>
  )
}

function Sticker({ url, ...props }) {
  const emoji = useTexture(url)
  return (
    <Decal /*debug*/ {...props}>
      <meshPhysicalMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        map={emoji}
        map-flipY={false}
        map-anisotropy={16}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        roughness={1}
        clearcoat={0.5}
        metalness={0.75}
        toneMapped={false}
      />
    </Decal>
  )
}
