import React, { useMemo } from "react";

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
          <div className="relative bg-gradient-to-r from-[#0b3b8f] via-[#2a56cc] to-[#d32f2f] animate-gradient-x text-white">
            {/* decorative glows */}
            <div className="pointer-events-none absolute -top-16 -left-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl animate-bounce">🇬🇧</span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">UK Deals</h3>
                  <p className="text-white/90 text-sm md:text-base">Hand‑picked offers available in the UK — limited time.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(h).padStart(2, '0')}</span>:
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(m).padStart(2, '0')}</span>:
                <span className="px-2 py-1 bg-white/15 rounded-md">{String(s).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
