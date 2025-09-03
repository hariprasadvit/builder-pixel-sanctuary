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
              <div className="relative flex-1" style={{ background: "radial-gradient(120% 100% at 25% 50%, rgba(255,255,255,0.14), transparent 55%), #CF1020" }}>
                {/* Ghosted Union Jack rays with subtle motion */}
                <svg className="pointer-events-none absolute inset-0 opacity-10 uk-drift" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                </svg>
              </div>
              <div className="relative flex-1" style={{ background: "radial-gradient(120% 100% at 75% 50%, rgba(255,255,255,0.12), transparent 55%), #003170" }} />
            </div>

            {/* Center lightning bolt overlapping both sides */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-40 md:w-40 md:h-64 drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] bolt-strike"
              viewBox="0 0 64 96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFDF7E" />
                  <stop offset="100%" stopColor="#FFC83A" />
                </linearGradient>
              </defs>
              <g transform="rotate(8,32,48)">
                <path d="M40 0 L0 56 H24 L14 96 L64 40 H40 Z" fill="url(#boltGrad)" stroke="#C58A00" strokeWidth="2" />
              </g>
            </svg>

            {/* Left content */}
            <div className="absolute inset-y-0 left-0 z-10 w-full md:w-1/2 flex items-center justify-center md:justify-start px-6 md:px-8">
              <div className="w-full flex flex-col items-center md:items-start justify-center text-center md:text-left gap-2">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* St George's Cross pill icon */}
                  <span className="inline-flex items-center rounded-full bg-white/90 ring-2 ring-white/70 px-2 py-1 shadow-sm">
                    <svg aria-hidden viewBox="0 0 60 24" className="w-8 h-3">
                      <rect width="60" height="24" fill="#ffffff" />
                      <rect x="26" width="8" height="24" fill="#CF1020" />
                      <rect y="8" width="60" height="8" fill="#CF1020" />
                    </svg>
                  </span>
                  <h3 className="text-4xl md:text-6xl font-extrabold tracking-widest text-[#FFD700]" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.85)", textShadow: "0 2px 4px rgba(0,0,0,0.4), 0 8px 18px rgba(0,0,0,0.35)" }}>
                    FLASH SALE
                  </h3>
                </div>
                {/* Urgency hooks */}
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2 text-[11px] font-semibold text-white">
                  {[
                    "Hurry! Limited Time Only",
                    "Ends Soon ⏳",
                    "Grab Before It’s Gone",
                  ].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-[1px]">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Category highlights */}
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2 text-[11px] font-medium text-white/95">
                  {[
                    "Big Savings on Top UK Brands",
                    "Exclusive Online Offers",
                  ].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right copy */}
            <div className="absolute inset-y-0 right-0 z-10 w-full md:w-1/2 flex items-center justify-center md:justify-end px-6 md:px-8">
              <div className="w-full md:w-auto text-right text-white space-y-2">
                <div className="uppercase tracking-[0.3em] text-white/85 text-xs md:text-sm">Best Offer</div>
                <div className="mt-1 text-2xl md:text-4xl font-extrabold text-[#FFF7DC] drop-shadow-sm">
                  Prices reduced by <span className="text-[#FFD35C]">30%</span>
                </div>
                <div className="mt-3 flex justify-end gap-3">
                  <Button className="bg-[#CF1020] hover:bg-[#b40e1c] text-white shadow-lg">Shop UK Deals</Button>
                  <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10">Save More, Shop More</Button>
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
