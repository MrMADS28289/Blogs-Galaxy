"use client";
import { useState, useEffect } from "react";

/**
 * This component is a handy little wrapper that helps make UI responsive.
 * It basically gives its children components access to the current window width,
 * so they can render different things based on screen size.
 */
const ResponsiveComponent = ({ children }) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    // This function updates 'size' state whenever the window gets resized.
    const handleResize = () => setSize(window.innerWidth);

    handleResize();

    // And then set up an event listener to keep 'size' updated.
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (size === null) return null;

  return children({ size });
};

export default ResponsiveComponent;
