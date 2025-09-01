import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Smartphone, 
  Laptop, 
  Shirt, 
  Home, 
  Sparkles, 
  Baby, 
  ShoppingCart, 
  Book, 
  Dumbbell, 
  Sofa, 
  Zap,
  Grid3X3
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  image?: string;
  count?: number;
}

interface AllCategoriesShowcaseProps {
  categories?: Category[];
}

export default function AllCategoriesShowcase({ categories }: AllCategoriesShowcaseProps) {
  // Default categories with gradients and icons
  const defaultCategories: Category[] = [
    {
      id: "electronics",
      name: "Electronics",
      icon: <Laptop className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      count: 1250
    },
    {
      id: "cellphones", 
      name: "Cellphones",
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      count: 890
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: <Shirt className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-500",
      count: 2340
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: <Home className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      count: 1670
    },
    {
      id: "beauty",
      name: "Beauty",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-violet-500 to-purple-500",
      count: 780
    },
    {
      id: "kids",
      name: "Kids & Toys",
      icon: <Baby className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-500",
      count: 990
    },
    {
      id: "grocery",
      name: "Grocery",
      icon: <ShoppingCart className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      count: 1450
    },
    {
      id: "books",
      name: "Books",
      icon: <Book className="w-8 h-8" />,
      gradient: "from-indigo-500 to-blue-500",
      count: 560
    },
    {
      id: "sports",
      name: "Sports",
      icon: <Dumbbell className="w-8 h-8" />,
      gradient: "from-teal-500 to-green-500",
      count: 820
    },
    {
      id: "furniture",
      name: "Furniture",
      icon: <Sofa className="w-8 h-8" />,
      gradient: "from-amber-500 to-yellow-500",
      count: 340
    },
    {
      id: "appliances",
      name: "Appliances",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-slate-500 to-gray-500",
      count: 670
    },
    {
      id: "more",
      name: "All Categories",
      icon: <Grid3X3 className="w-8 h-8" />,
      gradient: "from-gray-600 to-gray-800",
      count: 12000
    }
  ];

  const displayCategories = categories || defaultCategories;

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore by Category</h2>
          <p className="text-gray-600">Discover products across all categories</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayCategories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0"
            >
              <div className={`bg-gradient-to-br ${category.gradient} p-6 h-32 relative overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                </div>

                {/* Icon */}
                <div className="relative z-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category name */}
                <h3 className="relative z-10 text-white font-bold text-sm group-hover:text-yellow-200 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Product count */}
                {category.count && (
                  <p className="relative z-10 text-white/80 text-xs mt-1">
                    {category.count.toLocaleString()} products
                  </p>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Optional image section */}
              {category.image && (
                <div className="h-20 bg-gray-100 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Featured category highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tech Deals</h3>
                <p className="text-blue-100 text-sm">Latest gadgets & electronics</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">Up to 50% off on trending tech products. Limited time offers!</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Fashion Week</h3>
                <p className="text-pink-100 text-sm">Trending styles & outfits</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">Discover the latest fashion trends with exclusive deals!</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Home Essentials</h3>
                <p className="text-green-100 text-sm">Comfort & style for your space</p>
              </div>
            </div>
            <p className="text-white/90 text-sm">Transform your home with our curated collection!</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
