import React, { useState } from "react";

export default function CategoryPills({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => setActive(it)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${active === it ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"}`}
          >
            {it}
          </button>
        ))}
      </div>
    </div>
  );
}
