"use client";

import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";

/**
 * ErrorMessage component displays a formatted error message with an icon.
 * It uses Framer Motion for a subtle entry animation.
 * @param {object} props - Component props.
 * @param {string} props.message - The error message to display.
 */
const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial animation state (starts invisible and slightly above).
      animate={{ opacity: 1, y: 0 }} // Animates to fully visible and in place.
      transition={{ duration: 0.5 }} // Animation duration.
      className="flex items-center justify-center rounded-lg bg-red-500/20 p-4 text-red-500"
    >
      <MdErrorOutline className="mr-2 text-2xl" />
      <p className="text-lg font-semibold">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;
