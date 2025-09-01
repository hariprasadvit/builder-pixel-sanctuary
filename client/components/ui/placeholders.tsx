import React from "react";
import { Play, Heart, MessageCircle, Eye, ShoppingBag, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Riky brand gradient (consistent throughout site)
export const RIKY_GRADIENT = "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500";
export const RIKY_GRADIENT_LIGHT = "bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100";

interface VideoPlaceholderProps {
  aspect?: "9/16" | "16/9";
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  likes?: number;
  comments?: number;
  views?: number;
  className?: string;
  showSocialCounters?: boolean;
}

export function VideoPlaceholder({
  aspect = "9/16",
  title,
  price,
  originalPrice,
  badge,
  likes = 0,
  comments = 0,
  views = 0,
  className = "",
  showSocialCounters = true
}: VideoPlaceholderProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${className}`}>
      <div className={`relative bg-gray-200 aspect-[${aspect}] flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3 mx-auto">
            <Play className="w-8 h-8 text-gray-500 fill-current" />
          </div>
          <p className="text-sm font-medium">Video Thumbnail</p>
          <p className="text-xs text-gray-400">Placeholder</p>
        </div>
        {badge && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white text-xs animate-pulse">
            {badge}
          </Badge>
        )}
        {showSocialCounters && aspect === "9/16" && (
          <div className="absolute right-3 bottom-20 flex flex-col gap-3">
            <div className="flex flex-col items-center text-white bg-black/50 rounded-full p-2">
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">{likes.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center text-white bg-black/50 rounded-full p-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs mt-1">{comments}</span>
            </div>
            <div className="flex flex-col items-center text-white bg-black/50 rounded-full p-2">
              <Eye className="w-5 h-5" />
              <span className="text-xs mt-1">{views.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-purple-600">£{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">£{originalPrice.toFixed(2)}</span>
          )}
        </div>
        {showSocialCounters && aspect === "16/9" && (
          <div className="flex items-center gap-4 mb-3 text-gray-600">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{views.toLocaleString()}</span>
            </div>
          </div>
        )}
        <Button className={`w-full ${RIKY_GRADIENT} hover:opacity-90 text-white font-medium`}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  );
}

interface ProductPlaceholderProps {
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  className?: string;
}

export function ProductPlaceholder({
  title,
  price,
  originalPrice,
  badge,
  className = ""
}: ProductPlaceholderProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="relative aspect-square bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 bg-gray-300 rounded-lg mb-2 mx-auto"></div>
          <p className="text-sm font-medium">Product Image</p>
          <p className="text-xs text-gray-400">Placeholder</p>
        </div>
        {badge && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
            {badge}
          </Badge>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">£{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">£{originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button className={`w-full ${RIKY_GRADIENT} hover:opacity-90 text-white text-sm`}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  );
}

interface BrandBannerPlaceholderProps {
  width?: string;
  height?: string;
  title?: string;
  className?: string;
}

export function BrandBannerPlaceholder({
  width = "w-full",
  height = "h-64",
  title = "Brand Banner Placeholder",
  className = ""
}: BrandBannerPlaceholderProps) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded-2xl flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500">
        <div className="w-24 h-16 bg-gray-300 rounded-lg mb-3 mx-auto"></div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-gray-400">1440×400</p>
      </div>
    </div>
  );
}

interface BrandLogoPlaceholderProps {
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  className?: string;
}

export function BrandLogoPlaceholder({
  size = "md",
  shape = "square",
  className = ""
}: BrandLogoPlaceholderProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  } as const;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <div className={`${sizeClasses[size]} ${shapeClass} bg-gray-200 flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500">
        <div className={`w-6 h-6 bg-gray-300 ${shapeClass} mx-auto mb-1`}></div>
        <p className="text-xs font-medium">Logo</p>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, icon, children }: SectionHeaderProps) {
  return (
    <div className={`${RIKY_GRADIENT} text-white p-6 rounded-t-2xl`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AvatarPlaceholder({ size = 40 }: { size?: number }) {
  const px = `${size}px`;
  return (
    <div className="bg-gray-200 rounded-full flex items-center justify-center overflow-hidden" style={{ width: px, height: px }}>
      <User className="w-5 h-5 text-gray-500" />
    </div>
  );
}

export function RatingStars({ value = 4.5 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < full ? "fill-current" : i === full && half ? "fill-current" : ""}`} />
      ))}
      <span className="ml-1 text-xs text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
}

interface ReviewCardProps {
  username: string;
  rating: number;
  text: string;
}

export function ReviewPlaceholder({ username, rating, text }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <AvatarPlaceholder size={40} />
        <div>
          <p className="text-sm font-semibold">@{username}</p>
          <RatingStars value={rating} />
        </div>
      </div>
      <p className="text-sm text-gray-700 line-clamp-4">{text}</p>
    </div>
  );
}
