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
    <section className="pt-2 pb-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Flash Deals" icon="⚡" gradientClass="bg-gradient-to-r from-[#fde7e7] to-[#ffcdd2]" textClass="text-gray-900">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <span>Ends in</span>
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">{String(h).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">{String(m).padStart(2,'0')}</span>:
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">{String(s).padStart(2,'0')}</span>
            </div>
          </SectionHeader>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            <a href="/product/1" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title="Smartrun A6 Treadmill"
                price={299.99}
                originalPrice={399.99}
                badge="Limited"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5a2faa9687f3425fa777d83d6801fce9?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>

            <a href="/product/2" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title="3-Piece Hardside Luggage Set"
                price={129.99}
                originalPrice={179.99}
                badge="Travel"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa2b4009e08244e11bcdaa69bc0888053?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>

            <a href="/product/3" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title="Presto Active Wash Detergent 8kg"
                price={15.99}
                originalPrice={19.99}
                badge="Super Value"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9c1dbc7306e24a8ca61d044d63d3f342?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>

            <a href="/product/4" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title={"Philips 32\" LED TV"}
                price={199.99}
                originalPrice={249.99}
                badge="Deal"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5c109ec24aa94fa4916978ce02580ccf?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>

            <a href="/product/5" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title="Slovic Doorway Pull-Up Bar"
                price={24.99}
                originalPrice={34.99}
                badge="Fitness"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2a6e54e0ac624cec9e04c048284a779a?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>

            <a href="/product/6" className="block relative z-30 pointer-events-auto">
              <ProductPlaceholder
                title="Clip-on Lavalier Microphone"
                price={29.99}
                originalPrice={39.99}
                badge="New"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc1733dfbf8e74ac589270fbe6bfaa4a5?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </a>
          </div>
          <div className="text-center pb-6">
            <Button variant="ghost">View All Deals</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
