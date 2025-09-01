import React from "react";
import { ProductPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function DealsStrip() {
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: `dealstrip-${i+1}`,
    title: `Deal of the Day ${i+1}`,
    price: 29.99 + i,
    originalPrice: 49.99 + i,
  }));
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <SectionHeader title="Deals of the Day" icon="⏰" />
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((it) => (
              <ProductPlaceholder key={it.id} title={it.title} price={it.price} originalPrice={it.originalPrice} badge="Deal" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
