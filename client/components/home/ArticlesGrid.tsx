import React from "react";
import { Button } from "@/components/ui/button";

export default function ArticlesGrid() {
  const items = [
    {
      title: "Style Delivered to Your Doorstep",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Your Personal Wardrobe, Online",
      image:
        "https://images.unsplash.com/photo-1542060748-10c28b62716a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Premium Collections",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    },
  ];
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">New Season</h3>
        <Button variant="ghost" className="text-gray-700">Browse all articles →</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl overflow-hidden bg-white shadow-md border">
            <img src={it.image} alt={it.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="font-semibold text-gray-900">{it.title}</div>
              <p className="text-sm text-gray-600 mt-1">Shop the looks, discover trends from top brands and local makers, handpicked by experts.</p>
              <Button variant="link" className="px-0">Read more →</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
