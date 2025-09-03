import React from "react";

export default function UKDealsBanner() {

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 group">
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0bfb33c235f14de8ba55e5478176c4e5?format=webp&width=1440"
              alt="UK Fashion Trends"
              className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="shine-strip animate-shine z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
