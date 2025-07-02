"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import React from "react";

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Stars
          radius={200}
          depth={100}
          count={10000}
          factor={6}
          saturation={0}
          fade
        />
      </Canvas>
    </div>
  );
}
