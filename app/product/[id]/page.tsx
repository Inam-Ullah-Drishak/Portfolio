"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/lib/services/storeApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { addToCart } from "@/lib/features/cartSlice";
import { toggleWishlist } from "@/lib/features/wishlistSlice";
import { showToast } from "@/lib/features/uiSlice";

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const heading = "text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]";

const TRUST = [
  { Icon: Truck, text: "Free shipping over $100" },
  { Icon: RotateCcw, text: "30-day easy returns" },
  { Icon: ShieldCheck, text: "Secure checkout" },
];

const DETAILS = [
  { title: "Materials & care", text: "Soft, breathable performance fabric. Machine wash cold with similar colours, tumble dry low, do not iron prints." },
  { title: "Shipping & returns", text: "Orders ship in 1-2 business days. Free standard shipping over $100. Return unworn items within 30 days for a full refund." },
];

// Placeholder reviews, the same for every product; avatars cycle through the 3 photos in /public
const REVIEWS = [
  { name: "Alex M.", stars: 5, text: "Fits great and holds up in the wash. Wore it to training the same day." },
  { name: "Jordan K.", stars: 4, text: "Comfortable and looks sharp. Runs slightly large, so size down if between sizes." },
  { name: "Sam R.", stars: 5, text: "Exactly what I wanted. Great quality for the price." },
  { name: "Chris P.", stars: 5, text: "Stays put through burpees and sprints. Already ordered a second one." },
  { name: "Taylor B.", stars: 4, text: "Great fabric and a clean look. Shipping was quick too." },
  { name: "Morgan L.", stars: 5, text: "Best gym gear I have bought this year. Highly recommend." },
];

