"use client";


import RenderModel from "@/components/RenderModel";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
});
import { useSetAtom } from "jotai";
import { isPlanetVisibleAtom } from "./jotaiAtoms";
import { useEffect } from "react";
import Planet from "@/components/models/Planet";
import Header from "@/components/Header";
import GeminiChat from "@/components/GeminiChat";

export default function Home() {
  const setIsPlanetVisible = useSetAtom(isPlanetVisibleAtom);

  useEffect(() => {
    setIsPlanetVisible(true);
  }, [setIsPlanetVisible]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <div
        className="absolute inset-0 -z-50 size-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/background/black_sky.jpg')` }}
      />
      <Header />
      <GeminiChat />
      <div id="main-canvas-container" className="h-screen w-full relative">
        <div className="relative">
          <Navigation />
        </div>
        <RenderModel className="size-full">
          <Planet />
        </RenderModel>
      </div>
    </main>
  );
}
