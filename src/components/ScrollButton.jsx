"use client";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true); // Initially visible at the top

  const toggleVisibility = () => {
    if (window.pageYOffset < 100) {
      // Show button when near the top
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTo90vh = () => {
    const vh = window.innerHeight; // Get viewport height
    window.scrollTo({
      top: window.pageYOffset + vh * 0.9, // Scroll down by 90% of viewport height
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {isVisible && (
        <button
          onClick={scrollTo90vh}
          className="text-foreground rounded-full flex items-center justify-center custom-bg w-14 h-14 p-4 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 ease-in-out animate-[drop-animation_2s_infinite]"
          aria-label="Scroll down"
        >
          <FaArrowDown className="w-full h-auto" />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
