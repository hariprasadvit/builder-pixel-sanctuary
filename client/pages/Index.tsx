import { useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryPills from "@/components/home/CategoryPills";
import CategorySection from "@/components/home/CategorySection";
import FlashSaleTimer from "@/components/home/FlashSaleTimer";
import BrandsStrip from "@/components/home/BrandsStrip";
import Newsletter from "@/components/home/Newsletter";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { SAMPLE_CATALOG } from "@/lib/catalog";
import { useNavigate } from "react-router-dom";
import { type SocialFeedItem } from "@/components/social/SocialFeedCard";
import { type CategoryProduct } from "@/components/home/CategorySection";





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


  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="py-6">
        <div className="container mx-auto px-4 flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-bold">Trending Now</h2>
        </div>
        <ReelsGrid
          videos={feedVideos}
          products={allProducts.map((p) => ({ id: p.id, title: p.title, image: p.image, price: p.price }))}
        />
      </section>

      <section className="py-2">
        <CategoryPills items={["Fashion","Technology","Bags","Gaming","Sport","Necklaces","Business","Home","Beauty","Grocery","Toys","Automotive"]} />
      </section>

      <MegaCategoryGrid
        categories={(
          [
            ...categories,
            { id: "9", name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop" },
            { id: "10", name: "Grocery", image: "https://images.unsplash.com/photo-1505575972945-280c5c6f16e7?q=80&w=800&auto=format&fit=crop" },
            { id: "11", name: "Toys & Games", image: "https://images.unsplash.com/photo-1601758123927-196d2f71dcfd?q=80&w=800&auto=format&fit=crop" },
            { id: "12", name: "Automotive", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800&auto=format&fit=crop" },
          ] as any
        )}
      />

      <BestSellersRail
        title="Best Sellers"
        items={SAMPLE_CATALOG.slice(0, 12).map((p) => ({ id: p.id, title: p.title, image: p.image, price: p.price }))}
      />

      <FlashSaleTimer />
      <BrandsStrip />

      <BestSellersRail
        title="Top Picks For You"
        items={SAMPLE_CATALOG.slice(4, 16).map((p) => ({ id: p.id, title: p.title, image: p.image, price: p.price }))}
      />

      <section className="py-6">
        <div className="container mx-auto px-4 flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-bold">Shoppable Reels</h2>
        </div>
        <ReelsGrid
          videos={feedVideos.slice().reverse()}
          products={SAMPLE_CATALOG.slice(0, 9).map((p) => ({ id: p.id+"-b", title: p.title, image: p.image, price: p.price }))}
        />
      </section>

      <DealsSection />

      <BestSellersRail
        title="Most Wished For"
        items={SAMPLE_CATALOG.slice(6, 18).map((p) => ({ id: p.id, title: p.title, image: p.image, price: p.price }))}
      />

      <Newsletter />

      <Button
        onClick={() => navigate("/sell")}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-fuchsia-500 to-indigo-600 hover:from-fuchsia-600 hover:to-indigo-700 text-white flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
