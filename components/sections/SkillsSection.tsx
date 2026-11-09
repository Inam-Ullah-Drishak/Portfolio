import Link from "next/link";
import SectionShell from "./SectionShell";
import { skillGroups, stats } from "@/lib/portfolioContent";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function SkillsSection() {
  return (
    <SectionShell
      label="Skills & tools"
      title={<>Tools I use<br />to build it!</>}
      blurb="The technologies I work with to build fast, reliable and good-looking websites."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {skillGroups.slice(0, 3).map((g, i) => (
          <Link
            key={g.id}
            href={`/skills#${g.id}`}
            className="wk-item flex min-h-64 flex-col justify-between rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6 transition hover:opacity-90"
            style={delay(0.15 + i * 0.1)}
          >
            <h3 className="text-2xl font-medium tracking-tight text-white">{g.label}</h3>
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
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 lg:grid-cols-4 lg:gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="wk-item rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6 text-white"
            style={delay(0.5 + i * 0.1)}
          >
            <p className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-tight">{s.value}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-white/60">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="wk-item mt-8 flex justify-center md:mt-12" style={delay(0.9)}>
        <Link
          href="/skills"
          className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
        >
          View all
        </Link>
      </div>
    </SectionShell>
  );
}
