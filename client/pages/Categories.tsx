import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentMarketplace, getCurrencySymbol } = useMarketplace();
  const navigate = useNavigate();

  const categories = [
    {
      id: "1",
      name: "Electronics",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc6001bf2a08e4f5d8f6f64acceaba8f1?format=webp&width=800",
      subcategories: ["Computers", "Mobile Phones", "Audio", "Wearables"],
      productCount: 1234,
    },
    {
      id: "2",
      name: "TVs / Video",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Febf594d6a2184a96acd8cfb15383b1a8?format=webp&width=800",
      subcategories: ["Smart TVs", "Streaming Devices", "Projectors"],
      productCount: 567,
    },
    {
      id: "3",
      name: "Video Games",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F29d21051a0914626a49de19684e9befd?format=webp&width=800",
      subcategories: ["Consoles", "Games", "Accessories"],
      productCount: 892,
    },
    {
      id: "4",
      name: "Cameras & Photo",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F798dd616ad5a4f9092588913656e1a41?format=webp&width=800",
      subcategories: ["Digital Cameras", "Lenses", "Accessories"],
      productCount: 345,
    },
    {
      id: "5",
      name: "Cell Phones",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
      subcategories: ["Smartphones", "Cases", "Chargers"],
      productCount: 678,
    },
    {
      id: "6",
      name: "Sports & Outdoors",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800",
      subcategories: ["Fitness", "Cycling", "Camping"],
      productCount: 456,
    },
    {
      id: "7",
      name: "Apparel",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800",
      subcategories: ["Mens Clothing", "Womens Clothing", "Shoes"],
      productCount: 2134,
    },
    {
      id: "8",
      name: "Car Electronics",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800",
      subcategories: ["Audio Systems", "GPS", "Dash Cams"],
      productCount: 234,
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
      marketplaces: ["nearbuy", "uk"],
      category: "Electronics",
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
      marketplaces: ["nearbuy", "china"],
      category: "Electronics",
    },
    {
      id: "3",
      image: "/placeholder.svg",
      title: "Nike Air Max 270 Running Shoes",
      price: 119.99,
      rating: 4.7,
      reviewCount: 567,
      origin: "UK" as const,
      deliveryEta: "1-2 days",
      hasVideo: true,
      marketplaces: ["nearbuy", "uk"],
      category: "Sports & Outdoors",
    },
    {
      id: "4",
      image: "/placeholder.svg",
      title: "Dyson V15 Detect Absolute Cordless Vacuum",
      price: 549.99,
      rating: 4.9,
      reviewCount: 892,
      origin: "UK" as const,
      deliveryEta: "1-2 days",
      hasVideo: false,
      marketplaces: ["nearbuy", "uk"],
      category: "Home & Garden",
    },
  ];

  const filteredProducts = selectedCategory
    ? sampleProducts.filter((product) => product.category === selectedCategory)
    : sampleProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Categories</h1>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="container mx-auto px-4 py-6">
        {!selectedCategory ? (
          <>
            {/* Category Overview */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Browse our wide selection of products across different
                categories
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
                  onClick={() => {
                    if (category.name === "Electronics") {
                      navigate("/electronics");
                    } else if (category.name === "Cell Phones") {
                      navigate("/cellphones");
                    } else {
                      setSelectedCategory(category.name);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-full h-32 md:h-40 flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="text-center w-full">
                        <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2">
                          {category.subcategories.slice(0, 2).join(" • ")}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {category.productCount.toLocaleString()} items
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  ← Back to Categories
                </Button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedCategory}</h2>
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
