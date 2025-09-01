import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import TikTokVideoCard, { type TikTokVideo } from "./TikTokVideoCard";
import { Flame, Clock, ShoppingBag, TrendingUp } from "lucide-react";

interface DealProduct {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  soldToday?: number;
  stockLeft?: number;
}

interface HotDealsSectionProps {
  deals: DealProduct[];
  videos?: TikTokVideo[];
}

export default function HotDealsSection({ deals, videos = [] }: HotDealsSectionProps) {
  // Default video for demonstration
  const defaultVideo: TikTokVideo = {
    id: "deals-video",
    title: "Amazing Deal Alert!",
    price: 29.99,
    originalPrice: 59.99,
    youtubeId: "asaqTyqU9hU",
    vendor: "DealsHunter",
    likes: 5400,
    comments: 123,
    shares: 67,
    badge: "50% OFF"
  };

  const displayVideos = videos.length > 0 ? videos : [defaultVideo];

  // Create mixed content (products + videos)
  const mixedContent = [];
  let videoIndex = 0;

  deals.forEach((deal, index) => {
    mixedContent.push({ type: 'product', data: deal });
    
    // Insert video every 4th position
    if ((index + 1) % 4 === 0 && videoIndex < displayVideos.length) {
      mixedContent.push({ type: 'video', data: displayVideos[videoIndex] });
      videoIndex++;
    }
  });

  return (
    <section className="py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-red-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Hot Deals Today
            </h2>
            <Flame className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          
          {/* Countdown Timer */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Deals end in:</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="bg-white/20 px-2 py-1 rounded text-sm">23</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">59</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">42</span>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mixedContent.map((item, index) => {
            if (item.type === 'video') {
              const video = item.data as TikTokVideo;
              return (
                <div key={`video-${index}`} className="col-span-2 md:col-span-2 lg:col-span-2">
                  <TikTokVideoCard 
                    video={video} 
                    className="h-full max-h-80"
                    autoplay={false}
                  />
                </div>
              );
            } else {
              const deal = item.data as DealProduct;
              return (
                <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
                  <div className="relative">
                    {/* Discount Badge */}
                    <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse">
                      -{deal.discount}%
                    </Badge>
                    
                    {/* Stock indicator */}
                    {deal.stockLeft && deal.stockLeft <= 10 && (
                      <Badge className="absolute top-2 right-2 z-10 bg-yellow-500 text-black font-bold text-xs">
                        Only {deal.stockLeft} left!
                      </Badge>
                    )}

                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={deal.image} 
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='14'%3EDeal Item%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-black hover:bg-gray-100 rounded-full">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Quick Buy
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{deal.title}</h3>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">£{deal.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through">£{deal.originalPrice.toFixed(2)}</span>
                      </div>
                      
                      {deal.soldToday && (
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-medium">{deal.soldToday}+ sold today</span>
                        </div>
                      )}
                    </div>

                    {/* Progress bar for stock */}
                    {deal.stockLeft && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Stock level</span>
                          <span>{deal.stockLeft} left</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(10, (deal.stockLeft / 50) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            }
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            <Flame className="w-5 h-5 mr-2" />
            View All Hot Deals
          </Button>
        </div>
      </div>
    </section>
  );
}
