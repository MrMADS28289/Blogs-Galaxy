import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-1/4 p-4 z-50">
      <Link
        href="/"
        className="text-2xl font-bold text-white cursor-pointer hover:text-orange-500"
      >
        Blogs Galaxy
      </Link>
    </header>
  );
};

export default Header;
