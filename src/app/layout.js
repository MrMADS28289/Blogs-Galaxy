import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import FireFliesBackground from "@/components/FireFliesBackground";
import Sound from "@/components/Sound";
import GalaxyBackground from "@/components/GalaxyBackground";
import Header from "@/components/Header";
import JotaiProvider from "./JotaiProvider";

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
          "bg-background text-foreground font-inter"
        )}
      >
        <JotaiProvider>
          <Header />
          {children}
          <GalaxyBackground />
          <Sound />
          <div id="my-modal" />
        </JotaiProvider>
      </body>
    </html>
  );
}