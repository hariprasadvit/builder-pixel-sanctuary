import { useState } from "react";
import { Heart, Share, MessageCircle, ThumbsDown, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Videos() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Mock video data
  const videos = [
    {
      id: "1",
      youtubeId: "HfiEy9Rh2cQ",
      thumbnail: "https://img.youtube.com/vi/HfiEy9Rh2cQ/hqdefault.jpg",
      title: "iPhone 15 Pro Max Unboxing & First Look",
      vendor: "TechStore UK",
      price: 1199.99,
      origin: "UK" as const,
      likes: 15400,
      comments: 324,
      shares: 89,
      isLiked: false,
    },
    {
      id: "2",
      youtubeId: "O3oFfbIXTOA",
      thumbnail: "https://img.youtube.com/vi/O3oFfbIXTOA/hqdefault.jpg",
      title: "Xiaomi Smart Home Setup in 60 Seconds",
      vendor: "Smart Living China",
      price: 89.99,
      origin: "China" as const,
      likes: 8900,
      comments: 156,
      shares: 45,
      isLiked: true,
    },
    {
      id: "3",
      youtubeId: "asaqTyqU9hU",
      thumbnail: "https://img.youtube.com/vi/asaqTyqU9hU/hqdefault.jpg",
      title: "Nike Air Max Custom Design Process",
      vendor: "Sneaker Hub UK",
      price: 159.99,
      origin: "UK" as const,
      likes: 22100,
      comments: 567,
      shares: 123,
      isLiked: false,
    },
    {
      id: "4",
      thumbnail: "/placeholder.svg",
      title: "DJI Drone Epic Sunset Flight",
      vendor: "SkyTech China",
      price: 429.99,
      origin: "China" as const,
      likes: 18700,
      comments: 289,
      shares: 78,
      isLiked: true,
    },
  ];

  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`;
    if (n >= 1_000) return `${Math.round(n / 100) / 10}K`;
    return `${n}`;
  };

  const toggleLike = (videoId: string) => {
    console.log("Toggle like for video:", videoId);
  };

  const handleShare = (videoId: string) => {
    console.log("Share video:", videoId);
  };

  const addToCart = (videoId: string) => {
    console.log("Add to cart from video:", videoId);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 relative">
      {/* Video Feed */}
      <div className="h-[calc(100vh-4rem)] snap-y snap-mandatory overflow-y-auto scrollbar-hide flex flex-col items-center">
        {videos.map((video, index) => (
          <div key={video.id} className="h-[calc(100vh-4rem)] w-full snap-start relative flex items-center justify-center">
            {/* Video Frame with controls/info */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 h-full aspect-[9/16]">
              {video.youtubeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&mute=${isMuted?1:0}&playsinline=1&controls=0&modestbranding=1&loop=1&playlist=${video.youtubeId}&rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
              )}


              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />


              <div className="absolute left-3 right-3 bottom-16">
                <Badge className={`${video.origin==='UK'?'bg-blue-600 hover:bg-blue-700':'bg-red-600 hover:bg-red-700'} mb-2`}>{video.origin}</Badge>
                <p className="text-white font-semibold mb-1">@{video.vendor}</p>
                <p className="text-white text-sm mb-2 line-clamp-2">{video.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">£{video.price.toFixed(2)}</span>
                  <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white" onClick={()=>addToCart(video.id)}>Add to Cart</Button>
                </div>
              </div>

            </div>
            {/* Side action panel */}
            <div className="hidden md:flex flex-col gap-2 ml-4">
              <Button variant="secondary" className="rounded-full bg-white text-gray-700 shadow px-3 py-2 hover:bg-gray-50" onClick={()=>toggleLike(video.id)}>
                <Heart className="w-4 h-4 mr-2" />
                {formatCount(video.likes)}
              </Button>
              <Button variant="secondary" className="rounded-full bg-white text-gray-700 shadow px-3 py-2 hover:bg-gray-50">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Dislike
              </Button>
              <Button variant="secondary" className="rounded-full bg-white text-gray-700 shadow px-3 py-2 hover:bg-gray-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                {formatCount(video.comments)}
              </Button>
              <Button variant="secondary" className="rounded-full bg-white text-gray-700 shadow px-3 py-2 hover:bg-gray-50" onClick={()=>handleShare(video.id)}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white text-gray-700 shadow w-10 h-10" onClick={()=>setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
