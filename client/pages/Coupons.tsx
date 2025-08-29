import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Gift, ClipboardCopy, CreditCard } from "lucide-react";

type CouponType = "brand" | "category";

interface Coupon {
  id: string;
  title: string;
  code: string;
  type: CouponType;
  details: string;
  validTill: string;
  minPurchase?: string;
  brand?: string;
  category?: string;
}

const COUPONS: Coupon[] = [
  { id: "c1", title: "20% Off at Nike", code: "NIKE20", type: "brand", details: "Valid on footwear & apparel", validTill: "31 Dec 2025", minPurchase: "₹1999", brand: "Nike" },
  { id: "c2", title: "15% Off Electronics", code: "ELEC15", type: "category", details: "Mobiles, headphones, speakers", validTill: "30 Nov 2025", minPurchase: "₹999", category: "Electronics" },
  { id: "c3", title: "Flat ₹500 Off at Apple", code: "APPLE500", type: "brand", details: "On selected iPhones & iPads", validTill: "15 Oct 2025", minPurchase: "₹4999", brand: "Apple" },
  { id: "c4", title: "10% Off Fashion", code: "STYLE10", type: "category", details: "Clothing & accessories", validTill: "31 Aug 2025", category: "Fashion" },
];

function CouponCard({ c }: { c: Coupon }) {
  const grad = c.type === "brand" ? "from-orange-500 via-amber-500 to-yellow-500" : "from-emerald-500 via-green-500 to-lime-500";
  const leftStrip = `bg-gradient-to-b ${grad}`;
  // no corner badge; keep clean header
  const copy = async () => {
    try { await navigator.clipboard.writeText(c.code); } catch {}
  };
  return (
    <div className={`rounded-xl p-[1px] bg-gradient-to-r ${grad} bg-opacity-40`}>
      <Card className="relative overflow-hidden group rounded-[11px]">
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${leftStrip}`} />
        <div className="absolute -top-6 -right-8 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-2xl" aria-hidden />
        <CardContent className="p-5 relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold leading-snug">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.details} • Valid till {c.validTill}{c.minPurchase?` • Min purchase ${c.minPurchase}`:""}</p>
            </div>
            <Button onClick={copy} className="rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white transition-transform group-hover:scale-[1.02]">Copy Code</Button>
          </div>
          <div className="mt-3 text-sm"><span className="font-mono bg-gray-100 rounded px-2 py-1">{c.code}</span></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Coupons() {
  const [tab, setTab] = useState<"all"|CouponType>("all");
  const filtered = useMemo(() => tab === "all" ? COUPONS : COUPONS.filter(c=>c.type===tab), [tab]);
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-b">
        <div className="container mx-auto px-4 py-10 md:py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Grab Your Best Deals Today!</h1>
          <p className="text-gray-700">Discover exclusive codes from top brands and categories.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6">
        <Tabs value={tab} onValueChange={(v)=>setTab(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All Coupons</TabsTrigger>
            <TabsTrigger value="brand">Brand Coupons</TabsTrigger>
            <TabsTrigger value="category">Category Coupons</TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filtered.map((c)=> (
                <CouponCard key={c.id} c={c} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How to use */}
      <section className="border-t bg-gray-50/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <Info className="w-4 h-4" />
            </div>
            <h3 className="font-semibold">How to use a coupon</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Select</div>
                <div className="text-xs text-muted-foreground">Choose the best offer for your purchase.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center">
                <ClipboardCopy className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Copy Code</div>
                <div className="text-xs text-muted-foreground">Tap Copy and it’s saved to your clipboard.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Apply</div>
                <div className="text-xs text-muted-foreground">Paste the code at checkout to get the discount.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
