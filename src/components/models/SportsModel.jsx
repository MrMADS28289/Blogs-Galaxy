"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SportsModel = React.memo(function SportsModel(props) {
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const { scene } = useGLTF("/models/sports.glb");

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
      rotation={[0, 0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default SportsModel;

useGLTF.preload("/models/sports.glb");
