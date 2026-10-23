import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import AuthInitializer from "@/components/layout/AuthInitializer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Tight grotesk, close to the Vexo headline face
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  title: "Base & Balance",
  description: "E-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <AuthInitializer>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
