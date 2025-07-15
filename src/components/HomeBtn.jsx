"use client";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

const NavLink = motion(Link);
const HomeBtn = () => {
  return (
    <NavLink
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      href={"/"}
      target={"_self"}
      className="custom-bg fixed left-4 top-4 z-50 flex w-fit items-center justify-center self-start rounded-full text-foreground"
      aria-label={"home"}
      name={"home"}
      prefetch={false}
    >
      <span className="relative size-10 p-3 hover:text-orange-500">
        <FaHome className="h-auto w-full" strokeWidth={1.5} />

        <span className="peer absolute left-0 top-0 size-full bg-transparent" />

        <span className="absolute left-full top-1/2 mx-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm text-foreground shadow-lg peer-hover:block">
          Home
        </span>
      </span>
      <span className="sr-only">Go to Home Page</span>
    </NavLink>
  );
};

export default HomeBtn;
