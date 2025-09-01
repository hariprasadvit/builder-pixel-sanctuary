import React, { useState } from "react";
import { Heart, MessageCircle, Share, ShoppingBag, Volume2, VolumeX, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export interface TikTokVideo {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  youtubeId: string;
  thumbnail?: string;
  vendor: string;
  vendorAvatar?: string;
  productId?: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  badge?: string; // "Hot Deal", "Trending", "New", etc.
}

interface TikTokVideoCardProps {
  video: TikTokVideo;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  showControls?: boolean;
}

export default function TikTokVideoCard({ 
  video, 
  className = "", 
  autoplay = true, 
  muted = true,
  showControls = false 
}: TikTokVideoCardProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(video.liked || false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [isMuted, setIsMuted] = useState(muted);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBuyNow = () => {
    if (video.productId) {
      navigate(`/product/${video.productId}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this ${video.title} from ${video.vendor}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className={`relative bg-black rounded-2xl overflow-hidden shadow-lg group ${className}`}>
      {/* Video Container */}
      <div className="relative aspect-[9/16] bg-gray-900">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&playsinline=1&controls=${showControls ? 1 : 0}&modestbranding=1&loop=1&playlist=${video.youtubeId}&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
            <Play className="w-16 h-16 text-white opacity-60" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 rounded-lg p-3 text-white">
                <p className="text-sm font-medium">Video Preview</p>
                <p className="text-xs opacity-75">{video.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {video.badge && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                {video.badge}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white bg-black/30 hover:bg-black/50 h-8 w-8 p-0 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Seller Info */}
          <div className="absolute top-12 left-3 flex items-center gap-2">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src={video.vendorAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                {video.vendor.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-full">
              @{video.vendor}
            </span>
          </div>

          {/* Social Actions - Right Side */}
          <div className="absolute right-3 bottom-20 flex flex-col gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white bg-black/30 hover:bg-black/50 h-auto p-2 rounded-full"
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white bg-black/30 hover:bg-black/50 h-auto p-2 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">{video.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white bg-black/30 hover:bg-black/50 h-auto p-2 rounded-full"
              onClick={handleShare}
            >
              <Share className="w-5 h-5" />
              <span className="text-xs">{video.shares}</span>
            </Button>
          </div>

          {/* Product Info & Buy Button - Bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 space-y-2">
              <h3 className="text-white font-medium text-sm line-clamp-2">{video.title}</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">£{video.price.toFixed(2)}</span>
                {video.originalPrice && (
                  <span className="text-gray-300 line-through text-sm">£{video.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <Button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium text-sm h-8 rounded-full"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
