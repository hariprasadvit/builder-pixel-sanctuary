import React from "react";

type Cat = { key: string; title: string; image?: string };

// Names taken from the provided image, with Mobiles and Computers split
const CATS: Cat[] = [
  { key: "mobiles", title: "Mobiles", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F947b5d1c44ff40228ea9c20d9207aa8e?format=webp&width=800" },
  { key: "computers", title: "Computers", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc3e115ae06ce4f08b0eaa77471fb507a?format=webp&width=800" },
  { key: "tv", title: "TV", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F627e0515a575433d90703254492d1c22?format=webp&width=800" },
  { key: "appliances", title: "Appliances", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8ddfde238b05411582527aeed643e130?format=webp&width=800" },
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
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#1f3b8a] via-[#2e63ff] to-[#ff3b30] shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
        <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center ring-1 ring-black/5 transition-all duration-300 group-hover:ring-2 group-hover:ring-sky-300">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.35),rgba(99,102,241,0.25),transparent_65%)] opacity-0 group-hover:opacity-100 blur-md"></div>
          <img
            src={image || FALLBACK_IMG}
            alt={title}
            className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform group-hover:scale-105 group-hover:drop-shadow-md"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = FALLBACK_IMG;
            }}
          />
        </div>
      </div>
      <div className="mt-2 text-[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2 group-hover:text-sky-700">
        {title}
      </div>
    </button>
  );
}

export default function TopCategories() {
  return (
    <section className="py-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-fuchsia-50">
      <div className="container mx-auto px-4 bg-white/70 backdrop-blur-sm rounded-2xl ring-1 ring-black/5 p-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Top Categories</h2>

        {/* Desktop grid (structure unchanged) */}
        <div className="hidden md:grid grid-cols-6 gap-5">
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
