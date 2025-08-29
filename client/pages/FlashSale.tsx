import React, { useEffect, useMemo, useState } from "react";
import { SAMPLE_CATALOG, CatalogProduct } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const CATEGORY_DISCOUNTS: Record<string, number> = {
  Phones: 0.15,
  Audio: 0.2,
  Wearables: 0.1,
  Laptops: 0.12,
  Tablets: 0.15,
  "Sports & Outdoors": 0.25,
  "Home & Garden": 0.2,
  default: 0.1,
};

function applyDiscount(p: CatalogProduct) {
  const d = CATEGORY_DISCOUNTS[p.category] ?? CATEGORY_DISCOUNTS.default;
  const original = p.price;
  const discounted = Math.max(0.01, Math.round(original * (1 - d) * 100) / 100);
  return { ...p, price: discounted, originalPrice: original, badge: `-${Math.round(d * 100)}%` } as any;
}

function useCountdown(endTs: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, endTs - now);
  const hh = Math.floor(diff / 3600000);
  const mm = Math.floor((diff % 3600000) / 60000);
  const ss = Math.floor((diff % 60000) / 1000);
  const ended = diff <= 0;
  const label = ended ? "Ended" : `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  return { diff, label, ended };
}

export default function FlashSale() {
  const saleEndsAt = useMemo(() => Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000, []); // ~2:45:30
  const { label, ended } = useCountdown(saleEndsAt);

  const categories = useMemo(() => ["All", ...Array.from(new Set(SAMPLE_CATALOG.map(p => p.category)))], []);
  const [tab, setTab] = useState("All");

  const discounted = useMemo(() => SAMPLE_CATALOG.map(applyDiscount), []);
  const filtered = useMemo(() => tab === "All" ? discounted : discounted.filter(p => p.category === tab), [tab, discounted]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">⚡ Flash Sale <span className="bg-yellow-400 text-black text-base px-2 py-1 rounded-full">LIVE</span></h1>
          <p className="opacity-90 mb-4">Hurry! Prices drop across categories. Sale ends in:</p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur">
            <span className="font-mono text-2xl">{label}</span>
          </div>
          {ended && <div className="mt-2 text-sm">Sale will refresh soon.</div>}
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap gap-2 p-1">
            {categories.map(c => (
              <TabsTrigger key={c} value={c} className="capitalize">{c}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4">
              {filtered.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} className="block">
                  <ProductCard
                    id={p.id}
                    image={p.image}
                    title={p.title}
                    price={p.price}
                    originalPrice={p.originalPrice || undefined}
                    rating={p.rating}
                    reviewCount={p.reviewCount}
                    origin={p.origin}
                    deliveryEta="Fast shipping"
                    badge={(p as any).badge}
                    saleEndsAt={saleEndsAt}
                  />
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
