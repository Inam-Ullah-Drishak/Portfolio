import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import TypingWord from "./TypingWord";
import { socialLinks } from "@/lib/siteConfig";

// Cut-out model (transparent PNG) in /public
const HERO_MODEL = "/hero-model.png";

const TYPED_WORDS = ["perform", "convert", "scale", "inspire", "impress", "last"];

const avatars = ["/avatar-1.jpg", "/avatar-2.jpg", "/avatar-3.jpg"];

// WhatsApp is not shown in the hero (it stays in the footer and contact page)
const heroLinks = socialLinks.filter((l) => l.label !== "WhatsApp");

export default function HomeHeroSection() {
  // The "Download CV" button appears once you drop your CV at public/cv.pdf
  const hasCv = existsSync(path.join(process.cwd(), "public", "cv.pdf"));
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#c3d1d5] via-[#d3dcdf] to-[#e9ebed] text-[#0b0808]">
      {/* Light rays fanning out behind the model */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-white/70"
      >
        {[[0, 40], [0, 65], [100, 40], [100, 65], [18, 0], [82, 0]].map(([x, y]) => (
          <line key={`${x}-${y}`} x1="50" y1="78" x2={x} y2={y} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className="relative mx-auto flex min-h-[max(640px,calc(100svh-90px))] sm:min-h-[max(720px,calc(100vh-90px))] max-w-360 flex-col items-center px-4 pt-28 sm:px-6 lg:px-8">
        <h1 className="text-center text-[clamp(2.5rem,7vw,6.5rem)] font-medium uppercase leading-[0.92] tracking-tight">
          <span className="hx-word"><span style={{ "--i": 0 } as React.CSSProperties}>I</span></span>{" "}
          <span className="hx-word"><span style={{ "--i": 1 } as React.CSSProperties}>build</span></span>{" "}
          <span className="hx-word"><span style={{ "--i": 2 } as React.CSSProperties}>websites</span></span>
          <br />
          <span className="hx-word"><span style={{ "--i": 3 } as React.CSSProperties}>that</span></span>{" "}
          <TypingWord words={TYPED_WORDS} startDelay={2300} />
        </h1>
        <div className="hx-fade mt-8 flex flex-wrap items-center justify-center gap-3" style={{ "--d": "1.9s" } as React.CSSProperties}>
          <Link
            href="/about"
            className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
          >
            About me
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-[#e9ebed]"
          >
            Hire me
          </Link>
          {hasCv && (
            <a
              href="/cv.pdf"
              download
              className="rounded-full border border-[#0b0808]/30 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-white/60"
            >
              Download CV
            </a>
          )}
        </div>
        {heroLinks.length > 0 && (
          <div className="hx-fade mt-5 flex items-center gap-5 text-[11px] uppercase tracking-wide text-[#0b0808]/60" style={{ "--d": "2s" } as React.CSSProperties}>
            {heroLinks.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#0b0808]">
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Model cut-out */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_MODEL}
          alt=""
          className="hx-model pointer-events-none absolute bottom-0 left-1/2 -z-0 h-[56%] w-auto max-w-none sm:h-[50%] sm:max-w-[90%] -translate-x-1/2 object-contain object-bottom"
        />

        {/* Bottom-left: avatars + blurb */}
        <div className="hx-fade absolute bottom-10 left-4 hidden max-w-60 lg:block sm:left-6 lg:left-8" style={{ "--d": "2.1s" } as React.CSSProperties}>
          <div className="flex -space-x-3">
            {avatars.map((src) => (
              <span key={src} className="h-8 w-8 rounded-full border-2 border-[#e3e9eb] bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-[#0b0808]/60">
            Web developer building fast, responsive and user-friendly websites and web apps for businesses and brands.
          </p>
        </div>

        {/* Bottom-right: looping video card */}
        <Link
          href="/about"
          aria-label="About me"
          className="hx-fade absolute bottom-10 right-4 hidden h-36 w-56 overflow-hidden rounded-2xl bg-[#0b0808] lg:block sm:right-6 lg:right-8"
          style={{ "--d": "2.2s" } as React.CSSProperties}
        >
          <video
            src="/hero-portfolio.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </section>
  );
}
