import React, { useMemo } from "react";
import SocialFeedCard, { type SocialFeedItem } from "@/components/social/SocialFeedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type FeedProduct = { id: string; title: string; image: string; price: number; };

export default function MixedFeed({ videos, products }: { videos: SocialFeedItem[]; products: FeedProduct[] }) {
  const productChunks = useMemo(() => {
    const size = 6;
    const chunks: FeedProduct[][] = [];
    for (let i = 0; i < products.length; i += size) chunks.push(products.slice(i, i + size));
    return chunks;
  }, [products]);

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col gap-6 md:gap-8">
        {videos.map((v, i) => (
          <div key={v.id} className="flex flex-col gap-4">
            <SocialFeedCard item={v} />
            {productChunks[i] && (
              <div className="-mx-4 px-4">
                <div className="flex items-stretch gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {productChunks[i].map((p) => (
                    <div key={p.id} className="w-40 md:w-48 flex-shrink-0 snap-start">
                      <Card className="overflow-hidden">
                        <div className="aspect-square bg-gray-100">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <CardContent className="p-2">
                          <div className="text-xs font-semibold line-clamp-2 mb-1">{p.title}</div>
                          <div className="text-sm font-bold">£{p.price.toFixed(2)}</div>
                          <Button className="w-full mt-2 text-xs">Shop Now</Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
