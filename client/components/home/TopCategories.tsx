import React from "react";

const CATS = [
  { key: "electronics", title: "Electronics" },
  { key: "cellphones", title: "Cellphones" },
  { key: "clothing", title: "Clothing" },
  { key: "beauty", title: "Beauty" },
  { key: "home", title: "Home" },
  { key: "kitchen", title: "Kitchen" },
  { key: "sports", title: "Sports" },
  { key: "toys", title: "Toys" },
];

const PLACEHOLDER_BG =
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1e4915b6d1b54b8aa792300299b55c06?format=webp&width=800";
const CENTER_ICON =
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2ac39650cccf4f6c9cb9cae21e424deb?format=webp&width=800";

function CatTile({ title }: { title: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white">
      <div className="absolute inset-0">
        <img src={PLACEHOLDER_BG} alt={`${title} background`} className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 p-4 flex items-end justify-start h-32">
        <span className="bg-white/90 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow">
          {title}
        </span>
      </div>
    </div>
  );
}

function CenterTile() {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white flex items-center justify-center h-32">
      <img src={CENTER_ICON} alt="Electronics 3D icon" className="max-h-full max-w-full object-contain p-4" />
    </div>
  );
}

export default function TopCategories() {
  // Arrange around a center tile: 3x3 grid -> 8 categories + center
  const topRow = CATS.slice(0, 3);
  const middleLeft = CATS[3];
  const middleRight = CATS[4];
  const bottomRow = CATS.slice(5, 8);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topRow.map((c) => (
            <CatTile key={c.key} title={c.title} />
          ))}

          {middleLeft && <CatTile key={middleLeft.key} title={middleLeft.title} />}
          <CenterTile />
          {middleRight && <CatTile key={middleRight.key} title={middleRight.title} />}

          {bottomRow.map((c) => (
            <CatTile key={c.key} title={c.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
