import React from "react";
import { BrandLogoPlaceholder, BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function BrandsCarousel() {
  const items = Array.from({ length: 8 }).map((_, i) => ({ id: i+1 }));
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Shop by Brands" icon="🏷️" />
          <div className="p-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {items.map((it) => (
              <div key={it.id} className="flex-shrink-0 w-80 bg-white border rounded-2xl shadow p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BrandLogoPlaceholder size="sm" />
                  <p className="text-sm font-semibold">Logo Placeholder</p>
                </div>
                <BrandBannerPlaceholder title="Brand Banner Placeholder" height="h-32" />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <ProductPlaceholder title="Featured Product" price={79.99} originalPrice={99.99} />
                  <VideoPlaceholder aspect="16/9" title="Featured Video" price={79.99} originalPrice={99.99} likes={1200} comments={40} views={5400} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
