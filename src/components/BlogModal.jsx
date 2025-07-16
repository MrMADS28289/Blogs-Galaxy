"use client";
import { useAtom } from "jotai";
import { showBlogModalAtom, blogModalDataAtom } from "@/app/jotaiAtoms";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import BlogImage from "./UI/BlogImage";

/**
 * BlogModal component displays the full content of a blog post in a modal.
 * It uses Jotai for global state management to control its visibility and the data it displays.
 */
const BlogModal = () => {
  // Global state to control the modal's visibility and to get the blog data to display.
  const [showBlogModal, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [blogModalData] = useAtom(blogModalDataAtom);

  // If there's no blog data, don't render the modal.
  if (!blogModalData) return null;

  // Function to close the modal by updating the Jotai atom.
  const handleClose = () => {
    setShowBlogModal(false);
  };

  return (
    <AnimatePresence>
      {showBlogModal && (
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
            className="custom-bg relative mx-4 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl p-2 pt-10 shadow-lg sm:p-4"
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
            {/* Scrollable content area for the blog post. */}
            <div className="blog-modal-content grow overflow-y-auto p-6 pt-10">
              {blogModalData.coverImage && (
                <BlogImage
                  src={blogModalData.coverImage}
                  alt={blogModalData.title}
                  height={300}
                  width={800}
                  className="mb-4 max-h-[40vh] rounded-lg object-cover"
                />
              )}
              <h2 className="mb-2 text-center text-3xl font-bold text-white">
                {blogModalData.title}
              </h2>
              <div className="mb-4 text-center text-sm text-gray-300">
                {blogModalData.author && (
                  <p>
                    By:{" "}
                    {blogModalData.author.name || blogModalData.author.email}
                  </p>
                )}
                {blogModalData.category && (
                  <p>Category: {blogModalData.category}</p>
                )}
                {blogModalData.tags && blogModalData.tags.length > 0 && (
                  <p>Tags: {blogModalData.tags.join(", ")}</p>
                )}
                <div className="flex justify-center space-x-4">
                  {blogModalData.likes && <p>Likes: {blogModalData.likes}</p>}
                  {blogModalData.views && <p>Views: {blogModalData.views}</p>}
                </div>
                {blogModalData.createdAt && (
                  <p>
                    Published:{" "}
                    {new Date(blogModalData.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <p className="whitespace-pre-wrap text-justify text-base leading-normal text-white">
                {blogModalData.content}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
