import React, { useRef } from "react";
import { ProductPlaceholder } from "@/components/ui/placeholders";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";

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
    <section className="relative overflow-hidden pt-10 pb-28 md:pb-32 lg:pb-40 bg-gradient-to-b from-[#0a1b4f] via-[#0c2f6f] to-[#071a3d] text-white">
      {/* Bottom skyline image above gradient, behind content */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffabb4857a3564d13b09fe1ba4694fa74?format=webp&width=1600"
        alt="London skyline"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 w-full h-96 md:h-[520px] lg:h-[640px] object-cover object-bottom"
      />

      <div className="relative z-20 container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Explore London</h2>
            <p className="text-white/90">Items curated for you</p>
          </div>

          <span className="flex items-center gap-3 bg-amber-400 text-black font-semibold px-3 py-2 rounded-full shadow-lg">
            <span className="relative flex items-center justify-center w-6 h-6">
              <Truck className="w-4 h-4" />
              <span className="absolute inline-flex w-6 h-6 rounded-full bg-amber-300 opacity-60 animate-ping" />
            </span>
            <span className="text-sm">Delivering in less than <span className="font-extrabold">30 min</span></span>
          </span>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-lg mb-12 md:mb-14 lg:mb-16 overflow-hidden">
          <button aria-label="Previous" onClick={() => scrollByCards(-1)} className="flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow items-center justify-center ring-1 ring-black/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button aria-label="Next" onClick={() => scrollByCards(1)} className="flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow items-center justify-center ring-1 ring-black/10">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div ref={railRef} className="p-4 px-12 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            <div className="shrink-0 w-4 md:w-6" />
            {[
              { title: 'Mulberry Small Leather Bag', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75d72b9d128e4c07b313b8abbea56f06?format=webp&width=800', price: 249.0, original: 349.0 },
              { title: 'Dr. Martens 1460 Boots', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F24ee2a04a9fb460584d4655f7ed04324?format=webp&width=800', price: 139.0, original: 179.0 },
              { title: 'The Macallan 12 Years', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdf4a65e723474978b614d55c5f9b8f40?format=webp&width=800', price: 59.0, original: 79.0 },
              { title: 'Mrs Bridges Orange Marmalade', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6c5ea03f5fb645dfabddb5827a09e4a9?format=webp&width=800', price: 5.99, original: 7.99 },
              { title: 'Coombes Castle Red Leicester', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F46a82f97fd374730a17f3e480c77bb2a?format=webp&width=800', price: 4.99, original: 6.99 },
              { title: 'Fortnum & Mason Breakfast Tea', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2df4fa481d1144a295b3aa55afaaeecc?format=webp&width=800', price: 14.99, original: 19.99 },
              { title: 'Emma Bridgewater Mug', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdd400a6f6f574137b03f9f27b9bd818f?format=webp&width=800', price: 24.99, original: 29.99 },
              { title: 'Elemis Pro-Collagen Balm', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5d56ccaa22af4cc3bbb90ee57fc571ae?format=webp&width=800', price: 59.0, original: 85.0 },
            ].map((p, i) => (
              <ProductPlaceholder
                key={`london-${i}`}
                title={p.title}
                price={p.price}
                originalPrice={p.original}
                thumbnailSrc={p.img}
                fit="contain"
                showBuyButton={false}
                cardHeight="auto"
                mediaHeight={140}
                className="min-w-[220px] md:min-w-[240px] snap-start"
              />
            ))}
            <div className="shrink-0 w-4 md:w-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
