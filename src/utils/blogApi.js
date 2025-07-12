export const likeBlog = async (blogId, token, action) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/blogs/${blogId}/rate`,
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
    throw error; // Re-throw to be handled by the calling component
  }
};

export const fetchComments = async (blogId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/comments/blog/${blogId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

export const fetchBlogById = async (blogId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog by ID:", error);
    throw error;
  }
};
