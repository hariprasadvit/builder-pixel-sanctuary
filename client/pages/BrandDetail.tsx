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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{brand}</h1>
        <p className="text-gray-600 max-w-3xl">{BRAND_DESCRIPTIONS[brand] || `${brand} products available on Riky.`}</p>
      </div>

      {/* Stacked banners with no gaps */}
      {brand === "Apple" && (
        <section className="space-y-0">
          {APPLE_BANNERS.map((src) => (
            <img key={src} src={src} alt="Apple" className="w-full block" />
          ))}
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">All {brand} products</h2>
        {brand === "Apple" && (
          <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7aa70d6794ff46e8a95a7e4d2aab029f?format=webp&width=1600" alt="Apple" className="w-full mb-4" />
        )}
        {products.length === 0 ? (
          <div className="text-gray-600">No products found for {brand}.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => (
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
        )}
      </div>
    </div>
  );
}
