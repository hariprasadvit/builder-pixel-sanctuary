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

export default function WowFlashBanner() {
  const end = useMemo(() => Date.now() + 2 * 60 * 60 * 1000, []);
  const { h, m, s } = useCountdown(end);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Animated gradient background matching theme */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 animate-gradient-x text-white p-6 md:p-10">
            {/* Subtle glows */}
            <div className="pointer-events-none absolute -top-12 -left-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold uppercase tracking-widest">
                <span>⚡ Flash Sale</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-gray-900">Now On</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">Up to 80% OFF — Limited Time!</h3>
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
