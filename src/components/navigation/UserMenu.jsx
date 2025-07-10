"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const UserMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  const handleFirstUserInteraction = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }

    ["click", "keydown", "touchstart"].forEach((event) =>
      document.removeEventListener(event, handleFirstUserInteraction)
    );
  }, [isPlaying]);

  useEffect(() => {
    const consent = localStorage.getItem("musicConsent");
    const consentTime = localStorage.getItem("consentTime");

    const hasValidConsent =
      consent &&
      consentTime &&
      new Date(consentTime).getTime() + 24 * 60 * 60 * 1000 > new Date();

    if (hasValidConsent) {
      const userConsented = consent === "true";
      if (userConsented) {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error);
              setIsPlaying(false);
              ["click", "keydown", "touchstart"].forEach((event) =>
                document.addEventListener(event, handleFirstUserInteraction)
              );
            });
        }
      } else {
        setIsPlaying(false);
      }
    } else {
      setShowModal(true);
      setIsPlaying(false);
    }

    return () => {
      ["click", "keydown", "touchstart"].forEach((event) =>
        document.removeEventListener(event, handleFirstUserInteraction)
      );
    };
  }, [handleFirstUserInteraction]);

  const toggleSound = () => {
    const newState = !isPlaying;
    setIsPlaying(!isPlaying);
    newState ? audioRef.current.play() : audioRef.current.pause();
    localStorage.setItem("musicConsent", String(newState));
    localStorage.setItem("consentTime", new Date().toISOString());
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* {/_ Always visible Toggle Button _/} */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 right-4 z-50 p-2 bg-gray-700 text-white rounded-l-lg shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "right-[330px]" : "right-2"
        }`}
      >
        <span className="text-xl">{isSidebarOpen ? "→" : "←"}</span>
      </button>

      {/* Vertical Sliding Sidebar */}
      <div
        className={`fixed top-4 right-0 h-12 w-80 bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-full w-full py-4 space-y-4">
          <button className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none text-sm">
            Profile
          </button>
          <button className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none text-sm">
            Login
          </button>
          {/* Sound Control Button */}
          <motion.button
            onClick={toggleSound}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none text-sm"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.284a5.25 5.25 0 0 1 0 7.432M9 17.25V6.75a3 3 0 0 1 3-3h2.25a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H12a3 3 0 0 1-3-3Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 12.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM12 6a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={"/audio/audiomass-output.mp3"} type="audio/mp3" />
        your browser does not support the audio element.
      </audio>

      {/* Sound Modal */}
      <AnimatePresence>
        {showModal &&
          createPortal(
            <motion.div
              key="my-modal-animation"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-background/60"
            >
              <div className="bg-background/20 border border-dashed border-orange-500 rounded px-6 py-8 text-center shadow-glass-inset backdrop-blur-[6px] space-y-8 xs:px-10 sm:px-16">
                <p className="font-light">
                  Do you like to play background music? <br /> or are you the
                  kind who adds your own soundtrack while exploring galaxies of
                  blogs?
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={toggleSound}
                    className="rounded border border-dashed border-orange-500 px-4 py-2 hover:text-orange-500 hover:shadow-glass-sm mr-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded border border-dashed border-orange-500 px-4 py-2 hover:text-orange-500 hover:shadow-glass-sm"
                  >
                    No
                  </button>
                </div>
              </div>
            </motion.div>,
            document.body
          )}
      </AnimatePresence>
    </>
  );
};

export default UserMenu;
