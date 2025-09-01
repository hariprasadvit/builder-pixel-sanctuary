import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

const themes = [
  { key: 'wfh', title: 'Work From Home', icon: '💻' },
  { key: 'travel', title: 'Travel', icon: '✈️' },
  { key: 'gaming', title: 'Gaming', icon: '🎮' },
  { key: 'fitness', title: 'Fitness', icon: '💪' },
];

export default function LifestyleExplore() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Explore by Lifestyle" icon="🧭" />
          <div className="p-6 grid md:grid-cols-4 gap-6">
            {themes.map((t, i) => (
              <div key={t.key} className="rounded-2xl border p-4 bg-white">
                <h3 className="font-bold mb-3 flex items-center gap-2"><span>{t.icon}</span>{t.title}</h3>
                <BrandBannerPlaceholder title="Lifestyle Image Placeholder" height="h-32" />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <VideoPlaceholder aspect="16/9" title="Theme Video" price={69.99} originalPrice={89.99} badge={i % 2 ? 'New' : 'Trending'} likes={900} comments={22} views={4300} />
                  <ProductPlaceholder title="Curated Product" price={39.99} originalPrice={59.99} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
