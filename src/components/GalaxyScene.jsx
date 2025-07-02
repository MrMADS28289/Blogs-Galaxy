"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useGLTF, OrbitControls } from "@react-three/drei";

function OrbitingPlanet(props) {
  const ref = useRef();
  const { scene } = useGLTF("/models/planet.glb");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      // ref.current.position.x = Math.sin(t) * 0.2; // orbital path
      // ref.current.position.z = Math.cos(t) * 2;
    }
  });

  return <primitive object={scene} ref={ref} scale={0.6} />;
}

export default function GalaxyScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Main 3D Starfield (background) */}
        <Stars
          radius={200}
          depth={100}
          count={10000}
          factor={6}
          saturation={0}
          fade={true} // Allow fading
          speed={4} // Slow movement for background effect
        />

        {/* Orbiting Planet - remains in the middle */}
        <OrbitingPlanet />

        {/* Controls (optional for debugging) */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
