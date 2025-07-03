import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full p-4 z-50">
      <Link href="/" className="text-2xl font-bold text-white cursor-pointer">
        Blogs Galaxy
      </Link>
    </header>
  );
};

export default Header;
