import React from "react";

type Item = { label: string; img: string };

const ITEMS: Item[] = [
  { label: "Laptops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcdf61166a7e542d8b8b7f2f79ee98087?format=webp&width=400" },
  { label: "Headphones", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F53f1cde843cf4149a5356c5eb0e5f22d?format=webp&width=400" },
  { label: "Tablets", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4c070c2a60f04373878a4f3075a8fa0d?format=webp&width=400" },
  { label: "Smartwatches", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faef412737f194027a9e462cccc1a299a?format=webp&width=400" },
  { label: "Monitors", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc78747e886f34abc86089494a51a40db?format=webp&width=400" },
  { label: "Desktops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F66a3943191854e6fbaf66b5a9485c8d3?format=webp&width=400" },
  { label: "Components", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F142f6629751e4b4fbbb757c64c95efa0?format=webp&width=400" },
  { label: "Gaming Laptops", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5cb8729abfe64eef9035fd736de2a841?format=webp&width=400" },
  { label: "Camera & Accessories", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F11eac4eaaf584cf5af38815aa012b833?format=webp&width=400" },
  { label: "Computer Accessories", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe85e1a4d4b9f49078678de53845993a5?format=webp&width=400" },
  { label: "Home Audio", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe371e1250f3a4826af0c9cf91b40f183?format=webp&width=400" },
  { label: "Stationery", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe1f48ca4080f4d7c91eda0f1cdee1ec2?format=webp&width=400" },
  { label: "Musical Instruments", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7d2dfaa151034786ae68f0a69d08c71a?format=webp&width=400" },
  { label: "Storage", img: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fac07c6a6862544efa6c1ef1baf3bb4da?format=webp&width=400" },
];

function Tile({ label, img }: Item) {
  return (
    <button className="group relative flex flex-col items-center w-24 sm:w-28 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="rounded-full p-[2px] bg-gradient-to-tr from-sky-300/40 via-fuchsia-300/40 to-amber-300/40 group-hover:from-sky-400/70 group-hover:via-fuchsia-400/70 group-hover:to-amber-400/70 transition-colors">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center ring-1 ring-black/5 shadow-sm">
          <img src={img} alt={label} className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-200 group-hover:scale-105" />
        </div>
      </div>
      <div className="mt-2 text-[11px] sm:text-xs leading-tight text-gray-800 text-center line-clamp-2 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0b3b8f] group-hover:to-[#d32f2f] font-medium">{label}</div>
    </button>
  );
}

export default function ElectronicsCategoryIcons() {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base md:text-lg font-semibold bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f] bg-clip-text text-transparent">
          Shop by category
        </h4>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-blue-50 to-rose-50">
        <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4">
            {ITEMS.map((it, idx) => (
              <Tile key={`${it.label}-${idx}`} label={it.label} img={it.img} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
