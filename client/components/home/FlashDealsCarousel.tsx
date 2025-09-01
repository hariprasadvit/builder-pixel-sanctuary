import React, { useEffect, useMemo, useState } from "react";
import { ProductPlaceholder, SectionHeader, VideoPlaceholder } from "@/components/ui/placeholders";
import { Button } from "@/components/ui/button";

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
  const end = useMemo(() => Date.now() + 2 * 60 * 60 * 1000, []);
  const { h, m, s } = useCountdown(end);
  const cardHeight = 420;
  const mediaHeight = 240;

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Flash Deals" icon="⚡" gradientClass="bg-gradient-to-r from-[#fde7e7] to-[#ffcdd2]" textClass="text-gray-900">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <span>Ends in</span>
              <span className="px-2 py-1 bg-black/10 rounded-md">{String(h).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-black/10 rounded-md">{String(m).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-black/10 rounded-md">{String(s).padStart(2,'0')}</span>
            </div>
          </SectionHeader>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <VideoPlaceholder title="Deals Feature Video" price={89.99} originalPrice={109.99} badge="Hot Deal" likes={3200} comments={64} views={16000} cardHeight={cardHeight} mediaHeight={mediaHeight} />
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductPlaceholder key={i} title={`Deal Product ${i+1}`} price={49.99 + i * 10} originalPrice={69.99 + i * 10} badge={i % 2 ? "Just In" : "Exclusive"} cardHeight={cardHeight} mediaHeight={mediaHeight} />
            ))}
          </div>
          <div className="text-center pb-6">
            <Button variant="ghost">View All Deals</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
