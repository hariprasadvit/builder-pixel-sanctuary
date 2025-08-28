import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function Electronics() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );
  const { currentMarketplace, getCurrencySymbol } = useMarketplace();
  const navigate = useNavigate();

  const subcategories = [
    {
      id: "1",
      name: "TV & Video",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7f10e16ce5324ea29cf7ab48508b367c?format=webp&width=800",
      items: [
        "LED TVs",
        "Plasma TVs",
        "3D TVs",
        "DVD & Blu-ray Players",
        "Home Theater Systems",
      ],
      productCount: 450,
    },
    {
      id: "2",
      name: "Computers",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F85a07ddf5ba447c098992ae8ef39b36f?format=webp&width=800",
      items: ["Desktops", "Laptops", "Tablets", "Monitors", "Networking"],
      productCount: 678,
      badge: "HIT",
    },
    {
      id: "3",
      name: "Car Electronics",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2d4de7e12e4147cbae90ce528c561332?format=webp&width=800",
      items: [
        "GPS & Navigation",
        "In-Dash Stereos",
        "Speakers",
        "Subwoofers",
        "Amplifiers",
      ],
      productCount: 234,
    },
    {
      id: "4",
      name: "Cell Phones",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F10bc369f9b1b419f9f3f50074801412d?format=webp&width=800",
      items: ["Apple iPhone", "HTC", "Motorola", "Nokia", "Samsung"],
      productCount: 567,
    },
    {
      id: "5",
      name: "MP3 Players",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F409da87afc3d4553b90b3c7a25283f03?format=webp&width=800",
      items: [
        "iPods",
        "Android",
        "MP3 Players",
        "MP3 Speaker Systems",
        "Headphones",
      ],
      productCount: 123,
    },
    {
      id: "6",
      name: "Cameras & Photo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F924cf65e69cc456e9ba3be6f8a22be27?format=webp&width=800",
      items: ["Digital Cameras", "DSLR Cameras", "Camcorders", "Lenses"],
      productCount: 345,
    },
    {
      id: "7",
      name: "Game consoles",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fce079d6485e44e09885a2624e3afb404?format=webp&width=800",
      items: ["Consoles"],
      productCount: 89,
    },
  ];

  const sampleProducts = [
    {
      id: "1",
      image: "/placeholder.svg",
      title: "iPhone 15 Pro Max 256GB Natural Titanium",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      origin: "UK" as const,
      deliveryEta: "2-3 days",
      hasVideo: true,
    },
    {
      id: "2",
      image: "/placeholder.svg",
      title: "Samsung Galaxy Buds Pro Wireless Earbuds",
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.5,
      reviewCount: 1234,
      origin: "China" as const,
      deliveryEta: "5-7 days",
      hasVideo: false,
    },
    {
      id: "3",
      image: "/placeholder.svg",
      title: 'MacBook Pro 14" M3 Chip 512GB',
      price: 1999.99,
      rating: 4.9,
      reviewCount: 567,
      origin: "UK" as const,
      deliveryEta: "1-2 days",
      hasVideo: true,
    },
    {
      id: "4",
      image: "/placeholder.svg",
      title: "Sony WH-1000XM5 Wireless Headphones",
      price: 349.99,
      rating: 4.7,
      reviewCount: 892,
      origin: "China" as const,
      deliveryEta: "3-5 days",
      hasVideo: false,
    },
  ];

  const filteredProducts = selectedSubcategory
    ? sampleProducts.filter(() => true) // In real app, filter by subcategory
    : sampleProducts;

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
                ← Back to Categories
              </Button>
            </div>
            <h1 className="text-xl font-bold">Electronics</h1>
          </div>
        </div>
      </div>

      {/* Electronics Subcategories */}
      <div className="container mx-auto px-4 py-6">
        {!selectedSubcategory ? (
          <>
            {/* Electronics Overview */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Explore our comprehensive electronics collection across various
                categories
              </p>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {subcategories.map((subcategory) => (
                <Card
                  key={subcategory.id}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white h-full"
                  onClick={() => {
                    if (subcategory.name === "Computers") {
                      navigate("/laptops");
                    } else {
                      setSelectedSubcategory(subcategory.name);
                    }
                  }}
                >
                  <CardContent className="p-4 sm:p-6 h-full">
                    {/* Mobile Layout */}
                    <div className="flex flex-col sm:hidden h-full">
                      {/* Image centered on mobile */}
                      <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={subcategory.image}
                          alt={subcategory.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      {/* Content centered on mobile */}
                      <div className="text-center flex-1 flex flex-col">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {subcategory.name}
                          </h3>
                          {subcategory.badge && (
                            <Badge className="bg-orange-500 text-white text-xs">
                              {subcategory.badge}
                            </Badge>
                          )}
                        </div>

                        {/* Items List */}
                        <div className="space-y-1 mb-3 flex-1">
                          {subcategory.items.slice(0, 3).map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              {item}
                            </p>
                          ))}
                          {subcategory.items.length > 3 && (
                            <p className="text-sm text-brand-blue font-medium cursor-pointer">
                              More ▼
                            </p>
                          )}
                        </div>

                        {/* Product Count */}
                        <Badge variant="secondary" className="text-xs mt-auto">
                          {subcategory.productCount.toLocaleString()} items
                        </Badge>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex flex-col h-full">
                      {/* Header with Image and Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {subcategory.name}
                            </h3>
                            {subcategory.badge && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                {subcategory.badge}
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {subcategory.productCount.toLocaleString()} items
                          </Badge>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2 flex-1">
                        {subcategory.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <span className="w-2 h-2 bg-gray-300 rounded-full mr-3 flex-shrink-0"></span>
                            {item}
                          </div>
                        ))}
                        {subcategory.items.length > 4 && (
                          <p className="text-sm text-brand-blue font-medium cursor-pointer flex items-center">
                            <span className="w-2 h-2 bg-brand-blue rounded-full mr-3 flex-shrink-0"></span>
                            More ▼
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Subcategory Detail View */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedSubcategory(null)}
                  className="text-brand-blue"
                >
                  ← Back to Electronics
                </Button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedSubcategory}</h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onWishlistToggle={(id) => console.log("Toggle wishlist:", id)}
                  onAddToCart={(id) => console.log("Add to cart:", id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
