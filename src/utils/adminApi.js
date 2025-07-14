const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const fetchAllBlogsAdmin = async (token, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch blogs for admin");
    }
    // Assuming the API might return an object with a 'blogs' key for pagination
    // or directly an array of blogs.
    return data.blogs ? data : { blogs: data, totalPages: 1, totalBlogs: data.length };
  } catch (error) {
    console.error("Error fetching all blogs for admin:", error);
    throw error;
  }
};

export const deleteBlogAdmin = async (blogId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete blog");
    }
    return { message: "Blog deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const createBlogAdmin = async (blogData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create blog");
    }
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const fetchAllUsersAdmin = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users for admin");
    }
    return data;
  } catch (error) {
    console.error("Error fetching all users for admin:", error);
    throw error;
  }
};

export const deleteUserAdmin = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete user");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateBlogAdmin = async (blogId, blogData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update blog");
    }
    return data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const updateUserRoleAdmin = async (userId, newRole, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update user role");
    }
    return data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const fetchAllCommentsAdmin = async (token, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch comments for admin");
    }
    // Assuming the API might return an object with a 'comments' key for pagination
    // or directly an array of comments.
    return data.comments ? data : { comments: data, totalPages: 1, totalComments: data.length };
  } catch (error) {
    console.error("Error fetching all comments for admin:", error);
    throw error;
  }
};

export const deleteCommentAdmin = async (commentId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete comment");
    }
    return { message: "Comment deleted successfully" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const fetchAnalyticsData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch analytics data");
    }
    return data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};
