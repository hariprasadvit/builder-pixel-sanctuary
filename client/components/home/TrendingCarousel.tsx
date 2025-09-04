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

  // Render exactly 8 placeholder boxes (no images) for a tight masonry layout
  const boxCount = 8;
  const selectedVideos = Array.from({ length: boxCount }).map((_, i) => ({
    id: `placeholder-${i}`,
    title: "",
    price: 0,
    originalPrice: undefined,
    badge: undefined,
    likes: 0,
    comments: 0,
    views: 0,
    __srcIndex: i
  }) as any);
  // keep length explicit
  selectedVideos.length = boxCount;

  // Thumbnails for Trending Videos (updated)
  const trendingThumbs = [
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6a0648851b214f4d8d775a638bb50fb8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7b33d455f294407486c6dc42d1e1acf4?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F05bd6a0680a54750a609ddf11ce8f115?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6b8ddc8a54934f99aceb14e3147d222c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc4edea0b19bb4d1488fdc4c80cf77613?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe55e86fa90934a2f97e72a995b4a02ea?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcaa5048166c343c3bd08705eb080a9c7?format=webp&width=800",
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

        {/* Replace with exact placeholder blocks matching user's reference */}
        <div className="hidden md:flex justify-center">
          <div
            className="mx-auto w-full lg:w-8/12"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '150px 220px 220px 180px',
              gap: '12px',
              gridTemplateAreas: `"a a b" "c d b" "c d e" "f g h"`
            }}
          >
            <style>{`
              .trending-banner { position: relative; overflow: hidden; border-radius: 8px; }
              .trending-banner img { display:block; width:100%; height:100%; object-fit:cover; }
            `}</style>

            {['a','b','c','d','e','f','g','h'].map((area, i) => {
              if (area === 'a') {
                return (
                  <div key={`blk-${area}`} style={{ gridArea: area }} className="trending-banner">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F54c4816c2cb947ba8007130404165717?format=webp&width=1200" alt="banner" />
                  </div>
                );
              }

              // place provided images into c and d
              if (area === 'c') {
                return (
                  <div key={`blk-${area}`} style={{ gridArea: area }} className="rounded-md overflow-hidden">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe145a965a29e40aea94af410100bbd4e?format=webp&width=800" alt="c" className="w-full h-full object-cover" />
                  </div>
                );
              }

              if (area === 'd') {
                return (
                  <div key={`blk-${area}`} style={{ gridArea: area }} className="rounded-md overflow-hidden">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F02f4310e31254e67a1e496266af050d6?format=webp&width=800" alt="d" className="w-full h-full object-cover" />
                  </div>
                );
              }

              return <div key={`blk-${area}`} style={{ gridArea: area }} className="rounded-md bg-black" />;
            })}
          </div>
        </div>

        {/* Mobile Carousel - compact cards */}
        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-4">
            {selectedVideos.map((video) => {
              const srcIndex = (video as any).__srcIndex as number;
              const thumb = srcIndex < trendingThumbs.length ? trendingThumbs[srcIndex] : undefined;
              const title = trendingTitles[srcIndex % trendingTitles.length] || video.title;
              return (
                <div key={`mobile-${srcIndex}-${video.id}`} className="flex-shrink-0 w-40">
                  <VideoPlaceholder
                    className="p-2"
                    title={title}
                    price={video.price}
                    originalPrice={video.originalPrice}
                    badge={undefined}
                    likes={video.likes}
                    comments={video.comments}
                    views={video.views}
                    cardHeight={280}
                    mediaHeight={150}
                    thumbnailSrc={undefined}
                    fit="contain"
                    showBuyButton={false}
                    showPrice={false}
                    showPlayOverlay={false}
                    showSocialCounters={false}
                    hideTitle={true}
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
