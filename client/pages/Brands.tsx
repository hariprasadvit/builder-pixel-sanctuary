import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SAMPLE_CATALOG } from "@/lib/catalog";

export default function Brands() {
  const navigate = useNavigate();
  const brands = useMemo(() => Array.from(new Set(SAMPLE_CATALOG.map(p => p.brand))).sort((a,b)=>a.localeCompare(b)), []);
  const grouped = useMemo(() => {
    const map: Record<string,string[]> = {};
    for (const b of brands) {
      const k = b[0].toUpperCase();
      if (!map[k]) map[k] = [];
      map[k].push(b);
    }
    return map;
  }, [brands]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
        {Object.keys(grouped).sort().map(letter => (
          <div key={letter}>
            <div className="text-xs font-bold text-gray-500 mb-3">{letter}</div>
            <ul className="space-y-2">
              {grouped[letter].map(b => (
                <li key={b}>
                  <button
                    className="text-sm text-brand-blue hover:underline"
                    onClick={() => navigate(`/brands/${b.toLowerCase()}`)}
                  >
                    {b}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
