"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useAuthActions, useAppSelector } from "@/lib/hooks/useAuth";
import Image from "next/image";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop", label: "About Us" },
];

const rightLinks = [
  { href: "/shop", label: "Apparel" },
  { href: "/shop", label: "Accessories" },
];

const linkCls =
  "text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:opacity-60";
const menuItem =
  "block px-4 py-2 text-sm text-[#0b0808] transition hover:bg-black/5";

export default function Navbar() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0)
  );
  const router = useRouter();
  // On the home page the header floats over the hero, which supplies the gradient
  const isHome = usePathname() === "/";

  const handleLogout = async () => {
    await logout();
    setIsAccountMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`${isHome ? "absolute" : "sticky"} z-50`}
      style={{
        top: "calc(var(--frame-gap) + 12px)",
        ...(isHome && { left: "calc(var(--frame-gap) + 12px)", right: "calc(var(--frame-gap) + 12px)" }),
      }}
    >
      <nav className="relative mx-auto max-w-360">
        {/* Notch: the frame colour dips into the panel behind the logo; top edge meets the page frame */}
        <Link
          href="/"
          aria-label="Base & Balance home"
          className="absolute -top-3 left-1/2 z-10 flex h-14 w-[340px] -translate-x-1/2 items-end justify-center pb-1.5"
        >
          <svg viewBox="0 0 340 56" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full fill-[#e9ebed]">
            <path d="M0 0H340C316 0 312 12 304 24L292 44Q286 56 272 56H68Q54 56 48 44L36 24C28 12 24 0 0 0Z" />
          </svg>
          <span className="relative flex items-end gap-2">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-auto" priority />
            <span className="whitespace-nowrap text-base font-semibold uppercase tracking-wide text-[#0b0808]">Base &amp; Balance</span>
          </span>
        </Link>

        {/* Sky-blue inner panel (transparent on home: the hero supplies it) */}
        <div style={isHome ? ({ "--d": "0.5s" } as React.CSSProperties) : undefined} className={`relative flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8 ${isHome ? "hx-fade" : "rounded-[18px] bg-linear-to-b from-[#c3d1d5] to-[#d3dcdf]"}`}>
          {/* Left */}
          <div className="flex items-center gap-7">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMobileOpen((o) => !o)}
              className="md:hidden"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden items-center gap-7 md:flex">
              {leftLinks.map((l) => (
                <Link key={l.label} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="mr-5 hidden items-center gap-7 md:flex">
              {rightLinks.map((l) => (
                <Link key={l.label} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Account menu"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="menu"
                onClick={() => setIsAccountMenuOpen((o) => !o)}
                className="flex h-8 items-center justify-center rounded-full bg-[#0b0808] px-5 font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
              >
                <UserRound className="h-4 w-4 sm:hidden" aria-hidden="true" />
                <span className="hidden text-[13px] sm:inline">
                  {isAuthenticated && user ? `Hi, ${user.name}` : "Sign In / Up"}
                </span>
              </button>
              {isAccountMenuOpen && (
                <div
                  role="menu"
                  aria-label="Account links"
                  className="absolute right-0 top-10 z-20 w-56 overflow-hidden rounded-2xl bg-[#e9ebed] py-2 shadow-lg"
                >
                  <p className="border-b border-black/10 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-[#0b0808]/50">
                    Your account
                  </p>
                  {isAuthenticated && user ? (
                    <>
                      {["My Account", "Orders", "Wishlist", "Addresses"].map((item) => (
                        <Link
                          key={item}
                          href="#"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className={menuItem}
                        >
                          {item}
                        </Link>
                      ))}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className={`${menuItem} w-full text-left`}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" role="menuitem" onClick={() => setIsAccountMenuOpen(false)} className={menuItem}>
                        Log In
                      </Link>
                      <Link href="/register" role="menuitem" onClick={() => setIsAccountMenuOpen(false)} className={menuItem}>
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Shopping cart"
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0808] text-white transition hover:bg-[#5d4d45]"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-[#0b0808]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="mt-2 flex flex-col rounded-[22px] bg-[#d3dcdf] px-3 py-2 md:hidden">
            {leftLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium uppercase tracking-wide text-[#0b0808] hover:bg-black/5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
