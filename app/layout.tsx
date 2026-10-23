import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import AuthInitializer from "@/components/layout/AuthInitializer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 flex flex-col">
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
