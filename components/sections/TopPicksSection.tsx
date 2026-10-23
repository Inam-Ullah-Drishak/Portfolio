"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Replace image/href with real products when they are added. Images must be cut-outs (transparent PNG),
// they stand on the card gradient. Paths are under /public.
const PICKS = [
  {
    image: "/top-pick-1.png",
    href: "/shop",
    tag: "01 / Winter 2025",
    text: "Layers built for the cold and every heavy set",
    pill: "Top selling",
  },
  {
    image: "/top-pick-2.png",
    href: "/shop",
    tag: "02 / Summer 2025",
    text: "Light gear made to move all summer long",
    pill: "New arrival",
  },
  {
    image: "/top-pick-3.png",
    href: "/shop",
    tag: "03 / All year",
    text: "Footwear for a steady step on every floor",
    pill: "Best seller",
  },
];

const t = (s: number) => ({ "--t": `${s}s` }) as React.CSSProperties;

// Words slide up from behind a mask, one after another, starting at `start` seconds
function Words({ text, start }: { text: string; start: number }) {
  return (
    <span style={t(start)}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="tp-word">
            <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

export default function TopPicksSection() {
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`bg-white px-4 py-12 sm:px-6 sm:py-28 ${inView ? "wk-in" : ""}`}>
      <div className="mx-auto max-w-360">
        {/* Heading row */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="wk-item text-[13px] font-medium uppercase tracking-wide text-[#0b0808]/60" style={{ "--d": "0s" } as React.CSSProperties}>
              Our top picks
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,3.25rem)] font-medium uppercase leading-[0.95] tracking-tight text-[#0b0808]">
              <Words text="Top gear for" start={0.1} />
              <br />
              <Words text="peak performance!" start={0.4} />
            </h2>
          </div>
          <p className="wk-item max-w-xs text-xs leading-5 text-[#0b0808]/60" style={{ "--d": "0.8s" } as React.CSSProperties}>
            The pieces our customers reach for first, built to perform in every season.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {PICKS.map((p, i) => (
            <Link
              key={p.tag}
              href={p.href}
              className="relative block aspect-[4/5] w-[76%] shrink-0 snap-center overflow-hidden md:w-auto md:shrink rounded-3xl bg-linear-to-b from-[#2a2624] via-[#7a7775] to-[#eceded]"
            >
              {/* Only the cut-out animates (strips close up); the gradient stays put */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                className="wk-strips absolute inset-x-0 bottom-0 h-full w-full object-contain object-bottom"
                style={{ "--sd": `${0.5 + i * 0.25}s` } as React.CSSProperties}
              />

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/60 via-black/25 to-transparent" />

              <span className="wk-item absolute left-6 top-6 text-left text-xs uppercase leading-4 tracking-wide text-white/70" style={{ "--d": `${1.9 + i * 0.25}s` } as React.CSSProperties}>
                {p.tag}
              </span>

              <span className="absolute bottom-20 left-6 max-w-[70%] bg-linear-to-b from-white from-60% to-white/70 bg-clip-text text-[clamp(1.4rem,2vw,1.9rem)] font-medium uppercase leading-[1] tracking-tight text-transparent">
                <Words text={p.text} start={1.8 + i * 0.25} />
              </span>

              <span className="wk-item absolute bottom-6 left-6 rounded-full border border-white/60 px-4 py-2 text-[13px] font-medium uppercase tracking-wide text-white" style={{ "--d": `${2.4 + i * 0.25}s` } as React.CSSProperties}>
                {p.pill}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
