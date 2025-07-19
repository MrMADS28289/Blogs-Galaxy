"use client";

import Link from "next/link";
import { motion } from "framer-motion";



/**
 * CategoryNotFound component displays a custom 404 page when a blog category is not found.
 * It provides a visually engaging message and a link to return to the home page.
 */
function CategoryNotFound() {
  return (
    <main className="relative flex min-h-screen min-w-full flex-col items-center justify-center">
      <div
        className="absolute inset-0 -z-50 size-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/background/black_sky.jpg')` }}
      />
      {/* Animated container for the error message and navigation. */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Initial animation state (starts invisible and slightly above).
        animate={{ opacity: 1, y: 0 }} // Animates to fully visible and in place.
        transition={{ duration: 0.5 }} // Animation duration.
        className="custom-bg w-full max-w-lg rounded-xl p-8 text-center shadow-lg"
      >
        <h2 className="mb-4 text-4xl font-bold text-orange-500">404</h2>
        <h3 className="mb-4 text-2xl font-bold text-white">
          You lost in space!
        </h3>
        <p className="mb-6 text-lg text-gray-300">
          Sorry, the Category you are looking for does not exist.
        </p>
        {/* Link to navigate back to the home page. */}
        <Link href="/">
          <motion.button
            className="custom-bg rounded-full px-6 py-3 text-lg font-semibold text-foreground transition-colors hover:text-orange-500"
            whileHover={{ scale: 1.05 }} // Scale up button on hover.
            whileTap={{ scale: 0.95 }} // Scale down button on tap.
          >
            Go back to Home
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}

export default CategoryNotFound;
