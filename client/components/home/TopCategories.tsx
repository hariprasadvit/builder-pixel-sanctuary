import React from "react";
import { BrandBannerPlaceholder } from "@/components/ui/placeholders";

const CATS = [
  { key: 'electronics', title: 'Electronics' },
  { key: 'cellphones', title: 'Cellphones' },
  { key: 'clothing', title: 'Clothing' },
  { key: 'beauty', title: 'Beauty' },
  { key: 'home', title: 'Home' },
  { key: 'kitchen', title: 'Kitchen' },
  { key: 'sports', title: 'Sports' },
  { key: 'toys', title: 'Toys' },
];

export default function TopCategories() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATS.map((c) => (
            <div key={c.key} className="bg-white border rounded-2xl p-4">
              <BrandBannerPlaceholder title={`${c.title} Banner Placeholder`} height="h-28" />
              <div className="mt-3 text-center font-semibold">{c.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
