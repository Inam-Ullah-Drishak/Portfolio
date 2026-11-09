"use client";
import { useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cardImage, monthYear, type Project } from "@/lib/projects";

type Sort = "newest" | "oldest" | "az";

const PAGE_SIZE = 8;

const chip = (on: boolean) =>
  `rounded-full px-4 py-2 text-xs font-medium transition ${
    on ? "bg-[#0b0808] text-white" : "bg-[#e9ebed] text-[#0b0808] hover:bg-[#dfe2e4]"
  }`;
const label = "text-[11px] uppercase tracking-wide text-[#0b0808]/60";
// appearance-none hides the browser's own arrow, which sits tight to the edge; <Chevron /> draws one with equal padding
const select = "appearance-none rounded-lg bg-[#e9ebed] py-2.5 pl-3.5 pr-10 text-xs text-[#0b0808] outline-none";
const Chevron = () => <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#0b0808]" />;

// All filters live in the URL (?platform=Shopify&sort=oldest&page=2), so a filtered view can be shared as a link.
export default function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const top = useRef<HTMLDivElement>(null);

  const platform = sp.get("platform") ?? "All";
  const type = sp.get("type") ?? "All";
  const industry = sp.get("industry") ?? "All";
  const tech = sp.get("tech") ?? "All";
  const onlyNew = sp.get("new") === "1";
  const sort = (sp.get("sort") ?? "newest") as Sort;
  const q = sp.get("q") ?? "";
  const page = Math.max(1, Number(sp.get("page")) || 1);

  // Set or clear URL params; any change except the page number itself goes back to page 1
  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === "" || v === "All" || (k === "sort" && v === "newest") || (k === "page" && v === "1")) next.delete(k);
      else next.set(k, v);
    }
    if (!("page" in patch)) next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const platforms = useMemo(() => ["All", ...new Set(projects.map((p) => p.platform))], [projects]);
  const types = useMemo(() => ["All", ...new Set(projects.map((p) => p.type))], [projects]);
  const industries = useMemo(() => ["All", ...new Set(projects.map((p) => p.industry))], [projects]);
  const techs = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.tools))].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b))), [projects]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects
      .filter((p) => (platform === "All" || p.platform === platform) && (type === "All" || p.type === type))
      .filter((p) => (industry === "All" || p.industry === industry) && (tech === "All" || p.tools.includes(tech)))
      .filter((p) => !onlyNew || p.isNew)
      .filter((p) => !term || `${p.title} ${p.platform} ${p.type} ${p.industry} ${p.tools.join(" ")}`.toLowerCase().includes(term))
      .sort((a, b) =>
        sort === "az" ? a.title.localeCompare(b.title) : sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
      );
  }, [projects, platform, type, industry, tech, onlyNew, sort, q]);

  const pages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = shown.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goTo = (n: number) => {
    update({ page: String(n) });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => router.replace(pathname, { scroll: false });

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Filters */}
      <div className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <input
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search projects"
            aria-label="Search projects"
            className="w-full rounded-lg bg-[#e9ebed] px-3.5 py-2.5 text-xs text-[#0b0808] outline-none placeholder:text-[#0b0808]/40 focus:ring-2 focus:ring-[#0b0808]/20 lg:max-w-xs"
          />
          <div className="flex flex-wrap items-end gap-3 lg:ml-auto">
            <label className="flex flex-col gap-1.5">
              <span className={label}>Industry</span>
              <span className="relative block">
                <select value={industry} onChange={(e) => update({ industry: e.target.value })} className={select}>
                  {industries.map((i) => <option key={i} value={i}>{i === "All" ? "All industries" : i}</option>)}
                </select>
                <Chevron />
              </span>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>Technology</span>
              <span className="relative block">
                <select value={tech} onChange={(e) => update({ tech: e.target.value })} className={select}>
                  {techs.map((t) => <option key={t} value={t}>{t === "All" ? "All technologies" : t}</option>)}
                </select>
                <Chevron />
              </span>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>Sort by</span>
              <span className="relative block">
                <select value={sort} onChange={(e) => update({ sort: e.target.value })} className={select}>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="az">Name A to Z</option>
                </select>
                <Chevron />
              </span>
            </label>
          </div>
        </div>

        <div>
          <p className={label}>Platform</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button key={p} type="button" onClick={() => update({ platform: p })} aria-pressed={platform === p} className={chip(platform === p)}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={label}>Type</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {types.map((t) => (
              <button key={t} type="button" onClick={() => update({ type: t })} aria-pressed={type === t} className={chip(type === t)}>
                {t}
              </button>
            ))}
            <button type="button" onClick={() => update({ new: onlyNew ? "" : "1" })} aria-pressed={onlyNew} className={`${chip(onlyNew)} sm:ml-4`}>
              New only
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-[#0b0808]/60">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-4">
          <p className="text-sm text-[#0b0808]/70">No projects match these filters.</p>
          <button type="button" onClick={reset} className="rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="group block">
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-linear-to-b from-[#1b1b1b] via-[#4a4a4a] to-[#8f8f8f]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cardImage(p)} alt={p.title} className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105" />
                {p.isNew && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#0b0808] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                    New
                  </span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="rounded-full bg-white px-5 py-3 text-[13px] font-medium uppercase tracking-wide text-[#0b0808]">View project</span>
                </span>
              </div>
              <h2 className="mt-3 text-sm font-semibold uppercase tracking-wide text-[#0b0808]">{p.title}</h2>
              <p className="mt-1 text-xs text-[#0b0808]/60">
                {p.industry} · {p.type} · {monthYear(p.date)}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.tools.slice(0, 3).map((t) => (
                  <li key={t} className="rounded-full bg-[#e9ebed] px-2.5 py-1 text-[11px] text-[#0b0808]">{t}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination: only shown when there are more than PAGE_SIZE results */}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => goTo(current - 1)} disabled={current === 1} className={`${chip(false)} disabled:opacity-40`}>
            Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goTo(n)}
              aria-current={n === current ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={chip(n === current)}
            >
              {n}
            </button>
          ))}
          <button type="button" onClick={() => goTo(current + 1)} disabled={current === pages} className={`${chip(false)} disabled:opacity-40`}>
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
