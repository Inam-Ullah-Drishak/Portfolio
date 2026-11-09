"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Full-body cut-outs (transparent PNG) that swap in a loop. Paths are under /public.
const PEOPLE = ["/person-1.png", "/person-2.png", "/person-3.png", "/person-4.png"];
const SWAP_MS = 4000;
const PHRASE = "Let's work together!";

// The phrase plus a bullet with the same margin on both sides, so every repeat is separated evenly
const Phrase = () => (
  <span>
    {PHRASE}
    <span className="mx-[0.3em]">•</span>
  </span>
);

// Two endless lines, top moves right and bottom moves left. Rendered twice (grey outside the card, white inside it);
// both copies start together with the same duration so they stay in step.
function Marquees({ className }: { className: string }) {
  const line = "flex w-max select-none whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-medium uppercase leading-none tracking-tight";
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
      <div className={`${line} lv-marq-r absolute left-0 top-[12%]`}>
        <Phrase />
        <Phrase />
      </div>
      <div className={`${line} lv-marq-l absolute bottom-[8%] left-0`}>
        <Phrase />
        <Phrase />
      </div>
    </div>
  );
}

export default function LevelUpSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [i, setI] = useState(0);
  const [hiding, setHiding] = useState(false);

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
    const id = setInterval(() => setHiding(true), SWAP_MS);
    return () => clearInterval(id);
  }, [inView]);

  const box = "absolute left-1/2 top-1/2 h-(--ch) w-(--cw) -translate-x-1/2 -translate-y-1/2";

  return (
    <section ref={ref} className={`bg-white py-6 ${inView ? "lv-in" : ""}`}>
      <div className="relative h-[480px] overflow-hidden [--ch:84%] [--cw:94%] sm:h-[800px] sm:[--ch:80%] sm:[--cw:50%] lg:[--cw:min(36%,520px)]">
        <Marquees className="text-[#d3d6d8]" />

        {/* Card background, then the white copy of the text clipped to the card, then the person on top */}
        <div className={`${box} rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f]`} />
        <Marquees className="text-white [clip-path:inset(calc((100%_-_var(--ch))_/_2)_calc((100%_-_var(--cw))_/_2)_round_1.5rem)]" />

        <div className={`${box} overflow-hidden rounded-3xl text-[10px] uppercase leading-3 text-white/80`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PEOPLE[i]}
            alt=""
            onAnimationEnd={() => {
              if (!hiding) return;
              setI((n) => (n + 1) % PEOPLE.length);
              setHiding(false);
            }}
            className={`${hiding ? "lv-hide" : "lv-show"} absolute inset-x-0 bottom-[4%] mx-auto h-[86%] w-full object-contain object-bottom`}
          />
          <p className="absolute left-[6%] top-[27%]">Inam Ullah<br />Web developer</p>
          <p className="absolute right-[6%] top-[27%] text-right">Open for<br />freelance work</p>
          <p className="absolute bottom-[22%] left-[6%]">Based in<br />Lahore, Pakistan</p>
          <p className="absolute bottom-[22%] right-[6%] text-right">Reply within<br />24 hours</p>
        </div>
      </div>
      <div className="flex justify-center pb-6 pt-8 sm:pb-10 sm:pt-12">
        <Link
          href="/contact"
          className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
