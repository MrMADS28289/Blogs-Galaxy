"use client";

import { useSetAtom } from "jotai";
import { selectedCategoryAtom } from "@/app/jotaiAtoms";
import { useEffect } from "react";

const BlogList = ({ blogs, error, category, ItemLayoutComponent }) => {
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  if (error) {
    return <div>Error loading blogs: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {blogs.length > 0 ? (
        blogs
          .filter(Boolean)
          .map((blog) => <ItemLayoutComponent key={blog._id} blog={blog} />)
      ) : (
        <p>Still finding Blogs for this category.</p>
      )}
    </div>
  );
};

export default BlogList;
