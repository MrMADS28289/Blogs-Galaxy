"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MotivationModel = React.memo(function MotivationModel(props) {
  // Use React.memo for performance optimization
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  // Load the planet model
  const { scene } = useGLTF("/models/Motivation.glb");

  // Float animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        -2 + Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      rotation={[0, 0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default MotivationModel;

// Preload model for performance
useGLTF.preload("/models/Motivation.glb");
