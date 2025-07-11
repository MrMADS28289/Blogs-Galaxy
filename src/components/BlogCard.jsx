"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useAtom } from "jotai";
import {
  showBlogModalAtom,
  blogModalDataAtom,
  showCommentsModalAtom,
  commentsModalDataAtom,
} from "@/app/jotaiAtoms";

const BlogCard = ({ blog, className }) => {
  const [, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [, setBlogModalData] = useAtom(blogModalDataAtom);
  const [, setShowCommentsModal] = useAtom(showCommentsModalAtom);
  const [, setCommentsModalData] = useAtom(commentsModalDataAtom);

  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const handleReadMore = () => {
    setBlogModalData(blog);
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
      {blog && (
        <>
          <h2 className="text-center text-2xl font-bold">{blog.title}</h2>
          <p className="text-center text-lg">{truncatedContent}</p>
          {blog.content.split(" ").length > 100 && ( // Only show button if content is truncated
            <div className="mt-4 flex w-full items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                {blog.views && (
                  <span className="flex items-center">
                    <span className="mr-1">👁️</span> {blog.views}
                  </span>
                )}
                {blog.likes && (
                  <span
                    className="flex cursor-pointer items-center"
                    onClick={async (e) => {
                      e.stopPropagation();
                      console.log("Likes icon clicked for blog:", blog._id);
                      try {
                        // Placeholder for authentication token
                        const authToken = "YOUR_AUTH_TOKEN_HERE"; // Replace with actual token

                        const response = await fetch(
                          `http://localhost:5000/api/blogs/${blog._id}/rate`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${authToken}`,
                            },
                            body: JSON.stringify({ value: 1 }), // Assuming 1 for a 'like'
                          }
                        );

                        if (!response.ok) {
                          throw new Error(
                            `HTTP error! status: ${response.status}`
                          );
                        }

                        // Assuming the API returns the updated blog or a success message
                        // For now, we'll just increment the likes count on the frontend
                        // In a real app, you might re-fetch the blog or update state more robustly
                        // You might need to update the blog object in the parent component's state
                        console.log("Blog liked successfully!");
                        // This part needs to update the actual blog object in the state
                        // For now, it's a console log, as direct state update here is complex
                        // without knowing the parent component's state management.
                      } catch (error) {
                        console.error("Failed to like blog:", error);
                        // Optionally, show an error message to the user
                      }
                    }}
                  >
                    <span className="mr-1">👍</span> {blog.likes}
                  </span>
                )}
                {blog.comments && (
                  <span
                    className="flex cursor-pointer items-center"
                    onClick={async (e) => {
                      e.stopPropagation(); // Prevent triggering the blog modal
                      console.log("Comments icon clicked for blog:", blog._id);
                      try {
                        const response = await fetch(
                          `http://localhost:5000/api/comments/blog/${blog._id}`
                        );
                        if (!response.ok) {
                          throw new Error(
                            `HTTP error! status: ${response.status}`
                          );
                        }
                        const data = await response.json();
                        console.log("Fetched comments data:", data);
                        setCommentsModalData({ blog: blog, comments: data });
                        setShowCommentsModal(true);
                        console.log("setShowCommentsModal(true) called.");
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
