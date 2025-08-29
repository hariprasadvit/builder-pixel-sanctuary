import { useState } from "react";
import {
  Heart,
  Share,
  MessageCircle,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Video Feed */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide flex flex-col items-center">
        {videos.map((video, index) => (
          <div key={video.id} className="h-full w-full snap-start relative flex items-center justify-center">
            {/* Video Frame with controls/info */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5" style={{ height: '80vh', width: 'calc(80vh * 9 / 16)' }}>
              {video.youtubeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=${playing?1:0}&mute=${isMuted?1:0}&playsinline=1&controls=0&modestbranding=1&loop=1&playlist=${video.youtubeId}&rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
              )}

              {!playing && (
                <button className="absolute inset-0 flex items-center justify-center" onClick={()=>setPlaying(true)}>
                  <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </button>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <Button variant="ghost" size="icon" className={`w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm ${video.isLiked?'text-brand-red':'text-white'}`} onClick={()=>toggleLike(video.id)}>
                  <Heart className={`w-5 h-5 ${video.isLiked?'fill-current':''}`} />
                </Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white" onClick={()=>handleShare(video.id)}>
                  <Share className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>

              <div className="absolute left-3 right-3 bottom-16">
                <Badge className={`${video.origin==='UK'?'bg-blue-600 hover:bg-blue-700':'bg-red-600 hover:bg-red-700'} mb-2`}>{video.origin}</Badge>
                <p className="text-white font-semibold mb-1">@{video.vendor}</p>
                <p className="text-white text-sm mb-2 line-clamp-2">{video.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">£{video.price.toFixed(2)}</span>
                  <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white" onClick={()=>addToCart(video.id)}>Add to Cart</Button>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white" onClick={()=>setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Progress Indicators */}
      <div className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 flex-col gap-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full ${
              index === currentVideo ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
