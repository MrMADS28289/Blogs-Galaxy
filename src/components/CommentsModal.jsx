"use client";
import { useAtom } from "jotai";
import {
  showCommentsModalAtom,
  commentsModalDataAtom,
  userAtom,
} from "@/app/jotaiAtoms";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { addComment } from "@/utils/blogApi";
import { handleUnauthorized } from "@/utils/authUtils";
import { toast } from "sonner";

/**
 * CommentsModal component displays comments for a specific blog post and allows users to add new comments.
 * It uses Jotai for global state management to control its visibility and the data it displays.
 */
const CommentsModal = () => {
  const [showCommentsModal, setShowCommentsModal] = useAtom(
    showCommentsModalAtom
  );
  const [commentsModalData, setCommentsModalData] = useAtom(
    commentsModalDataAtom
  );

  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  // If there's no blog data or comments data, don't render the modal.
  if (!commentsModalData || !commentsModalData.blog) return null;

  const { blog, comments } = commentsModalData;

  // Function to close the modal and clear the new comment input.
  const handleClose = () => {
    setShowCommentsModal(false);
    setNewComment("");
  };

  // Handles the submission of a new comment.
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      if (!user || !user.token) {
        toast.error("You must be logged in to submit a comment.");
        setSubmitting(false);
        return;
      }

      const author = user.name || user.email;

      // Call the API to add the new comment.
      const addedCommentResponse = await addComment(
        {
          blogId: blog._id,
          author: author,
          content: newComment,
        },
        user.token
      );

      // Format the new comment to match existing comment structure.
      const formattedComment = {
        ...addedCommentResponse,
        author: { name: author },
      };

      // Update the comments in the global state, adding the new comment to the top.
      setCommentsModalData((prev) => ({
        ...prev,
        comments: [formattedComment, ...prev.comments],
      }));

      // If a callback for comment added is provided, execute it.
      if (commentsModalData.onCommentAdded) {
        commentsModalData.onCommentAdded(formattedComment);
      }

      setNewComment("");
    } catch (error) {
      console.log(error);
      handleUnauthorized(error);
      toast.error("Failed to submit comment.");
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
          {/* Modal content container with entry/exit animations. */}
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="custom-bg relative mx-4 w-full max-w-3xl rounded-xl p-2 shadow-lg sm:p-4"
            // Prevent clicks on the modal content from closing the modal.
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for the modal. */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-3xl text-orange-500 hover:text-orange-200"
            >
              <MdClose />
            </button>
            <h2 className="mb-4 text-center text-3xl font-bold text-white">
              Comments for {blog.title}
            </h2>
            {/* Scrollable area for displaying existing comments. */}
            <div className="blog-modal-content max-h-[40vh] overflow-y-auto p-6 text-white">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="mb-4 border-b border-gray-700 pb-2 last:border-b-0"
                  >
                    <p className="font-bold">{comment.author.name || "N/A"}</p>
                    <p>{comment.text}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center">No comments yet.</p>
              )}
            </div>
            {/* Form for submitting a new comment. */}
            <form onSubmit={handleSubmitComment} className="mt-4 p-6">
              <textarea
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:border-orange-500 focus:outline-none"
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
