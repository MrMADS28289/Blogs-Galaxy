"use client";
import Image from "next/image";
import bg from "../../public/background/black_sky.jpg";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/navigation";
import { useSetAtom } from "jotai";
import { isPlanetVisibleAtom } from "./jotaiAtoms";
import { useEffect } from "react";
import Planet from "@/components/models/Planet";
import Header from "@/components/Header";

export default function Home() {
  const setIsPlanetVisible = useSetAtom(isPlanetVisibleAtom);

  useEffect(() => {
    setIsPlanetVisible(true);
  }, [setIsPlanetVisible]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />
      <Header />
      <div id="main-canvas-container" className="w-full h-screen">
        <Navigation />
        <RenderModel>
          <Planet />
        </RenderModel>
      </div>
    </main>
  );
}
