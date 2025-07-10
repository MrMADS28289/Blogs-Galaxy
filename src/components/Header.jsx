import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute left-0 top-0 z-50 w-1/4 p-4">
      <Link
        href="/"
        className="cursor-pointer text-2xl font-bold text-white hover:text-orange-500"
      >
        Blogs Galaxy
      </Link>
    </header>
  );
};

export default Header;
