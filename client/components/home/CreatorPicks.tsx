import React from "react";
import { VideoPlaceholder, AvatarPlaceholder, SectionHeader, ProductPlaceholder } from "@/components/ui/placeholders";

function CreatorCard({ username }: { username: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <VideoPlaceholder aspect="9/16" title="Creator Pick Video" price={129.99} originalPrice={169.99} badge="Trending" likes={8900} comments={234} views={56000} />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <AvatarPlaceholder size={36} />
          <div>
            <p className="font-semibold text-sm">@{username}</p>
            <p className="text-xs text-gray-500">Creator Picks</p>
          </div>
        </div>
        <ProductPlaceholder title="Linked Product" price={59.99} originalPrice={89.99} />
      </div>
    </div>
  );
}

export default function CreatorPicks() {
  const creators = ["alex", "maria", "jordan", "taylor"];
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="Creator Picks" icon="✨" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((u) => (
              <CreatorCard key={u} username={u} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
