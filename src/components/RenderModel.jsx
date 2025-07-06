"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useEffect, useState } from "react";

const RenderModel = ({ children, className }) => {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    setEventSource(document.getElementById('main-canvas-container'));
  }, []);

  return (
    <Canvas
      className={clsx("w-full h-full fixed z-0 pointer-events-auto", className)}
      shadows={false}
      dpr={[1, 2]}
      eventSource={eventSource}
      // dpr is the device pixel ratio. Here we are setting it to 1 and 2 for retina displays to prevent blurriness in the model rendering on high resolution screens.
    >
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="dawn" />
      <OrbitControls autoRotate makeDefault />
    </Canvas>
  );
};

export default RenderModel;
