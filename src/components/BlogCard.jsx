"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  showBlogModalAtom,
  blogModalDataAtom,
  showCommentsModalAtom,
  commentsModalDataAtom,
  userAtom,
} from "@/app/jotaiAtoms";
import { likeBlog, fetchComments, fetchBlogById } from "@/utils/blogApi";
import { handleUnauthorized } from "@/utils/authUtils";
import { toast } from "sonner";

const BlogCard = ({ blog, className }) => {
  const [currentBlog, setCurrentBlog] = useState(blog);
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  // Jotai atoms for global state management, controlling modal visibility and data.
  const [, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [, setBlogModalData] = useAtom(blogModalDataAtom);
  const [, setShowCommentsModal] = useAtom(showCommentsModalAtom);
  const [, setCommentsModalData] = useAtom(commentsModalDataAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    setCurrentBlog(blog);
    // Check if the current user has liked this blog post.
    if (user && blog.likedBy) {
      const likedByUser = blog.likedBy.some(
        (likedId) => likedId._id.toString() === user.id
      );
      setIsLikedByUser(likedByUser);
    }
  }, [blog, user]);

  /**
   * Truncates the given content to a specified word limit.
   * Useful for displaying a preview of the blog post content.
   */
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const handleReadMore = async () => {
    // When the user clicks 'Read More', we fetch the full blog details
    // and then open the blog modal with that data.
    try {
      const updatedBlog = await fetchBlogById(currentBlog._id);
      setCurrentBlog(updatedBlog);
      setBlogModalData(updatedBlog);
      setShowBlogModal(true);
    } catch (error) {
      console.error("Failed to fetch blog for modal:", error);
      toast.error("Failed to load blog details.");
    }
  };

  const truncatedContent = truncateContent(blog.content, 100);

  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={clsx(
        "custom-bg mt-140 flex flex-col items-center justify-between rounded-xl p-6 sm:p-8 min-h-[250px]",
        className
      )}
    >
      {currentBlog && (
        <>
          <div className="flex-grow flex flex-col items-center">
            <h2 className="text-center text-2xl font-bold mb-2">
              {currentBlog.title}
            </h2>
            <p className="text-center text-lg mb-4">{truncatedContent}</p>
          </div>
          <div className="mt-4 flex w-full items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="mr-1">👁️</span> {currentBlog.views || 0}
              </span>
              {/* Like/Unlike button logic */}
              <span
                className="flex cursor-pointer items-center"
                onClick={async (e) => {
                  e.stopPropagation(); // Prevent triggering the card's read more if it had one.
                  if (!user || !user.token) {
                    toast.error("You must be logged in to like a post.");
                    return;
                  }
                  try {
                    // Determine if liking or unliking based on current state.
                    const action = isLikedByUser ? "unlike" : "like";
                    const { likes, isLiked: newIsLiked } = await likeBlog(
                      currentBlog._id,
                      user.token,
                      action
                    );
                    // Update the local blog state with new like count and user's like status.
                    setCurrentBlog((prevBlog) => ({
                      ...prevBlog,
                      likes: likes,
                    }));
                    setIsLikedByUser(newIsLiked);
                  } catch (error) {
                    console.log(error);
                    handleUnauthorized(error);
                    toast.error("Failed to update like status.");
                  }
                }}
              >
                <span className="mr-1">{isLikedByUser ? "👎" : "👍"}</span>{" "}
                {currentBlog.likes || 0}
              </span>
              {/* Comments button logic */}
              <span
                className="flex cursor-pointer items-center"
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    // Fetch comments for the current blog and open the comments modal.
                    const data = await fetchComments(currentBlog._id);
                    setCommentsModalData({
                      blog: currentBlog,
                      comments: data,
                      // Callback for when a new comment is successfully added.
                      // This updates the local blog state to reflect the new comment count.
                      onCommentAdded: (newComment) => {
                        setCurrentBlog((prevBlog) => ({
                          ...prevBlog,
                          comments: [...prevBlog.comments, newComment],
                        }));
                      },
                      // Callback to re-fetch the blog after a comment is added,
                      // ensuring the most up-to-date comment count and data.
                      onCommentAddedSuccess: async () => {
                        try {
                          const updatedBlog = await fetchBlogById(
                            currentBlog._id
                          );
                          setCurrentBlog(updatedBlog);
                        } catch (error) {
                          console.error(
                            "Failed to re-fetch blog after comment:",
                            error
                          );
                          toast.error("Failed to refresh comments.");
                        }
                      },
                    });
                    setShowCommentsModal(true);
                  } catch (error) {
                    console.log(error);
                    toast.error("Failed to load comments.");
                  }
                }}
              >
                <span className="mr-1">
                  💬 {(currentBlog.comments || []).length}
                </span>
              </span>
            </div>
            {currentBlog.content.split(" ").length > 100 && (
              <motion.button
                onClick={handleReadMore}
                className="custom-bg rounded-full px-4 py-2 text-foreground transition-colors hover:text-orange-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default BlogCard;
