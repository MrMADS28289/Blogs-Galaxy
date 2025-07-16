import {
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

/**
 * Maps an icon string to its corresponding React-Icons component.
 */
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

// Extends Next.js Link component with Framer Motion capabilities for animations.
const NavLink = motion.create(Link);

/**
 * NavButton component renders an interactive navigation button, often with a 3D model.
 * It adapts its layout based on screen size and updates the selected category in global state.
 * @param {object} props - Component props.
 * @param {string} props.x - X-coordinate for positioning (for circular layout).
 * @param {string} props.y - Y-coordinate for positioning (for circular layout).
 * @param {string} props.label - The text label for the navigation button.
 * @param {string} props.link - The URL to navigate to.
 * @param {string} props.icon - The string identifier for the icon to display.
 * @param {boolean} props.newTab - Whether the link should open in a new tab.
 * @param {string} [props.labelDirection='right'] - Direction for the label on smaller screens.
 * @param {number} props.index - Index of the button, used for staggered animations.
 */
const NavButton = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = "right",
  index,
}) => {
  // Jotai setter to update the globally selected category.
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);
  // Mapping of display labels to their corresponding API category slugs.
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

  // Handles click events, updating the selected category in global state.
  const handleClick = () => {
    const simplifiedCategory = categoryMap[label] || label;
    setSelectedCategory(simplifiedCategory);
  };

  return (
    // Uses ResponsiveComponent to adapt rendering based on screen size.
    <ResponsiveComponent>
      {({ size }) => {
        // Renders the circular layout for screens 480px and wider.
        return size && size >= 480 ? (
          <div
            className="absolute z-50 cursor-pointer"
            style={{ transform: `translate(${x}, ${y})` }} // Positions the button using calculated X and Y.
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.8 }} // Initial animation state.
              animate={{ y: 0, opacity: 1, scale: 1 }} // Animation to final state.
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: index * 0.2, // Staggers animation based on button index.
              }}
            >
              <NavLink
                href={link}
                target={newTab ? "_blank" : "_self"} // Opens in new tab if newTab is true.
                className="custom-bg flex items-center justify-center rounded-full text-foreground"
                aria-label={label} // Accessibility label.
                name={label} // Name attribute for the link.
                prefetch={false} // Disables prefetching for this link.
                scroll={false} // Disables scrolling to top on navigation.
                onClick={handleClick} // Handles category selection on click.
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
          // Renders the stacked layout for screens smaller than 480px.
          <div className="z-50 w-fit cursor-pointer">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: index * 0.2,
              }}
            >
              <NavLink
                href={link}
                target={newTab ? "_blank" : "_self"}
                className="custom-bg flex items-center justify-center rounded-full text-foreground"
                aria-label={label}
                name={label}
                prefetch={false}
                scroll={false}
                onClick={handleClick}
              >
                <span className="relative size-10 animate-spin-slow-reverse p-2.5 hover:text-orange-500 xs:size-14 xs:p-4">
                  {getIcon(icon)}
                  <span className="peer absolute left-0 top-0 size-full bg-transparent" />
                  <span
                    className={clsx(
                      "absolute left-full top-1/2 mx-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block",
                      labelDirection === "left" ? "left-auto right-full" : "" // Adjusts label position based on direction.
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
