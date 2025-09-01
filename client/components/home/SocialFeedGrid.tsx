import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, ShoppingBag, Play } from "lucide-react";

interface SocialPost {
  id: string;
  type: "photo" | "video";
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  media: string;
  caption: string;
  likes: number;
  comments: number;
  products: {
    id: string;
    name: string;
    price: number;
  }[];
  hashtags: string[];
}

interface SocialFeedGridProps {
  posts: SocialPost[];
}

export default function SocialFeedGrid({ posts }: SocialFeedGridProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  // Default posts if none provided
  const defaultPosts: SocialPost[] = [
    {
      id: "1",
      type: "photo",
      user: { name: "Fashion Lover", username: "fashionista", avatar: "" },
      media: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800",
      caption: "Loving this summer outfit! Perfect for the weekend ☀️",
      likes: 234,
      comments: 12,
      products: [{ id: "f1", name: "Summer Dress", price: 79.99 }],
      hashtags: ["SummerStyle", "OOTD", "Fashion"]
    },
    {
      id: "2", 
      type: "video",
      user: { name: "Tech Reviews", username: "techguru", avatar: "" },
      media: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
      caption: "Unboxing the latest iPhone! Amazing camera quality 📱",
      likes: 567,
      comments: 43,
      products: [{ id: "e1", name: "iPhone 16 Pro", price: 999.99 }],
      hashtags: ["TechReview", "iPhone", "Unboxing"]
    },
    {
      id: "3",
      type: "photo", 
      user: { name: "Home Designer", username: "homedesign", avatar: "" },
      media: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F12cf36128d7947609a98a09da23bcd6d?format=webp&width=800",
      caption: "Transformed my living room with these amazing finds! 🏠",
      likes: 189,
      comments: 8,
      products: [{ id: "h1", name: "Decorative Vase", price: 49.99 }],
      hashtags: ["HomeDecor", "InteriorDesign", "Decor"]
    }
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  // Create placeholder posts to fill grid
  const allPosts = [...displayPosts];
  while (allPosts.length < 9) {
    allPosts.push({
      id: `placeholder-${allPosts.length}`,
      type: "photo",
      user: { name: "User", username: "user", avatar: "" },
      media: "",
      caption: "Social post placeholder",
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
      products: [{ id: "p1", name: "Product", price: 29.99 }],
      hashtags: ["Trending"]
    });
  }

  return (
    <section className="py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Social Feed</h2>
          <p className="text-gray-600">Real customers, real reviews, real style</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.slice(0, 9).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Media */}
              <div className="relative aspect-square bg-gray-100">
                {post.media ? (
                  <>
                    <img 
                      src={post.media} 
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='16'%3ESocial Post%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2 opacity-50"></div>
                      <p className="text-sm">Social Post</p>
                    </div>
                  </div>
                )}

                {/* User overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Avatar className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                      {post.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-full">
                    @{post.user.username}
                  </span>
                </div>

                {/* Shop button overlay */}
                <div className="absolute top-3 right-3">
                  <Button
                    size="sm"
                    className="bg-white/90 text-black hover:bg-white rounded-full text-xs px-3 py-1 h-7"
                  >
                    Shop This Look
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Caption */}
                <p className="text-sm text-gray-700 line-clamp-2">{post.caption}</p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Products */}
                {post.products.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-2">Featured products:</p>
                    {post.products.slice(0, 2).map((product) => (
                      <div key={product.id} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{product.name}</span>
                        <span className="font-bold text-purple-600">£{product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart 
                        className={`w-5 h-5 mr-1 ${likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                      <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-600">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-600">
                      <Share className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full text-xs px-4 py-1 h-7"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Shop
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full"
          >
            Load More Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
