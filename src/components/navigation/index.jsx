"use client";
import { BtnList } from "@/app/data";
import React from "react";
import NavButton from "./NavButton";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../ResponsiveComponent";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Importing all individual 3D model components.
import TechModel from "@/components/models/TechModel";
import GeographyModel from "@/components/models/GeographyModel";
import HistoryModel from "@/components/models/HistoryModel";
import AiModel from "@/components/models/AiModel";
import SportsModel from "@/components/models/SportsModel";
import CreativeModel from "@/components/models/CreativeModel";
import MotivationModel from "@/components/models/MotivationModel";
import CommunityModel from "@/components/models/CommunityModel";

// This object maps navigation item labels to their corresponding 3D model components.
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

const Navigation = () => {
  // Calculates the angle increment for evenly distributing navigation buttons in a circle.
  const angleIncrement = 360 / BtnList.length;
  // Retrieves the current screen size using a custom hook.
  const size = useScreenSize();
  // Determines if the screen width is considered large (desktop).
  const isLarge = size >= 1024;
  // Determines if the screen width is considered medium (tablet).
  const isMedium = size >= 768;

  return (
    <div className="fixed z-20 flex h-screen w-full items-center justify-center">
      {/* Uses ResponsiveComponent to render different layouts based on screen size. */}
      <ResponsiveComponent>
        {({ size }) =>
          // Renders the circular navigation layout for screens 480px and wider.
          size && size >= 480 ? (
            // Container for the circular navigation buttons, with a slow spin animation.
            <motion.div className="hover:pause group relative flex w-max animate-spin-slow items-center justify-center">
              {BtnList.map((btn, index) => {
                // Calculates the angular position for each button.
                const angleRad = (index * angleIncrement * Math.PI) / 180;
                // Determines the radius of the circular layout based on screen size.
                const radius = isLarge
                  ? "calc(20vw - 1rem)"
                  : isMedium
                  ? "calc(30vw - 1rem)"
                  : "calc(40vw - 1rem)";
                // Calculates the X coordinate for the button's position.
                const x = `calc(${radius} * ${Math.cos(angleRad)})`;
                // Calculates the Y coordinate for the button's position.
                const y = `calc(${radius} * ${Math.sin(angleRad)})`;

                // Dynamically imports the 3D model component associated with the current navigation button.
                const DynamicModel = dynamic(
                  () =>
                    Promise.resolve(
                      modelComponents[btn.label.replace(/\s/g, "")]
                    ),
                  { ssr: false } // Ensures the model is rendered only on the client-side.
                );

                return (
                  // Renders a navigation button with its calculated position and embedded 3D model.
                  <NavButton key={btn.label} x={x} y={y} {...btn} index={index}>
                    <DynamicModel />
                  </NavButton>
                );
              })}
            </motion.div>
          ) : (
            // Renders a stacked navigation layout for screens smaller than 480px.
            <>
              {/* Container for the first half of the navigation buttons, stacked vertically. */}
              <motion.div className="group relative flex w-full flex-col items-start justify-center space-y-4 px-2.5 xs:hidden xs:w-max xs:items-center xs:p-0">
                {BtnList.slice(0, BtnList.length / 2).map((btn, index) => {
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
                      index={index}
                    >
                      <DynamicModel />
                    </NavButton>
                  );
                })}
              </motion.div>

              {/* Container for the second half of the navigation buttons, stacked vertically. */}
              <motion.div
                variants={container} // Animation variants for this container.
                initial="hidden"
                animate="show"
                className="group relative flex w-full flex-col items-end justify-center space-y-4 px-2.5 xs:hidden xs:w-max xs:items-center xs:p-0"
              >
                {BtnList.slice(BtnList.length / 2).map((btn, index) => {
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
                      index={index + Math.floor(BtnList.length / 2)}
                    >
                      <DynamicModel />
                    </NavButton>
                  );
                })}
              </motion.div>
            </>
          )
        }
      </ResponsiveComponent>
    </div>
  );
};

export default Navigation;
