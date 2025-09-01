import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder } from "@/components/ui/placeholders";

export default function EditorialStorySection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 order-2 md:order-1 grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <VideoPlaceholder aspect="16/9" title="Story Video" price={149.99} originalPrice={199.99} badge="Top Picks" likes={5400} comments={123} views={21400} />
              <ProductPlaceholder title="Curated Product" price={89.99} originalPrice={129.99} badge="New Season" />
            </div>
            <div className="hidden md:block" />
          </div>
          <div className="order-1 md:order-2 relative">
            <BrandBannerPlaceholder height="h-full" title="Editorial Highlight Placeholder" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="bg-black/50 text-white p-4 rounded-xl">
                <h3 className="text-2xl font-extrabold">Top Picks</h3>
                <p className="text-sm opacity-90">New Season Drop</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
