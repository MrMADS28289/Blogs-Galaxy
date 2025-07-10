"use client";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

const NavLink = motion.create(Link);
const HomeBtn = () => {
  return (
    <NavLink
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      href={"/"}
      target={"_self"}
      className="custom-bg fixed left-4 top-4 z-50 flex self-start w-fit items-center justify-center rounded-full text-foreground"
      aria-label={"home"}
      name={"home"}
      prefetch={false}
    >
      <span className="relative size-14 p-4 hover:text-orange-500">
        <Home className="h-auto w-full" strokeWidth={1.5} />

        <span className="absolute left-0 top-0 size-full peer bg-transparent" />

        <span className="absolute left-full top-1/2 -translate-y-1/2 mx-2 hidden whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm shadow-lg peer-hover:block text-foreground">
          Home
        </span>
      </span>
      <span className="sr-only">Go to Home Page</span>
    </NavLink>
  );
};

export default HomeBtn;
