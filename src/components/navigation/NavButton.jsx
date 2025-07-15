import {
  FaChevronRight,
  FaChevronLeft,
  FaLaptop,
  FaGlobe,
  FaHistory,
  FaRobot,
  FaAward,
  FaPalette,
  FaStar,
  FaComment,
  FaQuestionCircle,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";
import ResponsiveComponent from "../ResponsiveComponent";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { selectedCategoryAtom } from "@/app/jotaiAtoms";

const getIcon = (icon) => {
  switch (icon) {
    case "Laptop":
      return <FaLaptop className="h-auto w-full" />;
    case "Earth":
      return <FaGlobe className="h-auto w-full" />;
    case "History":
      return <FaHistory className="h-auto w-full" />;
    case "Bot":
      return <FaRobot className="h-auto w-full" />;
    case "Award":
      return <FaAward className="h-auto w-full" />;
    case "Palette":
      return <FaPalette className="h-auto w-full" />;
    case "Sparkles":
      return <FaStar className="h-auto w-full" />;
    case "MessageCircle":
      return <FaComment className="h-auto w-full" />;
    default:
      return <FaQuestionCircle className="h-auto w-full" />;
  }
};

const NavLink = motion.create(Link);

const NavButton = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = "right",
  index, // Add index prop
}) => {
  const setSelectedCategory = useSetAtom(selectedCategoryAtom); // Get the setter for selectedCategoryAtom

  const categoryMap = {
    "Tech Galaxy": "tech",
    "Geography Nebula": "geography",
    "History Constellation": "history",
    "AI Universe": "ai",
    "Sports Galaxy": "sports",
    "Creative Corner": "creative",
    "Motivation Meteor": "motivation",
    Community: "community",
  };

  const handleClick = () => {
    const simplifiedCategory = categoryMap[label] || label; // Get simplified name or use original if not found
    setSelectedCategory(simplifiedCategory); // Set the selected category when the button is clicked
  };

  return (
    <ResponsiveComponent>
      {({ size }) => {
        return size && size >= 480 ? (
          <div
            className="absolute z-50 cursor-pointer"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.8 }} // Start slightly below, invisible, and compressed
              animate={{ y: 0, opacity: 1, scale: 1 }} // Slide up, fade in, and stretch to normal
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: index * 0.2 }} // Bouncy spring with staggered delay
            >
              <NavLink
                href={link}
                target={newTab ? "_blank" : "_self"}
                className="custom-bg flex items-center justify-center rounded-full text-foreground"
                aria-label={label}
                name={label}
                prefetch={false}
                scroll={false}
                onClick={handleClick} // Add onClick handler
              >
                <span className="group-hover:pause relative size-12 animate-spin-slow-reverse p-3 hover:text-orange-500">
                  {getIcon(icon)}

                  <span className="peer absolute left-0 top-0 size-full bg-transparent" />

                  <span className="absolute left-full top-1/2 mx-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
                    {label}
                  </span>
                </span>
              </NavLink>
            </motion.div>
          </div>
        ) : (
          <div className="z-50 w-fit cursor-pointer">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.8 }} // Start slightly below, invisible, and compressed
              animate={{ y: 0, opacity: 1, scale: 1 }} // Slide up, fade in, and stretch to normal
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: index * 0.2 }} // Bouncy spring with staggered delay
            >
              <NavLink
                href={link}
                target={newTab ? "_blank" : "_self"}
                className="custom-bg flex items-center justify-center rounded-full text-foreground"
                aria-label={label}
                name={label}
                prefetch={false}
                scroll={false}
                onClick={handleClick} // Add onClick handler
              >
                <span className="relative size-10 animate-spin-slow-reverse p-2.5 hover:text-orange-500 xs:size-14 xs:p-4">
                  {getIcon(icon)}

                  <span className="peer absolute left-0 top-0 size-full bg-transparent" />

                  <span
                    className={clsx(
                      "absolute left-full top-1/2 mx-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block",
                      labelDirection === "left" ? "left-auto right-full" : ""
                    )}
                  >
                    {label}
                  </span>
                </span>
              </NavLink>
            </motion.div>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
