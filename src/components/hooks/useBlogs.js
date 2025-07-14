import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../../app/jotaiAtoms"; // Adjust path as needed

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export function useBlogs() {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true); // Set loading to true at the start of each fetch
      setError(null); // Clear any previous errors

      try {
        let url = `${API_BASE_URL}/blogs`;
        if (selectedCategory) {
          // Only add category if it's not null
          url = `${API_BASE_URL}/blogs?category=${encodeURIComponent(
            selectedCategory
          )}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Adjust this based on your actual API response structure
        // Assuming your API returns an array of blog objects directly or within a 'data' field
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (data && Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (e) {
        console.error("Failed to fetch blogs:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    // Only fetch if selectedCategory is not null (i.e., a category has been set)
    if (selectedCategory !== null) {
      fetchBlogs();
    }
  }, [selectedCategory]); // Re-run effect whenever selectedCategory changes

  return { blogs, loading, error };
}
