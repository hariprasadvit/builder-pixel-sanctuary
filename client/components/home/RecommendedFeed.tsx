import React, { useState } from "react";
import { ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";
import { Button } from "@/components/ui/button";

type Item = { id: string; type: 'video' | 'product' };

function createItems(start: number, count: number): Item[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `rec-${start + i}`,
    type: (start + i) % 3 === 0 ? 'video' : 'product',
  }));
}

export default function RecommendedFeed() {
  const [items, setItems] = useState<Item[]>(createItems(0, 12));

  const loadMore = () => setItems((prev) => [...prev, ...createItems(prev.length, 8)]);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Recommended For You" icon="🪄" />
          <div className="p-6">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {items.map((it, i) => (
                <div key={it.id} className="flex-shrink-0 w-56">
                  {it.type === 'video' ? (
                    <VideoPlaceholder aspect="9/16" title="Recommended Video" price={79.99} originalPrice={99.99} likes={1800} comments={44} views={7600} />
                  ) : (
                    <ProductPlaceholder title="Recommended Product" price={49.99} originalPrice={69.99} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" onClick={loadMore}>Load more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
