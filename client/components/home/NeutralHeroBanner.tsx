import React from "react";
import { Button } from "@/components/ui/button";
import { BrandBannerPlaceholder } from "@/components/ui/placeholders";

export default function NeutralHeroBanner() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="relative">
          <BrandBannerPlaceholder title="Hero Banner Placeholder" height="h-80" />
          <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f] rounded-2xl" />
          <div className="absolute inset-0 p-6 md:p-10 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Your Marketplace. Your Pace.</h1>
              <p className="text-white/90 text-lg md:text-xl mb-6">Clean, aligned, and packed with variety. Shop products and videos in one place.</p>
              <div className="flex gap-3">
                <Button className="bg-white text-gray-900 hover:bg-white/90">Shop Now</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">Discover Deals</Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 w-48 hidden md:block">
            <div className="rounded-xl shadow-lg overflow-hidden">
              {/* Mini featured reel */}
              <div className="bg-white">
                <BrandBannerPlaceholder title="Featured Reel" height="h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
