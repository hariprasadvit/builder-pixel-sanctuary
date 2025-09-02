import React from "react";

type Cat = { key: string; title: string; image?: string };

// Names taken from the provided image, with Mobiles and Computers split
const CATS: Cat[] = [
  { key: "mobiles", title: "Mobiles" },
  { key: "computers", title: "Computers" },
  { key: "tv-appliances-electronics", title: "TV, Appliances, Electronics" },
  { key: "mens-fashion", title: "Men's Fashion" },
  { key: "womens-fashion", title: "Women's Fashion" },
  { key: "home-kitchen-pets", title: "Home, Kitchen, Pets" },
  { key: "beauty-health-grocery", title: "Beauty, Health, Grocery" },
  { key: "sports-fitness-bags-luggage", title: "Sports, Fitness, Bags, Luggage" },
  { key: "toys-baby-kids", title: "Toys, Baby Products, Kids' Fashion" },
  { key: "automotive-industrial", title: "Car, Motorbike, Industrial" },
  { key: "books", title: "Books" },
  { key: "entertainment", title: "Movies, Music & Video Games" },
];

const FALLBACK_IMG = "/placeholder.svg";

function Tile({ title, image }: { title: string; image?: string }) {
  return (
    <button className="group flex flex-col items-center w-24 sm:w-28">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm ring-1 ring-black/5">
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
      <div className="mt-2 text-[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2">
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