const APPAREL_SIZES = [
  ["XS", "34", "28"], ["S", "36", "30"], ["M", "38-40", "32-34"], ["L", "42", "36"], ["XL", "44-46", "38-40"], ["2XL", "48", "42"],
];
const SHOE_SIZES = [
  ["7", "40", "6"], ["8", "41", "7"], ["9", "42.5", "8"], ["10", "44", "9"], ["11", "45", "10"], ["12", "46", "11"],
];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-[#0b0808]" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className="h-3.5 w-3.5" fill={n <= Math.round(value) ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductByIdQuery(id);
  const { data: all } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(id));
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);
  const slider = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-3xl font-medium text-[#0b0808]">Product not found</h1>
        <Link href="/shop" className="mt-6 rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white">
          Back to shop
        </Link>
      </main>
    );
  }

  const variants = product.variants ?? [];
  const colors = [...new Map(variants.map((v) => [v.color.name, v.color])).values()];
  const sizes = [...new Set(variants.map((v) => v.size))];
  const selected = variants.find((v) => v.size === size && v.color.name === color);
  const needsChoice = variants.length > 0;
  const stock = needsChoice ? selected?.stock : product.countInStock;
  const gallery = [product.image, ...(product.images ?? [])];
  const image = gallery[active] ?? product.image;
  const cutout = image.endsWith(".png");
  const related = all.filter((p) => p._id !== product._id && p.category === product.category).slice(0, 4);
  const rating = 4 + (Number(product._id) % 10) / 10;
  const shoes = sizes.length > 0 && !Number.isNaN(Number(sizes[0]));

  const canAdd = (!needsChoice || !!selected) && stock !== 0;
  const label = !needsChoice || selected
    ? stock === 0 ? "Out of stock" : added ? "Added to cart" : "Add to cart"
    : !color && !size ? "Select color & size" : !color ? "Select color" : "Select size";

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty,
        variant: selected && { size: selected.size, color: selected.color.name },
      }),
    );
    dispatch(showToast(`${qty > 1 ? `${qty} × ` : ""}${product.name} added`));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const addButton = (extra = "") => (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!canAdd}
      className={`rounded-full bg-[#0b0808] px-8 py-4 uppercase text-white transition hover:bg-[#5d4d45] disabled:cursor-not-allowed disabled:bg-[#0b0808]/30 ${extra}`}
    >
      {label}
    </button>
  );

  return (
    <main className="bg-white px-4 pb-28 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <nav aria-label="Breadcrumb" className={`${eyebrow} flex flex-wrap items-center gap-2`}>
          <Link href="/" className="hover:opacity-60">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:opacity-60">Shop</Link>
          <span aria-hidden="true">/</span>
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#0b0808]">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <div
              className={`relative aspect-[0.85] overflow-hidden rounded-2xl md:aspect-[0.9] ${cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}
            >
              <Image
                src={image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cutout ? "object-contain object-bottom" : "object-cover"}
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`relative h-20 w-16 overflow-hidden rounded-xl bg-[#d1d6d8] ${i === active ? "ring-2 ring-[#0b0808] ring-offset-2" : ""}`}
                  >
                    <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className={eyebrow}>{product.category}</span>
            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
                {product.name}
              </h1>
              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
                onClick={() => dispatch(toggleWishlist(product._id))}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9ebed] text-[#0b0808] transition hover:bg-[#d1d6d8]"
              >
                <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            <a href="#reviews" className="mt-4 flex items-center gap-2 text-xs text-[#0b0808]/70 hover:opacity-60">
              <Stars value={rating} />
              <span>{rating.toFixed(1)} · {REVIEWS.length} reviews</span>
            </a>

            <p className="mt-4 text-xl text-[#0b0808]">USD {product.price.toFixed(2)}</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#0b0808]/70">{product.description}</p>

            {colors.length > 0 && (
              <div className="mt-8">
                <p className={eyebrow}>Color{color && `: ${color}`}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      aria-label={c.name}
                      onClick={() => setColor(c.name)}
                      className={`h-7 w-7 rounded-full border border-black/15 ${color === c.name ? "ring-2 ring-[#0b0808] ring-offset-2" : ""}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between sm:justify-start sm:gap-6">
                  <p className={eyebrow}>Size{size && `: ${size}`}</p>
                  <button type="button" onClick={() => setGuideOpen(true)} className="text-xs underline underline-offset-2 hover:opacity-60">
                    Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((s) => {
                    const out = color ? !variants.some((v) => v.size === s && v.color.name === color && v.stock > 0) : false;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={out}
                        onClick={() => setSize(s)}
                        className={`rounded-full border px-4 py-2 transition ${
                          size === s
                            ? "border-[#0b0808] bg-[#0b0808] text-white"
                            : out
                              ? "cursor-not-allowed border-black/10 text-[#0b0808]/30"
                              : "border-black/20 text-[#0b0808] hover:border-[#0b0808]"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {stock !== undefined && stock > 0 && stock <= 5 && (
              <p className="mt-4 text-xs text-[#0b0808]/70">Only {stock} left</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-black/20">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(stock || 10, q + 1))} className="flex h-12 w-12 items-center justify-center">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {addButton()}
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 border-y border-[#0b0808]/15 py-5 sm:grid-cols-3">
              {TRUST.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-xs text-[#0b0808]/70">
                  <Icon className="h-4 w-4 shrink-0 text-[#0b0808]" strokeWidth={1.5} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="divide-y divide-[#0b0808]/15 border-b border-[#0b0808]/15">
              {DETAILS.map((d) => (
                <details key={d.title} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-[#0b0808]">
                    {d.title}
                    <Plus className="h-4 w-4 transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#0b0808]/70">{d.text}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <section id="reviews" className="mt-16 scroll-mt-32 sm:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={heading}>Reviews</h2>
            <div className="flex items-center gap-2 text-sm text-[#0b0808]/70">
              <Stars value={rating} />
              <span>{rating.toFixed(1)} out of 5</span>
            </div>
          </div>
          <div
            ref={slider}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="w-[85%] shrink-0 snap-start rounded-2xl bg-[#e9ebed] p-6 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
                <Stars value={r.stars} />
                <p className="mt-4 text-sm leading-6 text-[#0b0808]/80">{r.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/avatar-${(i % 3) + 1}.jpg`} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-[#0b0808]">{r.name}</p>
                    <p className="text-xs text-[#0b0808]/50">Verified buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            {([["Previous reviews", -1, ChevronLeft], ["Next reviews", 1, ChevronRight]] as const).map(([label, dir, Icon]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => slider.current?.scrollBy({ left: dir * slider.current.clientWidth * 0.8 })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b0808] text-white transition hover:bg-[#5d4d45]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <div className="mt-16 sm:mt-28">
            <h2 className={heading}>You may also like</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phones: keep the buy button in reach while scrolling */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-[#0b0808]">{product.name}</p>
          <p className="text-xs text-[#0b0808]/70">USD {product.price.toFixed(2)}</p>
        </div>
        {addButton("shrink-0 px-5 py-3 text-[13px]")}
      </div>

      {guideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setGuideOpen(false)}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#0b0808]">Size guide</h2>
              <button type="button" aria-label="Close size guide" onClick={() => setGuideOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <table className="mt-4 w-full text-left text-sm text-[#0b0808]">
              <thead className="text-[11px] uppercase tracking-wide text-[#0b0808]/50">
                <tr>
                  <th className="py-2">Size</th>
                  <th>{shoes ? "EU" : "Chest (in)"}</th>
                  <th>{shoes ? "UK" : "Waist (in)"}</th>
                </tr>
              </thead>
              <tbody>
                {(shoes ? SHOE_SIZES : APPAREL_SIZES).map(([a, b, c]) => (
                  <tr key={a} className="border-t border-[#0b0808]/10">
                    <td className="py-2">{shoes ? `US ${a}` : a}</td>
                    <td>{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-[#0b0808]/50">Between sizes? Size up for a relaxed fit.</p>
          </div>
        </div>
      )}
    </main>
  );
}
