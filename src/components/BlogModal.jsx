"use client";
import { useAtom } from "jotai";
import { showBlogModalAtom, blogModalDataAtom } from "@/app/jotaiAtoms";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const BlogModal = () => {
  const [showBlogModal, setShowBlogModal] = useAtom(showBlogModalAtom);
  const [blogModalData] = useAtom(blogModalDataAtom);

  if (!blogModalData) return null;

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
              {blogModalData.title}
            </h2>
            <p className="blog-modal-content max-h-[70vh] overflow-y-auto whitespace-pre-wrap p-6 text-base text-justify leading-normal text-white">
              {blogModalData.content}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
