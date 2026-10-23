"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetProductsQuery } from "@/lib/services/storeApi";

export default function ProductSlider() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const sliderRef = useRef<HTMLDivElement>(null);
  const isRecentering = useRef(false);

  const visibleProducts = useMemo(() => products?.slice(0, 8) ?? [], [products]);

  const productGroups = useMemo(
    () =>
      Array.from({ length: Math.ceil(visibleProducts.length / 4) }, (_, index) =>
        visibleProducts.slice(index * 4, index * 4 + 4),
      ),
    [visibleProducts],
  );

  useEffect(() => {
    const slider = sliderRef.current;
    const firstGroup = slider?.firstElementChild as HTMLElement | null;

    if (slider && firstGroup && productGroups.length > 0) {
      slider.classList.remove("scroll-smooth");
      slider.scrollLeft = firstGroup.offsetWidth * productGroups.length;
      slider.classList.add("scroll-smooth");
    }
  }, [productGroups]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const firstGroup = slider?.firstElementChild as HTMLElement | null;

    if (!slider || !firstGroup || isRecentering.current) {
      return;
    }

    const groupWidth = firstGroup.offsetWidth * productGroups.length;

    if (slider.scrollLeft < groupWidth * 0.5) {
      isRecentering.current = true;
      slider.classList.remove("scroll-smooth");
      slider.scrollLeft += groupWidth;
      requestAnimationFrame(() => {
        slider.classList.add("scroll-smooth");
        isRecentering.current = false;
      });
    } else if (slider.scrollLeft > groupWidth * 1.5) {
      isRecentering.current = true;
      slider.classList.remove("scroll-smooth");
      slider.scrollLeft -= groupWidth;
      requestAnimationFrame(() => {
        slider.classList.add("scroll-smooth");
        isRecentering.current = false;
      });
    }

  };

  const moveSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    const firstGroup = slider?.firstElementChild as HTMLElement | null;
    const firstCard = firstGroup?.firstElementChild as HTMLElement | null;

    if (!slider || !firstGroup || !firstCard) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(firstGroup).columnGap) || 0;
    const slideDistance = firstCard.offsetWidth + gap;

    slider.scrollBy({
      left: direction === "right" ? slideDistance : -slideDistance,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 text-black sm:py-16" aria-labelledby="product-slider-title">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 id="product-slider-title" className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Shop the collection
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => moveSlider("left")}
              className="store-control flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent text-black"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => moveSlider("right")}
              className="store-control flex h-12 w-12 cursor-pointer items-center justify-center bg-transparent text-black"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isLoading && <p className="text-sm text-gray-600">Loading products...</p>}
        {error && <p className="text-sm text-red-600">Unable to load products.</p>}
        {products && products.length > 0 && (
          <>
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="scrollbar-hidden flex scroll-smooth overflow-x-auto pb-4"
            >
              {[0, 1, 2].flatMap((cycleIndex) =>
                productGroups.map((group, groupIndex) => (
                <div key={`${cycleIndex}-${groupIndex}`} className="product-slider-group">
                  {group.map((product) => (
                    <article key={`${groupIndex}-${product._id}`} className="product-slider-card overflow-hidden rounded-md bg-white">
                      <div className="relative aspect-square bg-white">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 24vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{product.category}</p>
                        <h3 className="mt-2 truncate text-base font-semibold">{product.name}</h3>
                        <p className="mt-2 text-sm font-medium">${product.price.toFixed(2)}</p>
                      </div>
                    </article>
                  ))}
                </div>
                )),
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
