import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SAMPLE_CATALOG } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const BRAND_DESCRIPTIONS: Record<string, string> = {
  Apple: "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert",
};

const APPLE_BANNERS = [
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdf6b7c9ef91946f9a14afb8c45024ced?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb5f9d01d124b4c8ba9ac206cb355677a?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75d2a8b0d3c8475b9090e9ffd8cf6fd1?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F959702b91b9b48f399f8061d3da4e634?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc4273db329534169a4f427b868866bab?format=webp&width=1600",
];

export default function BrandDetail() {
  const { brand: brandParam } = useParams();
  const brand = useMemo(() => (brandParam || "").replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), [brandParam]);
  const products = useMemo(() => SAMPLE_CATALOG.filter(p => p.brand.toLowerCase() === brand.toLowerCase()), [brand]);
  const phonesAndWatch = useMemo(() => products.filter(p => /iphone|watch/i.test(p.title)), [products]);
  const ipadAndMac = useMemo(() => products.filter(p => /ipad|mac/i.test(p.title)), [products]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{brand}</h1>
        <p className="text-gray-600 max-w-3xl">{BRAND_DESCRIPTIONS[brand] || `${brand} products available on Riky.`}</p>
      </div>

      {/* Apple banners: first full-width, then 2x2 grid cards */}
      {brand === "Apple" && (
        <section className="space-y-0">
          {/* First hero banner full width */}
          <img src={APPLE_BANNERS[0]} alt="Apple" className="w-full block" />
          {/* Next four as 2x2 cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {[APPLE_BANNERS[1], APPLE_BANNERS[2], APPLE_BANNERS[3], APPLE_BANNERS[4]].map((src, idx) => {
              const labels = ["iPhone", "iPad", "Watch", "AirPods"] as const;
              const targets = ["#iphone-watch", "#ipad-mac", "#iphone-watch", "#iphone-watch"] as const;
              const label = labels[idx];
              const target = targets[idx];
              return (
                <a key={src} href={target} className="relative overflow-hidden rounded-lg block group">
                  <img src={src} alt={label} className="w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="text-3xl font-bold text-black drop-shadow-sm">{label}</div>
                    <span className="inline-flex items-center px-4 py-2 mt-3 rounded-full border border-black/20 text-black text-sm bg-white/70 backdrop-blur group-hover:bg-white transition-colors">View all</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="text-gray-600">No products found for {brand}.</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">iPhone & Apple Watch</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {phonesAndWatch.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} className="block">
                  <ProductCard
                    id={p.id}
                    image={p.image}
                    title={p.title}
                    price={p.price}
                    originalPrice={p.originalPrice || undefined}
                    rating={p.rating}
                    reviewCount={p.reviewCount}
                    origin={p.origin}
                    deliveryEta="2–5 days"
                  />
                </a>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">iPad & Mac</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {ipadAndMac.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} className="block">
                  <ProductCard
                    id={p.id}
                    image={p.image}
                    title={p.title}
                    price={p.price}
                    originalPrice={p.originalPrice || undefined}
                    rating={p.rating}
                    reviewCount={p.reviewCount}
                    origin={p.origin}
                    deliveryEta="2–5 days"
                  />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
