import React from "react";
import { Play, Heart, MessageCircle, Eye, ShoppingBag, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useToast } from "@/hooks/use-toast";

// Brand colors extracted from logo (navy + red)
export const BRAND_GRADIENT = "bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f]";
export const BRAND_GRADIENT_TEXT = "bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f] bg-clip-text text-transparent";

interface BaseCardProps {
  cardHeight?: number | "auto"; // total outer card height
  mediaHeight?: number | "auto"; // height of media area (image/video)
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
  aspect?: "9/16" | "16/9";
  showSocialCounters?: boolean;
  thumbnailSrc?: string;
  fit?: "contain" | "cover";
  showViews?: boolean;
  showBuyButton?: boolean;
  showPrice?: boolean;
  showPlayOverlay?: boolean;
  hideTitle?: boolean;
  cardHeight?: number | "auto";
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
  aspect = "9/16",
  showSocialCounters = true,
  thumbnailSrc,
  fit = "contain",
  showViews = false,
  showBuyButton = true,
  showPrice = true,
  showPlayOverlay = true,
  hideTitle = false,
  cardHeight = 420,
  mediaHeight = 240,
  className = ""
}: VideoPlaceholderProps) {
  const isHorizontal = aspect === "16/9";
  const outerStyle = typeof cardHeight === "number" ? { height: cardHeight } : undefined;
  const mediaStyle = mediaHeight === "auto" ? undefined : { height: mediaHeight };
  const mediaPadding = mediaHeight === "auto" ? "" : "p-3";
  // Use explicit style for img to avoid unexpected cropping; keep aspect ratio intact
  const imgStyle = mediaHeight === "auto" ? undefined : { width: '100%', height: '100%', objectFit: fit === 'cover' ? 'cover' : 'contain' } as React.CSSProperties;
  const imgClass = mediaHeight === "auto" ? "w-full h-auto" : `w-full h-full transition-transform duration-300 group-hover:scale-105`;
  return (
    <div className={`group bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`} style={outerStyle}>
      <div className={`relative w-full bg-white flex items-center justify-center overflow-hidden ${mediaPadding}`} style={mediaStyle}>
        {thumbnailSrc ? (
          <>
            <img src={thumbnailSrc} alt={title} className={imgClass} style={imgStyle} />
            <div className="shine-strip animate-shine z-10" />
            {showPlayOverlay && (
              <button type="button" aria-label="Play video" className="absolute inset-0 flex items-center justify-center focus:outline-none z-20">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow ring-1 ring-black/10 transition-transform hover:scale-105">
                  <Play className="w-6 h-6 text-gray-800" />
                </span>
              </button>
            )}
          </>
        ) : (
          <div className={`${isHorizontal ? "w-full max-h-full aspect-video" : "w-full max-h-full aspect-[9/16]"} bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden`}>
            <div className="text-center text-gray-600">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Play className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs font-medium">Video Thumbnail</p>
              <p className="text-[10px] text-gray-400">Preview</p>
            </div>
          </div>
        )}
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white text-[10px]">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 pb-2 flex flex-col">
        {!hideTitle && (<h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>)}
        {showPrice && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-base text-gray-900">£{price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-500 line-through text-xs">£{originalPrice.toFixed(2)}</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
          {showSocialCounters ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><Heart className="w-3 h-3" /><span>{likes.toLocaleString()}</span></div>
              <div className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /><span>{comments}</span></div>
              {showViews && (<div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{views.toLocaleString()}</span></div>)}
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center">
            <RatingStars value={rating} size={12} />
            <span className="ml-1 text-[10px] text-gray-500">({reviews})</span>
          </div>
        </div>
        {showBuyButton && (
          <div className="mt-auto">
            <AddToCartButton title={title} price={price} originalPrice={originalPrice} thumbnailSrc={thumbnailSrc} />
          </div>
        )}
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
  thumbnailSrc?: string;
  fit?: "contain" | "cover";
  showBuyButton?: boolean;
  showPrice?: boolean;
  mediaPadding?: string; // e.g. "px-4 py-3"
}

export function ProductPlaceholder({
  title,
  price,
  originalPrice,
  badge,
  rating = 4.5,
  reviews = 120,
  thumbnailSrc,
  fit = "contain",
  showBuyButton = true,
  showPrice = true,
  cardHeight = 420,
  mediaHeight = 240,
  className = "",
  mediaPadding = "px-4 py-3",
}: ProductPlaceholderProps) {
  const box = mediaHeight; // 1:1 box
  return (
    <div className={`group bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`} style={{ height: cardHeight }}>
      <div className={`relative w-full bg-white flex items-center justify-center overflow-hidden ${mediaPadding}`} style={{ height: mediaHeight }}>
        {thumbnailSrc ? (
          <>
            <img src={thumbnailSrc} alt={title} className={`w-full h-full max-w-[90%] max-h-[90%] transition-transform duration-300 group-hover:scale-105 ${fit === "cover" ? "object-cover" : "object-contain"}`} />
            <div className="shine-strip animate-shine z-10" />
          </>
        ) : (
          <div className="w-full max-h-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2 mx-auto" />
              <p className="text-xs font-medium">Product Image</p>
              <p className="text-[10px] text-gray-400">Preview</p>
            </div>
          </div>
        )}
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white text-[10px]">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 pb-2 flex flex-col">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">{title}</h3>
        {showPrice && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-base text-gray-900">£{price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-500 line-through text-xs">£{originalPrice.toFixed(2)}</span>
            )}
          </div>
        )}
        <div className={`flex items-center text-gray-600 text-xs ${showBuyButton ? 'mb-3' : 'mb-1'}`}>
          <RatingStars value={rating} size={12} />
          <span className="ml-1 text-[10px] text-gray-500">({reviews})</span>
        </div>
        {showBuyButton && (
          <div className="mt-auto">
            <AddToCartButton title={title} price={price} originalPrice={originalPrice} thumbnailSrc={thumbnailSrc} />
          </div>
        )}
      </div>
    </div>
  );
}

