import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exam App",
  description: "Exam app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full text-white bg-[linear-gradient(43deg,#4158D0_0%,#C850C0_46%,#FFCC70_100%)] min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
