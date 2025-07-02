import Planet from "@/components/models/Planet";
import RenderModel from "@/components/RenderModel";
import Image from "next/image";
import bg from "../../public/background/space3.jpg";
import Navigation from "@/components/navigation";
import GalaxyScene from "@/components/GalaxyScene";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between relative text-white">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      <GalaxyScene />
      {/* <GalaxyBackground /> */}
      <Navigation className="w-full h-screen relative z-20" />
      <RenderModel className="absolute inset-0 z-10">
        <Planet />
      </RenderModel>
      {/* <div className="w-full h-screen relative z-20">
      </div> */}
    </main>
  );
}
