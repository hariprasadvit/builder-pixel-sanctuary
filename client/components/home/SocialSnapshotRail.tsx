import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

type CardData = {
  title: string;
  price: string; // keep string for currency formatting provided
  mrp: string;
  discountPct: number;
  couponCode: string;
  pullQuote: string;
  chips: [string, string, string];
  imageUrl: string;
  avatarUrls: [string, string, string, string];
};

const FALLBACK = "/placeholder.svg";

const CARDS: CardData[] = [
  {
    title: "RikyBook 14 (8GB/512)",
    pullQuote: "Great battery for classes and calls.",
    chips: ["Student-favorite", "All-day battery", "Lightweight"],
    price: "₹34,999",
    mrp: "₹43,999",
    discountPct: 20,
    couponCode: "RIKY300",
    imageUrl: "/images/laptop-9x16.jpg",
    avatarUrls: ["/img/a1.jpg", "/img/a2.jpg", "/img/a3.jpg", "/img/a4.jpg"],
  },
  {
    title: "AeroBuds ANC",
    pullQuote: "Comfy seal, clean mids for commutes.",
    chips: ["Commute-ready", "Comfort fit", "Quick charge"],
    price: "₹1,999",
    mrp: "₹2,899",
    discountPct: 31,
    couponCode: "SOUND200",
    imageUrl: "/images/buds-9x16.jpg",
    avatarUrls: ["/img/b1.jpg", "/img/b2.jpg", "/img/b3.jpg", "/img/b4.jpg"],
  },
  {
    title: "Hydra Flask 1L",
    pullQuote: "Stays cool through a full day out.",
    chips: ["Leak-proof", "24h cold", "BPA-free"],
    price: "₹1,299",
    mrp: "₹1,499",
    discountPct: 13,
    couponCode: "HYDRA50",
    imageUrl: "/images/bottle-9x16.jpg",
    avatarUrls: ["/img/c1.jpg", "/img/c2.jpg", "/img/c3.jpg", "/img/c4.jpg"],
  },
];

function Facepile({ urls, altPrefix }: { urls: string[]; altPrefix: string }) {
  return (
    <div className="flex -space-x-2">
      {urls.slice(0, 4).map((u, i) => (
        <img
          key={i}
          src={u}
          alt={`${altPrefix} ${i + 1}`}
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK)}
          className="w-6 h-6 rounded-full ring-2 ring-white object-cover"
        />
      ))}
    </div>
  );
}

function SnapshotCard({ data }: { data: CardData }) {
  return (
    <article className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-3 flex flex-col h-[360px] focus-within:ring-2">
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <Facepile urls={data.avatarUrls} altPrefix={`${data.title} avatar`} />
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">AI quick take</span>
      </div>
      {/* Main content */}
      <div className="flex gap-3 flex-1">
        {/* Left media 40% */}
        <div className="basis-2/5 shrink-0">
          <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={data.imageUrl}
              alt={`${data.title} photo 9:16`}
              onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK)}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        {/* Right details 60% */}
        <div className="basis-3/5 flex flex-col min-w-0">
          <h3 className="text-[16px] font-semibold leading-tight line-clamp-2">{data.title}</h3>
          <div className="text-sm text-gray-700 mt-1 mb-1"><span aria-hidden>★★★★☆</span> 4.6 <span className="text-gray-400">—</span></div>
          <p className="italic text-[13px] text-gray-700 leading-snug line-clamp-2">{data.pullQuote}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {data.chips.map((c, i) => (
              <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700">{c}</span>
            ))}
          </div>
          {/* Price strip */}
          <div className="mt-auto pt-3 border-t border-dashed border-gray-200 text-sm flex items-center gap-2 whitespace-nowrap">
            <span className="font-semibold text-gray-900">{data.price}</span>
            <span className="text-gray-400 line-through text-xs">{data.mrp}</span>
            <span className="text-emerald-600 text-xs font-medium">{data.discountPct}% off</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">{data.couponCode}</span>
          </div>
        </div>
      </div>
      {/* CTA row */}
      <div className="mt-3 grid grid-cols-[1fr,auto,auto] gap-2">
        <Button aria-label="Add to Cart" className="h-9 text-white bg-black hover:bg-gray-900">Add to Cart</Button>
        <Button aria-label="View details" variant="ghost" className="h-9">View details</Button>
        <Button aria-label="Save item" variant="outline" className="h-9 px-3"><Heart className="w-4 h-4" /></Button>
      </div>
    </article>
  );
}

export default function SocialSnapshotRail() {
  return (
    <section aria-label="Social Snapshot Rail" className="py-8">
      <div className="max-w-[1200px] mx-auto px-6 py-8 rounded-xl shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-[#e6ecf7]/60 to-[#fde7e7]/60">
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-900">Trending picks</h5>
          <p className="text-xs text-gray-600">What people vibe with</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((c, i) => (
            <SnapshotCard key={i} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
