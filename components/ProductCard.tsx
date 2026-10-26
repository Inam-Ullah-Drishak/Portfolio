"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { toggleWishlist } from "@/lib/features/wishlistSlice";
import type { Product } from "@/lib/services/storeApi";

// Same card as the home page gallery. Local .png files are transparent cut-outs and stand on a gradient.
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(product._id));
  const cutout = product.image.endsWith(".png");
  const soldOut = product.countInStock === 0;

  return (
    <div
      className={`relative aspect-[0.85] overflow-hidden rounded-2xl sm:aspect-[0.72] ${cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}
    >
      <Link href={`/product/${product._id}`} className="absolute inset-0 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className={cutout ? "object-contain object-bottom" : "object-cover"}
        />
        <span className="absolute right-12 top-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-[#0b0808]">
          {soldOut ? "Sold out" : product.category}
        </span>
        <span className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-xl bg-white/85 px-3 py-2 text-[#0b0808] backdrop-blur sm:inset-x-3 sm:bottom-3 sm:px-4 sm:py-3">
          <span className="flex flex-col text-[11px] leading-4">
            <span className="font-medium">{product.name}</span>
            <span className="text-[#0b0808]/70">USD {product.price.toFixed(2)}</span>
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e9ebed]" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </span>
      </Link>
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={() => dispatch(toggleWishlist(product._id))}
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/85 text-[#0b0808] transition hover:bg-white"
      >
        <Heart className="h-3 w-3" fill={wished ? "currentColor" : "none"} strokeWidth={2} />
      </button>
    </div>
  );
}
