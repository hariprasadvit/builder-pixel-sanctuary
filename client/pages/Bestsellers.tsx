import React, { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { SAMPLE_CATALOG } from "@/lib/catalog";

export default function Bestsellers() {
  const products = useMemo(() => {
    return [...SAMPLE_CATALOG].sort(
      (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0),
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Bestsellers</h1>
      <p className="text-gray-600 mb-6">
        Our most-loved picks, based on reviews.
      </p>
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
              badge="Bestseller"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
