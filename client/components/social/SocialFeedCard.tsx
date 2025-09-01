import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Volume2, VolumeX, Play } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

export type SocialFeedItem = {
  id: string;
  title: string;
  price: number;
  origin: "UK" | "China" | "nearbuy" | string;
  vendor?: string;
  youtubeId?: string;
  thumbnail?: string;
  image?: string;
  productId?: string; // for navigating to product detail
  likes?: number;
  comments?: number;
  shares?: number;
  liked?: boolean;
};

export default function SocialFeedCard({ item }: { item: SocialFeedItem }) {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(!!item.liked);
  const [likeCount, setLikeCount] = useState(item.likes ?? 0);
  const [commentCount, setCommentCount] = useState(item.comments ?? 0);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return `/`; 
    return `${window.location.origin}/product/${item.productId ?? item.id}`;
  }, [item.id, item.productId]);

  const onShopNow = () => {
    if (item.productId || item.id) {
      navigate(`/product/${item.productId ?? item.id}`);
    }
  };

  const onToggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((n) => (liked ? Math.max(0, n - 1) : n + 1));
  };

  return (
    <div className="w-full max-w-md md:max-w-xl mx-auto snap-start">
      <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white">
        <div className="relative bg-gray-900 aspect-[9/16]">
          {item.youtubeId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&mute=${isMuted ? 1 : 0}&playsinline=1&controls=0&modestbranding=1&loop=1&playlist=${item.youtubeId}&rel=0`}
              title={item.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : item.thumbnail || item.image ? (
            <>
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </>
          ) : null}

          {/* top badges */}
          <div className="absolute top-2 left-2 flex items-center gap-2">
            <Badge className={`${item.origin === "UK" ? "bg-blue-600" : item.origin === "China" ? "bg-red-600" : "bg-green-600"} text-white`}> {typeof item.origin === "string" ? item.origin : ""} </Badge>
          </div>

          {/* mute toggle */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 bg-black/50 text-white border-0 hover:bg-black/60"
            onClick={() => setIsMuted((m) => !m)}
          >
            {isMuted ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        </div>

        {/* product info */}
        <div className="p-3 md:p-4">
          {item.vendor && (
            <div className="text-xs text-gray-500 mb-1">@{item.vendor}</div>
          )}
          <div className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 mb-1">{item.title}</div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-brand-dark font-bold text-base md:text-lg">£{item.price.toFixed(2)}</div>
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white" onClick={onShopNow}>
              Shop Now
            </Button>
          </div>

          {/* social actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full ${liked ? "bg-red-50 text-red-600 border-red-200" : ""}`}
                onClick={onToggleLike}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-red-600" : ""}`} /> {likeCount}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setCommentsOpen(true)}
              >
                <MessageCircle className="w-4 h-4 mr-1" /> {commentCount}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setShareOpen(true)}
              >
                <Share className="w-4 h-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Share Modal */}
      <AlertDialog open={shareOpen} onOpenChange={setShareOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share</AlertDialogTitle>
            <AlertDialogDescription>Share this product with your friends.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <div className="flex gap-2">
              <a
                className="px-3 py-2 rounded bg-blue-600 text-white text-sm"
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="px-3 py-2 rounded bg-sky-500 text-white text-sm"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                Twitter/X
              </a>
              <a
                className="px-3 py-2 rounded bg-green-500 text-white text-sm"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input readOnly value={shareUrl} className="flex-1 border rounded px-2 py-1 text-sm" />
              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(shareUrl);
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Comments Modal */}
      <AlertDialog open={commentsOpen} onOpenChange={setCommentsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Comments</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="max-h-64 overflow-auto space-y-3 text-sm">
            <div className="p-2 rounded bg-gray-50">Great product!</div>
            <div className="p-2 rounded bg-gray-50">Is there a discount?</div>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 border rounded px-2 h-9 text-sm"
              placeholder="Write a comment"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setCommentCount((c) => c + 1);
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button size="sm" onClick={() => setCommentsOpen(false)}>
              Done
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
