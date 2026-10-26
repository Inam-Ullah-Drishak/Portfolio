import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const VALUES = [
  { title: "Performance first", text: "Every piece is tested in real workouts, from heavy lifts to long runs, so it moves when you do." },
  { title: "Made to last", text: "Durable fabrics and clean construction that hold up wash after wash, season after season." },
  { title: "Built for everyone", text: "Gym floor, studio or street: gear and fits for every body and every kind of training." },
];

const STEPS = [
  { n: "01", title: "Design", text: "We start with how you move, then shape cuts and details around it." },
  { n: "02", title: "Test", text: "Prototypes go through real sessions: sweat, stretch, wash and repeat." },
  { n: "03", title: "Refine", text: "Feedback from athletes and everyday trainers decides what makes the cut." },
  { n: "04", title: "Deliver", text: "Finished pieces reach you ready for the next workout, no fuss." },
];

const PHOTOS = [
  { src: "/workout-left.jpg", cutout: false },
  { src: "/level-up.png", cutout: true },
  { src: "/workout-right.jpg", cutout: false },
];

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const pill = "flex items-center gap-1 text-[13px] uppercase text-white";

export const metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        {/* Intro */}
        <div className="flex flex-col items-center text-center">
          <span className={eyebrow}>About us</span>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
            Gear for the way
            <br />
            you train.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-[#0b0808]/70">
            {siteConfig.name} makes gym clothes, shoes and accessories that keep up with you. We started with one idea:
            training gear should feel as good as the workout, and look good enough to wear everywhere else.
          </p>
        </div>

        {/* Photos */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-3">
          {PHOTOS.map((p) => (
            <div
              key={p.src}
              className={`aspect-[0.85] overflow-hidden rounded-2xl sm:aspect-[0.72] ${p.cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" className={`h-full w-full ${p.cutout ? "object-contain object-bottom" : "object-cover"}`} />
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 sm:mt-28 md:grid-cols-2 md:gap-16">
          <div className="aspect-[0.85] overflow-hidden rounded-2xl bg-linear-to-b from-[#2f2b29] to-[#b4b4b4] md:aspect-[0.9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/top-pick-3.png" alt="" className="h-full w-full object-contain object-bottom" />
          </div>
          <div>
            <span className={eyebrow}>Our story</span>
            <h2 className="mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
              From a small training crew to a full gym wardrobe.
            </h2>
            <p className="mt-6 text-sm leading-6 text-[#0b0808]/70">
              What began as a few pieces made for our own sessions grew into a full range: apparel that stays comfortable
              through every rep, shoes with real support, and bags and accessories that carry the day.
            </p>
            <p className="mt-4 text-sm leading-6 text-[#0b0808]/70">
              We keep the range tight and the quality high, so every item earns its place in your bag.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-28 sm:grid-cols-3 sm:gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="border-t border-[#0b0808]/20 pt-4">
              <h3 className="text-lg font-medium text-[#0b0808]">{v.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#0b0808]/70">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-16 sm:mt-28">
          <div className="flex flex-col items-center text-center">
            <span className={eyebrow}>How we make it</span>
            <h2 className="mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
              Four steps from idea to your bag.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl bg-[#e9ebed] p-6">
                <span className="text-[11px] tracking-wide text-[#0b0808]/50">{s.n}</span>
                <h3 className="mt-6 text-lg font-medium text-[#0b0808]">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#0b0808]/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-[#0b0808] px-6 py-14 text-center sm:mt-28 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-white">
            Ready to level up your training?
          </h2>
          <div className="mt-8 flex justify-center">
            <Link href="/shop" className={pill}>
              <span className="rounded-full bg-white px-5 py-3 text-[#0b0808]">Shop now</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b0808]" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
