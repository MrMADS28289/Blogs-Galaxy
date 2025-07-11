"use client";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useEffect, useState } from "react";

const RenderModel = ({ children, className }) => {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    setEventSource(document.getElementById("main-canvas-container"));
  }, []);

  return (
    <Canvas
      className={clsx("pointer-events-auto absolute z-0 size-full", className)}
      shadows={false}
      dpr={[1, 2]}
      eventSource={eventSource}
    >
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="dawn" />
      <OrbitControls autoRotate makeDefault />
      <Stars
        radius={100} // How far the stars spread
        depth={50} // Star layers
        count={5000} // Total number of stars
        factor={4} // Star size
        saturation={0} // Greyscale
        fade // Enable fading
        speed={2} // Speed of movement
      />
    </Canvas>
  );
};

export default RenderModel;
