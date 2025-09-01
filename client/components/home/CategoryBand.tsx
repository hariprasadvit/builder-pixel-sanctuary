import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import TikTokVideoCard, { type TikTokVideo } from "./TikTokVideoCard";
import { ArrowRight, Clock, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  socialProof?: string; // "200+ sold today"
}

interface CategoryBandProps {
  title: string;
  subtitle?: string;
  icon?: string;
  video?: TikTokVideo;
  products: Product[];
  layout?: "video-left" | "video-right" | "carousel";
  backgroundColor?: string;
  showCountdown?: boolean;
  hashtags?: string[];
}

export default function CategoryBand({
  title,
  subtitle,
  icon,
  video,
  products,
  layout = "video-left",
  backgroundColor = "bg-white",
  showCountdown = false,
  hashtags = []
}: CategoryBandProps) {
  
  // Default video placeholder if none provided
  const defaultVideo: TikTokVideo = {
    id: `${title.toLowerCase().replace(/\s+/g, '-')}-video`,
    title: `${title} Demo`,
    price: 99.99,
    youtubeId: "HfiEy9Rh2cQ",
    vendor: "Seller",
    likes: 1250,
    comments: 45,
    shares: 23,
    badge: "Trending"
  };

  const displayVideo = video || defaultVideo;

  const renderProductGrid = () => (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {products.slice(0, 4).map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="relative aspect-square bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='14'%3EProduct Image%3C/text%3E%3C/svg%3E";
              }}
            />
            {product.badge && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs animate-pulse">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.socialProof && (
              <p className="text-xs text-orange-600 font-medium">{product.socialProof}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCarousel = () => (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {/* Mix videos and products */}
      <div className="flex-shrink-0 w-48">
        <TikTokVideoCard video={displayVideo} className="h-80" />
      </div>
      
      {products.map((product, index) => (
        <Card key={product.id} className="flex-shrink-0 w-48 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="relative aspect-square bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='14'%3EProduct Image%3C/text%3E%3C/svg%3E";
              }}
            />
            {product.badge && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs animate-pulse">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
            <div className="flex items-center gap-2">
              <span className="font-bold">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-xs">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
      
      {/* Add more video cards if needed */}
      {products.length > 4 && (
        <div className="flex-shrink-0 w-48">
          <TikTokVideoCard video={{...displayVideo, id: `${displayVideo.id}-2`}} className="h-80" />
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-6 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {icon && <span>{icon}</span>}
              {title}
            </h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            Explore All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Countdown Timer */}
        {showCountdown && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Flash Sale Ends In:</span>
              </div>
              <div className="flex items-center gap-2 font-mono font-bold">
                <span className="bg-white/20 px-2 py-1 rounded">02</span>:
                <span className="bg-white/20 px-2 py-1 rounded">45</span>:
                <span className="bg-white/20 px-2 py-1 rounded">33</span>
              </div>
            </div>
          </div>
        )}

        {/* Hashtag filters */}
        {hashtags.length > 0 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {hashtags.map((tag) => (
              <Button 
                key={tag}
                variant="outline" 
                size="sm" 
                className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 text-purple-700 hover:from-purple-200 hover:to-pink-200 rounded-full whitespace-nowrap"
              >
                #{tag}
              </Button>
            ))}
          </div>
        )}

        {/* Content based on layout */}
        {layout === "carousel" ? (
          <div className="relative">
            {renderCarousel()}
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {layout === "video-left" ? (
              <>
                <div className="flex justify-center">
                  <TikTokVideoCard video={displayVideo} className="w-64 h-96" />
                </div>
                <div>
                  {renderProductGrid()}
                </div>
              </>
            ) : (
              <>
                <div>
                  {renderProductGrid()}
                </div>
                <div className="flex justify-center">
                  <TikTokVideoCard video={displayVideo} className="w-64 h-96" />
                </div>
              </>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-6">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop This Category
          </Button>
        </div>
      </div>
    </section>
  );
}
