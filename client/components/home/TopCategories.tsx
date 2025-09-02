import React from "react";
import { ChevronRight } from "lucide-react";

type Cat = { key: string; title: string; dividerAfter?: boolean };

const CATS: Cat[] = [
  { key: "mobiles", title: "Mobiles" },
  { key: "computers", title: "Computers" },
  { key: "tv-appliances-electronics", title: "TV, Appliances, Electronics" },
  { key: "mens-fashion", title: "Men's Fashion" },
  { key: "womens-fashion", title: "Women's Fashion", dividerAfter: true },
  { key: "home-kitchen-pets", title: "Home, Kitchen, Pets" },
  { key: "beauty-health-grocery", title: "Beauty, Health, Grocery" },
  { key: "sports-fitness-bags-luggage", title: "Sports, Fitness, Bags, Luggage" },
  { key: "toys-baby-kids", title: "Toys, Baby Products, Kids' Fashion" },
  { key: "automotive-industrial", title: "Car, Motorbike, Industrial" },
  { key: "books", title: "Books" },
  { key: "entertainment", title: "Movies, Music & Video Games" },
];

export default function TopCategories() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Top Categories</h2>
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <ul>
            {CATS.map((c, i) => (
              <li key={c.key} className="">
                <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 focus:outline-none">
                  <span className="text-base md:text-lg text-gray-900 text-left">{c.title}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                {c.dividerAfter && <div className="h-px bg-gray-200 mx-4" />}
                {!c.dividerAfter && i < CATS.length - 1 && <div className="h-px bg-gray-100 mx-4" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
