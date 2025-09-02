import React from "react";

type Cat = { key: string; title: string; image?: string };

const CATS: Cat[] = [
  { key: "paan", title: "Paan Corner" },
  { key: "dairy", title: "Dairy, Bread & Eggs" },
  { key: "fruits", title: "Fruits & Vegetables" },
  { key: "drinks", title: "Cold Drinks & Juices" },
  { key: "snacks", title: "Snacks & Munchies" },
  { key: "breakfast", title: "Breakfast & Instant Food" },
  { key: "sweets", title: "Sweet Tooth" },
  { key: "bakery", title: "Bakery & Biscuits" },
  { key: "beverages", title: "Tea, Coffee & Health Drink" },
  { key: "grains", title: "Atta, Rice & Dal" },
  { key: "masala", title: "Masala, Oil & More" },
  { key: "sauces", title: "Sauces & Spreads" },
  { key: "meat", title: "Chicken, Meat & Fish" },
  { key: "organic", title: "Organic & Healthy Living" },
  { key: "baby", title: "Baby Care" },
  { key: "pharma", title: "Pharma & Wellness" },
  { key: "cleaning", title: "Cleaning Essentials" },
  { key: "office", title: "Home & Office" },
  { key: "personal", title: "Personal Care" },
  { key: "pet", title: "Pet Care" },
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

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-8 gap-4">
          {CATS.map((c) => (
            <Tile key={c.key} title={c.title} image={c.image} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
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
