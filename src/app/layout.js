import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import UserMenu from "@/components/navigation/UserMenu";
import JotaiProvider from "./JotaiProvider";
import CommentsModal from "@/components/CommentsModal";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Blogs Galaxy",
  description: "A blog about everything in the galaxy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "bg-background font-inter text-foreground"
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
    </html>
  );
}
