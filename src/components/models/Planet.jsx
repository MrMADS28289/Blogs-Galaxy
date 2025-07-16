"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { isPlanetVisibleAtom } from "@/app/jotaiAtoms";

const Planet = React.memo(function PlanetModel(props) {
  const modelRef = useRef();
  const [isPlanetVisible] = useAtom(isPlanetVisibleAtom);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const { scene } = useGLTF("/models/planet.glb");

  if (!isPlanetVisible) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      scale={[0.6, 0.6, 0.6]}
      position={[0, 0, 0]}
      rotation={[0, 0.5, 0]}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default Planet;

useGLTF.preload("/models/planet.glb");
