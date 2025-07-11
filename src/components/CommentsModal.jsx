"use client";
import { useAtom } from "jotai";
import { showCommentsModalAtom, commentsModalDataAtom } from "@/app/jotaiAtoms";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const CommentsModal = () => {
  const [showCommentsModal, setShowCommentsModal] = useAtom(
    showCommentsModalAtom
  );
  const [commentsModalData, setCommentsModalData] = useAtom(
    commentsModalDataAtom
  );
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!commentsModalData || !commentsModalData.blog) return null;

  const { blog, comments } = commentsModalData;

  const handleClose = () => {
    setShowCommentsModal(false);
    setNewComment(""); // Clear comment input on close
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      // Assuming you have user authentication and can get the author's name/ID
      // For now, let's use a placeholder author
      const author = "Anonymous"; // Replace with actual authenticated user

      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization token if your API requires it
          // 'Authorization': `Bearer YOUR_AUTH_TOKEN`
        },
        body: JSON.stringify({
          blogId: blog._id,
          author: author,
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedComment = await response.json();
      // Update the comments list in the modal
      setCommentsModalData((prev) => ({
        ...prev,
        comments: [...prev.comments, addedComment],
      }));
      setNewComment(""); // Clear input field
    } catch (error) {
      console.error("Failed to submit comment:", error);
      // Optionally, show an error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {showCommentsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="custom-bg relative mx-4 w-full max-w-3xl rounded-xl p-2 shadow-lg sm:p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-3xl text-white hover:text-gray-300"
            >
              <MdClose />
            </button>
            <h2 className="mb-4 text-center text-3xl font-bold text-white">
              Comments for {blog.title}
            </h2>
            <div className="max-h-[50vh] overflow-y-auto p-6 text-white">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="mb-4 border-b border-gray-700 pb-2 last:border-b-0"
                  >
                    <p className="font-bold">{comment.author}</p>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center">No comments yet.</p>
              )}
            </div>
            <form onSubmit={handleSubmitComment} className="mt-4 p-6">
              <textarea
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
                rows="3"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <motion.button
                type="submit"
                className="custom-bg mt-2 rounded-full px-4 py-2 text-foreground transition-colors hover:text-orange-500 disabled:opacity-50"
                disabled={submitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {submitting ? "Submitting..." : "Submit Comment"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentsModal;
