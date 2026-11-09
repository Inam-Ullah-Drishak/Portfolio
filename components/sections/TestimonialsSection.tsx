import SectionShell from "./SectionShell";
import { testimonials } from "@/lib/portfolioContent";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function TestimonialsSection() {
  return (
    <SectionShell
      label="Testimonials"
      title={<>What clients<br />say about me!</>}
      blurb="Kind words from people I have built websites for."
      bg="bg-[#e9ebed]"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="wk-item flex min-h-64 flex-col justify-between rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6"
            style={delay(0.15 + i * 0.1)}
          >
            <blockquote className="text-base leading-6 text-white">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${t.avatar})` }} />
              <span>
                <span className="block text-sm font-medium text-white">{t.name}</span>
                <span className="block text-xs text-white/60">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
