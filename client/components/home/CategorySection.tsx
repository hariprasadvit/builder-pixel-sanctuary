import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialFeedCard, { type SocialFeedItem } from "@/components/social/SocialFeedCard";
import { Card } from "@/components/ui/card";

export type CategoryProduct = { 
  id: string; 
  title: string; 
  image: string; 
  price: number; 
  originalPrice?: number;
};

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  reels: SocialFeedItem[];
  products?: CategoryProduct[];
  backgroundColor?: string;
  titleIcon?: string;
  viewAllLink?: string;
}

export default function CategorySection({ 
  title, 
  subtitle, 
  reels, 
  products = [], 
  backgroundColor = "bg-white",
  titleIcon = "",
  viewAllLink = "#"
}: CategorySectionProps) {
  // Mix reels and products for dynamic display
  const displayItems = [];
  const maxReels = Math.min(reels.length, 5); // Limit to 5 reels as requested
  
  // Add reels first
  for (let i = 0; i < maxReels; i++) {
    if (reels[i]) {
      displayItems.push({ type: 'reel', item: reels[i], key: `reel-${reels[i].id}` });
    }
  }
  
  // Add a few products if available
  const maxProducts = Math.min(products.length, 3);
  for (let i = 0; i < maxProducts; i++) {
    if (products[i]) {
      displayItems.push({ type: 'product', item: products[i], key: `product-${products[i].id}` });
    }
  }

  return (
    <section className={`py-6 md:py-8 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                {titleIcon && <span>{titleIcon}</span>}
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Featured Reels Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            ✨ Featured Reels - {title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {displayItems.map((displayItem) => {
              if (displayItem.type === 'reel') {
                const reel = displayItem.item as SocialFeedItem;
                return (
                  <div key={displayItem.key} className="col-span-1">
                    <SocialFeedCard item={reel} compact className="h-full" />
                  </div>
                );
              } else {
                const product = displayItem.item as CategoryProduct;
                return (
                  <div key={displayItem.key} className="col-span-1">
                    <Card className="overflow-hidden rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 group">
                      <div className="relative aspect-[3/4] bg-gray-100">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                          <div className="text-white text-xs font-semibold line-clamp-2 mb-1">
                            {product.title}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-white">
                              <span className="font-bold">£{product.price.toFixed(2)}</span>
                              {product.originalPrice && (
                                <span className="text-xs line-through ml-1 opacity-75">
                                  £{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button size="sm" className="h-6 px-2 text-xs bg-white/90 text-black hover:bg-white">
                              Shop
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Category Products Grid - if more products available */}
        {products.length > 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Popular in {title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {products.slice(3, 9).map((product) => (
                <Card key={`extra-${product.id}`} className="overflow-hidden rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group">
                  <div className="relative aspect-square bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-2 md:p-3">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-900">£{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-500">
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
