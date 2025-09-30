import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agrim Khandelwal | Portfolio",
  description: "Personal portfolio website built with the MERN stack and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-200 antialiased`}>
        <main className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
