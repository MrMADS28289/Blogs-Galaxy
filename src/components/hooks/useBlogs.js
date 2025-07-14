import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../../app/jotaiAtoms"; // Adjust path as needed

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export function useBlogs(page = 1, limit = 10) {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      setError(null);

      try {
        let url = `${API_BASE_URL}/blogs?page=${page}&limit=${limit}`;
        if (selectedCategory) {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
          setTotalPages(result.totalPages || 1);
          setTotalBlogs(result.totalBlogs || 0);
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

    if (selectedCategory !== null) {
      fetchBlogs();
    }
  }, [selectedCategory, page, limit]);

  return { blogs, loading, error, totalPages, totalBlogs };
}
