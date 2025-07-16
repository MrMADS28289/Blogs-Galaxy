import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { createBlogAdmin, updateBlogAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

const BlogForm = ({ onBlogCreated, blog }) => {
  const [user] = useAtom(userAtom);

  // These are the predefined categories for blog posts. Makes it easy to keep things organized.
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

  // State variables to hold the values of form inputs.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState(categories[0] || ""); // Default to the first category.
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false); // To show a loading state during form submission.

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setCoverImage(blog.coverImage || "");
      setCategory(blog.category || categories[0] || "");
      setTags(blog.tags ? blog.tags.join(", ") : "");
    } else {
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
      // Gather all the form data into one object.
      const blogData = {
        title,
        content,
        coverImage,
        category,
        // Split tags by comma, trim whitespace, and filter out any empty strings.
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        author: user.id, // Assign the current user as the author.
      };

      // Decide whether to create a new blog or update an existing one.
      if (blog && blog._id) {
        await updateBlogAdmin(blog._id, blogData, user.token);
        toast.success("Blog updated successfully!");
      } else {
        await createBlogAdmin(blogData, user.token);
        toast.success("Blog created successfully!");
      }

      // After a successful submission, clear the form and trigger any parent callbacks.
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
      <h2 className="mb-4 text-2xl font-bold text-white">
        {/* Dynamically change the heading based on whether we're editing or creating. */}
        {blog ? "Edit Blog" : "Create New Blog"}
      </h2>
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
                {/* Just making the category names look nice. */}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
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
          {/* Change the button text based on whether loading and if it's an edit or create operation. */}
          {loading
            ? blog
              ? "Updating..."
              : "Creating..."
            : blog
            ? "Update Blog"
            : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
