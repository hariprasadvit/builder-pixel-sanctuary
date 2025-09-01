import React from "react";
import { Button } from "@/components/ui/button";
import { BrandBannerPlaceholder } from "@/components/ui/placeholders";

export default function NeutralHeroBanner() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">Your Marketplace. Your Pace.</h1>
            <p className="text-gray-600 text-lg md:text-xl mb-6">Clean, aligned, and packed with variety. Shop products and videos in one place.</p>
            <div className="flex gap-3">
              <Button className="bg-black text-white hover:bg-black/90">Shop Now</Button>
              <Button variant="outline">Explore</Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <BrandBannerPlaceholder title="Hero Banner Placeholder" height="h-64" />
          </div>
        </div>
      </div>
    </section>
  );
}
