import React from "react";

export default function AnnouncementStrip() {
  const items = [
    "FREE SHIPPING ON ALL ORDERS ABOVE £299",
    "SALE IS LIVE!",
  ];
  return (
    <>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div className="w-full bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200">
        <div className="overflow-hidden whitespace-nowrap h-9 flex items-center">
          <div className="flex items-center gap-12 will-change-transform" style={{ animation: "ticker 18s linear infinite" }}>
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
    </>
  );
}
