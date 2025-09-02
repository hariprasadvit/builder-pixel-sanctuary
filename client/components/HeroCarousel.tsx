import React from "react";

const slides = [
  {
    id: "lenovo",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdc07b67b48df45a5aafbcac52e9ec7ff?format=webp&width=2400",
    alt: "Lenovo Empowering Progress Banner",
  },
  {
    id: "cadbury",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8bf35e10b060460595c8ae6a2830c01f?format=webp&width=2400",
    alt: "Cadbury Trio Banner",
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
              <div key={s.id} className="w-screen h-[240px] md:h-[320px] bg-white snap-start">
                <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
