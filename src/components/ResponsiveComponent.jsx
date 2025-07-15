"use client";
import React, { useState, useEffect } from "react";

const ResponsiveComponent = ({ children }) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (size === null) return null;

  return children({ size }); // ✅ Call the function properly with size
};

export default ResponsiveComponent;
