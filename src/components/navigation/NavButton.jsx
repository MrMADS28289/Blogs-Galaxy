import {
  Earth,
  History,
  MessageCircle,
  Laptop,
  Bot,
  Award,
  Palette,
  Sparkles,
  HelpCircle,
} from "lucide-react";
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
      return <Laptop className="w-full h-auto" strokeWidth={1.5} />;
    case "Earth":
      return <Earth className="w-full h-auto" strokeWidth={1.5} />;
    case "History":
      return <History className="w-full h-auto" strokeWidth={1.5} />;
    case "Bot":
      return <Bot className="w-full h-auto" strokeWidth={1.5} />;
    case "Award":
      return <Award className="w-full h-auto" strokeWidth={1.5} />;
    case "Palette":
      return <Palette className="w-full h-auto" strokeWidth={1.5} />;
    case "Sparkles":
      return <Sparkles className="w-full h-auto" strokeWidth={1.5} />;
    case "MessageCircle":
      return <MessageCircle className="w-full h-auto" strokeWidth={1.5} />;
    default:
      return <HelpCircle className="w-full h-auto" strokeWidth={1.5} />;
  }
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
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
            className="absolute cursor-pointer z-50"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="text-foreground  rounded-full flex items-center justify-center
        custom-bg
        "
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
              onClick={handleClick} // Add onClick handler
            >
              <span className="relative  w-14 h-14 p-4 animate-spin-slow-reverse group-hover:pause hover:text-orange-500">
                {getIcon(icon)}

                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />

                <span className="absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap">
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="w-fit cursor-pointer z-50">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="text-foreground  rounded-full flex items-center justify-center
        custom-bg
        "
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
              onClick={handleClick} // Add onClick handler
            >
              <span className="relative  w-10 h-10  xs:w-14 xs:h-14 p-2.5 xs:p-4 animate-spin-slow-reverse hover:text-orange-500">
                {getIcon(icon)}

                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />

                <span
                  className={clsx(
                    "absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap",
                    labelDirection === "left" ? "right-full left-auto" : ""
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
