import Image from "next/image";
import bg from "/public/background/space1.jpg";
import RenderModel from "@/components/RenderModel";
import GeographyNebulaDetails from "@/components/geographyNebula";
import dynamic from "next/dynamic";
import ScrollButton from "@/components/ScrollButton";
const GeographyModel = dynamic(() => import("@/components/models/GeographyModel"), {
  ssr: false,
});

export const metadata = {
  title: "Geography Nebula",
};

export default function Home() {
  return (
    <>
      

      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen absolute top-1/3 -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <GeographyModel />
        </RenderModel>
      </div>

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute flex flex-col items-center text-center top-1/2 sm:top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="font-bold  text-6xl xs:text-2xl sm:text-4xl  lg:text-6 text-accent">
            Geography Nebula
          </h1>
          <p className="font-light text-foreground text-lg">
            Explore the Geography Nebula
          </p>
        </div>
      </div>

      <GeographyNebulaDetails />
      <ScrollButton />
    </>
  );
}
