import React from "react";

export default function WowFlashBanner() {

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Animated gradient background matching theme */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 animate-gradient-x text-white p-6 md:p-10">
            {/* Subtle glows */}
            <div className="pointer-events-none absolute -top-12 -left-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-cyan-300/20 blur-3xl" />

            {/* Memphis shapes (no flags to avoid stretching) */}
            <div className="pointer-events-none absolute inset-0 opacity-15">
              <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x="10" y="14" width="80" height="2" fill="url(#g)" />
                <rect x="0" y="8" width="40" height="1.5" fill="url(#g)" />
                <rect x="60" y="22" width="40" height="1.5" fill="url(#g)" />
              </svg>
            </div>
            <div className="pointer-events-none absolute left-6 top-6 w-10 h-10 rotate-12 opacity-30">
              <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2 L22 11 L13 20 L13 14 L2 14 L2 8 L13 8 Z" fill="white"/>
              </svg>
            </div>
            <div className="pointer-events-none absolute right-8 bottom-6 w-8 h-8 -rotate-6 opacity-30">
              <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-widest bg-white/20 rounded-full px-3 py-1">
                <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-5 h-2.5">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                  <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                  <rect x="0" y="12" width="60" height="6" fill="#FFF"/>
                  <rect x="0" y="13.5" width="60" height="3" fill="#C8102E"/>
                  <rect x="27" y="0" width="6" height="30" fill="#FFF"/>
                  <rect x="28.5" y="0" width="3" height="30" fill="#C8102E"/>
                </svg>
                <span>UK Flash Sale</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">Up to 80% OFF — Limited Time!</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
