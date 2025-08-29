import React, { useEffect, useRef } from "react";

interface MapTrackerProps {
  status?: string;
}

export default function MapTracker({ status = "Courier en route" }: MapTrackerProps) {
  const bikeRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let progress = 0;
    const el = bikeRef.current;
    if (!el) return;
    const id = setInterval(() => {
      progress = (progress + 1) % 100;
      const t = progress / 100;
      const x = 10 + t * 80; // percentage path across the container
      const y = 70 - Math.sin(t * Math.PI) * 40; // simple arc
      el.style.left = x + "%";
      el.style.top = y + "%";
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-56 rounded-xl border bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue">
          <path d="M10 70 C 40 10, 60 10, 90 70" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>
      <img
        ref={bikeRef}
        src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F574ccb6392194037b522abdc39a4c3ab?format=webp&width=800"
        alt="Delivery bike"
        className="absolute -ml-4 -mt-6 w-10 h-10 object-contain drop-shadow-md select-none pointer-events-none"
        style={{ left: "10%", top: "70%" }}
      />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-700">
        <span className="px-2 py-1 rounded bg-white/80 border">Pickup</span>
        <span className="px-2 py-1 rounded bg-white/80 border">Destination</span>
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-white/80 border text-xs font-medium text-gray-800">
        {status}
      </div>
    </div>
  );
}
