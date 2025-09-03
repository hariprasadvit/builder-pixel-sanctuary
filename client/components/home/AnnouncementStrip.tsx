import React from "react";

export default function AnnouncementStrip() {
  const items = [
    "FREE SHIPPING ON ALL ORDERS ABOVE £299",
    "SALE IS LIVE!",
  ];
  return (
    <>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div className="relative w-full bg-gradient-to-r from-[#CF1020] via-white to-[#003170]">
        {/* subtle dark overlay for contrast with darker center band */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-black/40 to-black/15" />
        <div className="overflow-hidden whitespace-nowrap h-9 flex items-center relative">
          <div className="flex items-center gap-12 will-change-transform" style={{ animation: "ticker 18s linear infinite" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-12 pr-12">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={`${dup}-${i}`} className="text-white text-[11px] font-semibold tracking-wide uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
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
