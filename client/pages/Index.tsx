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
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const { currentMarketplace, getDeliveryTime, getCurrencySymbol } =
    useMarketplace();
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    // Find the product in all products arrays
    const allProductsData = [...allProducts, ...ukProducts, ...chinaProducts];
    const product = allProductsData.find((p) => p.id === productId);

    if (product) {
      const vendorMap: Record<string, any> = {
        UK: "uk",
        China: "china",
      };

      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        vendor: vendorMap[product.origin] || "nearbuy",
        vendorName: `${product.origin} Marketplace`,
        category: (product as any).category || "General",
        shippingWeight: 1.0, // Default weight
      });
    }
  };

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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=800",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=800",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8887b09d9bf34ca59cea9a5134a30613?format=webp&width=800",
      title: "Women's Casual Fashion Collection",
      price: 159.99,
      rating: 4.6,
      reviewCount: 234,
      origin: "UK" as const,
      deliveryEta: "Same day",
      hasVideo: false,
    },
    {
      id: "6",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F553f83079d584f98b998ffbf332afc0d?format=webp&width=800",
      title: "Premium Bedding & Home Decor",
      price: 89.99,
      rating: 4.8,
      reviewCount: 445,
      origin: "UK" as const,
      deliveryEta: "Tomorrow",
      hasVideo: false,
    },
    {
      id: "7",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4d0382344ba241c7b444ca142bd885df?format=webp&width=800",
      title: "Artisan Coffee Collection",
      price: 24.99,
      rating: 4.7,
      reviewCount: 167,
      origin: "UK" as const,
      deliveryEta: "Today",
      hasVideo: false,
    },
    {
      id: "11",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F77bcae8814be429ba5ad9507b8c55021?format=webp&width=800",
      title: "Designer Fashion Collection",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1da87ba82b9f4805abefe907cda741de?format=webp&width=800",
      title: "Xiaomi 14 Ultra Premium Collection",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5f0d3e3daf6a4ee488235a304a431df4?format=webp&width=800",
      title: "DJI Mini 4 Pro Drone with Controller",
      price: 429.99,
      rating: 4.8,
      reviewCount: 987,
      origin: "China" as const,
      deliveryEta: "5-7 days",
      hasVideo: true,
    },
    {
      id: "10",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3433b18277c24cc6a3a43bf43493561a?format=webp&width=800",
      title: "Anker PowerCore+ Fast Charging Hub",
      price: 45.99,
      rating: 4.5,
      reviewCount: 2234,
      origin: "China" as const,
      deliveryEta: "3-5 days",
      hasVideo: false,
    },
    {
      id: "12",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f7694c23254419d8717465c559dae2f?format=webp&width=800",
      title: "OnePlus 12 Pro 5G Collection",
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
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8ceaa469e146ff9bea81806abc63a1?format=webp&width=800",
      title: "LEGO Building Sets & Collectibles",
      price: 49.99,
      origin: "UK" as const,
    },
    {
      id: "v2",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800",
      title: "Suspense & Thriller Books Collection",
      price: 14.99,
      origin: "UK" as const,
    },
    {
      id: "v3",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa6a27f8d49eb4361a224932f357cf1af?format=webp&width=800",
      title: "The Silent Patient - Bestseller",
      price: 12.99,
      origin: "UK" as const,
    },
    {
      id: "v4",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F72eafa068f604ba993e614497f0a4379?format=webp&width=800",
      title: "Summer Fashion Collection",
      price: 89.99,
      origin: "China" as const,
    },
    {
      id: "v5",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4cf15493113a458da87690389a322da7?format=webp&width=800",
      title: "Designer Scarves & Accessories",
      price: 39.99,
      origin: "China" as const,
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
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border border-transparent hover:border-brand-blue/40"
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2 md:mb-4 bg-gray-50 rounded-lg overflow-hidden ring-0 group-hover:ring-2 group-hover:ring-brand-blue/30 transition-all">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-xs md:text-sm text-gray-900 group-hover:text-brand-blue mb-1 line-clamp-2 transition-colors">
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
      <section className="py-8 md:py-10 bg-gradient-to-br from-purple-50 via-blue-50 via-pink-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-200 to-pink-300 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    ⚡ Deals of the Day
                  </h2>
                  <span className="bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full animate-pulse self-start">
                    LIVE
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Limited time offers - Don't miss out!
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="text-sm text-gray-600">Ends in</div>
              <div className="text-red-600 font-bold font-mono text-lg">
                23:59:42
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Deal Card 1 */}
            <div className="">
              <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    60% OFF
                  </div>
                </div>
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F319deb5bd62f44adbe76dee2d2c91558?format=webp&width=800"
                    alt="Electronics Collection - Flash Sale on Home Appliances"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    Home Appliances
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm sm:text-lg font-bold text-red-600">
                      50% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    Flash Sale on appliances
                  </p>
                </div>
              </div>
            </div>

            {/* Deal Card 2 */}
            <div className="">
              <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    70% OFF
                  </div>
                </div>
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F199d372cf11f426bbd41c4f81a31c348?format=webp&width=800"
                    alt="Prime Day Deals"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    Prime Day Deals
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm sm:text-lg font-bold text-orange-600">
                      Up to 70% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    Limited time only
                  </p>
                </div>
              </div>
            </div>

            {/* Deal Card 3 */}
            <div className="">
              <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    25% OFF
                  </div>
                </div>
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2fdc4ff712c742b48b5f10e46b15af5a?format=webp&width=800"
                    alt="Biggest Deals"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    Biggest Deals
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm sm:text-lg font-bold text-purple-600">
                      Save Extra 25%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    On 1 Lakh+ styles
                  </p>
                </div>
              </div>
            </div>

            {/* Deal Card 4 */}
            <div className="">
              <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    50% OFF
                  </div>
                </div>
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800"
                    alt="Fashion Collection - Women's Fashion Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    Women's Fashion
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm sm:text-lg font-bold text-green-600">
                      Up to 50% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    Special fashion collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Near You - Enhanced Design */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-indigo-50 via-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-300 via-pink-300 to-purple-300 rounded-full blur-3xl transform translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-2xl transform -translate-x-32 -translate-y-32 opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Trending Near You
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Discover what's popular in your area
                </p>
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
                onClick={
                  index === 0
                    ? () => navigate(`/product/${product.id}`)
                    : undefined
                }
              >
                {/* Enhanced Card with Gradient Background */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden border border-gray-100">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Trending Badge */}
                  {index < 2 && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                        ���� Hot
                      </div>
                    </div>
                  )}

                  <div className="relative z-10">
                    <ProductCard
                      {...product}
                      onWishlistToggle={(id) =>
                        console.log("Toggle wishlist:", id)
                      }
                      onAddToCart={handleAddToCart}
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
              <span className="text-sm font-medium text-gray-700">
                Live trends updated every hour
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers This Week */}
      <section className="py-8 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  🏆 Best Sellers This Week
                </h2>
                <p className="text-sm text-gray-600">
                  Most popular items in your area
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-orange-600 hover:text-orange-700 shrink-0 self-start sm:self-center"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">View</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              {
                id: 1,
                title: "Smart Fitness Watch",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800",
                price: 199.99,
              },
              {
                id: 2,
                title: "Pet Training Collar",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9186d63f23f54c87b840ba9bf2b76731?format=webp&width=800",
                price: 149.99,
              },
              {
                id: 3,
                title: "Gaming Controller",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faf0007c350e64f1cb675c9fa56c8c6cc?format=webp&width=800",
                price: 299.99,
              },
              {
                id: 4,
                title: "Mountain Bicycle",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F83bd11634aff48988b2cd202ed37472c?format=webp&width=800",
                price: 399.99,
              },
              {
                id: 5,
                title: "Kitchen Mixer",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F530577c64eac4a5aae827ee06cd1c1d5?format=webp&width=800",
                price: 449.99,
              },
              {
                id: 6,
                title: "Energy Drinks Pack",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F02a4c749d1aa481aae948af8a5bdd6f1?format=webp&width=800",
                price: 549.99,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{item.id}
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-xs text-gray-500">(4.8)</span>
                  </div>
                  <div className="text-sm sm:text-lg font-bold text-gray-900">
                    £{item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top from UK */}
      <section className="py-6 md:py-8 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold">Top from UK</h2>
              <Badge className="bg-blue-600 text-xs whitespace-nowrap">
                Fast Delivery
              </Badge>
            </div>
            <Button
              variant="ghost"
              className="text-brand-blue text-sm md:text-base shrink-0 self-start sm:self-center"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">View</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ukProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Spotlight */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-purple-50 via-pink-50 via-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-300 rounded-full blur-3xl transform -translate-x-48"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200 via-blue-300 to-purple-300 rounded-full blur-3xl transform translate-x-40"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              ✨ Brand Spotlight
            </h2>
            <p className="text-gray-600">
              Featured brands and exclusive collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brand Card 1 - Audio Tech */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9c36f6de0762441eaf56d05097d7e6ac?format=webp&width=800"
                  alt="Monstrous Sound Audio Collection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">🔊 Monstrous Sound</h3>
                <p className="text-gray-600 mb-4">
                  14W Stereo Speakers • IPX5 Water & Dust Resistant
                </p>
                <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white">
                  Shop Audio Collection
                </Button>
              </div>
            </div>

            {/* Brand Card 2 - Men's Grooming */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3a1252877fca4d32a9a06270cc53f01b?format=webp&width=800"
                  alt="Bombay Shaving Company - Gift Him Something Dope"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  🎁 Bombay Shaving Co.
                </h3>
                <p className="text-gray-600 mb-4">
                  Premium Men's Grooming • Gift Him Something Dope
                </p>
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                  Explore Grooming
                </Button>
              </div>
            </div>

            {/* Brand Card 3 - Luxury Accessories */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F149b8178133442bfa33b7cce6645a6b1?format=webp&width=800"
                  alt="Selected Luxury Collection - Extra 12% Off"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">✨ Selected Luxury</h3>
                <p className="text-gray-600 mb-4">
                  A Glamorous Touch • Extra 12% OFF Designer Bags
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  Shop Luxury Now
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
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-emerald-50 via-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-8 right-8 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 left-8 w-64 h-64 bg-gradient-to-tr from-cyan-200 to-blue-300 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  �� New Arrivals
                  <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full">
                    Fresh
                  </span>
                </h2>
                <p className="text-sm text-gray-600">
                  Just landed - Be the first to shop
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                id: 1,
                title: "Premium Fashion Collection",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9ae770758b504c06abfd7b6ed7035552?format=webp&width=800",
                price: 299.99,
              },
              {
                id: 2,
                title: "Sustainable Grocery Essentials",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff1642fcfd99c43728eb57521166201df?format=webp&width=800",
                price: 189.99,
              },
              {
                id: 3,
                title: "Ergonomic Office Solutions",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F969cf7d59aef4d58aefcf41f55dd25ae?format=webp&width=800",
                price: 449.99,
              },
              {
                id: 4,
                title: "Tropical Home Decor",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F12cf36128d7947609a98a09da23bcd6d?format=webp&width=800",
                price: 159.99,
              },
              {
                id: 5,
                title: "Educational Science Kits",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb19c34fdf5046e3be0aaa118adb5760?format=webp&width=800",
                price: 79.99,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
                    <span className="text-sm sm:text-lg font-bold text-emerald-600">
                      £{item.price}
                    </span>
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full self-start">
                      Launch Price
                    </span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm">
                    Shop Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-2xl overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-indigo-300/15 rounded-full blur-lg"></div>
            </div>
            <div className="relative z-10 py-12 px-6 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                ⚡ FLASH SALE ⚡
                <span className="bg-yellow-400 text-black text-lg px-3 py-1 rounded-full animate-bounce">
                  NOW ON
                </span>
              </h2>
              <p className="text-xl mb-6">
                Up to 80% OFF on selected items - Limited quantity!
              </p>
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
              <Button
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-3 backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate("/flashsale")}
              >
                Shop Flash Sale Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Short Video Rail */}
      <section className="py-8 bg-gradient-to-br from-slate-100 via-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-gradient-to-tl from-indigo-300 to-purple-300 rounded-full blur-2xl"></div>
        </div>
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

      {/* Seasonal Collection */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-amber-50 via-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-200 via-orange-300 to-red-300 rounded-full blur-3xl transform translate-x-40 -translate-y-40"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-red-200 via-pink-200 to-orange-200 rounded-full blur-2xl transform -translate-x-36 translate-y-36"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🍂 Autumn Collection
            </h2>
            <p className="text-gray-600">Cozy up with our seasonal favorites</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category Tiles */}
            {[
              {
                name: "Colorful Sweaters",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2a6787b80b14476a80db21ea67609b51?format=webp&width=800",
              },
              {
                name: "Winter Outerwear",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9a9188694a1e45d7a8e4b7d2c406244a?format=webp&width=800",
              },
              {
                name: "Warm Accessories",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fee98e92f2e164d8f828cb6845ee08747?format=webp&width=800",
              },
              {
                name: "Home & Decor",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F50e4544c4ce0496b9970dc48aff7cf1f?format=webp&width=800",
              },
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden border border-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-white font-bold text-sm md:text-base text-center drop-shadow-lg">
                      {category.name}
                    </div>
                  </div>
                </div>
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
                  onAddToCart={handleAddToCart}
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
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Comparison CTA - Sleek Banner */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl overflow-hidden relative shadow-lg border border-white/20">
            {/* Minimal background elements */}
            <div className="absolute inset-0">
              {/* Simple floating dots */}
              <div className="absolute top-4 right-8 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-4 left-8 w-2 h-2 bg-purple-300/30 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-300/40 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
            </div>

            <div className="relative z-10 flex items-center justify-between p-6">
              {/* Left side - Compact content */}
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-12 h-12 bg-white/80 rounded-lg backdrop-blur-sm border border-gray-200 shadow-sm">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Products Compare
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Compare features, prices, and reviews side by side
                  </p>
                </div>

                {/* Inline feature indicators */}
                <div className="hidden lg:flex items-center gap-4 ml-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Side-by-side</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Price analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Reviews</span>
                  </div>
                </div>
              </div>

              {/* Right side - Action button */}
              <div className="flex items-center gap-4">
                {/* Mini visual indicators */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-10 bg-white/60 rounded border border-gray-200 flex items-center justify-center">
                    <div className="w-4 h-2 bg-blue-300 rounded"></div>
                  </div>
                  <span className="text-gray-400 text-xs">vs</span>
                  <div className="w-8 h-10 bg-white/60 rounded border border-gray-200 flex items-center justify-center">
                    <div className="w-4 h-2 bg-purple-300 rounded"></div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 transition-all duration-300 rounded-lg group hover:scale-105 shadow-md">
                  <span className="mr-2">Start Comparing</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
