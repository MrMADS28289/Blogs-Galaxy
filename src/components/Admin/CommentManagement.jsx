import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAllCommentsAdmin, deleteCommentAdmin } from "@/utils/adminApi";
import { toast } from "sonner";

import ErrorMessage from "../UI/ErrorMessage";

const CommentManagement = () => {
  const [user] = useAtom(userAtom);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getComments = async () => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAllCommentsAdmin(user.token);
      setComments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, [user]);

  const handleDelete = async (commentId) => {
    if (!user || !user.token) {
      toast.error("User not authenticated.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteCommentAdmin(commentId, user.token);
        toast.success("Comment deleted successfully!");
        // Refresh the list after deletion
        getComments();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <p className="text-white">Loading comments...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (comments.length === 0)
    return <p className="text-white">No comments found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Comments</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
            <button
              onClick={() => handleDelete(comment._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentManagement;
