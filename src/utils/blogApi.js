import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const likeBlog = async (blogId, token, action) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${blogId}/rate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Or return true/false based on API response
  } catch (error) {
    console.error("Failed to like blog:", error);
    toast.error(error.message || "Failed to update like status.");
    throw error; // Re-throw to be handled by the calling component
  }
};

export const fetchComments = async (blogId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/comments/blog/${blogId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    toast.error(error.message || "Failed to fetch comments.");
    throw error; // Re-throw to be handled by the calling component
  }
};

export const fetchBlogById = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog by ID:", error);
    toast.error(error.message || "Failed to fetch blog details.");
    throw error;
  }
};

export const addComment = async (commentData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: commentData.content, blogId: commentData.blogId, author: commentData.author }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add comment:", error);
    toast.error(error.message || "Failed to add comment.");
    throw error;
  }
};
