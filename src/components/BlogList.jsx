"use client";

import { useSetAtom } from "jotai";
import { selectedCategoryAtom } from "@/app/jotaiAtoms";
import { useEffect } from "react";

import ErrorMessage from "./UI/ErrorMessage";

const BlogList = ({ blogs, error, category, ItemLayoutComponent }) => {
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  if (error) {
    return <ErrorMessage message={`Error loading blogs: ${error}`} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 px-3 lg:grid-cols-2">
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
