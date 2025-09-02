import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

type Pack = {
  packTitle: string;
  tagline: string;
  vibeChips: [string, string];
  avatarUrls: [string, string, string, string];
  collage: [string, string, string, string];
  included: [string, string, string];
  packPriceText: string;
  savingsText: string;
};

const FALLBACK = "/placeholder.svg";

const PACKS: Pack[] = [
  {
    packTitle: "College Starter",
    tagline: "Lightweight gear that lasts all day.",
    vibeChips: ["Student", "Budget"],
    included: ["✓ 14″ Laptop", "✓ Backpack", "✓ Mouse"],
    packPriceText: "From ₹34,999",
    savingsText: "Save up to 18%",
    collage: ["/img/p1.jpg","/img/p2.jpg","/img/p3.jpg","/img/p4.jpg"],
    avatarUrls: ["/img/a1.jpg","/img/a2.jpg","/img/a3.jpg","/img/a4.jpg"],
  },
  {
    packTitle: "WFH Pro",
    tagline: "Clean desk, zero fuss, all focus.",
    vibeChips: ["WFH", "Minimal"],
    included: ["✓ Monitor", "✓ Keyboard", "✓ Lamp"],
    packPriceText: "From ₹19,999",
    savingsText: "Save up to 12%",
    collage: ["/img/q1.jpg","/img/q2.jpg","/img/q3.jpg","/img/q4.jpg"],
    avatarUrls: ["/img/b1.jpg","/img/b2.jpg","/img/b3.jpg","/img/b4.jpg"],
  },
  {
    packTitle: "Creator Kit",
    tagline: "Shoot, edit, share—on repeat.",
    vibeChips: ["Creator", "On-the-go"],
    included: ["✓ Tripod", "✓ Mic", "✓ Light"],
    packPriceText: "From ₹9,499",
    savingsText: "Save up to 15%",
    collage: ["/img/r1.jpg","/img/r2.jpg","/img/r3.jpg","/img/r4.jpg"],
    avatarUrls: ["/img/c1.jpg","/img/c2.jpg","/img/c3.jpg","/img/c4.jpg"],
  },
];

function Facepile({ urls, label }: { urls: string[]; label: string }) {
  return (
    <div className="flex -space-x-2" aria-label={label} role="img">
      {urls.map((u, i) => (
        <img
          key={i}
          src={u}
          alt={`${label} ${i + 1}`}
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK)}
          className="w-6 h-6 rounded-full ring-2 ring-white object-cover"
        />
      ))}
    </div>
  );
}

function NumberBadge({ n }: { n: number }) {
  return (
    <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white">{n}</span>
  );
}

function StarterCard({ p }: { p: Pack }) {
  return (
    <article className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-3 flex flex-col h-[380px]">
      {/* Top */}
      <div className="flex items-center justify-between mb-2">
        <Facepile urls={p.avatarUrls} label="people who love this pack" />
        <div className="flex items-center gap-1">
          {p.vibeChips.map((c, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{c}</span>
          ))}
        </div>
      </div>
      {/* Title + tagline */}
      <h3 className="text-[18px] font-semibold leading-tight line-clamp-2">{p.packTitle}</h3>
      <p className="italic text-[13px] text-gray-700 leading-snug line-clamp-2">{p.tagline}</p>
      {/* Collage */}
      <div className="mt-2 grid grid-cols-2 grid-rows-2 gap-2 h-36">
        {p.collage.map((src, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={src}
              alt={`${p.packTitle} item ${i + 1}`}
              onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK)}
              className="w-full h-full object-cover"
            />
            <NumberBadge n={i + 1} />
          </div>
        ))}
      </div>
      {/* Included list */}
      <ul className="mt-2 text-[13px] text-gray-800 space-y-0.5">
        {p.included.map((t, i) => (
          <li key={i} className="leading-tight">{t}</li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-0.5">+ more inside</p>
      {/* Price strip */}
      <div className="mt-auto pt-2 border-t border-dashed border-gray-200 text-sm flex items-center justify-between whitespace-nowrap">
        <span className="font-medium text-gray-900">Pack from {p.packPriceText}</span>
        <span className="text-xs text-emerald-600">{p.savingsText} vs buying solo</span>
      </div>
      {/* CTA */}
      <div className="mt-2 grid grid-cols-[1fr,auto,auto] gap-2">
        <Button aria-label="View Pack" className="h-9 text-white bg-black hover:bg-gray-900">View Pack</Button>
        <Button aria-label="See items" variant="ghost" className="h-9">See items</Button>
        <Button aria-label="Save pack" variant="outline" className="h-9 px-3"><Heart className="w-4 h-4" /></Button>
      </div>
    </article>
  );
}

export default function StarterPacksRail() {
  return (
    <section aria-label="Starter Packs — Social Bundles" className="py-8">
      <div className="w-full px-4 py-8 rounded-2xl shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-[#e6ecf7]/60 to-[#fde7e7]/60">
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-900">Starter Packs</h5>
          <p className="text-xs text-gray-600">Curated combos people love</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PACKS.map((p, i) => (
            <StarterCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
