import React from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import BlogList from "@/components/BlogList"; // Import the new BlogList component

const SportsGalaxyDetails = () => {
  return (
    <section className="py-20 w-full">
      {/* Blog posts section */}
      <BlogList category="sports" ItemLayoutComponent={BlogCard} />
    </section>
  );
};

export default SportsGalaxyDetails;
