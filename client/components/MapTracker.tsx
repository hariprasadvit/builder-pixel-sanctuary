import React, { useEffect, useRef } from "react";

interface MapTrackerProps {
  status?: string;
}

export default function MapTracker({ status = "Courier en route" }: MapTrackerProps) {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let progress = 0;
    const el = dotRef.current;
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
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 70 C 40 10, 60 10, 90 70" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>
      <div ref={dotRef} className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-green-500 shadow-[0_0_0_6px_rgba(34,197,94,0.25)]" />
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
