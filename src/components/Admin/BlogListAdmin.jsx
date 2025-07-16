import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAllBlogsAdmin, deleteBlogAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

import ErrorMessage from "../UI/ErrorMessage";
import Pagination from "../Pagination";

const BlogListAdmin = ({ onEdit, refreshTrigger }) => {
  const [user] = useAtom(userAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 10; // A fixed number of blogs to show on each page.

  const getBlogs = async (page) => {
    // First, a quick check to make sure the user is authenticated. Can't do much without a token!
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAllBlogsAdmin(user.token, page, blogsPerPage);
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // This effect runs whenever the user, current page, or a refresh trigger changes.
  useEffect(() => {
    getBlogs(currentPage);
  }, [user, currentPage, refreshTrigger]);

  // Handles deleting a blog post.
  const handleDelete = async (blogId) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogAdmin(blogId, user.token);
        toast.success("Blog deleted successfully!");
        getBlogs(currentPage);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Conditional Rendering for different states ---
  if (loading) return <p className="text-white">Loading blogs...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (blogs.length === 0 && currentPage === 1)
    return <p className="text-white">No blogs found.</p>;
  if (blogs.length === 0 && currentPage > 1)
    return <p className="text-white">No blogs found on this page.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Blogs</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Loop through each blog and display it. */}
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
          >
            <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
            <div className="flex space-x-2">
              {/* Edit button: clicking this will trigger the onEdit callback passed from the parent. */}
              <button
                onClick={() => onEdit(blog)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              {/* Delete button: calls handleDelete function with the blog's ID. */}
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* pagination component, helping users navigate through blog pages. */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogListAdmin;
