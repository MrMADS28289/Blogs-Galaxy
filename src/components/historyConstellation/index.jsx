import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const HistoryConstellationDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="  text-xl md:text-2xl text-left w-full capitalize">
            Welcome to the History Constellation
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
            This is the History Constellation, a journey through time to explore significant events, civilizations, and figures that shaped our world. Discover the past to understand the present.
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            1000+ <sub className="font-semibold text-base">years of history</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            50+{" "}
            <sub className="font-semibold text-base">civilizations</sub>
          </p>
        </ItemLayout>

        

        

        

        

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/codebucks27/Nextjs-contentlayer-blog"
            target="_blank"
            className="w-full"
          >
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default HistoryConstellationDetails;
