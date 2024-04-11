import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { AsciiEffect } from './AsciiEffect'; // Assume this is the path to your AsciiEffect integration
import * as THREE from 'three';

// Custom component to load and display your 3D model
function Model({ url }) {
  const gltf = useLoader(useGLTF, url);
  return <primitive object={gltf.scene} />;
}

// Component to handle the Ascii effect
function Ascii({ children }) {
  const { gl, scene, camera, size } = useThree();
  const effect = useRef();

  useEffect(() => {
    if (!effect.current) {
      effect.current = new AsciiEffect(gl, ' .:-+*=%@#', { invert: true });
      effect.current.setSize(size.width, size.height);
      effect.current.domElement.style.color = 'white';
      effect.current.domElement.style.backgroundColor = 'black';

      document.body.appendChild(effect.current.domElement);
    }

    return () => {
      document.body.removeChild(effect.current.domElement);
    };
  }, [gl, size]);

  useEffect(() => {
    if (effect.current) {
      effect.current.render(scene, camera);
    }
  }, [scene, camera]);

  return null; // This component doesn't render anything itself
}

// Your main component where you use the Ascii component
function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ascii>
        {/* Replace the URL with the path to your 3D model */}
        <Model url="/path/to/your/knife.glb" />
      </Ascii>
    </Canvas>
  );
}

export default App;
