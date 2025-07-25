"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaCog,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAtom } from "jotai";
import {
  userAtom,
  isAuthenticatedAtom,
  showProfileModalAtom,
} from "@/app/jotaiAtoms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileModal from "../ProfileModal";

/**
 * UserMenu component provides navigation and user-related functionalities.
 * This includes profile access, authentication actions (login/logout), and background music control.
 */
const UserMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  // Effect to set `mounted` state to true once the component has mounted.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Jotai atoms for global state management.
  const [, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setShowProfileModal] = useAtom(showProfileModalAtom);
  // Next.js router instance for programmatic navigation.
  const router = useRouter();

  /**
   * Callback function to handle the first user interaction (click, keydown, touchstart).
   * This is crucial for autoplaying audio, as browsers require a user gesture.
   * It checks for music consent and plays audio if permitted, then removes event listeners.
   */
  const handleFirstUserInteraction = useCallback(() => {
    const musicConsent = localStorage.getItem("musicConsent");
    if (musicConsent === "true" && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }

    // Remove event listeners after the first interaction to prevent multiple calls.
    ["click", "keydown", "touchstart"].forEach((event) =>
      document.removeEventListener(event, handleFirstUserInteraction)
    );
  }, [isPlaying]); // Dependency on `isPlaying` to ensure the latest state is captured.

  /**
   * Effect hook to manage background music playback and consent.
   * It checks for existing music consent in localStorage and prompts the user if needed.
   * If autoplay fails, it sets up event listeners for the first user interaction.
   */
  useEffect(() => {
    const handleUnauthorizedEvent = () => {
      setUser(null);
    };

    window.addEventListener('unauthorized-event', handleUnauthorizedEvent);

    return () => {
      window.removeEventListener('unauthorized-event', handleUnauthorizedEvent);
    };
  }, [setUser]); // Dependency on `handleFirstUserInteraction` to ensure it's up-to-date.

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
      setUser(null);
      toast.success("Logged out successfully!");
      router.push("/");
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
          "custom-bg group fixed top-4 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full p-2 text-foreground shadow-lg transition-all duration-300 ease-in-out",
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
          <FaCog
            className="size-full text-foreground group-hover:text-orange-500"
            strokeWidth={1.5}
          />
          <span className="peer absolute left-0 top-0 size-full bg-transparent" />
          <span className="absolute right-full top-1/2 mx-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
            Settings
          </span>
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
            className="custom-bg group relative flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
          >
            <FaUser
              className="size-full text-foreground group-hover:text-orange-500"
              strokeWidth={1.5}
            />
            <span className="peer absolute left-0 top-0 size-full bg-transparent" />
            <span className="absolute left-1/2 top-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
              Profile
            </span>
          </button>

          <motion.button
            onClick={toggle}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            className="custom-bg group relative flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
            aria-label={"Sound control button"}
            name={"Sound control button"}
          >
            {mounted &&
              (isPlaying ? (
                <FaVolumeUp
                  className="size-full text-foreground group-hover:text-orange-500"
                  strokeWidth={1.5}
                />
              ) : (
                <FaVolumeMute
                  className="size-full text-foreground group-hover:text-orange-500"
                  strokeWidth={1.5}
                />
              ))}
            <span className="peer absolute left-0 top-0 size-full bg-transparent" />
            <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
              Sound
            </span>
          </motion.button>

          <button
            onClick={handleAuthClick}
            className="custom-bg group relative flex size-6 cursor-pointer items-center justify-center rounded-full p-1 text-foreground"
          >
            {mounted &&
              (isAuthenticated ? (
                <FaSignOutAlt
                  className="size-full text-foreground group-hover:text-orange-500"
                  strokeWidth={1.5}
                />
              ) : (
                <FaSignInAlt
                  className="size-full text-foreground group-hover:text-orange-500"
                  strokeWidth={1.5}
                />
              ))}
            <span className="peer absolute left-0 top-0 size-full bg-transparent" />
            <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
              {mounted && (isAuthenticated ? "Logout" : "Login")}
            </span>
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
