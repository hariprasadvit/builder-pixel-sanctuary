import React from "react";

export default function AnnouncementStrip() {
  const items = [
    "FREE SHIPPING ON ALL ORDERS ABOVE ₹299",
    "SALE IS LIVE!",
  ];
  return (
    <div className="w-full bg-gradient-to-r from-teal-200 via-purple-200 to-teal-200">
      <div className="overflow-hidden whitespace-nowrap h-9 flex items-center">
        <div className="flex items-center gap-12 animate-marquee will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 pr-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={`${dup}-${i}`} className="text-emerald-900 text-xs font-semibold tracking-wide uppercase">
                  {items[i % items.length]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
