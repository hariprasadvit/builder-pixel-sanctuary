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
          <div key={cat.key} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-[#e6ecf7] to-[#fde7e7] text-gray-900 p-4">
              <h3 className="text-xl font-bold">{cat.title}</h3>
            </div>
            <div className="p-4">
              {cat.key === 'electronics' ? (
                <div className="w-full h-40 rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb86fd668bfb0409080f796c5fef4614f?format=webp&width=1440"
                    alt="Electronics deals banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <BrandBannerPlaceholder title={`${cat.title} Banner Placeholder`} height="h-40" />
              )}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <VideoPlaceholder key={`v-${i}`} title={`${cat.title} Video`} price={89.99} originalPrice={109.99} likes={1500} comments={30} views={6000} cardHeight={420} mediaHeight={240} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductPlaceholder key={`p-${i}`} title={`${cat.title} Product`} price={49.99} originalPrice={69.99} cardHeight={420} mediaHeight={240} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
