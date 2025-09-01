import React from "react";
import { BrandBannerPlaceholder } from "@/components/ui/placeholders";
import { Button } from "@/components/ui/button";

export default function SeasonalSaleBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative">
          <BrandBannerPlaceholder title="Seasonal Sale Banner Placeholder" height="h-56" />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-white">
              <h3 className="text-3xl font-extrabold drop-shadow">Seasonal Sale • Up to 70% OFF</h3>
              <p className="opacity-90">Limited time event across categories</p>
            </div>
            <Button className="bg-black text-white hover:bg-black/90">Shop the Sale</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
