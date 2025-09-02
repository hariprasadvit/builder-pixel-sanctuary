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
  const [currentSlide, setCurrentSlide] = useState(0);

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
      id: "clarks",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe62af38758d744d2bacf96603f412476?format=webp&width=1600",
      alt: "Clarks Lifestyle Collage",
      category: "Clarks",
      link: "/brands",
    },
    {
      id: "heinz",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc7f303e6d4b94075be6bf0d4b7aa77f0?format=webp&width=1600",
      alt: "Heinz Hot Dog Pact",
      category: "Heinz",
      link: "/categories",
    },
    {
      id: "lenovo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe3998f2c14134129addedc6f42055d20?format=webp&width=1600",
      alt: "Lenovo Collaboration Banner",
      category: "Lenovo",
      link: "/electronics",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSlideClick = (slide: CarouselSlide) => {
    // For now, navigate to categories page
    // In the future, this could be individual category pages
    navigate("/categories");
  };

  return (
    <section className="relative h-[300px] md:h-[380px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 cursor-pointer ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            onClick={() => handleSlideClick(slide)}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-6 left-6">
        <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-white text-sm font-medium">
            {slides[currentSlide].category}
          </span>
        </div>
      </div>

      {/* Click to Browse Indicator */}
      <div className="absolute bottom-6 right-6">
        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <span className="text-white text-sm">
            Click to browse {slides[currentSlide].category}
          </span>
        </div>
      </div>
    </section>
  );
}
