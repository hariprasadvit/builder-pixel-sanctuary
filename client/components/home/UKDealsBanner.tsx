import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";

function useCountdown(target: number) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export default function UKDealsBanner() {
  const end = useMemo(() => Date.now() + 3 * 60 * 60 * 1000, []);
  const { h, m, s } = useCountdown(end);

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
          <div className="relative bg-gradient-to-r from-[#0b3b8f] via-[#1e3a8a] to-[#d32f2f] animate-gradient-x text-white">
            {/* decorative glows */}
            <div className="pointer-events-none absolute -top-16 -left-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-blue-300/20 blur-3xl" />

            {/* Large Union Jack background emblem */}
            <div className="pointer-events-none absolute right-4 md:right-8 bottom-0 md:bottom-2 w-40 md:w-60 opacity-25 rotate-[-8deg] animate-fade-in-scale">
              <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                <rect x="0" y="12" width="60" height="6" fill="#FFF"/>
                <rect x="0" y="13.5" width="60" height="3" fill="#C8102E"/>
                <rect x="27" y="0" width="6" height="30" fill="#FFF"/>
                <rect x="28.5" y="0" width="3" height="30" fill="#C8102E"/>
              </svg>
            </div>

            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full ring-2 ring-white/70 bg-white overflow-hidden shadow-lg animate-fade-in-scale">
                    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect width="60" height="30" fill="#012169"/>
                      <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6"/>
                      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3"/>
                      <rect x="0" y="12" width="60" height="6" fill="#FFF"/>
                      <rect x="0" y="13.5" width="60" height="3" fill="#C8102E"/>
                      <rect x="27" y="0" width="6" height="30" fill="#FFF"/>
                      <rect x="28.5" y="0" width="3" height="30" fill="#C8102E"/>
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300 animate-ping" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">UK Deals</h3>
                  <p className="text-white/90 text-sm md:text-base">Hand‑picked offers available in the UK — limited time.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm md:text-base font-semibold">
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(h).padStart(2, '0')}</span>:
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(m).padStart(2, '0')}</span>:
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(s).padStart(2, '0')}</span>
                <Button variant="secondary" className="ml-2 bg-white text-gray-900 hover:bg-white/90">Shop UK Deals</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
