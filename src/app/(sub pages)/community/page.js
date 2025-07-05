import RenderModel from "@/components/RenderModel";
import CommunityDetails from "@/components/community";
import dynamic from "next/dynamic";
const CommunityModel = dynamic(() => import("@/components/models/CommunityModel"), {
  ssr: false,
});

export const metadata = {
  title: "Community",
};

export default function CommunityPage() {
  return (
    <>
      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen absolute top-1/3 -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <CommunityModel />
        </RenderModel>
      </div>

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute flex flex-col items-center text-center top-1/2 sm:top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="font-bold  text-6xl xs:text-2xl sm:text-4xl  lg:text-6 text-accent">
            Community
          </h1>
          <p className="font-light text-foreground text-lg">
            Explore the Community
          </p>
        </div>
      </div>

      <CommunityDetails />
    </>
  );
}
