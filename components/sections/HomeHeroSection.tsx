import Link from "next/link";
import TypingWord from "./TypingWord";
import { mockProducts } from "@/lib/mockData";

// Cut-out model (transparent PNG) in /public
const HERO_MODEL = "/hero-model.png";

// Product photos from the mock data, cropped square for the avatar stack
const avatars = [1, 2, 4].map((i) => `${mockProducts[i].image}?w=96&h=96&fit=crop`);

export default function HomeHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#c3d1d5] via-[#d3dcdf] to-[#eef1f2] text-[#0b0808]">
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

      <div className="relative mx-auto flex min-h-[max(720px,calc(100vh-90px))] max-w-360 flex-col items-center px-4 pt-28 sm:px-6 lg:px-8">
        <h1 className="text-center text-[clamp(2.5rem,7vw,6.5rem)] font-medium uppercase leading-[0.92] tracking-tight">
          <span className="hx-word"><span style={{ "--i": 0 } as React.CSSProperties}>Start</span></span>{" "}
          <span className="hx-word"><span style={{ "--i": 1 } as React.CSSProperties}>your</span></span>{" "}
          <span className="hx-word"><span style={{ "--i": 2 } as React.CSSProperties}>revolution</span></span>
          <br />
          <span className="hx-word"><span style={{ "--i": 3 } as React.CSSProperties}>every</span></span>{" "}
          <TypingWord text="season" startDelay={2300} />
        </h1>
        <div className="hx-fade mt-8 flex items-center gap-3" style={{ "--d": "1.9s" } as React.CSSProperties}>
          <Link
            href="/shop"
            className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
          >
            Shop now
          </Link>
          <Link
            href="/shop"
            className="rounded-full bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-[#e9ebed]"
          >
            Explore all
          </Link>
        </div>

        {/* Model cut-out */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_MODEL}
          alt=""
          className="hx-model pointer-events-none absolute bottom-0 left-1/2 -z-0 h-[50%] w-auto max-w-[90%] -translate-x-1/2 object-contain object-bottom"
        />

        {/* Bottom-left: avatars + blurb */}
        <div className="hx-fade absolute bottom-10 left-4 hidden max-w-60 md:block sm:left-6 lg:left-8" style={{ "--d": "2.1s" } as React.CSSProperties}>
          <div className="flex -space-x-3">
            {avatars.map((src) => (
              <span key={src} className="h-8 w-8 rounded-full border-2 border-[#e3e9eb] bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-[#0b0808]/60">
            Everyday essentials with a sharper point of view. Discover the pieces made for wherever you are going next.
          </p>
        </div>

        {/* Bottom-right: looping video card */}
        <Link
          href="/shop"
          aria-label="Shop the lookbook"
          className="hx-fade absolute bottom-10 right-4 hidden h-36 w-56 overflow-hidden rounded-2xl bg-[#0b0808] md:block sm:right-6 lg:right-8"
          style={{ "--d": "2.2s" } as React.CSSProperties}
        >
          <video
            src="/hero-video.mp4"
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
