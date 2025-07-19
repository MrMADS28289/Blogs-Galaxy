import { toast } from "sonner";
import { handleUnauthorized } from "./authUtils";

// Base URL for authentication API endpoints.
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

/**
 * Registers a new user.
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
    toast.error(error.message || "Registration failed. Please try again.");
    throw error;
  }
};

/**
 * Logs in an existing user.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
    toast.error(
      error.message || "Login failed. Please check your credentials."
    );
    throw error;
  }
};

/**
 * Handles Google sign-in/registration.
 */
export const googleSignInUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google-signin`, {
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
    toast.error(error.message || "Google sign-in failed. Please try again.");
    throw error;
  }
};

/**
 * Updates a user's profile information.
 */
export const updateUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
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
    toast.error(error.message || "Failed to update profile. Please try again.");
    handleUnauthorized(error);
    throw error;
  }
};
