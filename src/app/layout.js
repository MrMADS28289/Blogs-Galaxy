import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Sound from "@/components/Sound";
import JotaiProvider from "./JotaiProvider";
import CommentsModal from "@/components/CommentsModal";

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
          <Sound />
          <CommentsModal />
          <div id="my-modal" />
        </JotaiProvider>
      </body>
    </html>
  );
}
