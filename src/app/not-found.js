
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import bg from "../../public/background/black_sky.jpg";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 size-full object-cover object-center opacity-50"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="custom-bg w-full max-w-lg rounded-xl p-8 text-center shadow-lg"
      >
        <h2 className="mb-4 text-4xl font-bold text-orange-500">404</h2>
        <h3 className="mb-4 text-2xl font-bold text-white">Page Not Found</h3>
        <p className="mb-6 text-lg text-gray-300">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/">
          <motion.button
            className="custom-bg rounded-full px-6 py-3 text-lg font-semibold text-foreground transition-colors hover:text-orange-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go back to Home
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
