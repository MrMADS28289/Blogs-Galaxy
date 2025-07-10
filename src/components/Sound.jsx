"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const Sound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFirstUserInteraction = useCallback(() => {
    const musicConsent = localStorage.getItem("musicConsent");
    if (musicConsent === "true" && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
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
      // Do not set isPlaying here yet. It depends on autoplay success.

      if (userConsented) {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true); // Autoplay succeeded
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error);
              setIsPlaying(false); // Autoplay failed
              // If autoplay is prevented, add event listeners for a user interaction
              ["click", "keydown", "touchstart"].forEach((event) =>
                document.addEventListener(event, handleFirstUserInteraction)
              );
            });
        }
      } else {
        setIsPlaying(false); // User previously consented to NO music
      }
    } else {
      setShowModal(true);
      setIsPlaying(false); // No consent yet, so not playing
    }

    // Cleanup function for event listeners
    return () => {
      ["click", "keydown", "touchstart"].forEach((event) =>
        document.removeEventListener(event, handleFirstUserInteraction)
      );
    };
  }, [handleFirstUserInteraction]);

  const toggle = () => {
    const newState = !isPlaying;
    setIsPlaying(!isPlaying);
    newState ? audioRef.current.play() : audioRef.current.pause();
    localStorage.setItem("musicConsent", String(newState));
    localStorage.setItem("consentTime", new Date().toISOString());
    setShowModal(false);
  };
  return (
    <div className="fixed top-4 right-2.5 z-50 group xs:right-4">
      <AnimatePresence>
        {showModal && (
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
                Do you like to play background music? <br /> or are you the kind
                who adds your own soundtrack while exploring galaxies of blogs?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={toggle}
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
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop>
        <source src={"/audio/audiomass-output.mp3"} type="audio/mp3" />
        your browser does not support the audio element.
      </audio>
      <motion.button
        onClick={toggle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="custom-bg flex size-10 cursor-pointer items-center justify-center rounded-full p-2.5 text-foreground xs:size-14 xs:p-4"
        aria-label={"Sound control button"}
        name={"Sound control button"}
      >
        {isPlaying ? (
          <Volume2
            className="size-full text-foreground group-hover:text-orange-500"
            strokeWidth={1.5}
          />
        ) : (
          <VolumeX
            className="size-full text-foreground group-hover:text-orange-500"
            strokeWidth={1.5}
          />
        )}
      </motion.button>
    </div>
  );
};

export default Sound;
