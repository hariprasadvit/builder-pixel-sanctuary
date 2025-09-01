import React from "react";
import TikTokVideoCard, { type TikTokVideo } from "./TikTokVideoCard";

interface SocialVideoStripProps {
  videos: TikTokVideo[];
  title?: string;
}

export default function SocialVideoStrip({ videos, title = "Trending Videos" }: SocialVideoStripProps) {
  return (
    <section className="py-4 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          🔥 {title}
        </h2>
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videos.map((video, index) => (
              <div key={video.id} className="flex-shrink-0 w-48">
                <TikTokVideoCard 
                  video={video} 
                  className="h-80"
                  autoplay={index === 0} // Only autoplay first video
                />
              </div>
            ))}
            
            {/* Show placeholders if not enough videos */}
            {videos.length < 8 && Array.from({ length: 8 - videos.length }).map((_, index) => (
              <div key={`placeholder-${index}`} className="flex-shrink-0 w-48 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2 opacity-50"></div>
                  <p className="text-sm">Video Placeholder</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll gradient indicators */}
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-purple-50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
