"use client";

import { useBlogs } from "@/components/hooks/useBlogs";
import { useSetAtom } from "jotai";
import { selectedCategoryAtom } from "@/app/jotaiAtoms";
import { useEffect } from "react";

const BlogList = ({ category, ItemLayoutComponent }) => {
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>Error loading blogs: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {blogs.length > 0 ? (
        blogs.filter(Boolean).map((blog) => (
          <ItemLayoutComponent key={blog._id} blog={blog} />
        ))
      ) : (
        <p>No blogs found for this category.</p>
      )}
    </div>
  );
};

export default BlogList;
