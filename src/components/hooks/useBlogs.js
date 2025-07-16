import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../../app/jotaiAtoms";

// Base URL for the backend API, pulled from environment variables.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

//  Custom React hook for fetching and managing blog posts.

export function useBlogs(page = 1, limit = 10) {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    // function to handle the blog fetching logic.
    async function fetchBlogs() {
      setLoading(true);
      setError(null);

      try {
        // Construct the base URL with pagination parameters.
        let url = `${API_BASE_URL}/blogs?page=${page}&limit=${limit}`;
        if (selectedCategory) {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }

        // Perform the API call.
        const response = await fetch(url);

        // Check if the HTTP response was successful.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response.
        const result = await response.json();

        // Validate the structure of the API response.
        if (result && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
          setTotalPages(result.totalPages || 1);
          setTotalBlogs(result.totalBlogs || 0);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    // Only fetch blogs if a category has been selected
    if (selectedCategory !== null) {
      fetchBlogs();
    }
  }, [selectedCategory, page, limit]);

  return { blogs, loading, error, totalPages, totalBlogs };
}
