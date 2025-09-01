import React from "react";
import { VideoPlaceholder, BrandBannerPlaceholder, RIKY_GRADIENT } from "@/components/ui/placeholders";

interface HybridHeroProps {
  featuredVideo?: {
    title: string;
    price: number;
    originalPrice?: number;
    badge?: string;
    likes: number;
    comments: number;
    views: number;
  };
}

export default function HybridHero({ featuredVideo }: HybridHeroProps) {
  // Default featured video data
  const defaultVideo = {
    title: "Featured Product Demo - Latest Innovation",
    price: 299.99,
    originalPrice: 399.99,
    badge: "Hot Deal",
    likes: 25400,
    comments: 524,
    views: 189000
  };

  const video = featuredVideo || defaultVideo;

  return (
    <section className={`${RIKY_GRADIENT} min-h-[600px] relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Desktop Split Layout */}
        <div className="hidden md:flex min-h-[600px] items-center gap-8">
          
          {/* Left: Tall Video Placeholder (9:16) */}
          <div className="flex-shrink-0 w-80">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4">
              <VideoPlaceholder
                aspect="9/16"
                title={video.title}
                price={video.price}
                originalPrice={video.originalPrice}
                badge={video.badge}
                likes={video.likes}
                comments={video.comments}
                views={video.views}
                className="shadow-2xl"
                showSocialCounters={true}
              />
            </div>
          </div>

          {/* Right: Brand Banner Placeholder */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <BrandBannerPlaceholder
                width="w-full"
                height="h-96"
                title="Brand Banner Placeholder"
                className="shadow-2xl bg-white/20"
              />
              
              {/* Hero Text Overlay */}
              <div className="mt-6 text-white text-center">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  Discover Amazing
                  <br />
                  <span className="text-yellow-300">Products</span>
                </h1>
                <p className="text-xl lg:text-2xl opacity-90 mb-6">
                  Shop the latest trends with social discovery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="md:hidden py-8 space-y-6">
          
          {/* Brand Banner First on Mobile */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <BrandBannerPlaceholder
              width="w-full"
              height="h-48"
              title="Brand Banner"
              className="shadow-lg bg-white/20"
            />
            
            <div className="mt-4 text-white text-center">
              <h1 className="text-2xl font-bold mb-2">
                Discover Amazing
                <br />
                <span className="text-yellow-300">Products</span>
              </h1>
              <p className="text-sm opacity-90">
                Shop the latest trends with social discovery
              </p>
            </div>
          </div>

          {/* Video Below on Mobile */}
          <div className="flex justify-center">
            <div className="w-64 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
              <VideoPlaceholder
                aspect="9/16"
                title={video.title}
                price={video.price}
                originalPrice={video.originalPrice}
                badge={video.badge}
                likes={video.likes}
                comments={video.comments}
                views={video.views}
                className="shadow-xl"
                showSocialCounters={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
