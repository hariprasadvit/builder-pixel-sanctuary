import React from "react";
import { Button } from "@/components/ui/button";

export default function PromoSplit() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center rounded-2xl bg-white shadow-lg border p-4 md:p-6">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"
            alt="Promo"
            className="w-full h-60 md:h-80 object-cover"
          />
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Shop Smarter, Live Better</h3>
          <div className="flex items-center gap-1 text-amber-500 mb-3" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <div className="text-2xl font-bold mb-4">£49.99 <span className="ml-2 text-sm line-through text-gray-400">£69.99</span> <span className="ml-2 text-emerald-600 text-sm">20% OFF</span></div>
          <p className="text-gray-600 mb-4">From everyday essentials to statement pieces, explore a collection made to fit your lifestyle, mood, and moments.</p>
          <div className="flex items-center gap-3">
            <Button className="bg-black hover:bg-black/90 text-white">Add to cart</Button>
            <Button variant="outline" className="border-black text-black hover:bg-black/5">More details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
