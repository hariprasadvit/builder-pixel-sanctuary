import React from "react";
import { Play, Heart, MessageCircle, Eye, ShoppingBag, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Brand colors extracted from logo (navy + red)
export const BRAND_GRADIENT = "bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f]";
export const BRAND_GRADIENT_TEXT = "bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f] bg-clip-text text-transparent";

interface BaseCardProps {
  cardHeight?: number; // total outer card height
  mediaHeight?: number; // height of media area (image/video)
  className?: string;
}

interface VideoPlaceholderProps extends BaseCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  likes?: number;
  comments?: number;
  views?: number;
  rating?: number;
  reviews?: number;
}

export function VideoPlaceholder({
  title,
  price,
  originalPrice,
  badge,
  likes = 0,
  comments = 0,
  views = 0,
  rating = 4.5,
  reviews = 120,
  cardHeight = 420,
  mediaHeight = 240,
  className = ""
}: VideoPlaceholderProps) {
  const videoWidth = Math.round((mediaHeight * 9) / 16);
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${className}`} style={{ height: cardHeight }}>
      <div className="relative w-full bg-transparent flex items-center justify-center" style={{ height: mediaHeight }}>
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <Play className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-xs font-medium">Video Thumbnail</p>
            <p className="text-[10px] text-gray-400">Placeholder</p>
          </div>
        </div>
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white text-[10px]">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-base">£{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-xs">£{originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1"><Heart className="w-3 h-3" /><span>{likes.toLocaleString()}</span></div>
            <div className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /><span>{comments}</span></div>
            <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{views.toLocaleString()}</span></div>
          </div>
          <RatingStars value={rating} size={12} /><span className="ml-1 text-[10px] text-gray-500">({reviews})</span>
        </div>
        <div className="mt-auto">
          <Button className={`w-full text-white ${BRAND_GRADIENT} hover:opacity-90 text-sm`}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ProductPlaceholderProps extends BaseCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating?: number;
  reviews?: number;
}

export function ProductPlaceholder({
  title,
  price,
  originalPrice,
  badge,
  rating = 4.5,
  reviews = 120,
  cardHeight = 420,
  mediaHeight = 240,
  className = ""
}: ProductPlaceholderProps) {
  const box = mediaHeight; // 1:1 box
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${className}`} style={{ height: cardHeight }}>
      <div className="relative w-full bg-gray-200 flex items-center justify-center" style={{ height: mediaHeight }}>
        <div className="bg-gray-300 rounded-lg flex items-center justify-center" style={{ height: box, width: box }}>
          <div className="text-center text-gray-600">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2 mx-auto" />
            <p className="text-xs font-medium">Product Image</p>
            <p className="text-[10px] text-gray-400">Placeholder</p>
          </div>
        </div>
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white text-[10px]">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <h3 className="font-medium text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-base">£{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-xs">£{originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center text-gray-600 text-xs mb-3">
          <RatingStars value={rating} size={12} />
          <span className="ml-1 text-[10px] text-gray-500">({reviews})</span>
        </div>
        <div className="mt-auto">
          <Button className={`w-full text-white ${BRAND_GRADIENT} hover:opacity-90 text-sm`}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>
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
  title = "Banner Placeholder",
  className = ""
}: BrandBannerPlaceholderProps) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded-2xl flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500">
        <div className="w-24 h-16 bg-gray-300 rounded-lg mb-3 mx-auto" />
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

export function BrandLogoPlaceholder({ size = "md", shape = "square", className = "" }: BrandLogoPlaceholderProps) {
  const sizeClasses = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-20 h-20" } as const;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <div className={`${sizeClasses[size]} ${shapeClass} bg-gray-200 flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500">
        <div className={`w-6 h-6 bg-gray-300 ${shapeClass} mx-auto mb-1`} />
        <p className="text-xs font-medium">Logo</p>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  gradientClass?: string;
  textClass?: string;
}

export function SectionHeader({ title, icon, children, gradientClass = BRAND_GRADIENT, textClass = "text-white" }: SectionHeaderProps) {
  return (
    <div className={`${gradientClass} ${textClass} p-5 rounded-t-2xl`}>
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

export function RatingStars({ value = 4.5, size = 14 }: { value?: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="" style={{ width: size, height: size, fill: i < full ? 'currentColor' : i === full && half ? 'currentColor' : 'none' }} />
      ))}
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
    <div className="bg-white rounded-xl shadow-md p-4 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <AvatarPlaceholder size={40} />
        <div>
          <p className="text-sm font-semibold">@{username}</p>
          <RatingStars value={rating} size={12} />
        </div>
      </div>
      <p className="text-sm text-gray-700 line-clamp-4 flex-1">{text}</p>
    </div>
  );
}
