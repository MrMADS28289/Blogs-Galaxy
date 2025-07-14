
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="custom-bg w-full max-w-lg rounded-xl p-8 text-center shadow-lg"
      >
        <h2 className="mb-4 text-3xl font-bold text-red-500">
          Something went wrong!
        </h2>
        <p className="mb-6 text-lg text-gray-300">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
        <motion.button
          onClick={() => reset()}
          className="custom-bg rounded-full px-6 py-3 text-lg font-semibold text-foreground transition-colors hover:text-orange-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}
