import React from "react";
import { SectionHeader } from "@/components/ui/placeholders";

type Cat = { key: string; title: string; image?: string; imageClass?: string };

// Names taken from the provided image, with Mobiles and Computers split
const CATS: Cat[] = [
  { key: "mobiles", title: "Mobiles", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7d17e099b1064112ad70871b716e3984?format=webp&width=800" },
  { key: "computers", title: "Computers", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8900fc31a3494cac8c40b9acb5e4ba38?format=webp&width=800", imageClass: "translate-y-[1px]" },
  { key: "tv", title: "TV", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe3b86983d8064ffdb147b92db68300bb?format=webp&width=800", imageClass: "translate-y-[1px]" },
  { key: "appliances", title: "Appliances", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F02e9345e95c5449292f95829d48eece8?format=webp&width=800" },
  { key: "electronics", title: "Electronics", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F27e79e4f98de4acb8bd3436c9719b7a5?format=webp&width=800" },
  { key: "mens-fashion", title: "Men's Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faf8dc3525b18405e968ad5ae6ebd59a3?format=webp&width=800" },
  { key: "womens-fashion", title: "Women's Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdd3640d0b5ab4ff7ba99e6c3603eb6ee?format=webp&width=800" },
  { key: "home", title: "Home", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F42c90a6eb3794d69b343781be14d60dc?format=webp&width=800" },
  { key: "kitchen", title: "Kitchen", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F05a6bca1ba5248f6bf8d8edc4e3ba76d?format=webp&width=800" },
  { key: "pets", title: "Pets", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb8926627cb5c41cc8e95164559075470?format=webp&width=800" },
  { key: "beauty", title: "Beauty", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F915757553a0843f09d38930a1b624ba2?format=webp&width=800" },
  { key: "grocery", title: "Grocery", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5c6fcb3310094a79b7bd1910b724b4c6?format=webp&width=800" },
  { key: "sports-fitness-bags-luggage", title: "Sports, Fitness, Bags, Luggage", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbb927138f2d643a0934666ba8741598e?format=webp&width=800" },
  { key: "toys-baby-kids", title: "Toys, Baby Products, Kids' Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0df4f01425454257b492372172f4c146?format=webp&width=800" },
  { key: "automotive-industrial", title: "Car, Motorbike, Industrial", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1fb6aac613f846a8a1138e6c0a7f3561?format=webp&width=800" },
  { key: "books", title: "Books", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4e9d2b93c6e04290b483aa07a635955d?format=webp&width=800" },
  { key: "entertainment", title: "Movies, Music & Video Games", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2d23667d6ef8421999d4d5b9cbe4ffc6?format=webp&width=800" },
];

const FALLBACK_IMG = "/placeholder.svg";

function Tile({ title, image, imageClass }: { title: string; image?: string; imageClass?: string }) {
  const [t, setT] = React.useState({ s: 1, dz: 0 });
  const onEnter = () => setT({ s: 1.08, dz: 28 });
  const onLeave = () => setT({ s: 1, dz: 0 });

  return (
    <button className="group flex flex-col items-center w-24 sm:w-28" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#1f3b8a] via-[#2e63ff] to-[#ff3b30] shadow-sm transition-all duration-300 group-hover:shadow-2xl will-change-transform">
        <div
          className="relative w-full h-full rounded-full bg-white flex items-center justify-center ring-1 ring-black/5 overflow-hidden"
          style={{
            transform: `perspective(700px) translateZ(${t.dz}px) scale(${t.s})`,
            transformStyle: "preserve-3d",
            transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.35), rgba(99,102,241,0.25), transparent 70%)",
              filter: "blur(6px)",
              transform: "translateZ(1px)",
              transition: "opacity 280ms ease",
            }}
          />
          <div className="shine-strip animate-shine z-20 mix-blend-screen" />
          <img
            src={image || FALLBACK_IMG}
            alt={title}
            className={
              "relative z-10 w-[78px] h-[78px] sm:w-[92px] sm:h-[92px] object-contain object-center transition-transform group-hover:drop-shadow-xl " +
              (imageClass || "")
            }
            style={{ transform: `translateZ(${t.dz + 20}px)` }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = FALLBACK_IMG;
            }}
          />
        </div>
      </div>
      <div className="mt-3 text-[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2 group-hover:text-sky-700">
        {title}
      </div>
    </button>
  );
}

export default function TopCategories() {
  return (
    <section className="py-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-fuchsia-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Top Categories" gradientClass="bg-gradient-to-r from-[#fde7e7] via-[#ffd6db] to-[#ffcdd2] animate-gradient-x" textClass="text-gray-900" />

          <div className="p-4">
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-6 gap-5 justify-items-center">
              {CATS.map((c) => (
                <Tile key={c.key} title={c.title} image={c.image} imageClass={c.imageClass} />
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-4">
                {CATS.map((c) => (
                  <Tile key={c.key} title={c.title} image={c.image} imageClass={c.imageClass} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
