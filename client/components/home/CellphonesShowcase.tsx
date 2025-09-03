import React from "react";
import { ProductPlaceholder } from "@/components/ui/placeholders";

const PHONES = [
  {
    title: "OnePlus Nord CE4 Lite",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc33feae9d94c451b8969c60661c3692d?format=webp&width=800",
    price: 199.0,
    original: 229.0,
  },
  {
    title: "Samsung Galaxy M05",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F52335893f0c54cb4b8fbdd9822964bdd?format=webp&width=800",
    price: 139.0,
    original: 159.0,
  },
  {
    title: "iQOO Z10x",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F687bbd4ffd97429ba501de2ec448faa3?format=webp&width=800",
    price: 229.0,
    original: 259.0,
  },
  {
    title: "Redmi 13 5G Prime Edition",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4de295fcb31a4ed990c1b1e9107431e3?format=webp&width=800",
    price: 179.0,
    original: 199.0,
  },
  {
    title: "POCO M6 Plus 5G",
    img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4a1b3bab6a694089998b588abcabc22b?format=webp&width=800",
    price: 189.0,
    original: 209.0,
  },
];

export default function CellphonesShowcase() {
  const bannerImage =
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0685bf9e45fb4b92b841cc489a8ccc3c?format=webp&width=1600";

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={bannerImage}
            alt="Cellphones Specials"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {PHONES.map((p, i) => (
            <ProductPlaceholder
              key={`phone-show-${i}`}
              title={p.title}
              price={p.price}
              originalPrice={p.original}
              thumbnailSrc={p.img}
              fit="contain"
              cardHeight={320}
              mediaHeight={180}
              mediaPadding="px-4 py-3"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
