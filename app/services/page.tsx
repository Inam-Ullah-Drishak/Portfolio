import { services } from "@/lib/services";
import Link from "next/link";

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className={eyebrow}>What I do</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Services
        </h1>

        {/* One section per service; the image side alternates */}
        <div className="mt-10 space-y-16 sm:mt-16 sm:space-y-28">
          {services.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="grid scroll-mt-28 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div
                className={`aspect-[0.85] overflow-hidden rounded-3xl bg-linear-to-b from-[#2a2624] via-[#7a7775] to-[#eceded] md:aspect-[0.9] ${
                  i % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="h-full w-full object-contain object-bottom" />
              </div>

              <div>
                <span className={eyebrow}>{s.tag}</span>
                <h2 className="mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
                  {s.text}
                </h2>
                <p className="mt-6 max-w-lg text-sm font-medium leading-6 text-[#0b0808]">{s.description}</p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#0b0808]/70">{s.details}</p>

                <p className="mt-8 text-[11px] uppercase tracking-wide text-[#0b0808]/60">What&apos;s included</p>
                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-[#0b0808]/80 sm:grid-cols-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#0b0808]/40">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-[11px] uppercase tracking-wide text-[#0b0808]/60">Built with</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full bg-[#e9ebed] px-3 py-1.5 text-xs text-[#0b0808]">{t}</li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
                  >
                    Get a quote
                  </Link>
                  <span className="rounded-full border border-[#0b0808]/30 px-4 py-2.5 text-[13px] font-medium uppercase tracking-wide text-[#0b0808]">
                    {s.pill}
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-[#0b0808] px-6 py-14 text-center sm:mt-28 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-white">
            Need something custom?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
            Tell me what you have in mind and I&apos;ll reply within 24 hours with a plan and a quote.
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
