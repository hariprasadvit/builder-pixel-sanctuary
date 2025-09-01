import React from "react";
import { BrandLogoPlaceholder } from "@/components/ui/placeholders";

export default function BrandsRow() {
  const items = Array.from({ length: 12 }).map((_, i) => i);
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Brands</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {items.map((i) => (
            <div key={i} className="flex-shrink-0">
              <BrandLogoPlaceholder size="lg" shape="square" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
