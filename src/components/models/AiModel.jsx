"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const AiModel = React.memo(function AiModel(props) {
  // Use React.memo for performance optimization
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  // Load the planet model
  const { scene } = useGLTF("/models/ai.glb");

  // Float animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        0 + Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      rotation={[0, 9, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default AiModel;

// Preload model for performance
useGLTF.preload("/models/ai.glb");
