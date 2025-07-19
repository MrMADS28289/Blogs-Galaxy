"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { isPlanetVisibleAtom } from "@/app/jotaiAtoms";
import useScreenSize from "@/components/hooks/useScreenSize";

const Planet = React.memo(function PlanetModel(props) {
  const modelRef = useRef();
  const [isPlanetVisible] = useAtom(isPlanetVisibleAtom);
  const [hovered, setHovered] = useState(false);
  const screenSize = useScreenSize();

  const planetScale = screenSize && screenSize < 768 ? [0.2, 0.2, 0.2] : [0.6, 0.6, 0.6];

  useCursor(hovered);

  const { scene } = useGLTF("/models/Planet.glb");

  if (!isPlanetVisible) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      scale={planetScale}
      position={[0, 0, 0]}
      rotation={[0, 0.5, 0]}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
});

export default Planet;

useGLTF.preload("/models/Planet.glb");
