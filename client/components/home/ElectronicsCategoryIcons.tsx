import React from "react";

type Item = { label: string; img: string };

const ITEMS: Item[] = [
  { label: "Laptops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdb8f84e4211c4b198a762954501e50d8?format=webp&width=400" },
  { label: "Headphones", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F199d372cf11f426bbd41c4f81a31c348?format=webp&width=400" },
  { label: "Tablets", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F94fe3d4c825842839ba8c6cf6af93776?format=webp&width=400" },
  { label: "Smartwatches", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff81dd5d574034f448030235941c9a382?format=webp&width=400" },
  { label: "Monitors", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f0652d842da40c0b9cd4cd6cee3d4f2?format=webp&width=400" },
  { label: "Desktops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=400" },
  { label: "Components", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4d485c509a0d4f2b8dded2d4c8f823fd?format=webp&width=400" },
  { label: "Gaming Laptops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75c537b0d15f436c8c1c4fff836b3dbc?format=webp&width=400" },
  { label: "Camera & Accessories", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=400" },
  { label: "Computer Accessories", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2af8b780c7fa41c89d7acdf153fac824?format=webp&width=400" },
  { label: "Home Audio", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=400" },
  { label: "Stationery", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7e8a3c5a69fc430593c8293279c45800?format=webp&width=400" },
  { label: "Musical Instruments", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3d27c28ba0b546c3b107c8d28491424c?format=webp&width=400" },
  { label: "Storage", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2cab0399bb434ebcb3b79e6eed1ce19f?format=webp&width=400" },
];

function Tile({ label, img }: Item) {
  return (
    <button className="group flex flex-col items-center w-24 sm:w-28">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center ring-1 ring-black/5 shadow-sm">
        <img src={img} alt={label} className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform group-hover:scale-105" />
      </div>
      <div className="mt-2 text-[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2">{label}</div>
    </button>
  );
}

export default function ElectronicsCategoryIcons() {
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-lg font-semibold mb-3">Shop by category</h4>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4">
        {ITEMS.map((it, idx) => (
          <Tile key={`${it.label}-${idx}`} label={it.label} img={it.img} />
        ))}
      </div>
    </div>
  );
}
