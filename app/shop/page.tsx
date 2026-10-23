"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useGetProductsQuery, Product } from "@/lib/services/storeApi";
import { useAppDispatch } from "@/lib/hooks/useAuth";
import { addToCart } from "@/lib/features/cartSlice";

export default function ShopPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  
  // Debug: Log products data
  useEffect(() => {
    if (products && products.length > 0) {
      console.log('First product:', products[0]);
      console.log('First product color:', products[0].color);
    }
  }, [products]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [displayCount, setDisplayCount] = useState(9);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, { size?: string; color?: string }>>({});
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Available colors for filtering
  const availableColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#9CA3AF" },
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
    { name: "Purple", hex: "#A855F7" },
    { name: "Pink", hex: "#EC4899" },
    { name: "Brown", hex: "#92400E" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sort options for dropdown
  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category)),
    );
    return uniqueCategories;
  }, [products]);

  // Category options for dropdown
  const categoryOptions = useMemo(() => {
    return [
      { value: "all", label: "All Products" },
      ...categories.map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ];
  }, [categories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Color filter - now uses the actual color field
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => {
        const colorName = typeof p.color === 'string' ? p.color : p.color?.name;
        return colorName && selectedColors.includes(colorName);
      });
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sorting
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Assuming products have createdAt field
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedColors, priceRange, sortBy]);

  // Reset display count when filters change
  const filterKey = `${searchTerm}-${selectedCategory}-${selectedColors.join(',')}-${priceRange[0]}-${priceRange[1]}-${sortBy}`;
  const prevFilterKeyRef = useRef(filterKey);
  
  useEffect(() => {
    if (prevFilterKeyRef.current !== filterKey) {
      setDisplayCount(9);
      prevFilterKeyRef.current = filterKey;
    }
  }, [filterKey]);

  // Toggle color selection
  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  // Get products to display based on displayCount
  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 9);
  };

  const handleVariantSelect = (productId: string, type: 'size' | 'color', value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value
      }
    }));
  };

  const getSelectedVariant = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return null;
    
    const selection = selectedVariants[product._id];
    if (!selection?.size || !selection?.color) return null;
    
    return product.variants.find(v => 
      v.size === selection.size && 
      v.color.name === selection.color
    );
  };

  const handleAddToCart = (product: Product) => {
    const variant = getSelectedVariant(product);
    
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        variant: variant ? {
          size: variant.size,
          color: variant.color.name
        } : undefined
      }),
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-bold text-xl mb-2">
            Error loading products
          </p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our collection of amazing products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 " >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-lg text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Categories
              </h3>
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="w-full px-4 py-3 text-left text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-black focus:outline-none focus:border-black transition-all flex items-center justify-between"
                >
                  <span className="capitalize">
                    {categoryOptions.find((opt) => opt.value === selectedCategory)?.label}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-black rounded-lg shadow-xl overflow-hidden">
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedCategory(option.value);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors capitalize ${
                          selectedCategory === option.value
                            ? "bg-black text-white font-bold"
                            : "text-gray-900 hover:bg-black hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Color Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`group relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.name)
                        ? "border-black scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400 hover:scale-105"
                    }`}
                    title={color.name}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{
                        backgroundColor: color.hex,
                        border: color.name === "White" ? "1px solid #E5E7EB" : "none",
                      }}
                    />
                    {selectedColors.includes(color.name) && (
                      <svg
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.4)" />
                        <path
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 13l3 3 7-7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {selectedColors.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Selected: {selectedColors.length}
                    </p>
                    <button
                      onClick={() => setSelectedColors([])}
                      className="text-xs text-gray-500 hover:text-black font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedColors.map((colorName) => (
                      <span
                        key={colorName}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700"
                      >
                        {colorName}
                        <button
                          onClick={() => toggleColor(colorName)}
                          className="hover:text-black"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Price Range
              </h3>
              <div className="space-y-4">
                {/* Min Price Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Minimum Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= priceRange[1]) {
                          setPriceRange([value, priceRange[1]]);
                        }
                      }}
                      className="w-full pl-8 pr-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Max Price Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Maximum Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= priceRange[0] && value <= 1000) {
                          setPriceRange([priceRange[0], value]);
                        }
                      }}
                      className="w-full pl-8 pr-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sort By</h3>
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="w-full px-4 py-3 text-left text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-black focus:outline-none focus:border-black transition-all flex items-center justify-between"
                >
                  <span>
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {isSortDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-black rounded-lg shadow-xl overflow-hidden">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          sortBy === option.value
                            ? "bg-black text-white font-bold"
                            : "text-gray-900 hover:bg-black hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 font-medium">
                Showing {displayedProducts.length} of {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedColors([]);
                    setPriceRange([0, 1000]);
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-black text-white text-xs font-bold py-2 px-3 rounded-md shadow-lg">
                            FEATURED
                          </span>
                        </div>
                      )}
                      {product.countInStock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-lg">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-4 flex-1">
                        <h3
                          className="text-lg font-bold text-gray-900 mb-2 line-clamp-1"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        
                        {/* Color Display */}
                        <div className="mb-3">
                          <div className="relative inline-block [&:hover_.color-tooltip]:opacity-100">
                            <div
                              className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer transition-transform hover:scale-110"
                              style={{
                                backgroundColor: product.color?.hex || '#000000'
                              }}
                            />
                            <div className="color-tooltip absolute left-1/2 -translate-x-1/2 top-8 opacity-0 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                                {product.color?.name}
                              </div>
                              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                          </div>
                        </div>

                        {/* Variant Selector */}
                        {product.variants && product.variants.length > 0 && (
                          <div className="mb-3 space-y-3">
                            {/* Color Selector */}
                            <div>
                              <p className="text-xs font-bold text-gray-700 mb-2">Color:</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                {Array.from(new Map(product.variants.map(v => [v.color.name, v.color])).values()).map((color) => {
                                  const isSelected = selectedVariants[product._id]?.color === color.name;
                                  const colorVariants = product.variants!.filter(v => v.color.name === color.name);
                                  const totalStock = colorVariants.reduce((sum, v) => sum + v.stock, 0);
                                  
                                  return (
                                    <button
                                      key={color.name}
                                      onClick={() => handleVariantSelect(product._id, 'color', color.name)}
                                      disabled={totalStock === 0}
                                      className={`relative group transition-all ${
                                        totalStock === 0 ? 'cursor-not-allowed opacity-40' : 'hover:scale-125'
                                      }`}
                                      title={color.name}
                                    >
                                      <div
                                        className={`w-5 h-5 rounded-full transition-all ${
                                          isSelected
                                            ? 'ring-2 ring-black ring-offset-2'
                                            : ''
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                      />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Size Selector */}
                            <div>
                              <p className="text-xs font-bold text-gray-700 mb-2">Size:</p>
                              <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(product.variants.map(v => v.size))).map((size) => {
                                  const isSelected = selectedVariants[product._id]?.size === size;
                                  const selectedColor = selectedVariants[product._id]?.color;
                                  
                                  // If a color is selected, only show stock for that color
                                  let sizeVariants = product.variants!.filter(v => v.size === size);
                                  if (selectedColor) {
                                    sizeVariants = sizeVariants.filter(v => v.color.name === selectedColor);
                                  }
                                  const totalStock = sizeVariants.reduce((sum, v) => sum + v.stock, 0);
                                  
                                  return (
                                    <button
                                      key={size}
                                      onClick={() => handleVariantSelect(product._id, 'size', size)}
                                      disabled={totalStock === 0}
                                      className={`px-3 py-1 text-sm font-medium rounded border transition-all ${
                                        isSelected
                                          ? 'bg-black text-white border-black'
                                          : totalStock === 0
                                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                          : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                                      }`}
                                    >
                                      {size}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-500 text-sm capitalize">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-400">
                            {(() => {
                              const variant = getSelectedVariant(product);
                              const stock = variant ? variant.stock : product.countInStock;
                              
                              if (stock === 0) return 'Out of Stock';
                              if (stock <= 5) return `Only ${stock} left`;
                              return 'In Stock';
                            })()}
                          </p>
                          <p className="text-2xl font-bold text-black">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div>
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={(() => {
                              if (product.variants && product.variants.length > 0) {
                                const variant = getSelectedVariant(product);
                                return !variant || variant.stock === 0;
                              }
                              return product.countInStock === 0;
                            })()}
                            className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            {(() => {
                              if (product.variants && product.variants.length > 0) {
                                const selection = selectedVariants[product._id];
                                const variant = getSelectedVariant(product);
                                
                                if (!selection?.color && !selection?.size) return "Select Color & Size";
                                if (!selection?.color) return "Select Color";
                                if (!selection?.size) return "Select Size";
                                if (!variant) return "Select Color & Size";
                                if (variant.stock === 0) return "Out of Stock";
                              } else if (product.countInStock === 0) {
                                return "Out of Stock";
                              }
                              return "Add to Cart";
                            })()}
                          </button>
                          <button className="px-4 py-3 border border-black rounded-lg hover:bg-gray-100 active:scale-95 transition-all">
                            <svg
                              className="w-5 h-5 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMoreProducts && displayedProducts.length > 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800 active:scale-95 transition-all"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
