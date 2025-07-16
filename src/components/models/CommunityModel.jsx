"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const CommunityModel = React.memo(function CommunityModel(props) {
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const { scene } = useGLTF("/models/Community.glb");

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y =
        0.8 + Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      rotation={[0, 4, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default CommunityModel;

useGLTF.preload("/models/Community.glb");
