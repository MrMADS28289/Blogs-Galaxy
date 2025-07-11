"use client";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true); // Initially visible at the top
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset < 100) {
      setIsVisible(true);
      setShowScrollToTop(false);
    } else {
      setIsVisible(false);
      setShowScrollToTop(true);
    }
  };

  const scrollToBottom = () => {
    const vh = window.innerHeight; // Get viewport height
    window.scrollTo({
      top: window.pageYOffset + vh * 0.9, // Scroll down by 90% of viewport height
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
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
    <>
      {isVisible && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <button
            onClick={scrollToBottom}
            className="custom-bg flex size-14 animate-[drop-animation_2s_infinite] items-center justify-center rounded-full p-4 text-foreground transition-all duration-300 ease-in-out hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <FaArrowDown className="h-auto w-full" />
          </button>
        </div>
      )}

      {showScrollToTop && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={scrollToTop}
            className="custom-bg flex size-14 animate-[drop-animation_2s_infinite] items-center justify-center rounded-full p-4 text-foreground transition-all duration-300 ease-in-out hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <FaArrowUp className="h-auto w-full" />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollButton;
