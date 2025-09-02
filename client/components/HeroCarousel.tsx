import React, { useEffect, useRef, useState } from "react";

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
  {
    id: "samsung",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F59a892c20f5b43d48e6fc3b754383b2b?format=webp&width=2400",
    alt: "Samsung Super Brand Day Banner",
  },
];

export default function HeroCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  // Sync index on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const w = el.clientWidth || window.innerWidth;
      const i = Math.round(el.scrollLeft / w);
      setIndex(Math.max(0, Math.min(slides.length - 1, i)));
    };
    el.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => el.removeEventListener("scroll", handler as any);
  }, []);

  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth || window.innerWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
  };


  return (
    <section className="bg-white">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            <div className="flex w-max">
              {slides.map((s) => (
                <div key={s.id} className="w-screen h-[240px] md:h-[320px] bg-white snap-start">
                  <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>


          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === index ? "bg-gray-900 scale-110" : "bg-gray-400/60 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
