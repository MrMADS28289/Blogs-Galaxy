"use client";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useEffect, useState } from "react";

/**
 * This component sets up our 3D scene using React Three Fiber.
 * It acts as a container for any 3D models or objects want to render.
 */
const RenderModel = ({ children, className }) => {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    setEventSource(document.getElementById("main-canvas-container"));
  }, []);

  return (
    <Canvas
      className={clsx("pointer-events-auto absolute z-0 size-full", className)}
      shadows={false} // Disabling shadows for performance or if not needed for this scene.
      dpr={[1, 2]} // Device Pixel Ratio: helps with crisp rendering on high-DPI screens.
      eventSource={eventSource} // This links canvas to the event listener element.
    >
      {/* Suspense is crucial here! It allows to show a fallback (like a loading spinner) while 3D models are loading. */}
      <Suspense fallback={null}>{children}</Suspense>
      {/* Environment sets up the lighting and background. 'dawn' is a nice preset for a soft, natural look. */}
      <Environment preset="dawn" />
      {/* OrbitControls lets interact with the scene – rotate, zoom, pan. 'autoRotate' makes it spin on its own, and 'makeDefault' makes it the primary control. */}
      <OrbitControls autoRotate makeDefault />
      {/* Adding some stars to give that galaxy feel! These props control how many, how big, and how they behave. */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
    </Canvas>
  );
};

export default RenderModel;
