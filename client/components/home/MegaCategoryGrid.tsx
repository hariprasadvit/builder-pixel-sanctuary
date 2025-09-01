import React from "react";

export type MegaCategory = { id: string; name: string; image: string };

export default function MegaCategoryGrid({ categories }: { categories: MegaCategory[] }) {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {categories.map((c) => (
            <button key={c.id} className="group rounded-xl border bg-gray-50 hover:bg-white hover:shadow transition p-3 flex flex-col items-center text-center">
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-white">
                <img src={c.image} alt={c.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="mt-2 text-xs font-medium line-clamp-2">{c.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
