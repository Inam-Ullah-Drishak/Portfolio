"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Dummy products: replace image/name/price/href with real ones. cutout = transparent PNG that stands on a gradient.
const ITEMS = [
  { image: "/workout-left.jpg", cutout: false },
  { image: "/top-pick-1.png", cutout: true },
  { image: "/workout-right.jpg", cutout: false },
  { image: "/top-pick-2.png", cutout: true },
  { image: "/top-pick-3.png", cutout: true },
  { image: "/workout-center.png", cutout: true },
  { image: "/olive-jacket.png", cutout: true },
  { image: "/level-up.png", cutout: true },
].map((p) => ({ ...p, href: "/shop", tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00" }));

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
            <Link
              key={i}
              href={p.href}
              className={`wk-item relative block aspect-[0.85] overflow-hidden sm:aspect-[0.72] rounded-2xl ${p.cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}
              style={delay(0.15 + (i % 4) * 0.1 + Math.floor(i / 4) * 0.2)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className={`h-full w-full ${p.cutout ? "object-contain object-bottom" : "object-cover"}`}
              />
              <span className="absolute right-3 top-3 flex items-center gap-1.5">
                <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] text-[#0b0808]">{p.tag}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/85 text-[#0b0808]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                  </svg>
                </span>
              </span>
              <span className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-xl bg-white/85 px-3 py-2 sm:inset-x-3 sm:bottom-3 sm:px-4 sm:py-3 text-[#0b0808] backdrop-blur">
                <span className="flex flex-col text-[11px] leading-4">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-[#0b0808]/70">{p.price}</span>
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e9ebed]" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </Link>
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
