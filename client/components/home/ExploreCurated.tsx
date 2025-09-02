import React from "react";
import { ProductPlaceholder } from "@/components/ui/placeholders";

export default function ExploreCurated() {
  return (
    <section className="py-10 bg-gradient-to-b from-[#0b3b8f] via-[#0a2f76] to-[#0b3b8f] text-white">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Explore London</h2>
            <p className="text-white/90">Items curated for you</p>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            <ProductPlaceholder
              title="Dell Inspiron 15 (Ryzen)"
              price={599.0}
              originalPrice={699.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8bd53faa3b47b8b4500805a7d4d67c?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              showPrice={false}
            />

            <ProductPlaceholder
              title="MacBook Air 13” (M2)"
              price={999.0}
              originalPrice={1099.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75ab3a008e80471da9d31841b1b590b7?format=webp&width=1200"
              fit="contain"
              showBuyButton={false}
              showPrice={false}
            />

            <ProductPlaceholder
              title="Sony ZV-1 Vlog Camera"
              price={549.0}
              originalPrice={649.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1254a7b2203a4401b1b14ed1498915ab?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              showPrice={false}
            />

            <ProductPlaceholder
              title="boAt Wave Smartwatch"
              price={39.0}
              originalPrice={59.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff198716fff91439da185dbe6ad643539?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              showPrice={false}
            />

            <ProductPlaceholder
              title="boAt Party Speaker 160W"
              price={129.0}
              originalPrice={159.0}
              thumbnailSrc="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4351f4cb715647bbb2c6fc9ee39be1c3?format=webp&width=800"
              fit="contain"
              showBuyButton={false}
              showPrice={false}
            />
          </div>
        </div>

        <div className="mt-6 hidden md:block">
          <div className="w-full h-28 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 opacity-80" />
        </div>
      </div>
    </section>
  );
}
