import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import AuthInitializer from "@/components/layout/AuthInitializer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import Toast from "@/components/layout/Toast";
import { siteConfig } from "@/lib/siteConfig";

// Tight grotesk, close to the Vexo headline face
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
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
            <CartDrawer />
            <Toast />
          </AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
