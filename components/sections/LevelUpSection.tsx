"use client";
import { useEffect, useRef, useState } from "react";

// Full-body cut-outs (transparent PNG) that swap in a loop. Paths are under /public.
const PEOPLE = ["/person-1.png", "/person-2.png", "/person-3.png", "/person-4.png"];
const SWAP_MS = 4000;
const PHRASE = "Fresh fits for your next workout! ";

// Two endless lines, top moves right and bottom moves left. Rendered twice (grey outside the card, white inside it);
// both copies start together with the same duration so they stay in step.
function Marquees({ className }: { className: string }) {
  const line = "flex w-max select-none whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-medium uppercase leading-none tracking-tight";
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
      <div className={`${line} lv-marq-r absolute left-0 top-[12%]`}>
        <span>{PHRASE}</span>
        <span>{PHRASE}</span>
      </div>
      <div className={`${line} lv-marq-l absolute bottom-[8%] left-0`}>
        <span>{PHRASE}</span>
        <span>{PHRASE}</span>
      </div>
    </div>
  );
}

export default function LevelUpSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [i, setI] = useState(0);

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

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setI((n) => (n + 1) % PEOPLE.length), SWAP_MS);
    return () => clearInterval(id);
  }, [inView]);

  const box = "absolute left-1/2 top-1/2 h-(--ch) w-(--cw) -translate-x-1/2 -translate-y-1/2";

  return (
    <section ref={ref} className={`bg-white px-4 py-10 sm:px-6 ${inView ? "lv-in" : ""}`}>
      <div className="relative mx-auto h-[620px] max-w-360 overflow-hidden [--ch:80%] [--cw:80%] sm:h-[800px] sm:[--cw:50%] lg:[--cw:36%]">
        <Marquees className="text-[#d3d6d8]" />

        {/* Card background, then the white copy of the text clipped to the card, then the person on top */}
        <div className={`${box} rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f]`} />
        <Marquees className="text-white [clip-path:inset(calc((100%_-_var(--ch))_/_2)_calc((100%_-_var(--cw))_/_2)_round_1.5rem)]" />

        <div className={`${box} overflow-hidden rounded-3xl text-[10px] uppercase leading-3 text-white/80`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={i}
            src={PEOPLE[i]}
            alt=""
            className="lv-zoom absolute inset-x-0 bottom-[4%] mx-auto h-[86%] w-full object-contain object-bottom"
          />
          <p className="absolute left-[6%] top-[22%]">Base &amp; Balance<br />Level up</p>
          <p className="absolute right-[6%] top-[22%] text-right">Free<br />Delivery</p>
          <p className="absolute bottom-[6%] left-[6%]">Fall / Winter<br />2026</p>
          <p className="absolute bottom-[6%] right-[6%] text-right">Gym<br />Essentials</p>
        </div>
      </div>
    </section>
  );
}
