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

  const handleReadMore = () => {
    setBlogModalData(currentBlog);
    setShowBlogModal(true);
  };

  const truncatedContent = truncateContent(blog.content, 100); // Truncate to 100 words

  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={clsx(
        "custom-bg mt-140 flex flex-col items-center justify-center space-y-8 rounded-xl p-6 sm:p-8",
        className
      )}
    >
      {currentBlog && (
        <>
          <h2 className="text-center text-2xl font-bold">
            {currentBlog.title}
          </h2>
          <p className="text-center text-lg">{truncatedContent}</p>
          {currentBlog.content.split(" ").length > 100 && ( // Only show button if content is truncated
            <div className="mt-4 flex w-full items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                {currentBlog.views && (
                  <span className="flex items-center">
                    <span className="mr-1">👁️</span> {currentBlog.views}
                  </span>
                )}
                {currentBlog.likes && (
                  <span
                    className="flex cursor-pointer items-center"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!user || !user.token) {
                        console.error("User not authenticated.");
                        // Optionally, show a message to the user that they need to log in
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
                        console.error("Failed to like blog:", error);
                        // Optionally, show an error message to the user
                      }
                    }}
                  >
                    <span className="mr-1">{isLikedByUser ? "👎" : "👍"}</span>{" "}
                    {currentBlog.likes}
                  </span>
                )}
                {currentBlog.comments && (
                  <span
                    className="flex cursor-pointer items-center"
                    onClick={async (e) => {
                      e.stopPropagation(); // Prevent triggering the blog modal
                      try {
                        const data = await fetchComments(currentBlog._id);
                        setCommentsModalData({
                          blog: currentBlog,
                          comments: data,
                        });
                        setShowCommentsModal(true);
                      } catch (error) {
                        console.error("Failed to fetch comments:", error);
                        // Optionally, show an error message to the user
                      }
                    }}
                  >
                    <span className="mr-1">💬</span>
                  </span>
                )}
              </div>
              <motion.button
                onClick={handleReadMore}
                className="custom-bg rounded-full px-4 py-2 text-foreground transition-colors hover:text-orange-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </div>
          )}
        </>
      )}
      {/* for add more blog details here, e.g., category, author, etc. */}
    </motion.div>
  );
};

export default BlogCard;
