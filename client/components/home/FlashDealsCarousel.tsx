import React, { useEffect, useMemo, useState } from "react";
import { ProductPlaceholder, SectionHeader } from "@/components/ui/placeholders";
import { Button } from "@/components/ui/button";

interface DealItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
}

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export default function FlashDealsCarousel() {
  const deals: DealItem[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `deal-${i+1}`,
    title: `Hot Deal Product ${i+1}`,
    price: 49.99 + i,
    originalPrice: 79.99 + i * 2,
  }));
  const endTime = useMemo(() => Date.now() + 2 * 60 * 60 * 1000, []);
  const { h, m, s } = useCountdown(endTime);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Flash Deals" icon="⚡">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span>Ends in</span>
              <span className="px-2 py-1 bg-black/20 rounded-md">{String(h).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-black/20 rounded-md">{String(m).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-black/20 rounded-md">{String(s).padStart(2,'0')}</span>
            </div>
          </SectionHeader>
          <div className="p-4">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {deals.map((d) => (
                <div key={d.id} className="flex-shrink-0 w-56">
                  <ProductPlaceholder title={d.title} price={d.price} originalPrice={d.originalPrice} badge="Hot Deal" />
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Button variant="ghost">View All Deals</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
