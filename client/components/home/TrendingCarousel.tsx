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

  // Thumbnails provided by user for trending section (tiles 1-10)
  const trendingThumbs = [
    // 1-5
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdb8f84e4211c4b198a762954501e50d8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4d485c509a0d4f2b8dded2d4c8f823fd?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F99870e97ec344b8b99197328db647e5f?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcbe79e80b6a847b490135842324d38ea?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2cab0399bb434ebcb3b79e6eed1ce19f?format=webp&width=800",
    // 6-10
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75c537b0d15f436c8c1c4fff836b3dbc?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1f37e71257fb47cc8dc3627c2904e0b9?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F74f4689197544dd69519ae7fa4c78d20?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3d27c28ba0b546c3b107c8d28491424c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f0652d842da40c0b9cd4cd6cee3d4f2?format=webp&width=800",
  ];
  const trendingTitles = [
    // Titles matching tiles 1-10 above
    "Best Toys of 2025",
    "Must-Have Gym Equipment",
    "Best MacBook To Choose For You",
    "Best Gifting Ideas 2025",
    "Best UPS & Inverters 2025",
    "Gen Z Men’s Style 2025",
    "Best Furniture Picks 2025",
    "Best Water Heaters 2025",
    "Best UPS & Inverters 2025",
    "Top Smartphones 2025",
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
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900 whitespace-nowrap">
              See All
            </Button>
          </div>
        </div>

        {/* Masonry Layout */}
        <div>
          <div className="columns-2 md:columns-3 xl:columns-4 [column-fill:_balance]" style={{ columnGap: '8px' }}>
            {displayVideos.map((video, index) => {
              const heights = [300, 380, 340, 400, 320, 420];
              const hBase = heights[index % heights.length];
              const h = index === 0 ? 500 : hBase;
              const horizontal = index % 3 === 0; // mix aspect ratios for variety
              const thumb = index < trendingThumbs.length ? trendingThumbs[index] : undefined;
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
                    cardHeight={"auto"}
                    mediaHeight={"auto"}
                    thumbnailSrc={thumb ? `${thumb}&cb=${index}` : undefined}
                    fit={"contain"}
                    showBuyButton={false}
                    showPrice={false}
                    showPlayOverlay={true}
                    hideTitle={false}
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
              const thumb = index < trendingThumbs.length ? trendingThumbs[index] : undefined;
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
                    cardHeight={"auto"}
                    mediaHeight={"auto"}
                    thumbnailSrc={thumb ? `${thumb}&cb=${index}` : undefined}
                    fit="contain"
                    showBuyButton={false}
                    showPrice={false}
                    showPlayOverlay={true}
                    hideTitle={false}
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
