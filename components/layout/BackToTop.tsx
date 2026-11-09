"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Appears after scrolling down; sits inside the page frame ring (see --frame-gap in globals.css)
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#0b0808] text-white shadow-lg transition hover:bg-[#5d4d45]"
      style={{ right: "calc(var(--frame-gap) + 16px)", bottom: "calc(var(--frame-gap) + 16px)" }}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
