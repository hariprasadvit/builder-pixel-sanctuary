import React from "react";

type Cat = { key: string; title: string; image?: string };

// Names taken from the provided image, with Mobiles and Computers split
const CATS: Cat[] = [
  { key: "mobiles", title: "Mobiles", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcc856a785b54fa69d37e8c51fa472ad?format=webp&width=800" },
  { key: "computers", title: "Computers", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5a282973572046059d51eb2c5b250946?format=webp&width=800" },
  { key: "tv", title: "TV", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9fe60f3c9a2a4ddc958ce3abc6b26c79?format=webp&width=800" },
  { key: "appliances", title: "Appliances", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6ee0ad9f44354997a272f6b54a36b96f?format=webp&width=800" },
  { key: "electronics", title: "Electronics", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4dbe39834cce48e1a9655d4ef700ae76?format=webp&width=800" },
  { key: "mens-fashion", title: "Men's Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe19e8d84770242cebcfb2df564aaea6f?format=webp&width=800" },
  { key: "womens-fashion", title: "Women's Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff67a725a185b47c2a93d039baf7b224a?format=webp&width=800" },
  { key: "home", title: "Home", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc02dfd2182584380b7b0195ef8b351e2?format=webp&width=800" },
  { key: "kitchen", title: "Kitchen", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F23aa8fe6776b4861be2ed1b535e9436b?format=webp&width=800" },
  { key: "pets", title: "Pets", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F353a1359f90c48e3b0dbd5cb92e13566?format=webp&width=800" },
  { key: "beauty", title: "Beauty", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0991d73e48814d5cb039b3a9b211fa9c?format=webp&width=800" },
  { key: "grocery", title: "Grocery", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8573b56e4dff4262b0fb56d304a8223d?format=webp&width=800" },
  { key: "sports-fitness-bags-luggage", title: "Sports, Fitness, Bags, Luggage", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Feffc3f58876044debec9badf26dc43d3?format=webp&width=800" },
  { key: "toys-baby-kids", title: "Toys, Baby Products, Kids' Fashion", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F10040903e8e243d591bf932e2eeed037?format=webp&width=800" },
  { key: "automotive-industrial", title: "Car, Motorbike, Industrial", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff7adf63e887549dbb01fb11bc10a4da1?format=webp&width=800" },
  { key: "books", title: "Books", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faaa940689bc64a3ea824b7587cc4f58c?format=webp&width=800" },
  { key: "entertainment", title: "Movies, Music & Video Games", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa66f963a9fd041669b92a21bead1d7e2?format=webp&width=800" },
];

const FALLBACK_IMG = "/placeholder.svg";

function Tile({ title, image }: { title: string; image?: string }) {
  return (
    <button className="group flex flex-col items-center w-24 sm:w-28">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 shadow-sm">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center ring-1 ring-black/5">
          <img
            src={image || FALLBACK_IMG}
            alt={title}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = FALLBACK_IMG;
            }}
          />
        </div>
      </div>
      <div className="mt-2 text:[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2">
        {title}
      </div>
    </button>
  );
}

export default function TopCategories() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Top Categories</h2>

        {/* Desktop grid (structure unchanged) */}
        <div className="hidden md:grid grid-cols-8 gap-4">
          {CATS.map((c) => (
            <Tile key={c.key} title={c.title} image={c.image} />
          ))}
        </div>

        {/* Mobile horizontal scroll (structure unchanged) */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {CATS.map((c) => (
              <Tile key={c.key} title={c.title} image={c.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
