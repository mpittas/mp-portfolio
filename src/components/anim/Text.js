"use client";
import { MeshNormalMaterial } from "three";
import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const normalMaterial = new MeshNormalMaterial();

export function Fragments({ visible, ...props }) {
  const group = useRef();
  const { scene, animations, materials } = useGLTF(
    "/hello/hello-fragments.glb"
  );
  const { actions } = useAnimations(animations, group);
  useMemo(
    () =>
      scene.traverse(
        (o) =>
          o.type === "Mesh" &&
          o.material === materials.inner &&
          (o.material = normalMaterial)
      ),
    []
  );
  // Play actions
  useEffect(() => {
    if (visible)
      Object.keys(actions).forEach((key) => {
        actions[key].repetitions = 0;
        actions[key].clampWhenFinished = true;
        actions[key].play();
      });
  }, [visible]);
  return <primitive ref={group} object={scene} {...props} />;
}

export function Model(props) {
  const { scene } = useGLTF("/hello/hello-text.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/hello/hello-text.glb");
useGLTF.preload("/hello/hello-fragments.glb");
