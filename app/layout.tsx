import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "ShelfSpace",
    template: "%s | ShelfSpace",
  },

  description:
    "ShelfSpace is a personal reading tracker for organizing your library, tracking reading progress, and keeping your favorite books in one place.",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),

  openGraph: {
    title: "ShelfSpace",
    description:
      "Organize your personal library, track your reading progress, and keep your favorite books in one place.",
    type: "website",
    siteName: "ShelfSpace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-[#F7F4ED] text-[#2B2B2B]`}
      >
        <div className="flex min-h-screen flex-col">
          <SessionProvider>
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}