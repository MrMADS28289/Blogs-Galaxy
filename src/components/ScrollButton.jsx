"use client";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true);
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
    // This function scrolls the page down by about 90% of the viewport height.
    const vh = window.innerHeight;
    window.scrollTo({
      top: window.pageYOffset + vh * 0.9,
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
    // This `toggleVisibility` function will run every time the user scrolls.
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      // Super important: clean up the event listener when the component unmounts.
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {/* This button shows up when we're near the top of the page, inviting the user to scroll down. */}
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

      {/* And this button appears when we've scrolled down, offering a quick trip back to the top. */}
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
