import React from "react";
import BlogList from "@/components/BlogList";
import BlogCard from "@/components/BlogCard";

const TechGalaxyDetails = () => {
  return (
    <section className="py-20 w-full">
      <BlogList category="tech" ItemLayoutComponent={BlogCard} />
    </section>
  );
};

export default TechGalaxyDetails;
