"use client";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useAtom } from "jotai";
import { showBlogModalAtom, blogModalDataAtom } from "@/app/jotaiAtoms";

const BlogCard = ({ blog, className }) => {
  const [, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [, setBlogModalData] = useAtom(blogModalDataAtom);

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
        "flex flex-col items-center justify-center rounded-xl p-6 sm:p-8 mt-[140px] space-y-8 custom-bg",
        className
      )}
    >
      {blog && (
        <>
          <h2 className="text-center text-2xl font-bold">{blog.title}</h2>
          <p className="text-center text-lg">{truncatedContent}</p>
          {blog.content.split(" ").length > 100 && ( // Only show button if content is truncated
            <button
              onClick={handleReadMore}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Read More
            </button>
          )}
        </>
      )}
      {/* You can add more blog details here, e.g., category, author, etc. */}
    </motion.div>
  );
};

export default BlogCard;
