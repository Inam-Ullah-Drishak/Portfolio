import { skillGroups } from "@/lib/portfolioContent";

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">Skills & tools</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Skills
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {skillGroups.map((g) => (
            <section
              key={g.id}
              id={g.id}
              className="flex min-h-64 scroll-mt-28 flex-col justify-between rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6"
            >
              <h2 className="text-2xl font-medium tracking-tight text-white">{g.label}</h2>
              <div>
                <p className="text-xs leading-5 text-white/70">{g.description}</p>
                <ul className="mt-4 space-y-1.5 text-xs text-white/80">
                  {g.items.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="text-white/50">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
