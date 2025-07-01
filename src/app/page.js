import Planet from "@/components/models/Planet";
import RenderModel from "@/components/RenderModel";
import Image from "next/image";
import bg from "../../public/background/space3.jpg";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative text-white">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      <div className="w-full h-screen">
        <Navigation />
        <RenderModel>
          <Planet />
        </RenderModel>
      </div>
    </main>
  );
}
