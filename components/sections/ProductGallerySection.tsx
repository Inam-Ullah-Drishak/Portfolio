"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

// The first 8 products, in order
const ITEMS = mockProducts.slice(0, 8);


const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function ProductGallerySection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`bg-white px-4 py-10 sm:px-6 sm:py-24 ${inView ? "wk-in" : ""}`}>
      <div className="mx-auto max-w-360">
        {/* Header */}
        <div className="wk-item relative mb-8 flex flex-wrap items-start justify-between sm:mb-16 text-[11px] uppercase tracking-wide text-[#0b0808]/70 sm:mb-16">
          <span>New arrival</span>
          <h2 className="order-last mt-6 w-full text-center sm:absolute sm:left-1/2 sm:top-0 sm:order-none sm:mt-0 sm:w-auto sm:-translate-x-1/2 text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium normal-case leading-[0.95] tracking-tight text-[#0b0808] sm:w-auto">
            Fresh fits for your
            <br />
            next workout!
          </h2>
          <Link href="/shop">All brands</Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 sm:pt-20 lg:grid-cols-4 lg:gap-4">
          {ITEMS.map((p, i) => (
            <div key={p._id} className="wk-item" style={delay(0.15 + (i % 4) * 0.1 + Math.floor(i / 4) * 0.2)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* See all */}
        <div className="wk-item mt-10 flex justify-center sm:mt-24" style={delay(0.6)}>
          <Link href="/shop" className="flex items-center gap-1 text-[13px] uppercase text-white">
            <span className="rounded-full bg-[#0b0808] px-5 py-3">See all brands</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b0808]" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
