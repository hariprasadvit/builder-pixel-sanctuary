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

  // Use provided videos or fill with defaults
  const displayVideos = [...videos];
  const minCount = 12;
  while (displayVideos.length < minCount) {
    const def = defaultVideos[displayVideos.length % defaultVideos.length];
    displayVideos.push({ ...def, id: `placeholder-${displayVideos.length}` });
  }
  // Keep only cards 1,3,5,6,8,9,10,11 (1-based) => 0,2,4,5,7,8,9,10
  const keepOrder = [0, 2, 4, 5, 7, 8, 9, 10];
  const selectedVideos = keepOrder
    .filter((i) => i < displayVideos.length)
    .map((i) => ({ ...displayVideos[i], __srcIndex: i } as any));

  // Thumbnails provided by user for trending section (tiles 1-10)
  const trendingThumbs = [
    // 1-5
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6f399d617ec9456db30591d5d62dd84e?format=webp&width=800", // Card 1 (srcIndex 0)
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4d485c509a0d4f2b8dded2d4c8f823fd?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcbe79e80b6a847b490135842324d38ea?format=webp&width=800", // Card 2 (srcIndex 2)
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcbe79e80b6a847b490135842324d38ea?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2cab0399bb434ebcb3b79e6eed1ce19f?format=webp&width=800",
    // 6-10
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F75c537b0d15f436c8c1c4fff836b3dbc?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1f37e71257fb47cc8dc3627c2904e0b9?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F74f4689197544dd69519ae7fa4c78d20?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3d27c28ba0b546c3b107c8d28491424c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f0652d842da40c0b9cd4cd6cee3d4f2?format=webp&width=800",
    // 11-12
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9549cf525ba74b5a8245371354ad22f6?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7e8a3c5a69fc430593c8293279c45800?format=webp&width=800",
  ];
  const trendingTitles = [
    // Titles matching tiles 1-12 above
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
    "Indoor Plants You’ll Love",
    "Hydrate Yourself With These Fruits",
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

        {/* Grid Layout: 8 cards in two rows (4 columns on xl) */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {selectedVideos.map((video, index) => {
              const srcIndex = (video as any).__srcIndex as number;
              const thumb = srcIndex < trendingThumbs.length ? trendingThumbs[srcIndex] : undefined;
              const title = trendingTitles[srcIndex % trendingTitles.length] || video.title;
              return (
                <div key={`trending-${srcIndex}-${video.id}`} className="">
                  <VideoPlaceholder
                    title={title}
                    price={video.price}
                    originalPrice={video.originalPrice}
                    badge={undefined}
                    likes={video.likes}
                    comments={video.comments}
                    views={video.views}
                    aspect={srcIndex % 3 === 0 ? "16/9" : "9/16"}
                    cardHeight={"auto"}
                    mediaHeight={"auto"}
                    thumbnailSrc={thumb ? `${thumb}&cb=${srcIndex}` : undefined}
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

        {/* Mobile Carousel - Shows selected cards */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4">
            {selectedVideos.map((video) => {
              const srcIndex = (video as any).__srcIndex as number;
              const thumb = srcIndex < trendingThumbs.length ? trendingThumbs[srcIndex] : undefined;
              const title = trendingTitles[srcIndex % trendingTitles.length] || video.title;
              return (
                <div key={`mobile-${srcIndex}-${video.id}`} className="flex-shrink-0 w-48">
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
                    thumbnailSrc={thumb ? `${thumb}&cb=${srcIndex}` : undefined}
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
