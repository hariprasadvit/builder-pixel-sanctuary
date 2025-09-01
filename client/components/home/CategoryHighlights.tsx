import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder } from "@/components/ui/placeholders";

const CATEGORIES = [
  { key: 'electronics', title: 'Electronics' },
  { key: 'cellphones', title: 'Cellphones' },
  { key: 'clothing', title: 'Clothing' },
  { key: 'beauty', title: 'Beauty' },
  { key: 'home', title: 'Home' },
  { key: 'kitchen', title: 'Kitchen' },
  { key: 'sports', title: 'Sports' },
  { key: 'toys', title: 'Toys' },
];

export default function CategoryHighlights() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 space-y-10">
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.key} className="bg-white border rounded-2xl overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
            </div>
            <div className="p-4">
              <BrandBannerPlaceholder title={`${cat.title} Banner Placeholder`} height="h-40" />
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-full">
                    {i === 0 && idx % 2 === 0 ? (
                      <VideoPlaceholder aspect="9/16" title={`${cat.title} Video`} price={89.99} originalPrice={109.99} likes={1500} comments={30} views={6000} />
                    ) : (
                      <ProductPlaceholder title={`${cat.title} Product`} price={49.99} originalPrice={69.99} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
