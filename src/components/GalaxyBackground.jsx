"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Starfield */}
        <Stars
          radius={100} // How far the stars spread
          depth={50} // Star layers
          count={5000} // Total number of stars
          factor={4} // Star size
          saturation={0} // Greyscale
          fade // Enable fading
          speed={2} // Speed of movement
        />

        {/* Optional: add controls if needed */}
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </div>
  );
}
