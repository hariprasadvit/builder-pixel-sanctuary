import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import new hybrid components
import HybridHero from "@/components/home/HybridHero";
import SocialVideoStrip from "@/components/home/SocialVideoStrip";
import CategoryBand from "@/components/home/CategoryBand";
import HotDealsSection from "@/components/home/HotDealsSection";
import AllCategoriesShowcase from "@/components/home/AllCategoriesShowcase";
import SocialFeedGrid from "@/components/home/SocialFeedGrid";
import BrandsStrip from "@/components/home/BrandsStrip";
import Newsletter from "@/components/home/Newsletter";
import { type TikTokVideo } from "@/components/home/TikTokVideoCard";

export default function Index() {
  const navigate = useNavigate();
  const { getDeliveryTime } = useMarketplace();

  // Sample data for the hybrid experience
  const sampleData = useMemo(() => {
    // Featured videos for social strip
    const trendingVideos: TikTokVideo[] = [
      {
        id: "v1",
        title: "iPhone 16 Pro Max Unboxing",
        price: 999.99,
        originalPrice: 1099.99,
        youtubeId: "HfiEy9Rh2cQ",
        vendor: "TechReviews",
        vendorAvatar: "",
        productId: "iphone-16-pro",
        likes: 25400,
        comments: 524,
        shares: 189,
        liked: false,
        badge: "Hot Deal"
      },
      {
        id: "v2",
        title: "Summer Fashion Haul",
        price: 79.99,
        originalPrice: 119.99,
        youtubeId: "asaqTyqU9hU",
        vendor: "StyleGuru",
        vendorAvatar: "",
        productId: "summer-dress",
        likes: 18200,
        comments: 367,
        shares: 123,
        liked: false,
        badge: "Trending"
      },
      {
        id: "v3",
        title: "Smart Home Setup",
        price: 149.99,
        youtubeId: "O3oFfbIXTOA",
        vendor: "SmartHome",
        vendorAvatar: "",
        productId: "smart-lights",
        likes: 14500,
        comments: 245,
        shares: 78,
        liked: true,
        badge: "New"
      },
      {
        id: "v4",
        title: "Fitness Gear Review",
        price: 89.99,
        youtubeId: "HfiEy9Rh2cQ",
        vendor: "FitLife",
        vendorAvatar: "",
        productId: "fitness-band",
        likes: 12800,
        comments: 198,
        shares: 56,
        liked: false,
        badge: "50% OFF"
      },
      {
        id: "v5",
        title: "Gaming Setup Tour",
        price: 299.99,
        youtubeId: "asaqTyqU9hU",
        vendor: "GameMaster",
        vendorAvatar: "",
        productId: "gaming-chair",
        likes: 22100,
        comments: 456,
        shares: 134,
        liked: false,
        badge: "Gaming"
      }
    ];

    // Electronics products
    const electronicsProducts = [
      {
        id: "e1",
        title: "iPhone 16 Pro Max 256GB",
        price: 999.99,
        originalPrice: 1099.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
        badge: "Hot Deal",
        socialProof: "500+ sold today"
      },
      {
        id: "e2",
        title: "Samsung Galaxy Buds Pro",
        price: 89.99,
        originalPrice: 149.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
        badge: "40% OFF",
        socialProof: "200+ sold today"
      },
      {
        id: "e3",
        title: "Smart Fitness Watch",
        price: 199.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800",
        socialProof: "150+ sold today"
      },
      {
        id: "e4",
        title: "Gaming Controller Pro",
        price: 299.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faf0007c350e64f1cb675c9fa56c8c6cc?format=webp&width=800",
        badge: "Gaming",
        socialProof: "100+ sold today"
      }
    ];

    // Fashion products
    const fashionProducts = [
      {
        id: "f1",
        title: "Designer Summer Dress",
        price: 79.99,
        originalPrice: 119.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800",
        badge: "Summer Sale",
        socialProof: "300+ sold today"
      },
      {
        id: "f2",
        title: "Premium Denim Jeans",
        price: 89.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800",
        socialProof: "250+ sold today"
      },
      {
        id: "f3",
        title: "Casual T-Shirt Set",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9ae770758b504c06abfd7b6ed7035552?format=webp&width=800",
        badge: "Best Seller"
      },
      {
        id: "f4",
        title: "Athletic Wear Set",
        price: 119.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800",
        socialProof: "180+ sold today"
      }
    ];

    // Home & Kitchen products
    const homeProducts = [
      {
        id: "h1",
        title: "Smart LED Lights",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F12cf36128d7947609a98a09da23bcd6d?format=webp&width=800",
        badge: "Smart Home",
        socialProof: "120+ sold today"
      },
      {
        id: "h2",
        title: "Kitchen Mixer Pro",
        price: 449.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F530577c64eac4a5aae827ee06cd1c1d5?format=webp&width=800",
        socialProof: "80+ sold today"
      },
      {
        id: "h3",
        title: "Decorative Vase Set",
        price: 59.99,
        originalPrice: 89.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F12cf36128d7947609a98a09da23bcd6d?format=webp&width=800",
        badge: "Home Decor"
      },
      {
        id: "h4",
        title: "Smart Vacuum Robot",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=800",
        badge: "25% OFF",
        socialProof: "90+ sold today"
      }
    ];

    // Beauty products
    const beautyProducts = [
      {
        id: "b1",
        title: "Skincare Routine Set",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9ae770758b504c06abfd7b6ed7035552?format=webp&width=800",
        badge: "Skincare",
        socialProof: "200+ sold today"
      },
      {
        id: "b2",
        title: "Makeup Palette Pro",
        price: 69.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800",
        socialProof: "150+ sold today"
      },
      {
        id: "b3",
        title: "Hair Care Bundle",
        price: 49.99,
        originalPrice: 79.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800",
        badge: "Bundle Deal"
      },
      {
        id: "b4",
        title: "Premium Face Cream",
        price: 39.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9ae770758b504c06abfd7b6ed7035552?format=webp&width=800",
        socialProof: "100+ sold today"
      }
    ];

    // Kids & Toys products
    const kidsProducts = [
      {
        id: "k1",
        title: "Educational Toy Set",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb19c34fdf5046e3be0aaa118adb5760?format=webp&width=800",
        badge: "Educational",
        socialProof: "120+ sold today"
      },
      {
        id: "k2",
        title: "Plush Toy Collection",
        price: 29.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb19c34fdf5046e3be0aaa118adb5760?format=webp&width=800",
        socialProof: "250+ sold today"
      },
      {
        id: "k3",
        title: "Building Blocks Set",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb19c34fdf5046e3be0aaa118adb5760?format=webp&width=800",
        badge: "Creative Play"
      },
      {
        id: "k4",
        title: "Remote Control Car",
        price: 149.99,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb19c34fdf5046e3be0aaa118adb5760?format=webp&width=800",
        badge: "RC Toys",
        socialProof: "80+ sold today"
      }
    ];

    // Hot deals data
    const hotDeals = [
      {
        id: "d1",
        title: "Wireless Headphones",
        price: 29.99,
        originalPrice: 59.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
        soldToday: 450,
        stockLeft: 8
      },
      {
        id: "d2",
        title: "Smart Watch",
        price: 99.99,
        originalPrice: 199.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800",
        soldToday: 320,
        stockLeft: 12
      },
      {
        id: "d3",
        title: "Bluetooth Speaker",
        price: 39.99,
        originalPrice: 79.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
        soldToday: 280,
        stockLeft: 15
      },
      {
        id: "d4",
        title: "Fitness Tracker",
        price: 49.99,
        originalPrice: 99.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800",
        soldToday: 200,
        stockLeft: 6
      },
      {
        id: "d5",
        title: "Phone Case Set",
        price: 19.99,
        originalPrice: 39.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
        soldToday: 600,
        stockLeft: 20
      },
      {
        id: "d6",
        title: "Wireless Charger",
        price: 24.99,
        originalPrice: 49.99,
        discount: 50,
        image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
        soldToday: 350,
        stockLeft: 10
      }
    ];

    return {
      trendingVideos,
      electronicsProducts,
      fashionProducts,
      homeProducts,
      beautyProducts,
      kidsProducts,
      hotDeals
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hybrid Hero Section */}
      <HybridHero />

      {/* Social Video Strip */}
      <SocialVideoStrip 
        videos={sampleData.trendingVideos}
        title="Trending Videos"
      />

      {/* Electronics Hub */}
      <CategoryBand
        title="Electronics Hub"
        subtitle="Latest gadgets and tech innovations"
        icon="📱"
        video={sampleData.trendingVideos[0]}
        products={sampleData.electronicsProducts}
        layout="video-left"
        backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-50"
      />

      {/* Cellphones & Accessories */}
      <CategoryBand
        title="Cellphones & Accessories"
        subtitle="Unboxing the latest smartphones"
        icon="📞"
        video={sampleData.trendingVideos[1]}
        products={sampleData.electronicsProducts.slice(0, 2).concat([
          {
            id: "c1",
            title: "iPhone 15 Pro",
            price: 799.99,
            originalPrice: 899.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2af8b780c7fa41c89d7acdf153fac824?format=webp&width=800",
            badge: "New Launch",
            socialProof: "400+ sold today"
          },
          {
            id: "c2",
            title: "Samsung Galaxy S24",
            price: 1199.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800",
            socialProof: "300+ sold today"
          }
        ])}
        layout="video-right"
        backgroundColor="bg-gradient-to-br from-purple-50 to-pink-50"
        showCountdown={true}
      />

      {/* Hot Deals Section */}
      <HotDealsSection 
        deals={sampleData.hotDeals}
        videos={sampleData.trendingVideos.slice(2, 4)}
      />

      {/* Clothing & Fashion */}
      <CategoryBand
        title="Clothing & Fashion"
        subtitle="Latest trends and seasonal styles"
        icon="👗"
        video={sampleData.trendingVideos[1]}
        products={sampleData.fashionProducts}
        layout="carousel"
        backgroundColor="bg-gradient-to-br from-pink-50 to-rose-50"
        hashtags={["StreetStyle", "WorkWear", "SummerLook", "OOTD"]}
      />

      {/* Home & Kitchen */}
      <CategoryBand
        title="Home & Kitchen"
        subtitle="Transform your living space"
        icon="🏠"
        video={sampleData.trendingVideos[2]}
        products={sampleData.homeProducts}
        layout="video-left"
        backgroundColor="bg-gradient-to-br from-green-50 to-emerald-50"
      />

      {/* Beauty & Personal Care */}
      <CategoryBand
        title="Beauty & Personal Care"
        subtitle="Glow up with trending beauty products"
        icon="💄"
        video={sampleData.trendingVideos[3]}
        products={sampleData.beautyProducts}
        layout="video-right"
        backgroundColor="bg-gradient-to-br from-violet-50 to-purple-50"
        hashtags={["Skincare", "Makeup", "BeautyTips"]}
      />

      {/* Kids & Toys */}
      <CategoryBand
        title="Kids & Toys"
        subtitle="Fun and educational toys for children"
        icon="🧸"
        video={sampleData.trendingVideos[4]}
        products={sampleData.kidsProducts}
        layout="carousel"
        backgroundColor="bg-gradient-to-br from-yellow-50 to-orange-50"
      />

      {/* Featured Brands */}
      <BrandsStrip />

      {/* All Categories Showcase */}
      <AllCategoriesShowcase />

      {/* Trending Now */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              📈 Trending Now
            </h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              View All Trending
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...sampleData.electronicsProducts.slice(0, 3), ...sampleData.fashionProducts.slice(0, 3)].map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border">
                <div className="relative aspect-square bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {product.socialProof}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">£{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <SocialFeedGrid posts={[]} />

      {/* Recommended For You */}
      <section className="py-8 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🎯 Recommended For You
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Mix products with video cards */}
            {sampleData.homeProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border-2 border-transparent hover:border-purple-200">
                <div className="relative aspect-square bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-purple-500 text-white text-xs">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">£{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {product.socialProof && (
                    <p className="text-xs text-purple-600 font-medium mt-1">{product.socialProof}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Insert a video card every 5th item */}
            <div className="h-full">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl overflow-hidden h-full flex flex-col justify-center items-center text-white p-4">
                <div className="text-4xl mb-2">📱</div>
                <h3 className="font-bold text-sm text-center">Watch Product Reviews</h3>
                <p className="text-xs opacity-80 text-center mt-1">See real customers using products</p>
                <Button className="mt-3 bg-white text-purple-600 hover:bg-gray-100 text-xs px-4 py-1 h-7">
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
