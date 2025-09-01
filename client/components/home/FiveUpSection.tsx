import React from "react";
import { SectionHeader, VideoPlaceholder, ProductPlaceholder } from "@/components/ui/placeholders";

interface FiveUpSectionProps {
  title: string;
  icon?: string;
  badge?: string;
  gradientClass?: string;
}

export default function FiveUpSection({ title, icon, badge, gradientClass }: FiveUpSectionProps) {
  const cardHeight = 420;
  const mediaHeight = 240;
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <SectionHeader title={title} icon={icon} gradientClass={gradientClass} textClass="text-gray-900" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <VideoPlaceholder title={`${title} Feature Video`} price={89.99} originalPrice={109.99} badge={badge || "Hot Deal"} likes={3200} comments={64} views={16000} cardHeight={cardHeight} mediaHeight={mediaHeight} />
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductPlaceholder key={i} title={`${title} Product ${i+1}`} price={49.99 + i * 10} originalPrice={69.99 + i * 10} badge={i % 2 ? "Just In" : "Exclusive"} cardHeight={cardHeight} mediaHeight={mediaHeight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
