import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { siteConfig } from "@/lib/siteConfig";

// Tight grotesk, close to the Vexo headline face
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to your live address so share images get absolute URLs
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
