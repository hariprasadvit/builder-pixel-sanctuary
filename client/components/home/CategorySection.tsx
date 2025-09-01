import React from "react";
import { 
  VideoPlaceholder, 
  ProductPlaceholder, 
  BrandLogoPlaceholder, 
  SectionHeader,
  RIKY_GRADIENT 
} from "@/components/ui/placeholders";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CategoryVideo {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  likes: number;
  comments: number;
  views: number;
}

interface CategoryProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
}

interface CategorySectionProps {
  title: string;
  icon?: string;
  videos?: CategoryVideo[];
  products?: CategoryProduct[];
  brands?: string[];
}

export default function CategorySection({
  title,
  icon,
  videos = [],
  products = [],
  brands = []
}: CategorySectionProps) {
  
  // Default videos to ensure consistent 4-card layout
  const defaultVideos: CategoryVideo[] = [
    {
      id: "v1",
      title: `${title} Product Demo`,
      price: 199.99,
      originalPrice: 299.99,
      badge: "Demo",
      likes: 8500,
      comments: 156,
      views: 34000
    },
    {
      id: "v2", 
      title: `Best ${title} Review`,
      price: 149.99,
      badge: "Review",
      likes: 12300,
      comments: 287,
      views: 56000
    },
    {
      id: "v3",
      title: `${title} Unboxing`,
      price: 89.99,
      originalPrice: 119.99,
      badge: "Unboxing",
      likes: 15600,
      comments: 342,
      views: 78000
    },
    {
      id: "v4",
      title: `${title} Tutorial`,
      price: 259.99,
      badge: "Tutorial", 
      likes: 9800,
      comments: 198,
      views: 43000
    }
  ];

  // Default products to ensure consistent 5-card layout
  const defaultProducts: CategoryProduct[] = [
    {
      id: "p1",
      title: `Premium ${title} Item`,
      price: 299.99,
      originalPrice: 399.99,
      badge: "Premium"
    },
    {
      id: "p2",
      title: `Best Selling ${title}`,
      price: 199.99,
      badge: "Best Seller"
    },
    {
      id: "p3", 
      title: `${title} Essential`,
      price: 149.99,
      originalPrice: 199.99,
      badge: "Essential"
    },
    {
      id: "p4",
      title: `${title} Pro Version`,
      price: 399.99,
      badge: "Pro"
    },
    {
      id: "p5",
      title: `${title} Starter Kit`,
      price: 99.99,
      originalPrice: 149.99,
      badge: "Starter"
    }
  ];

  // Fill arrays to ensure consistent layouts
  const displayVideos = [...videos];
  while (displayVideos.length < 4) {
    const defaultVideo = defaultVideos[displayVideos.length % defaultVideos.length];
    displayVideos.push({
      ...defaultVideo,
      id: `${defaultVideo.id}-${displayVideos.length}`
    });
  }

  const displayProducts = [...products];
  while (displayProducts.length < 5) {
    const defaultProduct = defaultProducts[displayProducts.length % defaultProducts.length];
    displayProducts.push({
      ...defaultProduct,
      id: `${defaultProduct.id}-${displayProducts.length}`
    });
  }

  // Default brand placeholders
  const displayBrands = [...brands];
  while (displayBrands.length < 6) {
    displayBrands.push(`Brand ${displayBrands.length + 1}`);
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header with Brand Logos */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <SectionHeader title={title} icon={icon}>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </SectionHeader>
          
          {/* Brand Logos Row */}
          <div className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Brands</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {displayBrands.slice(0, 6).map((brand, index) => (
                <div key={index} className="flex justify-center">
                  <BrandLogoPlaceholder size="md" shape="square" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Bands */}
        <div className="space-y-8">
          
          {/* Band A: Video Row */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🎥 {title} Videos
            </h3>
            
            {/* Desktop: 4 cards in row */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {displayVideos.slice(0, 4).map((video) => (
                <VideoPlaceholder
                  key={video.id}
                  aspect="16/9"
                  title={video.title}
                  price={video.price}
                  originalPrice={video.originalPrice}
                  badge={video.badge}
                  likes={video.likes}
                  comments={video.comments}
                  views={video.views}
                  showSocialCounters={true}
                />
              ))}
            </div>

            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {displayVideos.slice(0, 4).map((video) => (
                <div key={`mobile-${video.id}`} className="flex-shrink-0 w-72">
                  <VideoPlaceholder
                    aspect="16/9"
                    title={video.title}
                    price={video.price}
                    originalPrice={video.originalPrice}
                    badge={video.badge}
                    likes={video.likes}
                    comments={video.comments}
                    views={video.views}
                    showSocialCounters={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Band B: Product Row */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🛍️ {title} Products
            </h3>
            
            {/* Desktop: 5 cards in row */}
            <div className="hidden md:grid md:grid-cols-5 gap-6">
              {displayProducts.slice(0, 5).map((product) => (
                <ProductPlaceholder
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badge={product.badge}
                />
              ))}
            </div>

            {/* Tablet: 3 cards in row */}
            <div className="hidden sm:grid md:hidden sm:grid-cols-3 gap-4">
              {displayProducts.slice(0, 3).map((product) => (
                <ProductPlaceholder
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badge={product.badge}
                />
              ))}
            </div>

            {/* Mobile: 2 cards in row */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
              {displayProducts.slice(0, 4).map((product) => (
                <ProductPlaceholder
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
