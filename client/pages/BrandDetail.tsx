import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SAMPLE_CATALOG } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const BRAND_DESCRIPTIONS: Record<string, string> = {
  Apple: "Apple is a technology company known for iPhone, iPad, Mac and a seamless ecosystem of hardware, software and services that focus on privacy and performance.",
};

export default function BrandDetail() {
  const params = useParams();
  const slug = (params["*"] as string) || params.brand || ""; // support /brands/:brand
  const brand = useMemo(() => slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), [slug]);
  const products = useMemo(() => SAMPLE_CATALOG.filter(p => p.brand.toLowerCase() === brand.toLowerCase()), [brand]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{brand}</h1>
        <p className="text-gray-600 max-w-3xl">{BRAND_DESCRIPTIONS[brand] || `${brand} products available on Riky.`}</p>
      </div>

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
  );
}
