import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth` : "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error) {
    console.error("Registration Error:", error);
    toast.error(error.message || "Registration failed. Please try again.");
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.message || "Login failed. Please check your credentials.");
    throw error;
  }
};

export const googleSignInUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/google-signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Google sign-in failed on backend");
    }
    return data;
  } catch (error) {
    console.error("Google Sign-in Backend Error:", error);
    toast.error(error.message || "Google sign-in failed. Please try again.");
    throw error;
  }
};

export const updateUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update user");
    }
    return data;
  } catch (error) {
    console.error("Update User Error:", error);
    toast.error(error.message || "Failed to update profile. Please try again.");
    throw error;
  }
};
