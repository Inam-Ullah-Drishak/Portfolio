"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkCls =
  "text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:opacity-60";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Header is transparent, floats over the top of every page and scrolls with it; pages other than home pad their top for it
  const isHome = usePathname() === "/";

  return (
    <header
      className="absolute z-50"
      style={{
        top: "calc(var(--frame-gap) + 12px)",
        left: "calc(var(--frame-gap) + 12px)",
        right: "calc(var(--frame-gap) + 12px)",
      }}
    >
      <nav className="relative mx-auto max-w-360">
        {/* Notch: the frame colour dips into the panel behind the name; top edge meets the page frame */}
        <Link
          href="/"
          aria-label="Inam Ullah home"
          className="absolute -top-3 left-1/2 z-10 flex h-14 w-[150px] -translate-x-1/2 sm:w-[230px] items-center justify-center pt-3"
        >
          <svg viewBox="0 0 340 56" preserveAspectRatio="none" aria-hidden="true" className={`absolute inset-0 h-full w-full ${isHome ? "fill-white" : "fill-[#cdd8db]"}`}>
            <path d="M0 0H340C316 0 312 12 304 24L292 44Q286 56 272 56H68Q54 56 48 44L36 24C28 12 24 0 0 0Z" />
          </svg>
          <span className="relative whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-[#0b0808] sm:text-base">INAM ULLAH</span>
        </Link>

        {/* Inner panel (transparent on home: the hero supplies it) */}
        <div style={isHome ? ({ "--d": "0.5s" } as React.CSSProperties) : undefined} className={`relative flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8 ${isHome ? "hx-fade" : ""}`}>
          {/* Left */}
          <div className="flex items-center gap-7">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMobileOpen((o) => !o)}
              className="xl:hidden"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden items-center gap-7 xl:flex">
              {leftLinks.map((l) => (
                <Link key={l.label} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <Link
            href="/contact"
            className="flex h-8 items-center justify-center rounded-full bg-[#0b0808] px-5 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
          >
            Hire me
          </Link>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="mt-2 flex flex-col rounded-[22px] bg-[#d3dcdf] px-3 py-2 xl:hidden">
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
