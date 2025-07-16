import { toast } from "sonner";

// Base URL for the blog API endpoints.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

/**
 * Sends a like or unlike action to a blog post.
 */
export const likeBlog = async (blogId, token, action) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    toast.error(error.message || "Failed to update like status.");
    throw error;
  }
};

/**
 * Fetches comments for a specific blog post.
 */
export const fetchComments = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/blog/${blogId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    toast.error(error.message || "Failed to fetch comments.");
    throw error;
  }
};

/**
 * Fetches a single blog post by its ID.
 */
export const fetchBlogById = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    toast.error(error.message || "Failed to fetch blog details.");
    throw error;
  }
};

/**
 * Adds a new comment to a blog post.
 */
export const addComment = async (commentData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: commentData.content,
        blogId: commentData.blogId,
        author: commentData.author,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    toast.error(error.message || "Failed to add comment.");
    throw error;
  }
};

/**
 * Fetches all blog posts.
 */
export const fetchAllBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    toast.error(error.message || "Failed to fetch all blogs.");
    throw error;
  }
};
