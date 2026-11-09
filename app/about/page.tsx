import Link from "next/link";
import { stats } from "@/lib/portfolioContent";

// Draft copy: rewrite the story and values in your own words. Photos are dummies in /public, to be replaced.
const VALUES = [
  { title: "Performance first", text: "Fast-loading, well-built sites that keep visitors on the page and rank better in search." },
  { title: "Built to last", text: "Clean, organised code and sensible platforms, so your site is easy to maintain and grow." },
  { title: "Clear communication", text: "Plain answers, honest timelines and regular updates, from the first message to launch day." },
];

const PHOTOS = [
  { src: "/workout-left.jpg", cutout: false },
  { src: "/level-up.png", cutout: true },
  { src: "/workout-right.jpg", cutout: false },
];

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const gradient = "bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f]";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        {/* Intro */}
        <div className="flex flex-col items-center text-center">
          <span className={eyebrow}>About me</span>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
            Hi, I&apos;m Inam Ullah.
            <br />
            I build websites.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-[#0b0808]/70">
            I&apos;m a web developer based in Lahore, Pakistan, with more than 4 years of professional experience. I
            design and build fast, responsive websites and web apps for businesses and brands.
          </p>
        </div>

        {/* Photos */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-3">
          {PHOTOS.map((p) => (
            <div
              key={p.src}
              className={`aspect-[0.85] overflow-hidden rounded-2xl sm:aspect-[0.72] ${p.cutout ? gradient : "bg-[#d1d6d8]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" className={`h-full w-full ${p.cutout ? "object-contain object-bottom" : "object-cover"}`} />
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 sm:mt-28 md:grid-cols-2 md:gap-16">
          <div className={`aspect-[0.85] overflow-hidden rounded-2xl md:aspect-[0.9] ${gradient}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/top-pick-3.png" alt="" className="h-full w-full object-contain object-bottom" />
          </div>
          <div>
            <span className={eyebrow}>My story</span>
            <h2 className="mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
              From first line of code to 100+ projects.
            </h2>
            <p className="mt-6 text-sm leading-6 text-[#0b0808]/70">
              I build websites for a living, and after more than 100 projects I still enjoy the moment a site goes live
              and starts working for its owner. I work across the whole stack: front-end interfaces, back-end APIs and
              databases, and website builders such as WordPress, Shopify, Wix, Webflow and HubSpot.
            </p>
            <p className="mt-4 text-sm leading-6 text-[#0b0808]/70">
              That range means I can recommend the platform that fits your goals and budget, instead of forcing every
              project into the one tool I know. Whether you need a simple business site, an online store or a custom web
              app, I keep the process clear and the result fast.
            </p>
            <p className="mt-4 text-sm leading-6 text-[#0b0808]/70">
              I work with clients from Lahore and around the world, and I reply to every message within 24 hours.
            </p>
            <Link
              href="/skills"
              className="mt-6 inline-block rounded-full border border-[#0b0808]/30 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-[#e9ebed]"
            >
              See my skills
            </Link>
          </div>
        </div>

        {/* Numbers */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-28 lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-3xl p-6 text-white ${gradient}`}>
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-tight">{s.value}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-white/60">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-28 sm:grid-cols-3 sm:gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className={`flex min-h-56 flex-col justify-end rounded-3xl p-6 ${gradient}`}>
              <h3 className="text-lg font-medium text-white">{v.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/70">{v.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-[#0b0808] px-6 py-14 text-center sm:mt-28 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-white">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
            I&apos;m available for new projects. Tell me what you need and I&apos;ll reply within 24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-[#e9ebed]"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
