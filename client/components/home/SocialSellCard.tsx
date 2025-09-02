import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Play, Star, Info, MessageCircle, Users, Share2, Bookmark, TicketPercent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface ReviewSourceSnippet {
  title: string;
  url: string;
  snippet: string;
}

export interface SocialSellCardProps {
  title: string;
  creatorHandle?: string;
  avatars?: string[]; // stacked avatars
  videoPoster: string;
  videoSrc?: string; // optional short video
  alt?: string;
  bullets: string[]; // 2 pros + 1 con recommended
  rating: number; // 0-5
  ratingCount: number;
  updatedAgo: string; // e.g. "2h ago"
  price: number;
  originalPrice?: number;
  couponCode?: string; // e.g. SAVE10
  discountPercent?: number; // e.g. 20
  deliveryEta?: string; // e.g. "Tomorrow 9AM"
  returnsBadge?: string; // e.g. "7-day Returns"
  likes?: number;
  boughtIn24h?: number;
  liveViewers?: number;
  sources?: ReviewSourceSnippet[];
  variant?: "video-first" | "compact";
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const part = value - full;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const filled = i < full || (i === full && part > 0);
    return (
      <Star key={i} className={`w-4 h-4 ${filled ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
    );
  });
  return <div className="flex items-center gap-0.5" aria-label={`Rating ${value} out of 5 stars`}>{stars}</div>;
}

export default function SocialSellCard(props: SocialSellCardProps) {
  const {
    title,
    creatorHandle = "@creator",
    avatars = [],
    videoPoster,
    videoSrc,
    alt = title,
    bullets,
    rating,
    ratingCount,
    updatedAgo,
    price,
    originalPrice,
    couponCode,
    discountPercent,
    deliveryEta,
    returnsBadge,
    likes = 0,
    boughtIn24h = 0,
    liveViewers,
    sources = [],
    variant = "video-first",
  } = props;

  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [added, setAdded] = useState(false);

  const onEnter = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const priceBlock = (
    <div className="flex items-center gap-2">
      <div className="text-xl font-bold">£{price.toFixed(2)}</div>
      {originalPrice && (
        <div className="text-sm text-gray-500 line-through">£{originalPrice.toFixed(2)}</div>
      )}
      {typeof discountPercent === "number" && (
        <Badge className="bg-green-600 text-white">-{discountPercent}%</Badge>
      )}
      {couponCode && (
        <div className="ml-auto">
          <div className="group relative">
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs flex items-center gap-1">
              <TicketPercent className="w-3 h-3" /> Coupon
            </Badge>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded-md shadow px-2 py-1 text-xs">
              Use code <span className="font-semibold">{couponCode}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const socialRow = (
    <div className="flex items-center justify-between text-xs text-gray-600">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {likes.toLocaleString()}</div>
        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {boughtIn24h} bought in 24h</div>
        {liveViewers ? (
          <div className="flex items-center gap-1 text-rose-600"><Users className="w-3.5 h-3.5" /> {liveViewers} watching</div>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="Save" className="text-gray-500 hover:text-gray-700"><Bookmark className="w-4 h-4" /></button>
        <button aria-label="Share" className="text-gray-500 hover:text-gray-700"><Share2 className="w-4 h-4" /></button>
      </div>
    </div>
  );

  const addToCart = () => {
    setAdded(true);
    toast({ title: "Added to cart", description: "Added. See similar from creators?" });
    setTimeout(() => setAdded(false), 1500);
  };

  const [posterError, setPosterError] = useState(false);
  const media = (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/5]">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={!posterError ? videoPoster : undefined}
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          onError={() => setPosterError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        !posterError ? (
          <img src={videoPoster} alt={alt} className="w-full h-full object-cover" onError={() => setPosterError(true)} />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gray-100">
            <span className="rounded-full bg-white p-3 shadow ring-1 ring-black/10"><Play className="w-6 h-6 text-gray-700" /></span>
          </div>
        )
      )}
      {videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="rounded-full bg-white/90 p-2 shadow ring-1 ring-black/10 group-hover:scale-105 transition-transform">
            <Play className="w-6 h-6 text-gray-800" />
          </span>
        </div>
      )}
      {liveViewers && (
        <div className="absolute top-2 left-2 text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">LIVE</div>
      )}
    </div>
  );

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {avatars.slice(0, 3).map((a, i) => (
            <img key={i} src={a} alt="avatar" className="w-6 h-6 rounded-full ring-2 ring-white" />
          ))}
        </div>
        <div className="text-sm font-medium">{creatorHandle}</div>
      </div>
      <div className="text-[11px] text-gray-500">AI summary from reviews – updated {updatedAgo}</div>
    </div>
  );

  const summary = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Stars value={rating} />
        <span className="text-sm text-gray-600">{rating.toFixed(1)} · {ratingCount.toLocaleString()} reviews</span>
      </div>
      <ul className="list-disc pl-5 text-sm text-gray-800">
        {bullets.slice(0, 3).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {deliveryEta && <span>ETA {deliveryEta}</span>}
        {returnsBadge && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{returnsBadge}</span>}
      </div>
      {priceBlock}
      <div className="flex items-center gap-2">
        <Button onClick={addToCart} className="bg-gray-900 hover:bg-black text-white">{added ? "Added" : "Add to Cart"}</Button>
        {videoSrc && (
          <Button variant="outline" className="gap-2"><Play className="w-4 h-4" /> Watch 15s</Button>
        )}
      </div>
    </div>
  );

  return (
    <div className={`group rounded-2xl bg-white shadow-sm overflow-hidden p-4 flex flex-col h-full`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {header}

      <div className="mt-3 relative">
        {media}
        {liveViewers && (
          <div className="absolute top-2 left-2 text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full">LIVE</div>
        )}
        <div className="absolute top-2 right-2 text-[10px] bg-white/90 text-gray-700 px-2 py-0.5 rounded-full shadow">updated {updatedAgo}</div>
      </div>

      <div className="mt-3 flex-1 flex flex-col">
        <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
        <div className="mt-1 flex items-center gap-2">
          <Stars value={rating} />
          <span className="text-xs text-gray-600">{rating.toFixed(1)} · {ratingCount.toLocaleString()}</span>
        </div>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-800 space-y-1">
          {bullets.slice(0,3).map((b,i)=> <li key={i}>{b}</li>)}
        </ul>
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
          {deliveryEta && <span>ETA {deliveryEta}</span>}
          {returnsBadge && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{returnsBadge}</span>}
        </div>
        <div className="mt-2">
          {priceBlock}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Button onClick={addToCart} className="bg-black hover:bg-gray-900 text-white">{added ? "Added" : "Add to Cart"}</Button>
          {videoSrc && (
            <Button variant="outline" className="gap-2"><Play className="w-4 h-4" /> Watch 15s</Button>
          )}
        </div>
        <div className="mt-auto pt-3">{socialRow}</div>
        <div className="mt-2 text-[11px] text-gray-500 self-end flex items-center gap-1"><Info className="w-3.5 h-3.5" /> AI-generated summary</div>
      </div>
    </div>
  );
}
