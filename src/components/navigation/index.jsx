"use client";
import { BtnList } from "@/app/data";
import React from "react";
import NavButton from "./NavButton";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../ResponsiveComponent";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import all model components directly
import TechModel from "@/components/models/TechModel";
import GeographyModel from "@/components/models/GeographyModel";
import HistoryModel from "@/components/models/HistoryModel";
import AiModel from "@/components/models/AiModel";
import SportsModel from "@/components/models/SportsModel";
import CreativeModel from "@/components/models/CreativeModel";
import MotivationModel from "@/components/models/MotivationModel";
import CommunityModel from "@/components/models/CommunityModel";

// Map component names to their imported components
const modelComponents = {
  TechGalaxy: TechModel,
  GeographyNebula: GeographyModel,
  HistoryConstellation: HistoryModel,
  AIUniverse: AiModel,
  SportsGalaxy: SportsModel,
  CreativeCorner: CreativeModel,
  MotivationMeteor: MotivationModel,
  Community: CommunityModel,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Navigation = () => {
  const angleIncrement = 360 / BtnList.length;
  const size = useScreenSize();
  const isLarge = size >= 1024;
  const isMedium = size >= 768;

  return (
    <div className="fixed z-20 flex h-screen w-full items-center justify-center">
      <ResponsiveComponent>
        {({ size }) => {
          return size && size >= 480 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="hover:pause group relative flex w-max animate-spin-slow items-center justify-center"
            >
              {BtnList.map((btn, index) => {
                const angleRad = (index * angleIncrement * Math.PI) / 180;
                const radius = isLarge
                  ? "calc(20vw - 1rem)"
                  : isMedium
                  ? "calc(30vw - 1rem)"
                  : "calc(40vw - 1rem)";
                const x = `calc(${radius}*${Math.cos(angleRad)})`;
                const y = `calc(${radius}*${Math.sin(angleRad)})`;

                const DynamicModel = dynamic(
                  () =>
                    Promise.resolve(
                      modelComponents[btn.label.replace(/\s/g, "")]
                    ),
                  { ssr: false }
                );

                return (
                  <NavButton key={btn.label} x={x} y={y} {...btn}>
                    <DynamicModel />
                  </NavButton>
                );
              })}
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="group relative flex w-full flex-col items-start justify-center space-y-4 px-2.5 xs:hidden xs:w-max xs:items-center xs:p-0"
              >
                {BtnList.slice(0, BtnList.length / 2).map((btn) => {
                  const DynamicModel = dynamic(
                    () =>
                      Promise.resolve(
                        modelComponents[btn.label.replace(/\s/g, "")]
                      ),
                    { ssr: false }
                  );
                  return (
                    <NavButton key={btn.label} x={0} y={0} {...btn}>
                      <DynamicModel />
                    </NavButton>
                  );
                })}
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="group relative flex w-full flex-col items-end justify-center space-y-4 px-2.5 xs:hidden xs:w-max xs:items-center xs:p-0"
              >
                {BtnList.slice(BtnList.length / 2, BtnList.length).map(
                  (btn) => {
                    const DynamicModel = dynamic(
                      () =>
                        Promise.resolve(
                          modelComponents[btn.label.replace(/\s/g, "")]
                        ),
                      { ssr: false }
                    );
                    return (
                      <NavButton
                        key={btn.label}
                        x={0}
                        y={0}
                        {...btn}
                        labelDirection="left"
                      >
                        <DynamicModel />
                      </NavButton>
                    );
                  }
                )}
              </motion.div>
            </>
          );
        }}
      </ResponsiveComponent>
    </div>
  );
};

export default Navigation;
