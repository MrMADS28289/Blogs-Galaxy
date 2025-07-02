"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Planet = React.memo(function PlanetModel(props) {
  const modelRef = useRef();

  const { scene } = useGLTF("/models/planet.glb");

  // Float + Rotate Animation
  // useFrame((state) => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y += 0.003;
  //     modelRef.current.position.y =
  //       -1.2 + Math.sin(state.clock.elapsedTime) * 0.15;
  //   }
  // });
  const baseY = 0; // your desired top position

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
      modelRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[0.6, 0.6, 0.6]} // Resize the planet
      position={[0, 0, 0]} // Centered in 3D space
      rotation={[0, 0.5, 0]} // Subtle tilt
      dispose={null}
      {...props}
    />
  );
});

export default Planet;

// Preload model

