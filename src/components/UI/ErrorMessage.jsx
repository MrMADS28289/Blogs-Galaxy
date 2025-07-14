
"use client";

import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center rounded-lg bg-red-500/20 p-4 text-red-500"
    >
      <MdErrorOutline className="mr-2 text-2xl" />
      <p className="text-lg font-semibold">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;
