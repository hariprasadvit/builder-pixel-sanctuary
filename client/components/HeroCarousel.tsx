import React from "react";

const slides = [
  {
    id: "heinz",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffa37068b30a242078e7f5352e7a10cc0?format=webp&width=2000",
    alt: "Heinz Stockingz Meanz Heinz Banner",
  },
  {
    id: "cadbury",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F36571411fdb24db4bdbf238955b43fd8?format=webp&width=2000",
    alt: "Cadbury Coconut Chocolate Banner",
  },
];

export default function HeroCarousel() {
  return (
    <section className="bg-white">
      {/* Full-bleed wrapper */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        {/* Horizontal scroll with snap */}
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex w-max">
            {slides.map((s) => (
              <div key={s.id} className="w-screen h-[220px] md:h-[300px] flex items-center justify-center bg-white snap-start">
                <img src={s.src} alt={s.alt} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
