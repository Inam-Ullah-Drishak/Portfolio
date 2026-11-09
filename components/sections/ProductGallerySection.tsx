"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// How I work: 4 steps, shown in a 4-column grid
const STEPS = [
  { title: "Discover", text: "We talk through your goals, your audience and what the site needs to achieve." },
  { title: "Design", text: "I plan the structure and design a clean, on-brand layout for you to approve." },
  { title: "Build", text: "I build it fast, responsive and easy to manage, with regular updates along the way." },
  { title: "Launch", text: "I test everything, take it live and stay on hand for fixes and improvements." },
];

const mailto = "/contact";
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
        <div className="wk-item flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-[#0b0808]/60">How I work</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,3.25rem)] font-medium uppercase leading-[0.95] tracking-tight text-[#0b0808]">
              From first idea
              <br />
              to launch day!
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-5 text-[#0b0808]/60">
            A simple, clear process so you always know what happens next.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:mt-12 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="wk-item flex min-h-64 flex-col justify-between rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6" style={delay(0.15 + i * 0.1)}>
              <span className="text-5xl font-medium tracking-tight text-white/30">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/70">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="wk-item mt-10 flex justify-center sm:mt-24" style={delay(0.6)}>
          <Link href={mailto} className="flex items-center gap-1 text-[13px] uppercase text-white">
            <span className="rounded-full bg-[#0b0808] px-5 py-3">Start a project</span>
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
