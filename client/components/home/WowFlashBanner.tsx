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

            {/* UK Memphis elements */}
            <div className="pointer-events-none absolute inset-0 opacity-15">
              <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                <rect x="0" y="12" width="60" height="6" fill="#FFF"/>
                <rect x="0" y="13.5" width="60" height="3" fill="#C8102E"/>
                <rect x="27" y="0" width="6" height="30" fill="#FFF"/>
                <rect x="28.5" y="0" width="3" height="30" fill="#C8102E"/>
              </svg>
            </div>
            <div className="pointer-events-none absolute left-6 top-6 w-10 h-10 rotate-12 opacity-40">
              <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
              </svg>
            </div>
            <div className="pointer-events-none absolute right-8 bottom-6 w-8 h-8 -rotate-6 opacity-40">
              <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold uppercase tracking-widest">
                <span>⚡ Flash Sale</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">Up to 80% OFF — Limited Time!</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
