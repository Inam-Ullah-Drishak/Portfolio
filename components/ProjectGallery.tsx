"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/projects";

type Filter = "all" | "desktop" | "mobile";

const tag: Record<GalleryImage["device"], string | null> = { desktop: "Desktop", mobile: "Mobile", other: null };
const badge: Record<GalleryImage["device"], string | null> = { desktop: "D", mobile: "M", other: null };

// Panel height (also written as a literal class below, because Tailwind only generates classes it can read as plain text).
// Each image sits in a box of fixed size and is fitted inside it with object-contain: never cropped, and its own size
// never matters (an image sized from its own dimensions collapsed to a dot before).
const H = "min(62vh,28rem)";

const chip = (on: boolean) =>
  `rounded-full px-4 py-2 text-xs font-medium transition ${
    on ? "bg-[#0b0808] text-white" : "bg-[#e9ebed] text-[#0b0808] hover:bg-[#dfe2e4]"
  }`;
const control =
  "flex h-10 w-10 items-center justify-center rounded-full bg-[#0b0808] text-white ring-1 ring-white/30 transition hover:bg-[#5d4d45]";

// Project screenshots: a soft rounded panel holding plain, uncropped images (portrait and landscape both fit), a
// Desktop / Mobile switch, a sliding track, centred thumbnails (with D / M badges) and dots on phones. Opens on the first
// image (by convention desktop). Move with thumbnails, dots, swipe or the arrow keys. Click the image for a full-screen
// view (Esc closes).
export default function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const root = useRef<HTMLElement>(null);
  const startX = useRef<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  const desktop = images.filter((g) => g.device === "desktop").length;
  const mobile = images.filter((g) => g.device === "mobile").length;
  const canFilter = desktop > 0 && mobile > 0;
  const visible = filter === "all" ? images : images.filter((g) => g.device === filter);
  const many = visible.length > 1;
  const current = visible[Math.min(i, visible.length - 1)];

  const go = (n: number) => setI((n + visible.length) % visible.length);
  const pick = (f: Filter) => {
    setFilter(f);
    setI(0);
  };

  // Fade in when the gallery scrolls into view, like the other sections
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active thumbnail in view inside the strip (skipped on first render so the page does not jump)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    thumbs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [i]);

  // Full-screen view: Esc closes, arrows move, page scroll is locked
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === "ArrowRight") go(i + 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, i]);

  const label = (g: GalleryImage) => tag[g.device];

  return (
    <section ref={root} aria-roledescription="carousel" aria-label={`${title} screenshots`} className={shown ? "wk-in" : ""}>
      {/* Desktop / Mobile switch */}
      {canFilter && (
        <div className="wk-item mb-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Show screenshots for" style={{ "--d": "0s" } as React.CSSProperties}>
          <button type="button" aria-pressed={filter === "all"} onClick={() => pick("all")} className={chip(filter === "all")}>All ({images.length})</button>
          <button type="button" aria-pressed={filter === "desktop"} onClick={() => pick("desktop")} className={chip(filter === "desktop")}>Desktop ({desktop})</button>
          <button type="button" aria-pressed={filter === "mobile"} onClick={() => pick("mobile")} className={chip(filter === "mobile")}>Mobile ({mobile})</button>
        </div>
      )}

      {/* Rounded panel with a sliding track of framed screenshots */}
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(i - 1);
          if (e.key === "ArrowRight") go(i + 1);
          if (e.key === "Enter") setOpen(true);
        }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
          else if (Math.abs(dx) < 6) setOpen(true); // a tap or click, not a swipe
        }}
        style={{ height: H, "--d": "0.1s" } as React.CSSProperties}
        className="wk-item relative cursor-zoom-in touch-pan-y select-none overflow-hidden rounded-3xl bg-[#e9ebed] outline-none focus-visible:ring-2 focus-visible:ring-[#0b0808]"
      >
        <div className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${Math.min(i, visible.length - 1) * 100}%)` }}>
          {visible.map((img, n) => (
            <div key={`${img.src}-${n}`} aria-hidden={n !== i} className="flex h-full w-full shrink-0 items-center justify-center p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                className="h-[calc(min(62vh,28rem)-3rem)] w-full object-contain drop-shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {many && (
        <>
          {/* Dots on phones */}
          <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" role="group" aria-label="Choose image">
            {visible.map((img, n) => (
              <button
                key={`${img.src}-${n}`}
                type="button"
                aria-label={`Show image ${n + 1}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-[#0b0808]" : "w-2 bg-[#0b0808]/25"}`}
              />
            ))}
          </div>

          {/* Thumbnails below on larger screens */}
          <div className="mt-4 hidden justify-center sm:flex">
            <ul className="flex max-w-full gap-3 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visible.map((img, n) => (
                <li key={`${img.src}-${n}`} className="shrink-0">
                  <button
                    ref={(el) => {
                      thumbs.current[n] = el;
                    }}
                    type="button"
                    aria-label={`Show image ${n + 1}${label(img) ? `, ${label(img)?.toLowerCase()} view` : ""}`}
                    aria-current={n === i}
                    onClick={() => setI(n)}
                    className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#e9ebed] p-1.5 transition lg:h-24 lg:w-24 ${
                      n === i ? "ring-2 ring-[#0b0808]" : "ring-1 ring-[#0b0808]/10 hover:ring-[#0b0808]/40"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt="" className="max-h-full max-w-full rounded-lg object-contain" />
                    {badge[img.device] && (
                      <span className="absolute bottom-1 left-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0b0808] text-[9px] font-medium text-white">
                        {badge[img.device]}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Caption and position */}
      <div className="mt-3 flex items-center justify-between gap-4 text-[11px] uppercase tracking-wide text-[#0b0808]/60" aria-live="polite">
        <span className="flex min-w-0 items-center gap-2">
          {label(current) && <span className="shrink-0 rounded-full bg-[#e9ebed] px-2.5 py-1 font-medium text-[#0b0808]">{label(current)}</span>}
          <span className="truncate normal-case tracking-normal">{current.alt}</span>
        </span>
        {many && <span className="shrink-0">{Math.min(i, visible.length - 1) + 1} / {visible.length}</span>}
      </div>

      {/* Full-screen view (above the page frame ring) */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots, full screen`}
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src + i}
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="gal-fade max-h-full max-w-full rounded-xl object-contain"
          />
          <button ref={closeBtn} type="button" aria-label="Close full screen" onClick={() => setOpen(false)} className={`${control} absolute right-4 top-4`}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {many && (
            <>
              <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(i - 1); }} className={`${control} absolute left-4 top-1/2 -translate-y-1/2`}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(i + 1); }} className={`${control} absolute right-4 top-1/2 -translate-y-1/2`}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-white/70">
            {current.alt}{many ? ` · ${Math.min(i, visible.length - 1) + 1} / ${visible.length}` : ""}
          </p>
        </div>
      )}
    </section>
  );
}
