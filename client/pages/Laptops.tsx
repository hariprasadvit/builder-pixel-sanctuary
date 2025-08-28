import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function Laptops() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentMarketplace, getCurrencySymbol } = useMarketplace();

  const laptopCategories = [
    {
      id: '1',
      name: 'Gaming Laptops',
      description: 'High-performance laptops for gaming and intensive tasks',
      brands: ['Dell G15', 'ASUS TUF Gaming', 'HP Pavilion Gaming', 'Lenovo Legion'],
      priceRange: '₹45,000 - ₹2,50,000',
      productCount: 245,
      features: ['Dedicated GPU', 'High Refresh Rate Display', 'Advanced Cooling']
    },
    {
      id: '2',
      name: 'Business Laptops',
      description: 'Professional laptops for work and productivity',
      brands: ['HP EliteBook', 'Lenovo ThinkPad', 'Dell Latitude', 'ASUS ExpertBook'],
      priceRange: '₹35,000 - ₹1,80,000',
      productCount: 189,
      features: ['Long Battery Life', 'Security Features', 'Lightweight Design']
    },
    {
      id: '3',
      name: 'Ultrabooks',
      description: 'Slim, lightweight laptops for portability',
      brands: ['Lenovo Yoga', 'Apple MacBook', 'Dell XPS', 'HP Spectre'],
      priceRange: '₹55,000 - ₹3,00,000',
      productCount: 156,
      features: ['Ultra-thin Design', 'Premium Build', 'All-day Battery']
    },
    {
      id: '4',
      name: 'General Purpose',
      description: 'Everyday laptops for home and office use',
      brands: ['Dell Inspiron', 'HP Pavilion', 'Lenovo IdeaPad', 'Acer Aspire'],
      priceRange: '₹25,000 - ₹75,000',
      productCount: 423,
      features: ['Affordable Price', 'Reliable Performance', 'Good Value']
    },
  ];

  const featuredLaptops = [
    {
      id: '1',
      image: '/placeholder.svg',
      title: 'Dell G15 5530 Gaming Laptop',
      price: 75999,
      originalPrice: 89999,
      rating: 4.6,
      reviewCount: 1247,
      origin: 'UK' as const,
      deliveryEta: '2-3 days',
      hasVideo: true,
      specs: 'Intel i5-13450HX, RTX 3050, 16GB RAM, 1TB SSD'
    },
    {
      id: '2',
      image: '/placeholder.svg',
      title: 'HP EliteBook Ultra G1i Business',
      price: 125999,
      originalPrice: 149999,
      rating: 4.8,
      reviewCount: 634,
      origin: 'UK' as const,
      deliveryEta: '1-2 days',
      hasVideo: false,
      specs: 'Intel Core Ultra 7, 32GB RAM, 512GB SSD, 2.8K OLED'
    },
    {
      id: '3',
      image: '/placeholder.svg',
      title: 'Lenovo Yoga Slim 9i Ultrabook',
      price: 145999,
      rating: 4.7,
      reviewCount: 422,
      origin: 'China' as const,
      deliveryEta: '3-5 days',
      hasVideo: true,
      specs: 'Intel Core Ultra 7, 16GB RAM, 1TB SSD, 4K OLED'
    },
    {
      id: '4',
      image: '/placeholder.svg',
      title: 'ASUS TUF Gaming F15',
      price: 68999,
      originalPrice: 79999,
      rating: 4.5,
      reviewCount: 892,
      origin: 'China' as const,
      deliveryEta: '2-4 days',
      hasVideo: true,
      specs: 'Intel i7-11800H, RTX 3050 Ti, 16GB RAM, 512GB SSD'
    },
    {
      id: '5',
      image: '/placeholder.svg',
      title: 'Dell Inspiron 3530 Everyday',
      price: 42999,
      rating: 4.3,
      reviewCount: 567,
      origin: 'UK' as const,
      deliveryEta: '1-2 days',
      hasVideo: false,
      specs: 'Intel i3-1305U, 8GB RAM, 512GB SSD, 15.6" FHD'
    },
    {
      id: '6',
      image: '/placeholder.svg',
      title: 'HP 15s General Purpose',
      price: 38999,
      rating: 4.2,
      reviewCount: 743,
      origin: 'UK' as const,
      deliveryEta: '1-2 days',
      hasVideo: false,
      specs: 'Intel i3-1215U, 8GB RAM, 512GB SSD, 15.6" FHD'
    },
  ];

  const filteredLaptops = selectedCategory 
    ? featuredLaptops.filter(() => true) // In real app, filter by category
    : featuredLaptops;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-brand-blue"
              >
                ← Back to Electronics
              </Button>
            </div>
            <h1 className="text-xl font-bold">Laptops</h1>
          </div>
        </div>
      </div>

      {/* Electronics Banner */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3012a8ef6bc84d1f89d0e2e312467ee9?format=webp&width=800"
            alt="Electronics and Accessories Banner"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      </section>

      {/* Laptops Content */}
      <div className="container mx-auto px-4 py-6">
        {!selectedCategory ? (
          <>
            {/* Overview */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Explore our comprehensive laptop collection across various categories and brands
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {laptopCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {category.productCount} laptops
                        </Badge>
                        <span className="text-sm font-medium text-green-600">
                          {category.priceRange}
                        </span>
                      </div>
                    </div>
                    
                    {/* Popular Brands */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Brands:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.brands.map((brand, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                      <div className="space-y-1">
                        {category.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-2 flex-shrink-0"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Laptops */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Featured Laptops</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredLaptops.map((laptop) => (
                  <Card key={laptop.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div className="relative aspect-square bg-gray-100">
                        <img
                          src={laptop.image}
                          alt={laptop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        
                        {/* Origin Badge */}
                        <Badge 
                          className={`absolute top-2 left-2 text-xs font-medium ${
                            laptop.origin === 'UK' 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {laptop.origin}
                        </Badge>

                        {/* Video Icon */}
                        {laptop.hasVideo && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                            <span className="w-3 h-3 text-white">▶</span>
                          </div>
                        )}

                        {/* Delivery ETA */}
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-xs text-muted-foreground">{laptop.deliveryEta}</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        {/* Title */}
                        <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-2 min-h-[2.5rem]">
                          {laptop.title}
                        </h3>

                        {/* Specs */}
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {laptop.specs}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(laptop.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({laptop.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-brand-dark">
                            ₹{laptop.price.toLocaleString()}
                          </span>
                          {laptop.originalPrice && laptop.originalPrice > laptop.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{laptop.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          size="sm"
                          className="w-full bg-brand-blue hover:bg-brand-blue/90"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Add to cart:', laptop.id);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </>
        ) : (
          <>
            {/* Category Detail View */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCategory(null)}
                  className="text-brand-blue"
                >
                  ← Back to Laptops
                </Button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedCategory}</h2>
              <p className="text-muted-foreground">
                {filteredLaptops.length} laptops found
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLaptops.map((laptop) => (
                <ProductCard
                  key={laptop.id}
                  {...laptop}
                  onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
