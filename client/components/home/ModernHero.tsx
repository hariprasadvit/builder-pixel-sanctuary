import React from "react";
import { Button } from "@/components/ui/button";

export default function ModernHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 border border-orange-200/40 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-56 h-56 bg-orange-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl" />
            </div>
            <div className="p-6 md:p-8 lg:p-12">
              <div className="text-[34px] leading-none md:text-6xl font-black tracking-tight mb-4 md:mb-6">
                <span className="block">UNBEATABLE</span>
                <span className="block">DEALS</span>
              </div>
              <p className="text-gray-700 max-w-xl mb-6 md:mb-8">
                Upgrade your everyday essentials with curated picks across fashion, tech, and more.
              </p>
              <div className="flex items-center gap-3">
                <Button className="bg-black hover:bg-black/90 text-white">Shop now</Button>
                <Button variant="outline" className="border-black text-black hover:bg-black/5">Explore</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md border bg-white">
              <img className="w-full h-32 md:h-full object-cover" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" alt="Hero tile 1"/>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border bg-white">
              <img className="w-full h-32 md:h-full object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop" alt="Hero tile 2"/>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border bg-white">
              <img className="w-full h-32 md:h-full object-cover" src="https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1200&auto=format&fit=crop" alt="Hero tile 3"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
