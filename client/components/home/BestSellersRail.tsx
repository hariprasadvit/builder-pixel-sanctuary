import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export type RailItem = { id: string | number; title: string; image: string; price: number };

export default function BestSellersRail({ items, title = "Best Sellers" }: { items: RailItem[]; title?: string }) {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        </div>
        <div className="-mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory">
            {items.map((item) => (
              <div key={item.id} className="w-40 md:w-48 flex-shrink-0 snap-start">
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-2">
                    <div className="text-xs font-semibold line-clamp-2 mb-1">{item.title}</div>
                    <div className="text-sm font-bold">£{item.price.toFixed(2)}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
