import React, { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "lenovo",
    src: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff5c0e3c0a2d04e128a64ec28b28c10c1?format=webp&width=2400&v=2",
    alt: "Lenovo",
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
                <div
                  key={s.id}
                  className="group relative w-screen h-[240px] md:h-[320px] snap-start overflow-hidden"
                  style={{ backgroundColor: (s as any).bg || "#ffffff" }}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className={`w-full h-full ${(s as any).fit === "contain" ? "object-contain p-4 md:p-6" : "object-cover"}`}
                  />
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
                    i === index
                      ? "bg-gray-900 scale-110"
                      : "bg-gray-400/60 hover:bg-gray-600"
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
