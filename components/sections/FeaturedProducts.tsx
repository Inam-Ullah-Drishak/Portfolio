"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetFeaturedProductsQuery } from "@/lib/services/storeApi";

interface FeaturedProductsProps {
  limit?: number;
}

export default function FeaturedProducts({ limit }: FeaturedProductsProps) {
  const { data: products, isLoading, error } = useGetFeaturedProductsQuery();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
            <p className="text-gray-600 font-medium">
              Loading featured products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500 font-medium">
              Error loading featured products
            </p>
            <p className="text-gray-500 text-sm mt-2">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="store-control inline-flex items-center bg-black px-6 py-3 text-[13px] text-white"
          >
            All Products
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(limit ? products.slice(0, limit) : products).map(
            (product, index) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                {/* Featured Badge */}
                <div className="relative">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="store-control inline-flex items-center bg-black px-4 py-2 text-[10px] text-white">
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3
                      className="text-lg font-semibold text-gray-900 truncate mb-2"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-sm">
                        {product.category}
                      </p>
                      <p className="text-2xl font-bold text-black">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="store-control inline-flex items-center justify-center bg-black px-4 py-2  text-white flex-1">
                      Add to Cart
                    </button>
                    <button className="store-control inline-flex items-center justify-center bg-black px-4 py-2  text-white flex-1">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
