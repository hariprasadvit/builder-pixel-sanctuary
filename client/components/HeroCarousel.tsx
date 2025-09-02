import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CarouselSlide {
  id: string;
  image: string;
  alt: string;
  category: string;
  link: string;
}

export default function HeroCarousel() {
  const navigate = useNavigate();
  const [currentGroup, setCurrentGroup] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: "cadbury",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0b13a6808aa84bd29859821ba548c7c2?format=webp&width=1600",
      alt: "Cadbury Gift of Childhood Campaign",
      category: "Cadbury",
      link: "/categories",
    },
    {
      id: "heinz",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc7f303e6d4b94075be6bf0d4b7aa77f0?format=webp&width=1600",
      alt: "Heinz Hot Dog Pact",
      category: "Heinz",
      link: "/categories",
    },
  ];

  // Chunk slides into groups of two
  const groups: CarouselSlide[][] = slides.reduce((acc: CarouselSlide[][], s, i) => {
    if (i % 2 === 0) acc.push([s]);
    else acc[acc.length - 1].push(s);
    return acc;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % groups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [groups.length]);

  const next = () => setCurrentGroup((p) => (p + 1) % groups.length);
  const prev = () => setCurrentGroup((p) => (p - 1 + groups.length) % groups.length);

  const handleClick = (s: CarouselSlide) => navigate(s.link);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-0 md:py-0">
        <div className="relative overflow-hidden rounded-2xl bg-white">
          {/* Groups */}
          <div className="relative w-full h-[360px] md:h-[520px]">
            {groups.map((pair, gi) => (
              <div
                key={gi}
                className={`absolute inset-0 transition-opacity duration-700 ${gi === currentGroup ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                <div className="grid grid-cols-2 gap-3 p-0 h-full">
                  {pair.map((slide) => (
                    <div key={slide.id} className="relative w-full h-full aspect-square cursor-pointer bg-white rounded-xl overflow-hidden flex items-center justify-center" onClick={() => handleClick(slide)}>
                      <img src={slide.image} alt={slide.alt} className="w-full h-full object-contain" />
                    </div>
                  ))}
                  {pair.length === 1 && (
                    <div />
                  )}
                </div>
          </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-between px-4">
            <Button variant="ghost" size="icon" onClick={prev} className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={next} className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex space-x-2">
              {groups.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentGroup(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentGroup ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
