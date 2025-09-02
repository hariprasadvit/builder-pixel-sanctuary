import React from "react";
import { ProductPlaceholder } from "@/components/ui/placeholders";

const ELECTRONICS_PRODUCTS = [
  {
    title: "MacBook Air 13-inch (M3)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2109e9ea1ecc479aa336ac515f8c5a8d?format=webp&width=800",
    price: 1099.0,
    original: 1199.0,
  },
  {
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F199d372cf11f426bbd41c4f81a31c348?format=webp&width=800",
    price: 349.0,
    original: 399.0,
  },
  {
    title: "iPad Air 11-inch (M2)",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F94fe3d4c825842839ba8c6cf6af93776?format=webp&width=800",
    price: 599.0,
    original: 649.0,
  },
  {
    title: "Apple Watch Series 9 GPS 41mm",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff81dd5d574034f448030235941c9a382?format=webp&width=800",
    price: 399.0,
    original: 449.0,
  },
  {
    title: "Xiaomi 14 Ultra",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800",
    price: 1199.0,
    original: 1299.0,
  },
];

export default function ElectronicsProductShowcase() {
  const bannerImage =
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa96632dd5b5e47958a3953a5ad4fe4218027bdc63a4ba39d353ba151c61a63?format=webp&width=1440";

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={bannerImage}
            alt="Electronics Specials"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ELECTRONICS_PRODUCTS.map((p, i) => (
            <ProductPlaceholder
              key={`elec-show-${i}`]
              title={p.title}
              price={p.price}
              originalPrice={p.original}
              thumbnailSrc={p.img}
              fit="contain"
              cardHeight={380}
              mediaHeight={220}
              mediaPadding="px-4 py-3"
            />
          ))}
        </div>
      </div>
    </section>
  );
}