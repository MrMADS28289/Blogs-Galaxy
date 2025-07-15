"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const UserMenu = dynamic(() => import("@/components/navigation/UserMenu"), {
  ssr: false,
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
        <div id="my-modal" />
        <Toaster />
      </JotaiProvider>
    </body>
  );
}
