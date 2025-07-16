"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Dynamically import client-side components to prevent them from being rendered on the server.
const UserMenu = dynamic(() => import("@/components/navigation/UserMenu"), {
  ssr: false, // Ensures this component is only rendered on the client side.
});
const CommentsModal = dynamic(() => import("@/components/CommentsModal"), {
  ssr: false,
});
const JotaiProvider = dynamic(() => import("./JotaiProvider"), { ssr: false });

export default function ClientLayoutWrapper({ children }) {
  return (
    <body
      className={clsx(
        inter.variable,
        "bg-background font-inter text-foreground antialiased"
      )}
    >
      <JotaiProvider>
        {children}
        <UserMenu />
        <CommentsModal />
        {/* This div acts as a portal for modals, ensuring they render outside the main app flow for better z-indexing and accessibility. */}
        <div id="my-modal" />
        <Toaster />
      </JotaiProvider>
    </body>
  );
}
