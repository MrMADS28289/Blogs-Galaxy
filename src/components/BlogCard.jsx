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
import { toast } from "sonner";

const BlogCard = ({ blog, className }) => {
  const [currentBlog, setCurrentBlog] = useState(blog);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [, setBlogModalData] = useAtom(blogModalDataAtom);
  const [, setShowCommentsModal] = useAtom(showCommentsModalAtom);
  const [, setCommentsModalData] = useAtom(commentsModalDataAtom);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    setCurrentBlog(blog);
    if (user && blog.likedBy) {
      const likedByUser = blog.likedBy.some(
        (likedId) => likedId._id.toString() === user.id
      );
      setIsLikedByUser(likedByUser);
    }
  }, [blog, user]);

  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const handleReadMore = async () => {
    try {
      const updatedBlog = await fetchBlogById(currentBlog._id);
      setCurrentBlog(updatedBlog); // Update state with new view count
      setBlogModalData(updatedBlog);
      setShowBlogModal(true);
    } catch (error) {
      console.error("Failed to fetch blog for modal:", error);
      toast.error("Failed to load blog details.");
    }
  };

  const truncatedContent = truncateContent(blog.content, 100); // Truncate to 100 words

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
              <span
                className="flex cursor-pointer items-center"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!user || !user.token) {
                    toast.error("You must be logged in to like a post.");
                    return;
                  }
                  try {
                    const action = isLikedByUser ? "unlike" : "like";
                    const { likes, isLiked: newIsLiked } = await likeBlog(
                      currentBlog._id,
                      user.token,
                      action
                    );
                    setCurrentBlog((prevBlog) => ({
                      ...prevBlog,
                      likes: likes,
                    }));
                    setIsLikedByUser(newIsLiked);
                  } catch (error) {
                    // The error is already handled and toasted in the API utility
                    // You can add component-specific logic here if needed
                  }
                }}
              >
                <span className="mr-1">{isLikedByUser ? "👎" : "👍"}</span>{" "}
                {currentBlog.likes || 0}
              </span>
              <span
                className="flex cursor-pointer items-center"
                onClick={async (e) => {
                  e.stopPropagation(); // Prevent triggering the blog modal
                  try {
                    const data = await fetchComments(currentBlog._id);
                    setCommentsModalData({
                      blog: currentBlog,
                      comments: data,
                      onCommentAdded: (newComment) => {
                        setCurrentBlog((prevBlog) => ({
                          ...prevBlog,
                          comments: [...prevBlog.comments, newComment],
                        }));
                      },
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
                        }
                      },
                    });
                    setShowCommentsModal(true);
                  } catch (error) {
                    // The error is already handled and toasted in the API utility
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
      {/* for add more blog details here, e.g., category, author, etc. */}
    </motion.div>
  );
};

export default BlogCard;
