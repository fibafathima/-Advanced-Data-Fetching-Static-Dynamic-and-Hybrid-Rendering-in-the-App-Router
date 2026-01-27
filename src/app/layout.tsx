import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Rendering Demo",
  description: "Demo of SSG, SSR, and ISR rendering strategies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
            <Link href="/static" className="text-white hover:text-gray-300">Static (SSG)</Link>
            <Link href="/dynamic" className="text-white hover:text-gray-300">Dynamic (SSR)</Link>
            <Link href="/hybrid" className="text-white hover:text-gray-300">Hybrid (ISR)</Link>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
