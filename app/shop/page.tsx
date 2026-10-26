"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useGetProductsQuery, type Product } from "@/lib/services/storeApi";

const PAGE_SIZE = 8;

const SORTS: { value: string; label: string; fn?: (a: Product, b: Product) => number }[] = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name (A-Z)", fn: (a, b) => a.name.localeCompare(b.name) },
  { value: "name-desc", label: "Name (Z-A)", fn: (a, b) => b.name.localeCompare(a.name) },
  { value: "price-asc", label: "Price (low to high)", fn: (a, b) => a.price - b.price },
  { value: "price-desc", label: "Price (high to low)", fn: (a, b) => b.price - a.price },
];

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const field = "rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-[#0b0808] outline-none focus:border-[#0b0808]";

// Every color a product comes in: its main color plus any variant colors
const colorsOf = (p: Product) => [p.color, ...(p.variants ?? []).map((v) => v.color)];

export default function ShopPage() {
  const { data: products } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("featured");
  const [shown, setShown] = useState(PAGE_SIZE);

  const categories = useMemo(() => ["all", ...new Set(products.map((p) => p.category))], [products]);
  const colors = useMemo(
    () => [...new Map(products.flatMap(colorsOf).map((c) => [c.name, c])).values()],
    [products],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const lo = min === "" ? 0 : Number(min);
    const hi = max === "" ? Infinity : Number(max);
    const list = products.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
        (category === "all" || p.category === category) &&
        (selectedColors.length === 0 || colorsOf(p).some((c) => selectedColors.includes(c.name))) &&
        p.price >= lo &&
        p.price <= hi,
    );
    const fn = SORTS.find((s) => s.value === sort)?.fn;
    return fn ? list.sort(fn) : list;
  }, [products, search, category, selectedColors, min, max, sort]);

  // Any filter change goes back to the first page of results
  const reset = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setShown(PAGE_SIZE);
  };
  const toggleColor = (name: string) =>
    reset(setSelectedColors)(selectedColors.includes(name) ? selectedColors.filter((c) => c !== name) : [...selectedColors, name]);
  const clearAll = () => {
    setSearch("");
    setCategory("all");
    setSelectedColors([]);
    setMin("");
    setMax("");
    setShown(PAGE_SIZE);
  };

  const visible = filtered.slice(0, shown);

  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <div className="flex flex-col items-center text-center">
          <span className={eyebrow}>The collection</span>
          <h1 className="mt-4 text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
            Shop all gear
          </h1>
          <div className="relative mt-8 w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0b0808]/50" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => reset(setSearch)(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className={`${field} w-full py-3 pl-11`}
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => reset(setCategory)(c)}
              className={`rounded-full border px-4 py-2 text-[13px] capitalize transition ${
                category === c ? "border-[#0b0808] bg-[#0b0808] text-white" : "border-black/20 text-[#0b0808] hover:border-[#0b0808]"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {/* Colors, price and sort */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-[#0b0808]/10 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className={eyebrow}>Color</span>
            <div className="flex flex-wrap justify-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={selectedColors.includes(c.name)}
                  onClick={() => toggleColor(c.name)}
                  className={`h-6 w-6 rounded-full border border-black/15 ${selectedColors.includes(c.name) ? "ring-2 ring-[#0b0808] ring-offset-2" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={eyebrow}>Price</span>
            <input type="number" min={0} value={min} onChange={(e) => reset(setMin)(e.target.value)} placeholder="Min" aria-label="Minimum price" className={`${field} w-24`} />
            <span className="text-[#0b0808]/50">-</span>
            <input type="number" min={0} value={max} onChange={(e) => reset(setMax)(e.target.value)} placeholder="Max" aria-label="Maximum price" className={`${field} w-24`} />
          </div>
          <label className="flex items-center gap-2">
            <span className={eyebrow}>Sort</span>
            <select value={sort} onChange={(e) => reset(setSort)(e.target.value)} className={field}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className={`${eyebrow} mt-6`}>
          Showing {visible.length} of {filtered.length} products
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-lg font-medium text-[#0b0808]">No products match your filters</p>
            <button type="button" onClick={clearAll} className="mt-6 rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p, i) => (
              <ProductCard key={p._id} product={p} priority={i < 4} />
            ))}
          </div>
        )}

        {shown < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
