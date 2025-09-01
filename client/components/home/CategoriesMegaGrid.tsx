import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

interface CatItem { key: string; title: string; icon: string; }

const categories: CatItem[] = [
  { key: "electronics", title: "Electronics", icon: "🔌" },
  { key: "cellphones", title: "Cellphones", icon: "📱" },
  { key: "clothing", title: "Clothing", icon: "👕" },
  { key: "beauty", title: "Beauty", icon: "💄" },
  { key: "home", title: "Home", icon: "🏠" },
  { key: "kitchen", title: "Kitchen", icon: "🍳" },
  { key: "sports", title: "Sports", icon: "🏃" },
  { key: "toys", title: "Toys", icon: "🧸" },
  { key: "books", title: "Books", icon: "📚" }
];

export default function CategoriesMegaGrid() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Shop Categories" icon="🧭" />
          <div className="p-6 grid md:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <div key={c.key} className="rounded-2xl border bg-white shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2"><span>{c.icon}</span>{c.title}</h3>
                  <span className="text-xs text-gray-500">Explore</span>
                </div>
                <BrandBannerPlaceholder title="Category Banner Placeholder" height="h-36" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <VideoPlaceholder aspect="16/9" title={`${c.title} Video`} price={99.99} originalPrice={129.99} badge={i % 2 ? "Trending" : "New"} likes={1200} comments={45} views={5600} showSocialCounters />
                  <ProductPlaceholder title={`${c.title} Product`} price={49.99} originalPrice={69.99} badge="Deal" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
