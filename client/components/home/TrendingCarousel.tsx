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
          <div className="flex flex-col items-center">
            <style>{`
              @keyframes ukWave {
                0% { transform: rotate(-8deg); }
                50% { transform: rotate(8deg); }
                100% { transform: rotate(-8deg); }
              }
              .animate-uk-wave { animation: ukWave 1.6s ease-in-out infinite; transform-origin: 50% 50%; display: inline-block; }
            `}</style>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3 justify-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc4f76bd7da8d42e49c697365c85ac122?format=webp&width=800" alt="UK flag" className="w-6 h-6 animate-uk-wave" />
              <span className="bg-gradient-to-r from-[#012169] to-[#C8102E] bg-clip-text text-transparent">Trending Videos</span>
            </h2>

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

              // area b: place user-provided image with overlays
              if (area === 'b') {
                const imgSrc = 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faeb4511072754f109bbdd39fd9ebe496?format=webp&width=800';
                const creatorName = 'Zhao Yi';
                return (
                  <div key={`blk-${area}`} style={{ gridArea: area }} className="rounded-md overflow-hidden relative bg-black">
                    <img src={imgSrc} alt={area} className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105" />
                    <div className="absolute inset-0 bg-black/28" />
                    <div className="relative z-10 flex items-center justify-center p-3 h-full">
                      <img src={imgSrc} alt={area} className="max-h-[85%] max-w-full object-contain rounded-lg shadow-lg" />
                    </div>
                    <button aria-label="Play video" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z" fill="#111"/></svg>
                    </button>
                    <button aria-label="More actions" className="absolute top-2 right-2 z-20 bg-white/90 p-1 rounded-full shadow">
                      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#111"/><circle cx="9" cy="2" r="2" fill="#111"/><circle cx="16" cy="2" r="2" fill="#111"/></svg>
                    </button>
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-full">
                      <img src={imgSrc} alt="avatar" className="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
                      <div className="text-sm text-white flex items-center gap-2">
                        <span className="font-semibold">{creatorName}</span>
                        <span title="Verified" className="text-xs text-emerald-400">✔️</span>
                      </div>
                    </div>
                    <button aria-label="Toggle mute" className="absolute bottom-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9v6h4l5 4V5L9 9H5z" fill="#111"/></svg>
                    </button>
                  </div>
                );
              }

              // area c, d, e, f, g, h: show creator card with blurred background and overlays
              if (['c','d','e','f','g','h'].includes(area)) {
                // choose image and name per area
                const imgMap: Record<string, string> = {
                  c: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe145a965a29e40aea94af410100bbd4e?format=webp&width=800',
                  d: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F02f4310e31254e67a1e496266af050d6?format=webp&width=800',
                  e: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbf40b23e5b9a4786b28c3c2ecb75cd01?format=webp&width=800',
                  f: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F45c7f017f830434a859b680fad12589e?format=webp&width=800',
                  g: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7d24405ddca744bea45d58bbc256c383?format=webp&width=800',
                  h: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbb72997bd25f480aacf6612f6fbeea22?format=webp&width=800'
                };
                const nameMap: Record<string, string> = { c: 'Li Wei', d: 'Wang Fang', e: 'Zhang Lei', f: 'Jun Park', g: 'Mei Lin', h: 'Xiao Chen' };
                const imgSrc = imgMap[area];
                const creatorName = nameMap[area];

                return (
                  <div key={`blk-${area}`} style={{ gridArea: area }} className="rounded-md overflow-hidden relative bg-black">
                    {/* blurred background */}
                    <img src={imgSrc} alt={area} className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105" />
                    {/* subtle overlay to focus */}
                    <div className="absolute inset-0 bg-black/28" />

                    {/* foreground subject (centered) */}
                    <div className="relative z-10 flex items-center justify-center p-3 h-full">
                      <img src={imgSrc} alt={area} className="max-h-[85%] max-w-full object-contain rounded-lg shadow-lg" />
                    </div>

                    {/* play overlay center */}
                    <button aria-label="Play video" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z" fill="#111"/></svg>
                    </button>

                    {/* top bar: ellipsis on right */}
                    <button aria-label="More actions" className="absolute top-2 right-2 z-20 bg-white/90 p-1 rounded-full shadow">
                      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#111"/><circle cx="9" cy="2" r="2" fill="#111"/><circle cx="16" cy="2" r="2" fill="#111"/></svg>
                    </button>

                    {/* top-left: avatar + name + verified */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-full">
                      <img src={imgSrc} alt="avatar" className="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
                      <div className="text-sm text-white flex items-center gap-2">
                        <span className="font-semibold">{creatorName}</span>
                        <span title="Verified" className="text-xs text-emerald-400">✔️</span>
                      </div>
                    </div>

                    {/* bottom-right: mute/unmute icon */}
                    <button aria-label="Toggle mute" className="absolute bottom-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9v6h4l5 4V5L9 9H5z" fill="#111"/></svg>
                    </button>
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
