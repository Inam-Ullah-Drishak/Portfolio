"use client";
import { useEffect, useRef, useState } from "react";
export default function LatestWearSection() {
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

  const ghost = "absolute select-none whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-medium uppercase leading-none tracking-tight text-[#d3d6d8]";

  return (
    <section ref={ref} className={`bg-white py-6 sm:py-10 ${inView ? "lt-in" : ""}`}>
      <div className="relative h-[480px] overflow-hidden sm:h-[760px]">
        {/* Top line enters from the left, bottom line from the right */}
        <p aria-hidden="true" className={`lt-left left-[2%] top-[14%] ${ghost}`}>Clean code for</p>
        <p aria-hidden="true" className={`lt-right right-[2%] bottom-[10%] ${ghost}`}>Your next project</p>

        <div className="absolute left-1/2 top-1/2 h-[84%] w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] sm:h-[80%] sm:w-[46%] lg:w-[min(32%,460px)]">
          <div aria-hidden="true" className="absolute left-1/2 top-[8%] h-[55%] w-[75%] -translate-x-1/2 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute left-1/2 top-[16%] h-[55%] w-[110%] -translate-x-1/2 rounded-full border border-white/10" />
          <p className="absolute inset-x-0 top-[6%] text-center text-[10px] tracking-wider text-white/60">Let&apos;s build</p>
          <h3 className="absolute inset-x-0 top-[10%] z-10 px-[10%] text-center text-[clamp(1.1rem,1.8vw,1.6rem)] font-medium leading-[1.05] tracking-tight text-white">
            With modern, fast web development
          </h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/level-up.png"
            alt="Models in layered black and brown streetwear"
            className="lt-zoom absolute inset-x-0 bottom-0 h-[78%] w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
