import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import { monthYear, projects } from "@/lib/projects";
import { services } from "@/lib/services";

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project?.title ?? "Project",
    description: project?.description,
    openGraph: project?.shareImage ? { images: [project.shareImage] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const i = projects.findIndex((p) => p.id === id);
  if (i === -1) notFound();

  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const facts = [
    ["Client", p.client],
    ["My role", p.role],
    ["Industry", p.industry],
    ["Platform", p.platform],
    ["Type", p.type],
    ["Duration", p.duration],
    ["Date", monthYear(p.date)],
    ["Status", p.status],
  ];
  const usedServices = p.services.map((sid) => services.find((s) => s.id === sid)).filter((s) => !!s);

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <nav aria-label="Breadcrumb" className={eyebrow}>
          <Link href="/projects" className="hover:opacity-60">Work</Link> / {p.title}
        </nav>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
              {p.title}
              {p.isNew && (
                <span className="ml-3 align-middle rounded-full bg-[#0b0808] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">New</span>
              )}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#0b0808]/70">{p.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 self-start md:self-auto">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0b0808] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#5d4d45]"
            >
              Visit live site
            </a>
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#0b0808]/30 px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808] transition hover:bg-[#e9ebed]"
              >
                View code
              </a>
            )}
          </div>
        </div>

        {/* Gallery on one side, details on the other (stacked on phones and tablets) */}
        <div className="mt-8 grid grid-cols-1 gap-10 border-t border-[#0b0808]/15 pt-8 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <ProjectGallery images={p.gallery} title={p.title} />
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <dl className="divide-y divide-[#0b0808]/10 border-y border-[#0b0808]/10">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className={eyebrow}>{k}</dt>
                  <dd className="text-right text-sm text-[#0b0808]">{v}</dd>
                </div>
              ))}
            </dl>

            <p className={`mt-8 ${eyebrow}`}>Built with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li key={t} className="rounded-full bg-[#e9ebed] px-3 py-1.5 text-xs text-[#0b0808]">{t}</li>
              ))}
            </ul>

            {usedServices.length > 0 && (
              <>
                <p className={`mt-8 ${eyebrow}`}>Services</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {usedServices.map((s) => (
                    <li key={s.id}>
                      <Link href={`/services#${s.id}`} className="block rounded-full border border-[#0b0808]/30 px-3 py-1.5 text-xs text-[#0b0808] transition hover:bg-[#e9ebed]">
                        {s.pill}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Key results */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="border-t border-[#0b0808]/15 pt-4">
              <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-none tracking-tight text-[#0b0808]">{m.value}</p>
              <p className="mt-3 text-[11px] uppercase tracking-wide text-[#0b0808]/60">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Case study: same three columns as the numbers above, so everything lines up */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {[
            ["01", "The challenge", p.problem],
            ["02", "The solution", p.solution],
            ["03", "The result", p.result],
          ].map(([n, title, text]) => (
            <div key={title} className="border-t border-[#0b0808]/15 pt-4">
              <span className={eyebrow}>{n}</span>
              <h2 className="mt-3 text-xl font-medium tracking-tight text-[#0b0808]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#0b0808]/70">{text}</p>
            </div>
          ))}
        </div>

        {/* Client quote */}
        <figure className="mt-12 rounded-3xl bg-[#e9ebed] p-8 sm:p-12">
          <blockquote className="mx-auto max-w-3xl text-center text-[clamp(1.25rem,2.4vw,2rem)] font-medium leading-tight tracking-tight text-[#0b0808]">
            &ldquo;{p.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-center text-xs uppercase tracking-wide text-[#0b0808]/60">{p.quote.author}</figcaption>
        </figure>

        {/* Previous / next */}
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#0b0808]/15 pt-6 text-sm">
          {prev ? <Link href={`/projects/${prev.id}`} className="hover:opacity-60">&larr; {prev.title}</Link> : <span />}
          {next ? <Link href={`/projects/${next.id}`} className="text-right hover:opacity-60">{next.title} &rarr;</Link> : <span />}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-[#0b0808] px-6 py-14 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-white">
            Want something like this?
          </h2>
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
