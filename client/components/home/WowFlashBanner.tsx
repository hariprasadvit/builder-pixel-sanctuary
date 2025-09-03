import React from "react";
import { Button } from "@/components/ui/button";

export default function WowFlashBanner() {
  return (
    <section className="py-6">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="grid grid-cols-12 min-h-[180px] md:min-h-[260px]">
              {/* Left: England red with faint Union Jack geometry and headline */}
              <div className="relative col-span-12 md:col-span-5 flex items-center justify-center md:justify-start bg-[#CF1020] p-6 md:p-8">
                {/* Faint Union Jack geometry */}
                <svg className="pointer-events-none absolute inset-0 opacity-10" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                  <rect width="60" height="30" fill="#CF1020"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#ffffff" strokeWidth="6"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                  <rect x="0" y="12" width="60" height="6" fill="#ffffff"/>
                  <rect x="27" y="0" width="6" height="30" fill="#ffffff"/>
                </svg>

                <div className="relative z-10 flex items-center gap-3 md:gap-4">
                  {/* St George's Cross badge */}
                  <svg aria-hidden viewBox="0 0 60 60" className="w-8 h-8 md:w-10 md:h-10 rounded shadow ring-2 ring-white/60">
                    <rect width="60" height="60" fill="#ffffff" />
                    <rect x="24" width="12" height="60" fill="#CF1020" />
                    <rect y="24" width="60" height="12" fill="#CF1020" />
                  </svg>
                  <h3
                    className="text-3xl md:text-5xl font-extrabold text-[#F9E27D] drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]"
                    style={{ textShadow: "0 3px 0 rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.25)" }}
                  >
                    FLASH SALE
                  </h3>
                </div>
              </div>

              {/* Center: Lightning bolt overlapping panels */}
              <div className="relative col-span-12 md:col-span-2 bg-transparent">
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-40 md:w-36 md:h-56 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
                  viewBox="0 0 64 96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFE68C" />
                      <stop offset="100%" stopColor="#FFC331" />
                    </linearGradient>
                  </defs>
                  <path d="M40 0 L0 56 H24 L14 96 L64 40 H40 Z" fill="url(#boltGrad)" stroke="#E6A400" strokeWidth="2" />
                </svg>
                {/* Spark/star bursts */}
                <svg className="absolute left-6 top-4 w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" fill="#fff"/>
                </svg>
                <svg className="absolute right-6 bottom-4 w-3 h-3 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3 L13 8 L18 9 L13 10 L12 15 L11 10 L6 9 L11 8 Z" fill="#fff"/>
                </svg>
              </div>

              {/* Right: Royal blue panel with copy and CTA */}
              <div className="relative col-span-12 md:col-span-5 flex items-center justify-center md:justify-start bg-[#0B3B8F] p-6 md:p-8 text-white">
                <div className="max-w-xl">
                  <div className="text-xs md:text-sm tracking-widest uppercase text-white/80">Best Offer</div>
                  <div className="mt-1 text-2xl md:text-4xl font-extrabold text-[#FFF7DC] drop-shadow-sm">
                    Up to <span className="text-[#FFD35C]">30% OFF</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Button className="bg-[#CF1020] hover:bg-[#b40e1c] text-white shadow-lg">Shop UK Deals</Button>
                  </div>
                  <div className="mt-2 text-[11px] md:text-xs text-white/70">*T&Cs apply</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
