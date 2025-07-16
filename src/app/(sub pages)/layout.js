"use client";
import HomeBtn from "@/components/HomeBtn";
import { useSetAtom } from "jotai";
import { isPlanetVisibleAtom } from "../jotaiAtoms";
import { useEffect } from "react";
import BlogModal from "@/components/BlogModal";

export default function SubPagesLayout({ children }) {
  // Jotai setter to control the visibility of the planet (3D model).
  const setIsPlanetVisible = useSetAtom(isPlanetVisibleAtom);

  useEffect(() => {
    // When this layout mounts, hide the planet.
    setIsPlanetVisible(false);
    // When this layout unmounts, show the planet again.
    return () => {
      setIsPlanetVisible(true);
    };
  }, [setIsPlanetVisible]); // Dependency array ensures effect runs only when setIsPlanetVisible changes.

  return (
    // Main container for the sub-page content.
    <main className="flex min-h-screen flex-col items-center">
      {/* Home button for easy navigation back to the main page. */}
      <HomeBtn />
      {/* Renders the child components passed to this layout. */}
      {children}
      {/* BlogModal component, likely used for displaying full blog post content. */}
      <BlogModal />
    </main>
  );
}
