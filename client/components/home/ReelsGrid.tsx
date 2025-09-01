import React from "react";
import SocialFeedCard, { type SocialFeedItem } from "@/components/social/SocialFeedCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type GridProduct = { id: string; title: string; image: string; price: number };

export default function ReelsGrid({ videos, products }: { videos: SocialFeedItem[]; products: GridProduct[] }) {
  // Interleave videos and products for a dynamic grid
  const mixed: Array<{ kind: "video" | "product"; video?: SocialFeedItem; product?: GridProduct }>[] = [] as any;
  const sequence: Array<{ kind: "video" | "product"; video?: SocialFeedItem; product?: GridProduct }> = [];
  const max = Math.max(videos.length, products.length);
  for (let i = 0; i < max; i++) {
    if (videos[i]) sequence.push({ kind: "video", video: videos[i] });
    if (products[i]) sequence.push({ kind: "product", product: products[i] });
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {sequence.map((item, idx) => {
          if (item.kind === "video" && item.video) {
            return (
              <div key={`v-${item.video.id}-${idx}`} className="col-span-1">
                <SocialFeedCard item={item.video} compact className="" />
              </div>
            );
          }
          if (item.kind === "product" && item.product) {
            return (
              <div key={`p-${item.product.id}-${idx}`} className="col-span-1">
                <Card className="overflow-hidden rounded-2xl shadow border">
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                      <div className="text-white text-xs font-semibold line-clamp-2">{item.product.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-white font-bold">£{item.product.price.toFixed(2)}</div>
                        <Button size="sm" className="h-7 px-3 text-xs bg-white text-black hover:bg-white/90">Shop</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
