import { useState } from "react";
import {
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Filter,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const { currentMarketplace, getDeliveryTime, getCurrencySymbol } =
    useMarketplace();

  // Mock data with realistic product images
  const categories = [
    {
      id: "1",
      name: "Electronics",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc6001bf2a08e4f5d8f6f64acceaba8f1?format=webp&width=800",
      subcategories: ["Computers", "Mobile Phones", "Audio", "Wearables"],
    },
    {
      id: "2",
      name: "TVs / Video",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Febf594d6a2184a96acd8cfb15383b1a8?format=webp&width=800",
      subcategories: ["Smart TVs", "Streaming Devices", "Projectors"],
    },
    {
      id: "3",
      name: "Video Games",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F29d21051a0914626a49de19684e9befd?format=webp&width=800",
      subcategories: ["Consoles", "Games", "Accessories"],
    },
    {
      id: "4",
      name: "Cameras & Photo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F798dd616ad5a4f9092588913656e1a41?format=webp&width=800",
      subcategories: ["Digital Cameras", "Lenses", "Accessories"],
    },
    {
      id: "5",
      name: "Cell Phones",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
      subcategories: ["Smartphones", "Cases", "Chargers"],
    },
    {
      id: "6",
      name: "Sports & Outdoors",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800",
      subcategories: ["Fitness", "Cycling", "Camping"],
    },
    {
      id: "7",
      name: "Apparel",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800",
      subcategories: ["Mens Clothing", "Womens Clothing", "Shoes"],
    },
    {
      id: "8",
      name: "Car Electronics",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800",
      subcategories: ["Audio Systems", "GPS", "Dash Cams"],
    },
  ];

  // Enhanced product data with marketplace filtering and new images
  const allProducts = [
    {
      id: "1",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
      title: "iPhone 16 Pro Max 256GB with Camera Control",
      price: 999.99,
      originalPrice: 1099.99,
      rating: 4.8,
      reviewCount: 2847,
      origin: "UK" as const,
      deliveryEta: getDeliveryTime("uk"),
      hasVideo: true,
      marketplaces: ["nearbuy", "uk"],
      category: "Electronics",
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: "2",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
      title: "Samsung Galaxy Buds Pro Wireless Earbuds",
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.5,
      reviewCount: 1234,
      origin: "China" as const,
      deliveryEta: getDeliveryTime("china"),
      hasVideo: false,
      marketplaces: ["nearbuy", "china"],
      category: "Electronics",
      isPersonalized: false,
      recentlyViewed: true,
    },
    {
      id: "3",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=800",
      title: "Nike Air Max Plus Running Shoes",
      price: 119.99,
      rating: 4.7,
      reviewCount: 567,
      origin: "UK" as const,
      deliveryEta: getDeliveryTime("uk"),
      hasVideo: true,
      marketplaces: ["nearbuy", "uk"],
      category: "Sports & Outdoors",
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: "4",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=800",
      title: "Dyson V15 Detect Absolute Cordless Vacuum",
      price: 549.99,
      rating: 4.9,
      reviewCount: 892,
      origin: "UK" as const,
      deliveryEta: getDeliveryTime("uk"),
      hasVideo: false,
      marketplaces: ["nearbuy", "uk"],
      category: "Home & Garden",
      isPersonalized: false,
      recentlyViewed: true,
    },
    {
      id: "5",
      image: "/placeholder.svg",
      title: "Xiaomi Mi 13 Ultra 512GB Smartphone",
      price: 649.99,
      originalPrice: 799.99,
      rating: 4.6,
      reviewCount: 1567,
      origin: "China" as const,
      deliveryEta: getDeliveryTime("china"),
      hasVideo: true,
      marketplaces: ["china"],
      category: "Electronics",
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: "6",
      image: "/placeholder.svg",
      title: "Local Artisan Coffee Beans 1kg",
      price: 24.99,
      rating: 4.8,
      reviewCount: 234,
      origin: "UK" as const,
      deliveryEta: getDeliveryTime("nearbuy"),
      hasVideo: false,
      marketplaces: ["nearbuy"],
      category: "Food & Beverages",
      isPersonalized: false,
      recentlyViewed: false,
    },
  ];

  // Filter products based on current marketplace
  const getFilteredProducts = () => {
    return allProducts.filter((product) =>
      product.marketplaces.includes(currentMarketplace),
    );
  };

  const trendingProducts = getFilteredProducts().slice(0, 4);

  // Personalized recommendations based on user behavior
  const personalizedProducts = getFilteredProducts().filter(
    (product) => product.isPersonalized,
  );

  // Recently viewed products
  const recentlyViewedProducts = getFilteredProducts().filter(
    (product) => product.recentlyViewed,
  );

  const ukProducts = [
    {
      id: "5",
      image: "/placeholder.svg",
      title: "Marks & Spencer Wool Blend Coat",
      price: 159.99,
      rating: 4.6,
      reviewCount: 234,
      origin: "UK" as const,
      deliveryEta: "Same day",
      hasVideo: false,
    },
    {
      id: "6",
      image: "/placeholder.svg",
      title: "John Lewis Premium Cotton Bedding Set",
      price: 89.99,
      rating: 4.8,
      reviewCount: 445,
      origin: "UK" as const,
      deliveryEta: "Tomorrow",
      hasVideo: false,
    },
    {
      id: "7",
      image: "/placeholder.svg",
      title: "Waitrose Organic Tea Collection",
      price: 24.99,
      rating: 4.7,
      reviewCount: 167,
      origin: "UK" as const,
      deliveryEta: "Today",
      hasVideo: false,
    },
    {
      id: "11",
      image: "/placeholder.svg",
      title: "Burberry Classic Trench Coat",
      price: 1890.99,
      rating: 4.9,
      reviewCount: 89,
      origin: "UK" as const,
      deliveryEta: "Next week",
      hasVideo: false,
    },
  ];

  const chinaProducts = [
    {
      id: "8",
      image: "/placeholder.svg",
      title: "Xiaomi Mi 13 Ultra 512GB Smartphone",
      price: 649.99,
      originalPrice: 799.99,
      rating: 4.6,
      reviewCount: 1567,
      origin: "China" as const,
      deliveryEta: "7-10 days",
      hasVideo: true,
    },
    {
      id: "9",
      image: "/placeholder.svg",
      title: "DJI Mini 3 Pro Drone with Controller",
      price: 429.99,
      rating: 4.8,
      reviewCount: 987,
      origin: "China" as const,
      deliveryEta: "5-7 days",
      hasVideo: true,
    },
    {
      id: "10",
      image: "/placeholder.svg",
      title: "Anker PowerCore 26800 Portable Charger",
      price: 45.99,
      rating: 4.5,
      reviewCount: 2234,
      origin: "China" as const,
      deliveryEta: "3-5 days",
      hasVideo: false,
    },
    {
      id: "12",
      image: "/placeholder.svg",
      title: "OnePlus 11 5G 256GB Smartphone",
      price: 549.99,
      originalPrice: 699.99,
      rating: 4.7,
      reviewCount: 1203,
      origin: "China" as const,
      deliveryEta: "5-8 days",
      hasVideo: true,
    },
  ];

  const videoProducts = [
    {
      id: "v1",
      image: "/placeholder.svg",
      title: 'MacBook Pro 14" M3 Chip',
      price: 1699.99,
      origin: "UK" as const,
    },
    {
      id: "v2",
      image: "/placeholder.svg",
      title: "Sony WH-1000XM5 Headphones",
      price: 349.99,
      origin: "China" as const,
    },
    {
      id: "v3",
      image: "/placeholder.svg",
      title: 'iPad Pro 12.9" 1TB',
      price: 1449.99,
      origin: "UK" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick Categories - Tighter spacing */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold">Shop by Category</h2>
            <Button
              variant="ghost"
              className="text-brand-blue text-sm md:text-base"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2 md:mb-4 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-xs md:text-sm text-gray-900 mb-1 line-clamp-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-xs hidden md:block">
                        {category.subcategories.slice(0, 2).join(" • ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day - Limited Time Offers */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  ⚡ Deals of the Day
                  <span className="bg-red-600 text-white text-sm px-2 py-1 rounded-full animate-pulse">LIVE</span>
                </h2>
                <p className="text-sm text-gray-600">Limited time offers - Don't miss out!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Ends in</div>
              <div className="text-red-600 font-bold font-mono">23:59:42</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Deal Card */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-200 relative">
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    60% OFF
                  </div>
                </div>
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F68d763e3135547ed9fd68f6c12a33286?format=webp&width=800"
                    alt="Deal of the Day"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Today's Mega Deal</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-red-600">£299.99</span>
                    <span className="text-lg text-gray-500 line-through">£749.99</span>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 font-semibold">
                    Claim Deal Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Deals */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-200">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Product Image]
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Quick Deal #1</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">£89.99</span>
                  <span className="text-xs text-gray-500 line-through">£129.99</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-200">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Product Image]
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Quick Deal #2</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">£149.99</span>
                  <span className="text-xs text-gray-500 line-through">£199.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Near You - Enhanced Design */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-200 to-cyan-200 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Trending Near You</h2>
                <p className="text-sm text-gray-600 mt-1">Discover what's popular in your area</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm md:text-base font-medium"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group relative ${index === 0 ? "cursor-pointer" : ""}`}
                onClick={index === 0 ? () => navigate(`/product/${product.id}`) : undefined}
              >
                {/* Enhanced Card with Gradient Background */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden border border-gray-100">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Trending Badge */}
                  {index < 2 && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                        🔥 Hot
                      </div>
                    </div>
                  )}

                  <div className="relative z-10">
                    <ProductCard
                      {...product}
                      onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                      onAddToCart={(id) => console.log("Add to cart:", id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live trends updated every hour</span>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers This Week */}
      <section className="py-8 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  🏆 Best Sellers This Week
                </h2>
                <p className="text-sm text-gray-600">Most popular items in your area</p>
              </div>
            </div>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{item}
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                      [Product {item}]
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    Best Seller #{item}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500">(4.8)</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">£{99 + item * 50}.99</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top from UK */}
      <section className="py-6 md:py-8 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold">Top from UK</h2>
              <Badge className="bg-blue-600 text-xs">Fast Delivery</Badge>
            </div>
            <Button
              variant="ghost"
              className="text-brand-blue text-sm md:text-base"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ukProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                onAddToCart={(id) => console.log("Add to cart:", id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Spotlight */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">✨ Brand Spotlight</h2>
            <p className="text-gray-600">Featured brands and exclusive collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brand Card 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-2xl font-bold text-blue-800">[Brand Logo]</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium Tech Brand</h3>
                <p className="text-gray-600 mb-4">Discover cutting-edge technology and innovation</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Collection
                </Button>
              </div>
            </div>

            {/* Brand Card 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-2xl font-bold text-green-800">[Brand Logo]</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Eco-Friendly Living</h3>
                <p className="text-gray-600 mb-4">Sustainable products for a better tomorrow</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Shop Sustainable
                </Button>
              </div>
            </div>

            {/* Brand Card 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="text-2xl font-bold text-purple-800">[Brand Logo]</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Luxury Fashion</h3>
                <p className="text-gray-600 mb-4">Exclusive designer collections and limited editions</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Luxury Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Picks from China */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold">
                Editor's Picks from China
              </h2>
              <Badge className="bg-red-600 text-xs">Great Value</Badge>
            </div>
            <Button
              variant="ghost"
              className="text-brand-blue text-sm md:text-base"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {chinaProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                onAddToCart={(id) => console.log("Add to cart:", id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  🆕 New Arrivals
                  <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full">Fresh</span>
                </h2>
                <p className="text-sm text-gray-600">Just landed - Be the first to shop</p>
              </div>
            </div>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Featured New Product */}
            <div className="md:col-span-2 md:row-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full border border-emerald-200">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-teal-100 relative">
                  <div className="absolute top-4 right-4">
                    <div className="bg-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-emerald-600 font-bold text-xl">
                    [Featured New Product]
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Revolutionary New Product</h3>
                  <p className="text-gray-600 mb-3">The latest innovation that's changing the game</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-emerald-600">£399.99</span>
                    <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full">Launch Price</span>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Pre-Order Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Small New Items */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
                <div className="aspect-square bg-gray-100 relative">
                  <div className="absolute top-2 right-2">
                    <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [New {item}]
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-gray-900 mb-1">New Product {item}</div>
                  <div className="text-emerald-600 font-bold">£{129 + item * 20}.99</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 py-8 px-6 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                ⚡ FLASH SALE ⚡
                <span className="bg-yellow-400 text-black text-lg px-3 py-1 rounded-full animate-bounce">
                  NOW ON
                </span>
              </h2>
              <p className="text-xl mb-6">Up to 80% OFF on selected items - Limited quantity!</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">02</div>
                  <div className="text-sm">Hours</div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">45</div>
                  <div className="text-sm">Minutes</div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">30</div>
                  <div className="text-sm">Seconds</div>
                </div>
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-3">
                Shop Flash Sale Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Short Video Rail */}
      <section className="py-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Product Videos</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-brand-blue"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 mr-1" />
              ) : (
                <Volume2 className="w-4 h-4 mr-1" />
              )}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {videoProducts.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-40 md:w-48">
                <Card className="overflow-hidden">
                  <div className="relative aspect-[9/16] bg-gray-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-5 md:w-6 h-5 md:h-6 text-white fill-white" />
                      </div>
                    </div>

                    {/* Origin Badge */}
                    <Badge
                      className={`absolute top-2 left-2 text-xs ${
                        product.origin === "UK" ? "bg-blue-600" : "bg-red-600"
                      }`}
                    >
                      {product.origin}
                    </Badge>

                    {/* Mute Indicator */}
                    {isMuted && (
                      <div className="absolute top-2 right-2 w-5 md:w-6 h-5 md:h-6 bg-black/50 rounded-full flex items-center justify-center">
                        <VolumeX className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-2 md:p-3">
                    <h3 className="font-medium text-xs md:text-sm line-clamp-2 mb-1">
                      {product.title}
                    </h3>
                    <p className="font-bold text-brand-dark text-sm">
                      £{product.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      {personalizedProducts.length > 0 && (
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold">
                  Recommended for You
                </h2>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Personalized</span>
                </Badge>
              </div>
              <Button
                variant="ghost"
                className="text-brand-blue text-sm md:text-base"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {personalizedProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                  onAddToCart={(id) => console.log("Add to cart:", id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <section className="py-6 md:py-8 bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold">
                  Recently Viewed
                </h2>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Continue Shopping</span>
                </Badge>
              </div>
              <Button
                variant="ghost"
                className="text-brand-blue text-sm md:text-base"
              >
                Clear History
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {recentlyViewedProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                  onAddToCart={(id) => console.log("Add to cart:", id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Comparison CTA */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white">
            <CardContent className="p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Compare Products
              </h3>
              <p className="mb-4 text-white/90 text-sm md:text-base">
                Found similar products? Compare features, prices, and reviews
                side by side.
              </p>
              <Button className="bg-white text-brand-blue hover:bg-white/90 text-sm md:text-base">
                Start Comparing
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
