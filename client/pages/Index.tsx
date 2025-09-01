import { useMemo } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroCarousel from "@/components/HeroCarousel";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useNavigate } from "react-router-dom";
import SocialFeedCard, { type SocialFeedItem } from "@/components/social/SocialFeedCard";

function ShopByCategorySection({ categories }: { categories: { id: string; name: string; image: string; subcategories: string[] }[] }) {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold">Shop by Category</h2>
          <Button variant="ghost" className="text-brand-blue text-sm md:text-base">
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
  );
}

function DealsSection() {
  return (
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
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">⚡ Deals of the Day</h2>
                <span className="bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full animate-pulse self-start">LIVE</span>
              </div>
              <p className="text-sm text-gray-600">Limited time offers - Don't miss out!</p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <div className="text-sm text-gray-600">Ends in</div>
            <div className="text-red-600 font-bold font-mono text-lg">23:59:42</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="">
            <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">60% OFF</div>
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F319deb5bd62f44adbe76dee2d2c91558?format=webp&width=800"
                  alt="Electronics Collection - Flash Sale on Home Appliances"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">Home Appliances</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-lg font-bold text-red-600">50% OFF</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">Flash Sale on appliances</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">70% OFF</div>
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F199d372cf11f426bbd41c4f81a31c348?format=webp&width=800"
                  alt="Prime Day Deals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">Prime Day Deals</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-lg font-bold text-orange-600">Up to 70% OFF</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">Limited time only</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">25% OFF</div>
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2fdc4ff712c742b48b5f10e46b15af5a?format=webp&width=800"
                  alt="Biggest Deals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">Biggest Deals</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-lg font-bold text-purple-600">Save Extra 25%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">On 1 Lakh+ styles</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">50% OFF</div>
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800"
                  alt="Fashion Collection - Women's Fashion Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3">
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">Women's Fashion</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-lg font-bold text-green-600">Up to 50% OFF</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">Special fashion collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellersSection() {
  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">🏆 Best Sellers This Week</h2>
              <p className="text-sm text-gray-600">Most popular items in your area</p>
            </div>
          </div>
          <Button variant="ghost" className="text-orange-600 hover:text-orange-700 shrink-0 self-start sm:self-center">
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
                  <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">#{item.id}</div>
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
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</div>
                <div className="text-sm sm:text-lg font-bold text-gray-900">£{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewArrivalsSection() {
  return (
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
                ✨ New Arrivals
                <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full">Fresh</span>
              </h2>
              <p className="text-sm text-gray-600">Just landed - Be the first to shop</p>
            </div>
          </div>
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
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
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
                  <span className="text-sm sm:text-lg font-bold text-emerald-600">£{item.price}</span>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full self-start">Launch Price</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm">Shop Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const { getDeliveryTime } = useMarketplace();

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
  ];


  const feedVideos: SocialFeedItem[] = useMemo(() => {
    const p1 = allProducts.find((p) => p.id === "1");
    const p3 = allProducts.find((p) => p.id === "3");
    const p5 = allProducts.find((p) => p.id === "5");
    return [
      {
        id: "v1",
        productId: p1?.id,
        title: p1?.title || "iPhone 16 Pro Max",
        price: p1?.price || 999.99,
        origin: "UK",
        vendor: "TechStore UK",
        youtubeId: "HfiEy9Rh2cQ",
        likes: 15400,
        comments: 324,
        shares: 89,
        liked: false,
      },
      {
        id: "v2",
        productId: p3?.id,
        title: p3?.title || "Nike Air Max Plus Running Shoes",
        price: p3?.price || 119.99,
        origin: "UK",
        vendor: "Sneaker Hub UK",
        youtubeId: "asaqTyqU9hU",
        likes: 22100,
        comments: 567,
        shares: 123,
        liked: false,
      },
      {
        id: "v3",
        productId: p5?.id,
        title: p5?.title || "Xiaomi Mi 13 Ultra 512GB Smartphone",
        price: p5?.price || 649.99,
        origin: "China",
        vendor: "Smart Living China",
        youtubeId: "O3oFfbIXTOA",
        likes: 8900,
        comments: 156,
        shares: 45,
        liked: true,
      },
    ];
  }, [allProducts]);

  const sequence: { type: "video" | "block"; idx?: number; key?: "categories" | "deals" | "best" | "new" }[] = [
    { type: "video", idx: 0 },
    { type: "block", key: "categories" },
    { type: "video", idx: 1 },
    { type: "block", key: "deals" },
    { type: "video", idx: 2 },
    { type: "block", key: "best" },
    { type: "block", key: "new" },
  ];

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="py-4 md:py-6">
        <div className="container mx-auto px-0 md:px-4">
          <div className="space-y-6 md:space-y-8 snap-y snap-mandatory">
            {sequence.map((seg, i) => (
              <div key={i} className="scroll-mt-4">
                {seg.type === "video" && typeof seg.idx === "number" && feedVideos[seg.idx] && (
                  <SocialFeedCard item={feedVideos[seg.idx]} />
                )}
                {seg.type === "block" && seg.key === "categories" && (
                  <ShopByCategorySection categories={categories} />
                )}
                {seg.type === "block" && seg.key === "deals" && <DealsSection />}
                {seg.type === "block" && seg.key === "best" && <BestSellersSection />}
                {seg.type === "block" && seg.key === "new" && <NewArrivalsSection />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Button
        onClick={() => navigate("/sell")}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-fuchsia-500 to-indigo-600 hover:from-fuchsia-600 hover:to-indigo-700 text-white flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
