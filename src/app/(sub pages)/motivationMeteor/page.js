import Image from "next/image";
import bg from "/public/background/space2.jpg";
import RenderModel from "@/components/RenderModel";
import MotivationMeteorDetails from "@/components/motivationMeteor";
import dynamic from "next/dynamic";
const MotivationModel = dynamic(() => import("@/components/models/MotivationModel"), {
  ssr: false,
});

export const metadata = {
  title: "Motivation Meteor",
};

export default function Home() {
  return (
    <>
      

      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen absolute top-1/2 -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <MotivationModel />
        </RenderModel>
      </div>

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute flex flex-col items-center text-center top-1/2 sm:top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="font-bold  text-6xl xs:text-7xl sm:text-8xl  lg:text-9xl text-accent">
            Motivation Meteor
          </h1>
          <p className="font-light text-foreground text-lg">
            Explore the Motivation Meteor
          </p>
        </div>
      </div>

      <MotivationMeteorDetails />
    </>
  );
}
