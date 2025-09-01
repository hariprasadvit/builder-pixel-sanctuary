import React from "react";
import { ProductPlaceholder, RatingStars, SectionHeader } from "@/components/ui/placeholders";

function BestsellerCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <ProductPlaceholder title="Bestseller Product" price={129.99} originalPrice={159.99} badge="Bestseller" />
      <div className="mt-2">
        <RatingStars value={4.7} />
      </div>
    </div>
  );
}

export default function BestsellerHighlights() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Bestseller Highlights" icon="🏆" />
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <BestsellerCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
