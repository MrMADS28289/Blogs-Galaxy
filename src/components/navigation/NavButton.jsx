import {
  Rocket,
  Earth,
  History,
  Brain,
  Gamepad,
  CreativeCommons,
  Lightbulb,
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

    // Fallback for old icons or if an icon is not found
    // case "Rocket":
    //   return <Rocket className="w-full h-auto" strokeWidth={1.5} />;
    // case "Brain":
    //   return <Brain className="w-full h-auto" strokeWidth={1.5} />;
    // case "Gamepad":
    //   return <Gamepad className="w-full h-auto" strokeWidth={1.5} />;
    // case "CreativeCommons":
    //   return <CreativeCommons className="w-full h-auto" strokeWidth={1.5} />;
    // case "Lightbulb":
    //   return <Lightbulb className="w-full h-auto" strokeWidth={1.5} />;

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
    "Community": "community",
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
              className="flex items-center justify-center custom-bg rounded-full text-foreground"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
              onClick={handleClick} // Add onClick handler
            >
              <span className="relative size-14 p-4 animate-spin-slow-reverse group-hover:pause hover:text-orange-500">
                {getIcon(icon)}

                <span className="absolute left-0 top-0 size-full peer bg-transparent" />

                <span className="absolute left-full top-1/2 -translate-y-1/2 mx-2 hidden whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm shadow-lg peer-hover:block text-foreground">
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="cursor-pointer z-50 w-fit">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="flex items-center justify-center custom-bg rounded-full text-foreground"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
              onClick={handleClick} // Add onClick handler
            >
              <span className="relative size-10 p-2.5 animate-spin-slow-reverse hover:text-orange-500 xs:p-4 xs:size-14">
                {getIcon(icon)}

                <span className="absolute left-0 top-0 size-full peer bg-transparent" />

                <span
                  className={clsx(
                    "absolute left-full top-1/2 -translate-y-1/2 mx-2 hidden whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm shadow-lg peer-hover:block text-foreground",
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
