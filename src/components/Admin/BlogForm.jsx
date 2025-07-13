import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { createBlogAdmin, updateBlogAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

const BlogForm = ({ onBlogCreated, blog }) => {
  const [user] = useAtom(userAtom);

  const categories = [
    "tech",
    "geography",
    "history",
    "ai",
    "sports",
    "creative",
    "motivation",
    "community",
  ];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setCoverImage(blog.coverImage || "");
      setCategory(blog.category || categories[0] || "");
      setTags(blog.tags ? blog.tags.join(", ") : "");
    } else {
      // Reset form for new blog creation
      setTitle("");
      setContent("");
      setCoverImage("");
      setCategory(categories[0] || "");
      setTags("");
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const blogData = {
        title,
        content,
        coverImage,
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        author: user.id, // Send user.id (ObjectId) as author
      };

      if (blog && blog._id) {
        await updateBlogAdmin(blog._id, blogData, user.token);
        toast.success("Blog updated successfully!");
      } else {
        await createBlogAdmin(blogData, user.token);
        toast.success("Blog created successfully!");
      }

      // Reset form or handle post-submission logic
      setTitle("");
      setContent("");
      setCoverImage("");
      setCategory(categories[0] || "");
      setTags("");
      if (onBlogCreated) {
        onBlogCreated();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">{blog ? "Edit Blog" : "Create New Blog"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-white"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-bold text-white"
          >
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-32 w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="coverImage"
            className="mb-2 block text-sm font-bold text-white"
          >
            Cover Image URL:
          </label>
          <input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-bold text-white"
          >
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="tags"
            className="mb-2 block text-sm font-bold text-white"
          >
            Tags (comma-separated):
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? (blog ? "Updating..." : "Creating...") : (blog ? "Update Blog" : "Create Blog")}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
