import React from "react";
import { ProductPlaceholder, VideoPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function NewArrivalsMasonry() {
  const items = Array.from({ length: 10 }).map((_, i) => ({ id: i, type: i % 3 === 0 ? "video" : "product" }));
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="New Arrivals" icon="🆕" />
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[1fr]">
            {items.map((it, i) => (
              <div key={it.id} className={`${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                {it.type === 'video' ? (
                  <VideoPlaceholder aspect={i % 5 === 0 ? '16/9' : '9/16'} title="Just In Video" price={99.99} originalPrice={129.99} badge={i % 2 ? 'Exclusive' : 'Just In'} likes={2100} comments={60} views={9800} />
                ) : (
                  <ProductPlaceholder title="Just In Product" price={49.99} originalPrice={69.99} badge={i % 2 ? 'Exclusive' : 'Just In'} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
