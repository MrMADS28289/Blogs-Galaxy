"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const TechModel = React.memo(function TechModel(props) {
  // Use React.memo for performance optimization
  const modelRef = useRef();

  // Load the planet model
  const { scene } = useGLTF("/models/tech.glb");

  // Float animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y =
        0 + Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      scale={[3.5, 3.5, 3.5]}
      position={[0, 1, 0]}
      rotation={[0, 0.5, 0]}
      dispose={null}
    />
  );
});

export default TechModel;

// Preload model for performance
useGLTF.preload("/models/tech.glb");
