import React from "react";
import Link from "next/link";
import Image from "next/image"; // Keep Image import if it's used elsewhere in the component
import BlogList from "@/components/BlogList"; // Import the new BlogList component
import BlogCard from "@/components/BlogCard"; // Import ItemLayout for this specific component

const AiUniverseDetails = () => {
  return (
    <section className="py-20 w-full">
      <BlogList category="ai" ItemLayoutComponent={BlogCard} />
    </section>
  );
};

export default AiUniverseDetails;