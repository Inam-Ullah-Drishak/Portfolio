"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useAuthActions } from "@/lib/hooks/useAuth";
import Image from "next/image";
import { Search, ShoppingBag, UserRound } from "lucide-react";
export default function Navbar() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/">
            <Image src="/logo.png" alt="Base & Balance" width={48} height={48} className="h-12 w-auto" priority />
          </Link>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-black font-medium text-sm transition"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-black font-medium text-sm transition"
            >
             Shop
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-black font-medium text-sm transition"
            >
              About Us
            </Link>
          </div>

          

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                className="flex h-8 w-8 items-center justify-center text-gray-700 transition hover:text-black"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Shopping cart"
                className="flex h-8 w-8 items-center justify-center text-gray-700 transition hover:text-black"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                  className="flex h-8 w-8 items-center justify-center text-gray-700 transition hover:text-black"
                >
                  <UserRound className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
                {isAccountMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Account links"
                    className="absolute right-0 top-11 z-20 w-56 border border-gray-200 bg-white py-2 shadow-lg"
                  >
                    <p className="border-b border-gray-100 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Your account
                    </p>
                    {isAuthenticated && user ? (
                      <>
                        <p className="px-4 py-2 text-sm text-gray-600">
                          Hello, <span className="font-semibold text-gray-900">{user.name}</span>
                        </p>
                        {["My Account", "Orders", "Wishlist", "Addresses"].map((item) => (
                          <Link
                            key={item}
                            href="#"
                            role="menuitem"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                          >
                            {item}
                          </Link>
                        ))}
                        <button
                          type="button"
                          role="menuitem"
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                        >
                          Log In
                        </Link>
                        <Link
                          href="/register"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
