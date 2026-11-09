import { Suspense } from "react";
import Link from "next/link";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">Selected work</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Work
        </h1>

        <div className="mt-10">
          {/* useSearchParams (filters in the URL) needs a Suspense boundary */}
          <Suspense fallback={null}>
            <ProjectsBrowser projects={projects} />
          </Suspense>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-[#0b0808] px-6 py-14 text-center sm:mt-24 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-white">
            Like what you see?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
            Tell me about your project and I&apos;ll reply within 24 hours.
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
