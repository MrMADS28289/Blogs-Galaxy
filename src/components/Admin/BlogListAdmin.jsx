import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAllBlogsAdmin, deleteBlogAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

const BlogListAdmin = ({ onEdit }) => {
  const [user] = useAtom(userAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogs = async () => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAllBlogsAdmin(user.token);
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [user]);

  const handleDelete = async (blogId) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogAdmin(blogId, user.token);
        toast.success("Blog deleted successfully!");
        // Refresh the list after deletion
        getBlogs();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <p className="text-white">Loading blogs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (blogs.length === 0) return <p className="text-white">No blogs found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Blogs</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
          >
            <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(blog)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
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
    </div>
  );
};

export default BlogListAdmin;
