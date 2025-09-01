import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TikTokVideoCard, { type TikTokVideo } from "./TikTokVideoCard";
import { ArrowRight } from "lucide-react";

interface HybridHeroProps {
  featuredVideo?: TikTokVideo;
}

export default function HybridHero({ featuredVideo }: HybridHeroProps) {
  // Default featured video if none provided
  const defaultVideo: TikTokVideo = {
    id: "hero-video",
    title: "iPhone 16 Pro Max - Camera Control Demo",
    price: 999.99,
    originalPrice: 1099.99,
    youtubeId: "HfiEy9Rh2cQ",
    vendor: "TechReviewer",
    vendorAvatar: "",
    productId: "iphone-16-pro",
    likes: 25400,
    comments: 524,
    shares: 189,
    liked: false,
    badge: "Hot Deal"
  };

  const video = featuredVideo || defaultVideo;

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Desktop: Split Layout */}
      <div className="hidden md:flex h-[600px]">
        {/* Left: Promotional Banner */}
        <div className="flex-1 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-xl text-center text-white space-y-6">
              <Badge className="bg-yellow-400 text-black font-bold mb-4 animate-pulse">
                🔥 FLASH SALE
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Summer
                <br />
                <span className="text-yellow-300">Mega Sale</span>
              </h1>
              
              <p className="text-xl lg:text-2xl opacity-90">
                Up to 70% off on trending products
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="bg-white/20 px-3 py-2 rounded-full">
                  <span className="font-bold">48</span> Hours
                </div>
                <div className="bg-white/20 px-3 py-2 rounded-full">
                  <span className="font-bold">23</span> Minutes  
                </div>
                <div className="bg-white/20 px-3 py-2 rounded-full">
                  <span className="font-bold">59</span> Seconds
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full transition-all transform hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Right: TikTok Video */}
        <div className="w-80 bg-black flex items-center justify-center p-4">
          <TikTokVideoCard 
            video={video}
            className="h-full max-h-[560px] w-full"
            autoplay={true}
          />
        </div>
      </div>

      {/* Mobile: Stacked Layout */}
      <div className="md:hidden">
        {/* Banner First */}
        <div className="h-80 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full flex items-center justify-center p-6">
            <div className="text-center text-white space-y-4">
              <Badge className="bg-yellow-400 text-black font-bold animate-pulse">
                🔥 FLASH SALE
              </Badge>
              
              <h1 className="text-3xl font-bold leading-tight">
                Summer
                <br />
                <span className="text-yellow-300">Mega Sale</span>
              </h1>
              
              <p className="text-lg opacity-90">
                Up to 70% off on trending products
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs">
                <div className="bg-white/20 px-2 py-1 rounded-full">
                  <span className="font-bold">48</span>h
                </div>
                <div className="bg-white/20 px-2 py-1 rounded-full">
                  <span className="font-bold">23</span>m  
                </div>
                <div className="bg-white/20 px-2 py-1 rounded-full">
                  <span className="font-bold">59</span>s
                </div>
              </div>
              
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-full"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Below */}
        <div className="h-96 bg-black flex items-center justify-center p-4">
          <div className="w-64 h-full">
            <TikTokVideoCard 
              video={video}
              className="h-full w-full"
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
