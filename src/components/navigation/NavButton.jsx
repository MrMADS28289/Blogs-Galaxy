import {
  Rocket,
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
import { useSetAtom } from "jotai"; // Import useSetAtom
import { selectedCategoryAtom } from "@/app/jotaiAtoms"; // Import selectedCategoryAtom

const getIcon = (icon) => {
  switch (icon) {
    case "Laptop":
      return <Laptop className="h-auto w-full" strokeWidth={1.5} />;
    case "Earth":
      return <Earth className="h-auto w-full" strokeWidth={1.5} />;
    case "History":
      return <History className="h-auto w-full" strokeWidth={1.5} />;
    case "Bot":
      return <Bot className="h-auto w-full" strokeWidth={1.5} />;
    case "Award":
      return <Award className="h-auto w-full" strokeWidth={1.5} />;
    case "Palette":
      return <Palette className="h-auto w-full" strokeWidth={1.5} />;
    case "Sparkles":
      return <Sparkles className="h-auto w-full" strokeWidth={1.5} />;
    case "MessageCircle":
      return <MessageCircle className="h-auto w-full" strokeWidth={1.5} />;
    default:
      return <HelpCircle className="h-auto w-full" strokeWidth={1.5} />;
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
            className="absolute z-50 cursor-pointer"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
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
          </div>
        ) : (
          <div className="z-50 w-fit cursor-pointer">
            <NavLink
              variants={item}
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
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
