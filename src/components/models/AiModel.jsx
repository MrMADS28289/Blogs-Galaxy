"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * This component renders our cool 3D AI model. It's set up to float a bit
 * and react to mouse hovering over it.
 */
const AiModel = React.memo(function AiModel(props) {
  // use a ref to directly access the 3D model object, which is handy for animations.
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Changes the mouse cursor when hovering over the model, giving visual feedback.
  useCursor(hovered);

  const { scene } = useGLTF("/models/ai.glb");

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        0 + Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    // This is how bring loaded 3D model into the scene.
    <primitive
      ref={modelRef} // Link our ref to the model for direct manipulation.
      object={scene} // The actual 3D scene data from GLTF file.
      {...props} // Pass any additional props down to the primitive.
      rotation={[0, 9, 0]} // Initial rotation for the model.
      onPointerOver={() => setHovered(true)} // When the mouse enters, set hovered to true.
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default AiModel;

// This tells useGLTF to start loading the model as soon as possible
useGLTF.preload("/models/ai.glb");
