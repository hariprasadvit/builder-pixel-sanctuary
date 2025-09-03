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
        <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 group">
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3d1ca99df5a54f6db7892011efe5405e?format=webp&width=1440"
              alt="UK Fashion Trends"
              className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="shine-strip animate-shine z-10" />
          </div>
          <div className="absolute right-4 top-3 flex items-center gap-2 text-white/90">
            <span className="px-2 py-1 bg-black/30 rounded-md text-xs font-semibold">{String(h).padStart(2, '0')}</span>:
            <span className="px-2 py-1 bg-black/30 rounded-md text-xs font-semibold">{String(m).padStart(2, '0')}</span>:
            <span className="px-2 py-1 bg-black/30 rounded-md text-xs font-semibold">{String(s).padStart(2, '0')}</span>
            <Button size="sm" variant="secondary" className="ml-2 bg-white text-gray-900 hover:bg-white/90">Shop Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
