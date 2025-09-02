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

  // Use provided videos or fill with defaults to ensure a dense masonry
  const displayVideos = [...videos];
  const minCount = 12;
  while (displayVideos.length < minCount) {
    const defaultVideo = defaultVideos[displayVideos.length % defaultVideos.length];
    displayVideos.push({
      ...defaultVideo,
      id: `placeholder-${displayVideos.length}`
    });
  }

  // Thumbnails provided by user for trending section
  const trendingThumbs = [
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F67dfa00b13204fcea48506c813867080?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F02d9bfda7a8c41ffb9793a9940ceebcd?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbf159baa56224ebeb8b89912dc8c136a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7797faedd6ee40429534a7becada3cc6?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdb9044c5945741e7808dbdf6d9d8d338?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3372363d95f644ada9060aff6bd41fcb?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe50abcb60e294c7eb67d46575cc08c61?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8c468283729e4012b7800dd96d803ed9?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6dbfc5ac1b1045dd9d871b7a060d9d6d?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe1bdfea0aacb4dc790c1ca031bc5e365?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F58583a4db325454dbede02b83c6ba13a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4d987a8a40224341adc77b189d534426?format=webp&width=800",
  ];
  const trendingTitles = [
    "Car Upgrades",
    "UK Toy Haul",
    "UK Fashion Finds",
    "Sports Gear Galore",
    "Samsung Mobile Innovation",
    "Home Essentials Sale",
    "Bedroom Refresh Sale",
    "Winter Is Here – Cozy Essentials",
    "Cocktail Creations",
    "Unique Gifting Ideas",
    "Find Perfect Ride",
    "Level Up Your Look",
  ];

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-2">
        {/* Section Header */}
        <div className="mb-6">
          <div className={`h-1 w-full rounded bg-gradient-to-r from-[#e3f2fd] to-[#e1f5fe] mb-3`}></div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              🔥 Trending Videos
            </h2>
          </div>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            View All
          </Button>
        </div>

        {/* Masonry Layout */}
        <div>
          <div className="columns-2 md:columns-3 xl:columns-4 [column-fill:_balance]" style={{ columnGap: '8px' }}>
            {displayVideos.map((video, index) => {
              const heights = [220, 300, 260, 280, 240, 320];
              const h = heights[index % heights.length];
              const horizontal = index % 3 === 0; // mix aspect ratios for variety
              const thumb = trendingThumbs[index % trendingThumbs.length];
              const title = trendingTitles[index % trendingTitles.length] || video.title;
              return (
                <div key={video.id} className="mb-2 break-inside-avoid-column">
                  <VideoPlaceholder
                    title={title}
                    price={video.price}
                    originalPrice={video.originalPrice}
                    badge={undefined}
                    likes={video.likes}
                    comments={video.comments}
                    views={video.views}
                    aspect={horizontal ? "16/9" : "9/16"}
                    cardHeight="auto"
                    mediaHeight={h}
                    thumbnailSrc={thumb}
                    fit={"contain"}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Carousel - Shows 2 cards on mobile */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4">
            {displayVideos.map((video, index) => {
              const thumb = trendingThumbs[index % trendingThumbs.length];
              const title = trendingTitles[index % trendingTitles.length] || video.title;
              return (
                <div key={`mobile-${video.id}`} className="flex-shrink-0 w-48">
                  <VideoPlaceholder
                    title={title}
                    price={video.price}
                    originalPrice={video.originalPrice}
                    badge={undefined}
                    likes={video.likes}
                    comments={video.comments}
                    views={video.views}
                    cardHeight={420}
                    mediaHeight={240}
                    thumbnailSrc={thumb}
                    fit="contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
