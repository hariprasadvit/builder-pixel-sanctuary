import { useState } from "react";
import { ChevronRight, Play, Volume2, VolumeX, Filter, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function Index() {
  const [isMuted, setIsMuted] = useState(true);
  const { currentMarketplace, getDeliveryTime, getCurrencySymbol } = useMarketplace();

  // Mock data with realistic product images
  const categories = [
    {
      id: '1',
      name: 'Electronics',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc6001bf2a08e4f5d8f6f64acceaba8f1?format=webp&width=800',
      subcategories: ['Computers', 'Mobile Phones', 'Audio', 'Wearables']
    },
    {
      id: '2',
      name: 'TVs / Video',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Febf594d6a2184a96acd8cfb15383b1a8?format=webp&width=800',
      subcategories: ['Smart TVs', 'Streaming Devices', 'Projectors']
    },
    {
      id: '3',
      name: 'Video Games',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F29d21051a0914626a49de19684e9befd?format=webp&width=800',
      subcategories: ['Consoles', 'Games', 'Accessories']
    },
    {
      id: '4',
      name: 'Cameras & Photo',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F798dd616ad5a4f9092588913656e1a41?format=webp&width=800',
      subcategories: ['Digital Cameras', 'Lenses', 'Accessories']
    },
    {
      id: '5',
      name: 'Cell Phones',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800',
      subcategories: ['Smartphones', 'Cases', 'Chargers']
    },
    {
      id: '6',
      name: 'Sports & Outdoors',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800',
      subcategories: ['Fitness', 'Cycling', 'Camping']
    },
    {
      id: '7',
      name: 'Apparel',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800',
      subcategories: ['Mens Clothing', 'Womens Clothing', 'Shoes']
    },
    {
      id: '8',
      name: 'Car Electronics',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800',
      subcategories: ['Audio Systems', 'GPS', 'Dash Cams']
    },
  ];

  // Enhanced product data with marketplace filtering
  const allProducts = [
    {
      id: '1',
      image: '/placeholder.svg',
      title: 'iPhone 15 Pro Max 256GB Natural Titanium',
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      origin: 'UK' as const,
      deliveryEta: getDeliveryTime('uk'),
      hasVideo: true,
      marketplaces: ['nearbuy', 'uk'],
      category: 'Electronics',
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: '2',
      image: '/placeholder.svg',
      title: 'Samsung Galaxy Buds Pro Wireless Earbuds',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.5,
      reviewCount: 1234,
      origin: 'China' as const,
      deliveryEta: getDeliveryTime('china'),
      hasVideo: false,
      marketplaces: ['nearbuy', 'china'],
      category: 'Electronics',
      isPersonalized: false,
      recentlyViewed: true,
    },
    {
      id: '3',
      image: '/placeholder.svg',
      title: 'Nike Air Max 270 Running Shoes',
      price: 119.99,
      rating: 4.7,
      reviewCount: 567,
      origin: 'UK' as const,
      deliveryEta: getDeliveryTime('uk'),
      hasVideo: true,
      marketplaces: ['nearbuy', 'uk'],
      category: 'Sports & Outdoors',
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: '4',
      image: '/placeholder.svg',
      title: 'Dyson V15 Detect Absolute Cordless Vacuum',
      price: 549.99,
      rating: 4.9,
      reviewCount: 892,
      origin: 'UK' as const,
      deliveryEta: getDeliveryTime('uk'),
      hasVideo: false,
      marketplaces: ['nearbuy', 'uk'],
      category: 'Home & Garden',
      isPersonalized: false,
      recentlyViewed: true,
    },
    {
      id: '5',
      image: '/placeholder.svg',
      title: 'Xiaomi Mi 13 Ultra 512GB Smartphone',
      price: 649.99,
      originalPrice: 799.99,
      rating: 4.6,
      reviewCount: 1567,
      origin: 'China' as const,
      deliveryEta: getDeliveryTime('china'),
      hasVideo: true,
      marketplaces: ['china'],
      category: 'Electronics',
      isPersonalized: true,
      recentlyViewed: false,
    },
    {
      id: '6',
      image: '/placeholder.svg',
      title: 'Local Artisan Coffee Beans 1kg',
      price: 24.99,
      rating: 4.8,
      reviewCount: 234,
      origin: 'UK' as const,
      deliveryEta: getDeliveryTime('nearbuy'),
      hasVideo: false,
      marketplaces: ['nearbuy'],
      category: 'Food & Beverages',
      isPersonalized: false,
      recentlyViewed: false,
    },
  ];

  // Filter products based on current marketplace
  const getFilteredProducts = () => {
    return allProducts.filter(product =>
      product.marketplaces.includes(currentMarketplace)
    );
  };

  const trendingProducts = getFilteredProducts().slice(0, 4);

  // Personalized recommendations based on user behavior
  const personalizedProducts = getFilteredProducts().filter(product => product.isPersonalized);

  // Recently viewed products
  const recentlyViewedProducts = getFilteredProducts().filter(product => product.recentlyViewed);

  const ukProducts = [
    {
      id: '5',
      image: '/placeholder.svg',
      title: 'Marks & Spencer Wool Blend Coat',
      price: 159.99,
      rating: 4.6,
      reviewCount: 234,
      origin: 'UK' as const,
      deliveryEta: 'Same day',
      hasVideo: false,
    },
    {
      id: '6',
      image: '/placeholder.svg',
      title: 'John Lewis Premium Cotton Bedding Set',
      price: 89.99,
      rating: 4.8,
      reviewCount: 445,
      origin: 'UK' as const,
      deliveryEta: 'Tomorrow',
      hasVideo: false,
    },
    {
      id: '7',
      image: '/placeholder.svg',
      title: 'Waitrose Organic Tea Collection',
      price: 24.99,
      rating: 4.7,
      reviewCount: 167,
      origin: 'UK' as const,
      deliveryEta: 'Today',
      hasVideo: false,
    },
    {
      id: '11',
      image: '/placeholder.svg',
      title: 'Burberry Classic Trench Coat',
      price: 1890.99,
      rating: 4.9,
      reviewCount: 89,
      origin: 'UK' as const,
      deliveryEta: 'Next week',
      hasVideo: false,
    },
  ];

  const chinaProducts = [
    {
      id: '8',
      image: '/placeholder.svg',
      title: 'Xiaomi Mi 13 Ultra 512GB Smartphone',
      price: 649.99,
      originalPrice: 799.99,
      rating: 4.6,
      reviewCount: 1567,
      origin: 'China' as const,
      deliveryEta: '7-10 days',
      hasVideo: true,
    },
    {
      id: '9',
      image: '/placeholder.svg',
      title: 'DJI Mini 3 Pro Drone with Controller',
      price: 429.99,
      rating: 4.8,
      reviewCount: 987,
      origin: 'China' as const,
      deliveryEta: '5-7 days',
      hasVideo: true,
    },
    {
      id: '10',
      image: '/placeholder.svg',
      title: 'Anker PowerCore 26800 Portable Charger',
      price: 45.99,
      rating: 4.5,
      reviewCount: 2234,
      origin: 'China' as const,
      deliveryEta: '3-5 days',
      hasVideo: false,
    },
    {
      id: '12',
      image: '/placeholder.svg',
      title: 'OnePlus 11 5G 256GB Smartphone',
      price: 549.99,
      originalPrice: 699.99,
      rating: 4.7,
      reviewCount: 1203,
      origin: 'China' as const,
      deliveryEta: '5-8 days',
      hasVideo: true,
    },
  ];

  const videoProducts = [
    {
      id: 'v1',
      image: '/placeholder.svg',
      title: 'MacBook Pro 14" M3 Chip',
      price: 1699.99,
      origin: 'UK' as const,
    },
    {
      id: 'v2',
      image: '/placeholder.svg',
      title: 'Sony WH-1000XM5 Headphones',
      price: 349.99,
      origin: 'China' as const,
    },
    {
      id: 'v3',
      image: '/placeholder.svg',
      title: 'iPad Pro 12.9" 1TB',
      price: 1449.99,
      origin: 'UK' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />


      {/* Quick Categories */}
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold">Shop by Category</h2>
            <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white">
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
                      <h3 className="font-semibold text-xs md:text-sm text-gray-900 mb-1 line-clamp-2">{category.name}</h3>
                      <p className="text-gray-600 text-xs hidden md:block">
                        {category.subcategories.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Near You */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold">Trending Near You</h2>
            <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                onAddToCart={(id) => console.log('Add to cart:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top from UK */}
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold">Top from UK</h2>
              <Badge className="bg-blue-600 text-xs">Fast Delivery</Badge>
            </div>
            <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ukProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                onAddToCart={(id) => console.log('Add to cart:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks from China */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold">Editor's Picks from China</h2>
              <Badge className="bg-red-600 text-xs">Great Value</Badge>
            </div>
            <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {chinaProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                onAddToCart={(id) => console.log('Add to cart:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Short Video Rail */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Product Videos</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-brand-blue"
            >
              {isMuted ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
              {isMuted ? 'Unmute' : 'Mute'}
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
                        product.origin === 'UK'
                          ? 'bg-blue-600'
                          : 'bg-red-600'
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
                <h2 className="text-lg md:text-xl font-bold">Recommended for You</h2>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Personalized</span>
                </Badge>
              </div>
              <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {personalizedProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <section className="py-6 md:py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold">Recently Viewed</h2>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Continue Shopping</span>
                </Badge>
              </div>
              <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
                Clear History
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {recentlyViewedProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
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
              <h3 className="text-lg md:text-xl font-bold mb-2">Compare Products</h3>
              <p className="mb-4 text-white/90 text-sm md:text-base">
                Found similar products? Compare features, prices, and reviews side by side.
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
