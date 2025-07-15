import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Blogs Galaxy",
  description: "A blog about everything in the galaxy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
