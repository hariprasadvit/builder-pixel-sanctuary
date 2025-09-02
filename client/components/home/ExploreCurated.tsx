import React, { useRef } from "react";
import { ProductPlaceholder } from "@/components/ui/placeholders";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExploreCurated() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const first = rail.querySelector<HTMLElement>(".snap-start");
    const step = ((first?.offsetWidth) || 240) + 16; // card width + gap
    rail.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-[#0a1b4f] via-[#0c2f6f] to-[#071a3d] text-white">
      {/* Bottom skyline image above gradient, behind content */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffabb4857a3564d13b09fe1ba4694fa74?format=webp&width=1600"
        alt="London skyline"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 w-full h-48 md:h-64 lg:h-72 object-cover object-bottom"
      />

      <div className="relative z-20 container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Explore London</h2>
            <p className="text-white/90">Items curated for you</p>
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-lg mb-2 md:mb-4 lg:mb-6 overflow-hidden">
          <button aria-label="Previous" onClick={() => scrollByCards(-1)} className="flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow items-center justify-center ring-1 ring-black/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button aria-label="Next" onClick={() => scrollByCards(1)} className="flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow items-center justify-center ring-1 ring-black/10">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div ref={railRef} className="p-4 px-12 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            <div className="shrink-0 w-4 md:w-6" />
            <ProductPlaceholder
              title="Dell Inspiron 15 (Ryzen)"
              price={599.0}
              originalPrice={699.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8bd53faa3b47b8b4500805a7d4d67c?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="MacBook Air 13” (M2)"
              price={999.0}
              originalPrice={1099.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75ab3a008e80471da9d31841b1b590b7?format=webp&width=1200"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="Sony ZV-1 Vlog Camera"
              price={549.0}
              originalPrice={649.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1254a7b2203a4401b1b14ed1498915ab?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="boAt Wave Smartwatch"
              price={39.0}
              originalPrice={59.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff198716fff91439da185dbe6ad643539?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="boAt Party Speaker 160W"
              price={129.0}
              originalPrice={159.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4351f4cb715647bbb2c6fc9ee39be1c3?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="Ninja CRISPi Air Fryer"
              price={89.99}
              originalPrice={109.99}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8bd53faa3b47b8b4500805a7d4d67c?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="TRIP Magnesium Powder – Pomegranate"
              price={24.99}
              originalPrice={29.99}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff198716fff91439da185dbe6ad643539?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />

            <ProductPlaceholder
              title="Vileda Turbo Mop & Bucket Bundle"
              price={42.99}
              originalPrice={52.99}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4351f4cb715647bbb2c6fc9ee39be1c3?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              cardHeight="auto"
              mediaHeight={140}
              className="min-w-[220px] md:min-w-[240px] snap-start"
            />
            <div className="shrink-0 w-4 md:w-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
