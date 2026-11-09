import ContactForm from "@/components/ContactForm";
import { siteConfig, socialLinks } from "@/lib/siteConfig";

const STEPS = [
  { title: "I reply within 24 hours", text: "I read your message and get back to you with any questions." },
  { title: "We agree the plan", text: "You get a clear scope, timeline and quote before any work starts." },
  { title: "I build and you review", text: "I share progress along the way, so the result is what you expected." },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">Get in touch</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Let&apos;s work together
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <ContactForm />

          <div className="rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6 text-white sm:p-8">
            <p className="text-sm leading-6 text-white/80">
              Have a project in mind? Send me a few lines about it. I reply within 24 hours.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-white/50">Email</span>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:opacity-70">{siteConfig.email}</a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-white/50">Phone</span>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="transition hover:opacity-70">{siteConfig.phone}</a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wide text-white/50">Based in</span>
                {siteConfig.address}
              </li>
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What happens next */}
        <div className="mt-16 sm:mt-24">
          <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">What happens next</span>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex min-h-44 flex-col justify-between rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f] p-6">
                <span className="text-4xl font-medium tracking-tight text-white/30">0{i + 1}</span>
                <div>
                  <h2 className="text-lg font-medium text-white">{s.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/70">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
