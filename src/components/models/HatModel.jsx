/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const HatModel = React.memo(function HatModel(props) {
  // Use React.memo for performance optimization
  const modelRef = useRef();

  // Load the planet model
  const { scene } = useGLTF("/models/Planet (2).glb");

  // Float animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
      modelRef.current.position.y =
        -1.5 + Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      scale={[0.8, 0.8, 0.8]}
      position={[0, -1.5, 0]}
      rotation={[0, 0.5, 0]}
      dispose={null}
    />
  );
});

export default HatModel;

// Preload model for performance
useGLTF.preload("/models/Planet (2).glb");
