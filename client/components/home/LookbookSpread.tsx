import React from "react";
import { BrandBannerPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function LookbookSpread() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Fashion Lookbook" icon="📸" />
          <div className="p-6 grid md:grid-cols-3 gap-6 items-stretch">
            <BrandBannerPlaceholder title="Lifestyle Placeholder" height="h-72" />
            <BrandBannerPlaceholder title="Lifestyle Placeholder" height="h-72" />
            <div className="grid gap-6">
              <BrandBannerPlaceholder title="Lifestyle Placeholder" height="h-32" />
              <VideoPlaceholder aspect="16/9" title="Story Video" price={99.99} originalPrice={129.99} likes={1300} comments={40} views={8600} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
