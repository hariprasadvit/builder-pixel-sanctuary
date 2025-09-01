import React from "react";
import { VideoPlaceholder, BRAND_GRADIENT } from "@/components/ui/placeholders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingVideo {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  likes: number;
  comments: number;
  views: number;
}

interface TrendingCarouselProps {
  videos?: TrendingVideo[];
}

export default function TrendingCarousel({ videos = [] }: TrendingCarouselProps) {
  // Default placeholder videos to ensure consistent layout
  const defaultVideos: TrendingVideo[] = [
    {
      id: "1",
      title: "Latest Tech Gadget Review",
      price: 299.99,
      originalPrice: 399.99,
      badge: "Hot Deal",
      likes: 15400,
      comments: 324,
      views: 89000
    },
    {
      id: "2", 
      title: "Summer Fashion Haul",
      price: 79.99,
      originalPrice: 119.99,
      badge: "Trending",
      likes: 22100,
      comments: 567,
      views: 156000
    },
    {
      id: "3",
      title: "Home Decor DIY Tips",
      price: 149.99,
      badge: "New",
      likes: 8900,
      comments: 156,
      views: 45000
    },
    {
      id: "4",
      title: "Fitness Equipment Demo",
      price: 199.99,
      originalPrice: 299.99,
      badge: "50% OFF",
      likes: 12800,
      comments: 298,
      views: 67000
    },
    {
      id: "5",
      title: "Kitchen Gadget Unboxing",
      price: 89.99,
      badge: "Best Seller",
      likes: 18600,
      comments: 412,
      views: 123000
    }
  ];

  // Use provided videos or fill with defaults to ensure 5 cards
  const displayVideos = [...videos];
  while (displayVideos.length < 5) {
    const defaultVideo = defaultVideos[displayVideos.length % defaultVideos.length];
    displayVideos.push({
      ...defaultVideo,
      id: `placeholder-${displayVideos.length}`
    });
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6">
          <div className={`h-1 w-full rounded bg-gradient-to-r from-[#1976d2] to-[#64b5f6] mb-3`}></div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              🔥 Trending Videos
            </h2>
          </div>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            View All
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full w-10 h-10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Cards Grid - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-12">
            {displayVideos.slice(0, 5).map((video, index) => (
              <div key={video.id} className="w-full">
                <VideoPlaceholder
                  title={video.title}
                  price={video.price}
                  originalPrice={video.originalPrice}
                  badge={video.badge}
                  likes={video.likes}
                  comments={video.comments}
                  views={video.views}
                  cardHeight={420}
                  mediaHeight={240}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel - Shows 2 cards on mobile */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4">
            {displayVideos.map((video) => (
              <div key={`mobile-${video.id}`} className="flex-shrink-0 w-48">
                <VideoPlaceholder
                  title={video.title}
                  price={video.price}
                  originalPrice={video.originalPrice}
                  badge={video.badge}
                  likes={video.likes}
                  comments={video.comments}
                  views={video.views}
                  cardHeight={420}
                  mediaHeight={240}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
