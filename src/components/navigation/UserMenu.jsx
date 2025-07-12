"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Volume2, VolumeX, Settings, User, LogIn, LogOut } from "lucide-react";
import { useAtom } from "jotai";
import {
  userAtom,
  isAuthenticatedAtom,
  showProfileModalAtom,
} from "@/app/jotaiAtoms";
import { useRouter } from "next/navigation";
import ProfileModal from "../ProfileModal";

const UserMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false); // New state for hydration
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setShowProfileModal] = useAtom(showProfileModalAtom);
  const router = useRouter();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setShowProfileModal(true);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Handle logout
      setUser(null);
      setIsAuthenticated(false);
      router.push("/"); // Redirect to home after logout
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <ProfileModal />
      <button
        onClick={toggleSidebar}
        className={clsx(
          "custom-bg fixed top-4 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full p-2 text-foreground shadow-lg transition-all duration-300 ease-in-out",
          {
            "right-150": isSidebarOpen,
            "right-2": !isSidebarOpen,
          }
        )}
      >
        <motion.div
          animate={{ rotate: isSidebarOpen ? 360 : 0 }}
          transition={{ duration: 1 }}
        >
          <Settings
            className="size-full text-foreground hover:text-orange-500"
            strokeWidth={1.5}
          />
        </motion.div>
      </button>

      <div
        className={clsx(
          "fixed right-0 top-4 z-40 h-8 w-36 rounded-xl bg-slate-900 p-1 shadow-lg transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isSidebarOpen,
            "translate-x-full": !isSidebarOpen,
          }
        )}
      >
        <div className="flex size-full items-center justify-evenly">
          <button
            onClick={handleProfileClick}
            className="custom-bg flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
          >
            <User
              className="size-full text-foreground hover:text-orange-500"
              strokeWidth={1.5}
            />
          </button>

          <motion.button
            onClick={toggle}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            className="custom-bg flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
            aria-label={"Sound control button"}
            name={"Sound control button"}
          >
            {mounted && (isPlaying ? (
              <Volume2
                className="size-full text-foreground hover:text-orange-500"
                strokeWidth={1.5}
              />
            ) : (
              <VolumeX
                className="size-full text-foreground hover:text-orange-500"
                strokeWidth={1.5}
              />
            ))}
          </motion.button>

          <button
            onClick={handleAuthClick}
            className="custom-bg flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
          >
            {mounted && (isAuthenticated ? (
              <LogOut
                className="size-full text-foreground hover:text-orange-500"
                strokeWidth={1.5}
              />
            ) : (
              <LogIn
                className="size-full text-foreground hover:text-orange-500"
                strokeWidth={1.5}
              />
            ))}
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop>
        <source src={"/audio/audiomass-output.mp3"} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {showModal &&
        createPortal(
          <div
            key="my-modal-animation"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-8 rounded border border-dashed border-orange-500 bg-background/20 px-6 py-8 text-center shadow-glass-inset backdrop-blur-[6px] xs:px-10 sm:px-16">
              <p className="font-light">
                Do you like to play background music? <br /> or are you the kind
                who adds your own soundtrack while exploring galaxies of blogs?
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggle}
                  className="rounded border border-dashed border-orange-500 px-4 py-2 hover:text-orange-500 hover:shadow-glass-sm"
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
          </div>,
          document.body
        )}
    </>
  );
};

export default UserMenu;
