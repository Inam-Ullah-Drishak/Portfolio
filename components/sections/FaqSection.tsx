import SectionShell from "./SectionShell";
import { faqs } from "@/lib/portfolioContent";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function FaqSection() {
  return (
    <SectionShell
      label="FAQ"
      title={<>Questions?<br />Answers here!</>}
      blurb="The things people ask me most before we start a project."
    >
      <div className="mx-auto max-w-3xl divide-y divide-white/15 rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] px-6 sm:px-8">
        {faqs.map((f, i) => (
          <details key={f.q} className="wk-item group py-5" style={delay(0.15 + i * 0.08)}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="text-xl leading-none transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{f.a}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
