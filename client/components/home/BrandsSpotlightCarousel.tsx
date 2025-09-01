import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function BrandsSpotlightCarousel() {
  const items = Array.from({ length: 6 }).map((_, i) => ({ id: i }));
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Brands in Spotlight" icon="🔦" />
          <div className="p-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {items.map((it) => (
              <div key={it.id} className="flex-shrink-0 w-[460px] bg-white border rounded-2xl shadow p-4">
                <BrandBannerPlaceholder title="Brand Banner Placeholder" height="h-32" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <ProductPlaceholder title="Spotlight Product" price={69.99} originalPrice={89.99} />
                  <VideoPlaceholder aspect="16/9" title="Spotlight Video" price={69.99} originalPrice={89.99} likes={900} comments={20} views={4100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
