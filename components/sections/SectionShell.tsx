"use client";
import { useEffect, useRef, useState } from "react";

// Shared wrapper for home sections: fade-in on scroll plus the standard heading row (label, uppercase title, blurb)
export default function SectionShell({
  label,
  title,
  blurb,
  bg = "bg-white",
  children,
}: {
  label: string;
  title: React.ReactNode;
  blurb: string;
  bg?: string;
  children: React.ReactNode;
}) {
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
    <section ref={ref} className={`${bg} px-4 py-10 sm:px-6 sm:py-24 ${inView ? "wk-in" : ""}`}>
      <div className="mx-auto max-w-360">
        <div className="wk-item flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-[#0b0808]/60">{label}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.8vw,3.25rem)] font-medium uppercase leading-[0.95] tracking-tight text-[#0b0808]">
              {title}
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-5 text-[#0b0808]/60">{blurb}</p>
        </div>
        <div className="mt-8 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
