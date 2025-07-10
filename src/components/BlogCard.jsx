"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

const BlogCard = ({ blog, className }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={clsx(
        "custom-bg p-6 sm:p-8 rounded-xl flex flex-col items-center justify-center space-y-8",
        className
      )}
    >
      {blog && (
        <>
          <h2 className="text-2xl font-bold text-center">{blog.title}</h2>
          <p className="text-lg text-center">{blog.content}</p>
        </>
      )}
      {/* You can add more blog details here, e.g., category, author, etc. */}
    </motion.div>
  );
};

export default BlogCard;
