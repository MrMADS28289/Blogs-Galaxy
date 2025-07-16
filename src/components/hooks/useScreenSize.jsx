"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track and provide the current window's inner width.
 */
const useScreenSize = () => {
  // State to hold the current screen width.
  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    // Helper function to get the current window width.
    function getScreenSize() {
      return window.innerWidth;
    }

    // Event handler to update the screenSize state when the window is resized.
    function handleResize() {
      setScreenSize(getScreenSize());
    }

    // Set the initial screen size when the component mounts.
    handleResize();

    // Add event listener for window resize events.
    window.addEventListener("resize", handleResize);

    // Cleanup function: remove the event listener when the component unmounts
    // to prevent memory leaks.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return screenSize;
};

export default useScreenSize;
