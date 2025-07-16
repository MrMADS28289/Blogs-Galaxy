import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAllCommentsAdmin, deleteCommentAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

import ErrorMessage from "../UI/ErrorMessage";
import Pagination from "../Pagination";

const CommentManagement = () => {
  const [user] = useAtom(userAtom);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const commentsPerPage = 10; // display 10 comments per page to keep things neat.

  const getComments = async (page) => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAllCommentsAdmin(
        user.token,
        page,
        commentsPerPage
      );
      setComments(data.comments || []);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // This effect runs when the component mounts, or when the user or current page changes.
  useEffect(() => {
    getComments(currentPage);
  }, [user, currentPage]);

  // This function handles deleting a comment.
  const handleDelete = async (commentId) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteCommentAdmin(commentId, user.token);
        toast.success("Comment deleted successfully!");
        getComments(currentPage);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  // This function is called when the user clicks on a different page number in the pagination.
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Conditional Rendering for different states ---
  if (loading) return <p className="text-white">Loading comments...</p>;
  // If there was an error fetching comments, display it.
  if (error) return <ErrorMessage message={error} />;
  // If no comments are found on the first page, let the user know.
  if (comments.length === 0 && currentPage === 1)
    return <p className="text-white">No comments found.</p>;
  // If no comments are found on a subsequent page, it means we've gone past the last page.
  if (comments.length === 0 && currentPage > 1)
    return <p className="text-white">No comments found on this page.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Comments</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Loop through each comment and display its details. */}
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
          >
            <div>
              <p className="text-white">
                <strong>Comment:</strong> {comment.text}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Author:</strong>{" "}
                {comment.author?.name || comment.author?.email || "N/A"}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Blog:</strong> {comment.blog?.title || "N/A"}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Date:</strong>{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            {/* Delete button for each comment. */}
            <button
              onClick={() => handleDelete(comment._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommentManagement;
