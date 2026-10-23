"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Replace image/href with real products when they are added (images are paths under /public)
const PRODUCTS = {
  center: { image: "/workout-center.png", href: "/shop" },
  left: { image: "/workout-left.jpg", href: "/shop" },
  right: { image: "/workout-right.jpg", href: "/shop" },
};

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function WorkoutSection() {
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
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`bg-white px-4 py-20 sm:px-6 sm:py-28 ${inView ? "wk-in" : ""}`}>
      <div className="relative mx-auto h-[640px] max-w-360 overflow-hidden sm:h-[760px]">
        {/* Giant word behind the cards */}
        <p
          aria-hidden="true"
          className="wk-item absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[clamp(5rem,17vw,16rem)] font-medium uppercase leading-none tracking-tight text-[#d3d6d8]"
          style={delay(0.1)}
        >
          Workout
        </p>

        {/* Left card */}
        <Link
          href={PRODUCTS.left.href}
          className="wk-item absolute left-[8%] top-[14%] h-[34%] w-[26%] rounded-2xl bg-cover bg-center sm:left-[11%] sm:w-[14.5%]"
          style={{ ...delay(1.2), backgroundImage: `url(${PRODUCTS.left.image})` }}
        />

        {/* Centre card: sliced, then closes up */}
        <Link
          href={PRODUCTS.center.href}
          className="wk-strips absolute left-1/2 top-[12%] h-[62%] w-[44%] -translate-x-1/2 overflow-hidden rounded-3xl bg-linear-to-b from-[#2f2b29] to-[#b4b4b4] sm:w-[25%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PRODUCTS.center.image} alt="" className="h-full w-full object-cover object-bottom" />
        </Link>

        {/* Right card */}
        <Link
          href={PRODUCTS.right.href}
          className="wk-item absolute right-[8%] top-[46%] h-[34%] w-[26%] rounded-2xl bg-cover bg-center sm:right-auto sm:left-[74%] sm:w-[14.5%]"
          style={{ ...delay(1.4), backgroundImage: `url(${PRODUCTS.right.image})` }}
        />

        {/* Blurbs */}
        <p
          className="wk-item absolute right-[6%] top-[10%] hidden max-w-[16rem] text-xs leading-5 text-[#0b0808]/60 sm:block md:right-auto md:left-[72%]"
          style={delay(1.6)}
        >
          Built to move. Layers that keep up with every rep, every run and every recovery.
        </p>
        <p
          className="wk-item absolute bottom-[14%] left-[8%] hidden max-w-[14rem] text-xs leading-5 text-[#0b0808]/60 sm:left-[11%] sm:block"
          style={delay(1.6)}
        >
          Performance-driven gear for every season: breathable in summer heat, insulating in winter cold.
        </p>
      </div>
    </section>
  );
}
