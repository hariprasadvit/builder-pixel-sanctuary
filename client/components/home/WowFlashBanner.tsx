import React from "react";
import { Button } from "@/components/ui/button";

export default function WowFlashBanner() {
  return (
    <section className="py-6">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl shadow-lg min-h-[200px] md:min-h-[280px]">
            {/* Split background panels (no gap) */}
            <div className="absolute inset-0 flex">
              <div className="relative flex-1" style={{ background: "radial-gradient(120% 100% at 25% 50%, rgba(255,255,255,0.18), transparent 55%), #CF1020" }}>
                {/* Ghosted Union Jack rays */}
                <svg className="pointer-events-none absolute inset-0 opacity-10" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                </svg>
              </div>
              <div className="relative flex-1" style={{ background: "radial-gradient(120% 100% at 75% 50%, rgba(255,255,255,0.12), transparent 55%), #0B3B8F" }} />
            </div>

            {/* Center lightning bolt overlapping both sides */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 w-28 h-40 md:w-40 md:h-64 drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] bolt-strike"
              viewBox="0 0 64 96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFEFA3" />
                  <stop offset="100%" stopColor="#FFC331" />
                </linearGradient>
              </defs>
              <path d="M40 0 L0 56 H24 L14 96 L64 40 H40 Z" fill="url(#boltGrad)" stroke="#E6A400" strokeWidth="2" />
            </svg>

            {/* Left content */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-8">
              <div className="w-1/2">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* St George's Cross pill icon */}
                  <span className="inline-flex items-center rounded-full bg-white/90 ring-2 ring-white/70 px-2 py-1 shadow-sm">
                    <svg aria-hidden viewBox="0 0 60 24" className="w-8 h-3">
                      <rect width="60" height="24" fill="#ffffff" />
                      <rect x="26" width="8" height="24" fill="#CF1020" />
                      <rect y="8" width="60" height="8" fill="#CF1020" />
                    </svg>
                  </span>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-[#F9E27D]" style={{ textShadow: "0 2px 0 #b40e1c, 0 6px 14px rgba(0,0,0,0.35)" }}>
                    FLASH SALE
                  </h3>
                </div>
              </div>
            </div>

            {/* Right copy */}
            <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-8">
              <div className="w-1/2 text-right text-white">
                <div className="uppercase tracking-[0.3em] text-white/85 text-xs md:text-sm">Best Offer</div>
                <div className="mt-1 text-2xl md:text-4xl font-extrabold text-[#FFF7DC] drop-shadow-sm">
                  Up to <span className="text-[#FFD35C]">30% OFF</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button className="bg-[#CF1020] hover:bg-[#b40e1c] text-white shadow-lg">Shop UK Deals</Button>
                </div>
                <div className="mt-1 text-[11px] md:text-xs text-white/75">*T&Cs apply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