interface BrandBannerPlaceholderProps {
  width?: string;
  height?: string;
  title?: string;
  className?: string;
  imageSrc?: string;
}

export function BrandBannerPlaceholder({
  width = "w-full",
  height = "h-64",
  title = "Banner Placeholder",
  className = "",
  imageSrc
}: BrandBannerPlaceholderProps) {
  if (imageSrc) {
    return (
      <div className={`${width} ${height} rounded-2xl overflow-hidden ${className}`}>
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        <div className="shine-strip animate-shine z-10" />
      </div>
    );
  }
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

export function BrandLogoPlaceholder({ size = "md", shape = "square", className = "", src }: BrandLogoPlaceholderProps & { src?: string }) {
  const sizeClasses = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-20 h-20" } as const;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <div className={`group ${sizeClasses[size]} ${shapeClass} flex items-center justify-center ${className}`}>
      {src ? (
        <div className={`w-full h-full p-2 flex items-center justify-center ${shapeClass} bg-white`}>
          <img
            src={src}
            alt="brand logo"
            className={`w-full h-full object-contain transition-transform duration-200 filter grayscale group-hover:grayscale-0 group-hover:scale-105`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      ) : (
        <div className={`w-full h-full p-2 flex items-center justify-center bg-gray-200 ${shapeClass}`}>
          <div className="text-center text-gray-500">
            <div className={`w-6 h-6 bg-gray-300 ${shapeClass} mx-auto mb-1`} />
            <p className="text-xs font-medium">Logo</p>
          </div>
        </div>
      )}
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

// Small helper button to unify add-to-cart behaviour across placeholders
function AddToCartButton({ title, price, originalPrice, thumbnailSrc }: { title: string; price: number; originalPrice?: number; thumbnailSrc?: string }) {
  const { addToCart } = useCart();
  const { currentMarketplace, getMarketplaceLabel } = useMarketplace();
  const { toast } = useToast();

  const handleAdd = () => {
    const id = `ph-${Math.random().toString(36).slice(2, 9)}`;
    addToCart(
      {
        id,
        name: title,
        price,
        originalPrice: originalPrice,
        image: thumbnailSrc || "",
        vendor: currentMarketplace,
        vendorName: getMarketplaceLabel(currentMarketplace),
        category: "General",
      },
      1,
    );
    toast({ title: "Added to cart", description: `${title} added to cart.` });
  };

  return (
    <Button onClick={handleAdd} className={`w-full text-white ${BRAND_GRADIENT} hover:opacity-90 text-sm`}>
      <ShoppingBag className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
