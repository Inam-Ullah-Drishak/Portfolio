"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useAppSelector } from "@/lib/hooks/useAuth";
import { useGetProductsQuery } from "@/lib/services/storeApi";

export default function WishlistPage() {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const { data: all } = useGetProductsQuery();
  const saved = all.filter((p) => ids.includes(p._id));

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className="text-[11px] uppercase tracking-wide text-[#0b0808]/70">Saved for later</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Wishlist
        </h1>

        {saved.length === 0 ? (
          <div className="mt-12 flex flex-col items-start gap-4">
            <p className="text-sm text-[#0b0808]/70">Tap the heart on any product to save it here.</p>
            <Link href="/shop" className="rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
