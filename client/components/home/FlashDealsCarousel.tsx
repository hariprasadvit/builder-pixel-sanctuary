import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ProductPlaceholder,
  SectionHeader,
  VideoPlaceholder,
} from "@/components/ui/placeholders";
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
          <SectionHeader title="Flash Deals" icon="⚡">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span>Ends in</span>
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">
                {String(h).padStart(2, "0")}
              </span>
              :
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">
                {String(m).padStart(2, "0")}
              </span>
              :
              <span className="px-2 py-1 bg-[#0b3b8f] text-white rounded-md">
                {String(s).padStart(2, "0")}
              </span>
            </div>
          </SectionHeader>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            <Link
              to="/product/1"
              className="block relative z-30 pointer-events-auto"
            >
              <VideoPlaceholder
                title="Tech Deals Live!"
                price={89.99}
                originalPrice={109.99}
                badge="Hot Deal"
                likes={3200}
                comments={64}
                aspect="16/9"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75ab3a008e80471da9d31841b1b590b7?format=webp&width=1200"
                fit="cover"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </Link>

            <Link
              to="/product/2"
              className="block relative z-30 pointer-events-auto"
            >
              <ProductPlaceholder
                title="Ninja CRISPi Air Fryer"
                price={89.99}
                originalPrice={109.99}
                badge="Exclusive"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8bd53faa3b47b8b4500805a7d4d67c?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </Link>

            <Link
              to="/product/3"
              className="block relative z-30 pointer-events-auto"
            >
              <ProductPlaceholder
                title="TRIP Magnesium Powder – Pomegranate"
                price={24.99}
                originalPrice={29.99}
                badge="New"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff198716fff91439da185dbe6ad643539?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </Link>

            <Link
              to="/product/4"
              className="block relative z-30 pointer-events-auto"
            >
              <ProductPlaceholder
                title={'Philips 32" LED TV'}
                price={199.99}
                originalPrice={249.99}
                badge="Deal"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5c109ec24aa94fa4916978ce02580ccf?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </Link>

            <Link
              to="/product/5"
              className="block relative z-30 pointer-events-auto"
            >
              <ProductPlaceholder
                title="Vileda Turbo Mop & Bucket Bundle"
                price={42.99}
                originalPrice={52.99}
                badge="Best Seller"
                thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F170a30c88a3c44ada629d58963d506db?format=webp&width=800"
                fit="contain"
                cardHeight={cardHeight}
                mediaHeight={mediaHeight}
              />
            </Link>
          </div>
          <div className="text-center pb-6">
            <Button variant="ghost">View All Deals</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
