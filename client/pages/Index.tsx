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
import { useNavigate } from "react-router-dom";
import { type SocialFeedItem } from "@/components/social/SocialFeedCard";
import { type CategoryProduct } from "@/components/home/CategorySection";

export default function Index() {
  const navigate = useNavigate();
  const { getDeliveryTime } = useMarketplace();

  // Category-specific data and reels
  const categoryData = useMemo(() => {
    // Fashion & Clothing products
    const fashionProducts: CategoryProduct[] = [
      { id: "f1", title: "Designer Casual Shirt", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800", price: 89.99, originalPrice: 129.99 },
      { id: "f2", title: "Premium Denim Jeans", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800", price: 79.99 },
      { id: "f3", title: "Summer Outfit Collection", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9ae770758b504c06abfd7b6ed7035552?format=webp&width=800", price: 159.99 },
      { id: "f4", title: "Athletic Wear Set", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800", price: 119.99 },
      { id: "f5", title: "Formal Business Attire", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1c6981d2cd61432e95af2786a78c0ddf?format=webp&width=800", price: 249.99, originalPrice: 319.99 },
      { id: "f6", title: "Vintage Leather Jacket", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe125a25e2ee04583b76a8a3a45e708c7?format=webp&width=800", price: 199.99 },
    ];

    // Electronics products
    const electronicsProducts: CategoryProduct[] = [
      { id: "e1", title: "iPhone 16 Pro Max 256GB", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800", price: 999.99, originalPrice: 1099.99 },
      { id: "e2", title: "Samsung Galaxy Buds Pro", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800", price: 89.99, originalPrice: 149.99 },
      { id: "e3", title: "Smart Fitness Watch", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800", price: 199.99 },
      { id: "e4", title: "Gaming Controller Pro", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faf0007c350e64f1cb675c9fa56c8c6cc?format=webp&width=800", price: 299.99 },
      { id: "e5", title: "4K Smart TV 55 inch", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Febf594d6a2184a96acd8cfb15383b1a8?format=webp&width=800", price: 799.99, originalPrice: 999.99 },
      { id: "e6", title: "Wireless Charging Pad", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800", price: 49.99 },
    ];

    // Outdoor & Fitness products
    const outdoorProducts: CategoryProduct[] = [
      { id: "o1", title: "Nike Air Max Plus Running Shoes", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=800", price: 119.99 },
      { id: "o2", title: "Mountain Bicycle", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F83bd11634aff48988b2cd202ed37472c?format=webp&width=800", price: 399.99 },
      { id: "o3", title: "Outdoor Active Gear", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800", price: 249.99 },
      { id: "o4", title: "Camping Tent Deluxe", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800", price: 189.99 },
      { id: "o5", title: "Fitness Tracker Band", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4444064dbe514c3ea39494880ee0eedd?format=webp&width=800", price: 89.99, originalPrice: 129.99 },
      { id: "o6", title: "Yoga Mat Premium", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbcec0ac8b5ee4411bc8e33e0bd6c0cc3?format=webp&width=800", price: 59.99 },
    ];

    // Cellphones products
    const cellphoneProducts: CategoryProduct[] = [
      { id: "c1", title: "iPhone 15 128GB", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2af8b780c7fa41c89d7acdf153fac824?format=webp&width=800", price: 799.00, originalPrice: 899.00 },
      { id: "c2", title: "Samsung Galaxy S24 Ultra", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800", price: 1199.00 },
      { id: "c3", title: "Xiaomi 14 Ultra", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800", price: 999.00 },
      { id: "c4", title: "Google Pixel 8 Pro", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800", price: 899.00 },
      { id: "c5", title: "OnePlus 12 256GB", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800", price: 749.00, originalPrice: 849.00 },
      { id: "c6", title: "Phone Case Premium", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800", price: 29.99 },
    ];

    // Car Accessories products
    const carProducts: CategoryProduct[] = [
      { id: "ca1", title: "Car Audio System", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800", price: 299.99 },
      { id: "ca2", title: "Dashboard Camera", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F798dd616ad5a4f9092588913656e1a41?format=webp&width=800", price: 89.99 },
      { id: "ca3", title: "GPS Navigation System", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Febf594d6a2184a96acd8cfb15383b1a8?format=webp&width=800", price: 149.99 },
      { id: "ca4", title: "Car Phone Mount", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800", price: 24.99 },
      { id: "ca5", title: "USB Car Charger", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F798dd616ad5a4f9092588913656e1a41?format=webp&width=800", price: 19.99, originalPrice: 29.99 },
      { id: "ca6", title: "Seat Covers Luxury", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9af92a605ea1422886583e88afdb204e?format=webp&width=800", price: 129.99 },
    ];

    // Category-specific reels
    const fashionReels: SocialFeedItem[] = [
      {
        id: "fr1", productId: "f1", title: "Designer Casual Shirt", price: 89.99, origin: "UK", vendor: "Fashion Store UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 8500, comments: 156, shares: 45, liked: false
      },
      {
        id: "fr2", productId: "f2", title: "Premium Denim Jeans", price: 79.99, origin: "UK", vendor: "Denim Hub",
        youtubeId: "asaqTyqU9hU", likes: 12300, comments: 287, shares: 67, liked: false
      },
      {
        id: "fr3", productId: "f3", title: "Summer Outfit Collection", price: 159.99, origin: "UK", vendor: "Style Central",
        youtubeId: "O3oFfbIXTOA", likes: 15600, comments: 342, shares: 89, liked: true
      },
      {
        id: "fr4", productId: "f4", title: "Athletic Wear Set", price: 119.99, origin: "UK", vendor: "ActiveWear Co",
        youtubeId: "HfiEy9Rh2cQ", likes: 9800, comments: 198, shares: 52, liked: false
      },
      {
        id: "fr5", productId: "f5", title: "Formal Business Attire", price: 249.99, origin: "UK", vendor: "Business Style",
        youtubeId: "asaqTyqU9hU", likes: 7600, comments: 134, shares: 38, liked: false
      }
    ];

    const electronicsReels: SocialFeedItem[] = [
      {
        id: "er1", productId: "e1", title: "iPhone 16 Pro Max 256GB", price: 999.99, origin: "UK", vendor: "TechStore UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 25400, comments: 524, shares: 189, liked: false
      },
      {
        id: "er2", productId: "e2", title: "Samsung Galaxy Buds Pro", price: 89.99, origin: "UK", vendor: "Audio Pro",
        youtubeId: "asaqTyqU9hU", likes: 18200, comments: 367, shares: 123, liked: false
      },
      {
        id: "er3", productId: "e3", title: "Smart Fitness Watch", price: 199.99, origin: "UK", vendor: "Wearable Tech",
        youtubeId: "O3oFfbIXTOA", likes: 14500, comments: 245, shares: 78, liked: true
      },
      {
        id: "er4", productId: "e4", title: "Gaming Controller Pro", price: 299.99, origin: "UK", vendor: "Gaming Hub",
        youtubeId: "HfiEy9Rh2cQ", likes: 22100, comments: 456, shares: 134, liked: false
      },
      {
        id: "er5", productId: "e5", title: "4K Smart TV 55 inch", price: 799.99, origin: "UK", vendor: "Home Theater Pro",
        youtubeId: "asaqTyqU9hU", likes: 16800, comments: 298, shares: 87, liked: false
      }
    ];

    const outdoorReels: SocialFeedItem[] = [
      {
        id: "or1", productId: "o1", title: "Nike Air Max Plus Running Shoes", price: 119.99, origin: "UK", vendor: "Sneaker Hub UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 22100, comments: 567, shares: 123, liked: false
      },
      {
        id: "or2", productId: "o2", title: "Mountain Bicycle", price: 399.99, origin: "UK", vendor: "Adventure Gear",
        youtubeId: "asaqTyqU9hU", likes: 16800, comments: 298, shares: 87, liked: false
      },
      {
        id: "or3", productId: "o3", title: "Outdoor Active Gear", price: 249.99, origin: "UK", vendor: "Outdoor Pro",
        youtubeId: "O3oFfbIXTOA", likes: 13200, comments: 234, shares: 56, liked: true
      },
      {
        id: "or4", productId: "o4", title: "Camping Tent Deluxe", price: 189.99, origin: "UK", vendor: "Camp Gear",
        youtubeId: "HfiEy9Rh2cQ", likes: 11500, comments: 203, shares: 61, liked: false
      },
      {
        id: "or5", productId: "o5", title: "Fitness Tracker Band", price: 89.99, origin: "UK", vendor: "Fit Tech",
        youtubeId: "asaqTyqU9hU", likes: 9200, comments: 156, shares: 42, liked: false
      }
    ];

    const cellphoneReels: SocialFeedItem[] = [
      {
        id: "cr1", productId: "c1", title: "iPhone 15 128GB", price: 799.00, origin: "UK", vendor: "Mobile Store UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 19400, comments: 421, shares: 134, liked: false
      },
      {
        id: "cr2", productId: "c2", title: "Samsung Galaxy S24 Ultra", price: 1199.00, origin: "UK", vendor: "Galaxy Hub",
        youtubeId: "asaqTyqU9hU", likes: 21500, comments: 478, shares: 156, liked: false
      },
      {
        id: "cr3", productId: "c3", title: "Xiaomi 14 Ultra", price: 999.00, origin: "China", vendor: "Smart Living China",
        youtubeId: "O3oFfbIXTOA", likes: 17800, comments: 356, shares: 98, liked: true
      },
      {
        id: "cr4", productId: "c4", title: "Google Pixel 8 Pro", price: 899.00, origin: "UK", vendor: "Pixel Store",
        youtubeId: "HfiEy9Rh2cQ", likes: 16200, comments: 312, shares: 89, liked: false
      },
      {
        id: "cr5", productId: "c5", title: "OnePlus 12 256GB", price: 749.00, origin: "UK", vendor: "OnePlus Official",
        youtubeId: "asaqTyqU9hU", likes: 14600, comments: 267, shares: 73, liked: false
      }
    ];

    const carReels: SocialFeedItem[] = [
      {
        id: "car1", productId: "ca1", title: "Car Audio System", price: 299.99, origin: "UK", vendor: "Auto Tech UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 8900, comments: 156, shares: 45, liked: false
      },
      {
        id: "car2", productId: "ca2", title: "Dashboard Camera", price: 89.99, origin: "UK", vendor: "Car Security Pro",
        youtubeId: "asaqTyqU9hU", likes: 11200, comments: 234, shares: 67, liked: false
      },
      {
        id: "car3", productId: "ca3", title: "GPS Navigation System", price: 149.99, origin: "UK", vendor: "Navigation Plus",
        youtubeId: "O3oFfbIXTOA", likes: 9600, comments: 178, shares: 52, liked: true
      },
      {
        id: "car4", productId: "ca4", title: "Car Phone Mount", price: 24.99, origin: "UK", vendor: "Car Accessories UK",
        youtubeId: "HfiEy9Rh2cQ", likes: 6800, comments: 123, shares: 34, liked: false
      },
      {
        id: "car5", productId: "ca5", title: "USB Car Charger", price: 19.99, origin: "UK", vendor: "Power Plus Auto",
        youtubeId: "asaqTyqU9hU", likes: 5400, comments: 89, shares: 25, liked: false
      }
    ];

    return {
      fashion: { products: fashionProducts, reels: fashionReels },
      electronics: { products: electronicsProducts, reels: electronicsReels },
      outdoor: { products: outdoorProducts, reels: outdoorReels },
      cellphones: { products: cellphoneProducts, reels: cellphoneReels },
      carAccessories: { products: carProducts, reels: carReels }
    };
  }, [getDeliveryTime]);

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="py-2">
        <CategoryPills items={["Fashion","Electronics","Outdoor","Cellphones","Car Accessories","Gaming","Beauty","Home","Grocery","Toys"]} />
      </section>

      {/* Fashion & Clothing Section */}
      <CategorySection
        title="Fashion & Clothing"
        subtitle="Discover the latest trends and styles from top sellers"
        titleIcon="👗"
        reels={categoryData.fashion.reels}
        products={categoryData.fashion.products}
        backgroundColor="bg-gradient-to-br from-pink-50 to-purple-50"
      />

      {/* Electronics Section */}
      <CategorySection
        title="Electronics"
        subtitle="Latest gadgets and tech innovations"
        titleIcon="📱"
        reels={categoryData.electronics.reels}
        products={categoryData.electronics.products}
        backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-50"
      />

      <FlashSaleTimer />

      {/* Outdoor & Fitness Section */}
      <CategorySection
        title="Outdoor & Fitness"
        subtitle="Gear up for your next adventure"
        titleIcon="🏃‍♂️"
        reels={categoryData.outdoor.reels}
        products={categoryData.outdoor.products}
        backgroundColor="bg-gradient-to-br from-green-50 to-emerald-50"
      />

      <BrandsStrip />

      {/* Cellphones Section */}
      <CategorySection
        title="Cellphones"
        subtitle="Latest smartphones and mobile accessories"
        titleIcon="📞"
        reels={categoryData.cellphones.reels}
        products={categoryData.cellphones.products}
        backgroundColor="bg-gradient-to-br from-gray-50 to-slate-50"
      />

      {/* Car Accessories Section */}
      <CategorySection
        title="Car Accessories"
        subtitle="Upgrade your ride with premium accessories"
        titleIcon="🚗"
        reels={categoryData.carAccessories.reels}
        products={categoryData.carAccessories.products}
        backgroundColor="bg-gradient-to-br from-orange-50 to-red-50"
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
