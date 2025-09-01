import React from "react";
import { Button } from "@/components/ui/button";
import { RIKY_GRADIENT, BrandBannerPlaceholder } from "@/components/ui/placeholders";

export default function HeroMegaBanner() {
  return (
    <section className={`${RIKY_GRADIENT} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Shop Everything. Discover Stories.</h1>
            <p className="text-lg md:text-2xl opacity-90 mb-6">Marketplace meets short video. Editorial, bold, and addictive.</p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-gray-900 hover:bg-white/90">Shop Now</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">Discover Deals</Button>
            </div>
          </div>
          <div>
            <BrandBannerPlaceholder title="Hero Banner Placeholder" height="h-72" className="bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
