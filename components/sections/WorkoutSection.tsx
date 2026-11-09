"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cardImage, featuredProjects } from "@/lib/projects";

// Cards come from the featured projects in lib/projects.ts (1st = centre, 2nd = left, 3rd = right)

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

  if (featuredProjects.length < 3) return null; // needs 3 featured projects in lib/projects.ts
  const [center, left, right] = featuredProjects;
  // Cards open the project's own page (/projects/<id>)
  const page = (p: typeof center) => ({ ...p, image: cardImage(p), href: `/projects/${p.id}` });
  const PRODUCTS = { center: page(center), left: page(left), right: page(right) };

  return (
    <section id="work" ref={ref} className={`bg-white px-4 py-10 sm:px-6 sm:py-28 ${inView ? "wk-in" : ""}`}>
      <div className="relative mx-auto max-w-360 sm:h-[760px] sm:overflow-hidden">
        {/* Phone layout: word on top, wide centre card, two photos side by side */}
        <div className="sm:hidden">
          <p
            aria-hidden="true"
            className="wk-item select-none text-center text-[clamp(3rem,15.5vw,6rem)] font-medium uppercase leading-none tracking-tight text-[#d3d6d8]"
            style={delay(0.1)}
          >
            Work
          </p>
          <Link
            href={PRODUCTS.center.href}            aria-label={PRODUCTS.center.title}
            className="wk-strips mt-5 block aspect-[4/5] overflow-hidden rounded-3xl bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRODUCTS.center.image} alt="" className="h-full w-full object-cover object-top" />
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[PRODUCTS.left, PRODUCTS.right].map((p, i) => (
              <Link
                key={p.id}
                href={p.href}                aria-label={p.title}
                className="wk-item aspect-[3/4] rounded-2xl bg-cover bg-top"
                style={{ ...delay(1.2 + i * 0.2), backgroundImage: `url(${p.image})` }}
              />
            ))}
          </div>
          <p className="wk-item mt-5 text-center text-xs leading-5 text-[#0b0808]/60" style={delay(1.6)}>
            Selected projects. Clean, fast websites built around what each business needs.
          </p>
        </div>

        {/* Tablet and desktop collage */}
        <div className="hidden sm:contents">
        {/* Giant word behind the cards */}
        <p
          aria-hidden="true"
          className="wk-item absolute inset-x-0 top-[1%] select-none sm:top-1/2 sm:-translate-y-1/2 whitespace-nowrap text-center text-[clamp(3rem,15.5vw,16rem)] sm:text-[clamp(5rem,17vw,16rem)] font-medium uppercase leading-none tracking-tight text-[#d3d6d8]"
          style={delay(0.1)}
        >
          Work
        </p>

        {/* Left card */}
        <Link
          href={PRODUCTS.left.href}          aria-label={PRODUCTS.left.title}
          className="wk-item absolute left-[3%] top-[70%] z-10 h-[24%] w-[34%] rounded-2xl bg-cover bg-top sm:left-[11%] sm:top-[14%] sm:z-auto sm:h-auto sm:aspect-3/5 sm:w-[14.5%]"
          style={{ ...delay(1.2), backgroundImage: `url(${PRODUCTS.left.image})` }}
        />

        {/* Centre card: sliced, then closes up */}
        <Link
          href={PRODUCTS.center.href}          aria-label={PRODUCTS.center.title}
          className="wk-strips absolute left-1/2 top-[13%] h-[72%] w-[94%] -translate-x-1/2 sm:top-[8%] sm:h-auto sm:aspect-3/5 overflow-hidden rounded-3xl bg-linear-to-b from-[#2f2b29] to-[#b4b4b4] sm:w-[25%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PRODUCTS.center.image} alt="" className="h-full w-full object-cover object-top" />
        </Link>

        {/* Right card */}
        <Link
          href={PRODUCTS.right.href}          aria-label={PRODUCTS.right.title}
          className="wk-item absolute right-[3%] top-[70%] z-10 h-[24%] w-[34%] rounded-2xl bg-cover bg-top sm:right-auto sm:left-[74%] sm:top-[46%] sm:z-auto sm:h-auto sm:aspect-3/5 sm:w-[14.5%]"
          style={{ ...delay(1.4), backgroundImage: `url(${PRODUCTS.right.image})` }}
        />

        {/* Blurbs */}
        <p
          className="wk-item absolute right-[6%] top-[10%] hidden max-w-[16rem] text-xs leading-5 text-[#0b0808]/60 sm:block md:right-auto md:left-[72%]"
          style={delay(1.6)}
        >
          Selected projects. Clean, fast websites built around what each business needs.
        </p>
        <p
          className="wk-item absolute bottom-[14%] left-[8%] hidden max-w-[14rem] text-xs leading-5 text-[#0b0808]/60 sm:left-[11%] sm:block"
          style={delay(1.6)}
        >
          Design, development and launch: from the first idea to a live site that performs.
        </p>
        </div>
      </div>
      <div className="wk-item mt-8 flex justify-center" style={delay(1.8)}>
        <Link
          href="/projects"
          className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
        >
          View all
        </Link>
      </div>
    </section>
  );
}
