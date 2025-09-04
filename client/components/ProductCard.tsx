import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Play } from "lucide-react";
import { BRAND_GRADIENT } from "@/components/ui/placeholders";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  origin: "UK" | "China";
  deliveryEta: string;
  hasVideo?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  badge?: string;
  saleEndsAt?: number;
}

export default function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  rating,
  reviewCount,
  origin,
  deliveryEta,
  hasVideo = false,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  badge,
  saleEndsAt,
}: ProductCardProps) {
  const { isWishlisted: ctxIsWishlisted, toggle } = useWishlist();
  const { toast } = useToast();
  const wishlisted =
    typeof isWishlisted === "boolean" ? isWishlisted : ctxIsWishlisted(id);
  const handleWishlistToggle = () => {
    const payload = {
      id,
      name: title,
      price,
      originalPrice,
      image,
      category: undefined,
      inStock: true,
    };
    if (onWishlistToggle) {
      onWishlistToggle(id);
    } else {
      toggle(payload);
    }
    const nowWishlisted = !wishlisted;
    toast({
      title: nowWishlisted ? "Added to Wishlist." : "Removed from Wishlist.",
    });
  };
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    if (!saleEndsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [saleEndsAt]);
  const timeLeft = saleEndsAt ? Math.max(0, saleEndsAt - now) : 0;
  const hh = Math.floor(timeLeft / 3600000);
  const mm = Math.floor((timeLeft % 3600000) / 60000);
  const ss = Math.floor((timeLeft % 60000) / 1000);
  const timerLabel = saleEndsAt
    ? `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
    : null;
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />

          {/* Origin Badge */}
          <Badge
            className={`absolute top-2 left-2 text-xs font-medium ${
              origin === "UK"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {origin}
          </Badge>

          {/* Optional Badge */}
          {badge && (
            <Badge className="absolute top-2 right-2 text-xs font-medium bg-brand-blue hover:bg-brand-blue/90">
              {badge}
            </Badge>
          )}

          {/* Sale Timer */}
          {timerLabel && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[11px] rounded-full px-2 py-0.5">
              {timerLabel}
            </div>
          )}

          {/* Video Icon */}
          {hasVideo && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-white" />
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-2 right-2 w-8 h-8 bg-white/90 hover:bg-white shadow-sm ${
              wishlisted ? "text-brand-red" : "text-muted-foreground"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleWishlistToggle();
            }}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
          </Button>

          {/* Delivery ETA Pill */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs text-muted-foreground">{deliveryEta}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Title - 2 lines max */}
          <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-2 min-h-[2.5rem]">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-brand-dark">
              £{price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                £{originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full bg-brand-blue hover:bg-brand-blue/90"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(id);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
