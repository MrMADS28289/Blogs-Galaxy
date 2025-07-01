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
      ref.current.position.x = Math.sin(t) * 2; // orbital path
      ref.current.position.z = Math.cos(t) * 2;
    }
  });

  return <primitive object={scene} ref={ref} scale={0.6} />;
}

function ShootingStars() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = Math.sin(elapsed * 2) * 50;
      ref.current.position.y = Math.cos(elapsed * 2) * 50;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

export default function GalaxyScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* 3D Starfield */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Shooting star */}
        <ShootingStars />

        {/* Orbiting Planet */}
        <OrbitingPlanet />

        {/* Controls (optional for debugging) */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
