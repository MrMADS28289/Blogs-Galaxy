"use client";
import HomeBtn from "@/components/HomeBtn";
import { useSetAtom } from "jotai";
import { isPlanetVisibleAtom } from "../jotaiAtoms";
import { useEffect } from "react";

export default function SubPagesLayout({ children }) {
  const setIsPlanetVisible = useSetAtom(isPlanetVisibleAtom);

  useEffect(() => {
    setIsPlanetVisible(false);
    return () => {
      setIsPlanetVisible(true);
    };
  }, [setIsPlanetVisible]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <HomeBtn />
      {children}
    </main>
  );
}
