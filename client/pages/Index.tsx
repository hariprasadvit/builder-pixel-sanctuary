import React from "react";
import { useNavigate } from "react-router-dom";

// Import new placeholder-based components
import HybridHero from "@/components/home/HybridHero";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import CategorySection from "@/components/home/CategorySection";
import Newsletter from "@/components/home/Newsletter";
import { RIKY_GRADIENT } from "@/components/ui/placeholders";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1) Top Hero Section - Split Layout */}
      <HybridHero
        featuredVideo={{
          title: "Revolutionary Tech Product - Must See Demo!",
          price: 299.99,
          originalPrice: 399.99,
          badge: "Hot Deal",
          likes: 25400,
          comments: 524,
          views: 189000
        }}
      />

      {/* 2) Trending Videos Carousel */}
      <TrendingCarousel
        videos={[
          {
            id: "trend1",
            title: "Latest Smartphone Unboxing & Review",
            price: 899.99,
            originalPrice: 999.99,
            badge: "Hot Deal",
            likes: 35200,
            comments: 782,
            views: 245000
          },
          {
            id: "trend2", 
            title: "Summer Fashion Collection Haul",
            price: 159.99,
            originalPrice: 229.99,
            badge: "Trending",
            likes: 28900,
            comments: 543,
            views: 178000
          },
          {
            id: "trend3",
            title: "Smart Home Setup Complete Guide",
            price: 199.99,
            badge: "New",
            likes: 18600,
            comments: 298,
            views: 134000
          },
          {
            id: "trend4",
            title: "Fitness Equipment Honest Review",
            price: 249.99,
            originalPrice: 349.99,
            badge: "50% OFF",
            likes: 22100,
            comments: 456,
            views: 167000
          },
          {
            id: "trend5",
            title: "Kitchen Gadgets That Actually Work",
            price: 89.99,
            badge: "Best Seller",
            likes: 31400,
            comments: 634,
            views: 201000
          }
        ]}
      />

      {/* 3) Electronics Category Section */}
      <CategorySection
        title="Electronics"
        icon="📱"
        videos={[
          {
            id: "elec_v1",
            title: "iPhone 16 Pro Max Full Review",
            price: 999.99,
            originalPrice: 1099.99,
            badge: "Hot Deal",
            likes: 45600,
            comments: 892,
            views: 324000
          },
          {
            id: "elec_v2",
            title: "Samsung Galaxy S24 Ultra Comparison",
            price: 1199.99,
            badge: "Comparison",
            likes: 38200,
            comments: 734,
            views: 289000
          },
          {
            id: "elec_v3",
            title: "Best Wireless Headphones 2024",
            price: 299.99,
            originalPrice: 399.99,
            badge: "Best Pick",
            likes: 29800,
            comments: 567,
            views: 198000
          },
          {
            id: "elec_v4",
            title: "Smart Watch Features Breakdown",
            price: 449.99,
            badge: "Tutorial",
            likes: 22100,
            comments: 445,
            views: 156000
          }
        ]}
        products={[
          {
            id: "elec_p1",
            title: "Premium Smartphone Pro Max",
            price: 999.99,
            originalPrice: 1099.99,
            badge: "Hot Deal"
          },
          {
            id: "elec_p2",
            title: "Wireless Noise-Cancelling Headphones",
            price: 299.99,
            originalPrice: 399.99,
            badge: "25% OFF"
          },
          {
            id: "elec_p3",
            title: "Smart Fitness Watch GPS",
            price: 449.99,
            badge: "New Arrival"
          },
          {
            id: "elec_p4",
            title: "Gaming Controller Pro Edition",
            price: 79.99,
            originalPrice: 99.99,
            badge: "Gaming"
          },
          {
            id: "elec_p5",
            title: "Wireless Charging Pad Ultra",
            price: 59.99,
            badge: "Bestseller"
          }
        ]}
        brands={["Apple", "Samsung", "Sony", "Bose", "Garmin", "Razer"]}
      />

      {/* 4) Cellphones Category Section */}
      <CategorySection
        title="Cellphones"
        icon="📞"
        videos={[
          {
            id: "cell_v1",
            title: "Flagship Phone Camera Test",
            price: 1199.99,
            badge: "Camera Test",
            likes: 52300,
            comments: 934,
            views: 387000
          },
          {
            id: "cell_v2",
            title: "Budget Phone vs Premium Comparison",
            price: 299.99,
            originalPrice: 399.99,
            badge: "Comparison",
            likes: 41800,
            comments: 782,
            views: 298000
          },
          {
            id: "cell_v3",
            title: "Phone Accessories Must-Haves",
            price: 49.99,
            originalPrice: 79.99,
            badge: "Accessories",
            likes: 26700,
            comments: 456,
            views: 189000
          },
          {
            id: "cell_v4",
            title: "Screen Protector Installation Guide",
            price: 19.99,
            badge: "Tutorial",
            likes: 18900,
            comments: 298,
            views: 134000
          }
        ]}
        products={[
          {
            id: "cell_p1",
            title: "Flagship Smartphone 256GB",
            price: 1199.99,
            originalPrice: 1299.99,
            badge: "Flagship"
          },
          {
            id: "cell_p2",
            title: "Mid-Range Phone Best Value",
            price: 499.99,
            originalPrice: 599.99,
            badge: "Best Value"
          },
          {
            id: "cell_p3",
            title: "Premium Phone Case Collection",
            price: 39.99,
            originalPrice: 59.99,
            badge: "Protection"
          },
          {
            id: "cell_p4",
            title: "Wireless Car Charger Mount",
            price: 69.99,
            badge: "Car Tech"
          },
          {
            id: "cell_p5",
            title: "Portable Power Bank 20000mAh",
            price: 79.99,
            originalPrice: 99.99,
            badge: "Power"
          }
        ]}
        brands={["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Huawei"]}
      />

      {/* 5) Clothing Category Section */}
      <CategorySection
        title="Clothing"
        icon="👗"
        videos={[
          {
            id: "cloth_v1",
            title: "Summer Wardrobe Essentials Haul",
            price: 199.99,
            originalPrice: 299.99,
            badge: "Summer Sale",
            likes: 67800,
            comments: 1234,
            views: 456000
          },
          {
            id: "cloth_v2",
            title: "Office Wear Style Guide 2024",
            price: 149.99,
            badge: "Style Guide",
            likes: 45200,
            comments: 823,
            views: 312000
          },
          {
            id: "cloth_v3",
            title: "Sustainable Fashion Try-On",
            price: 89.99,
            originalPrice: 129.99,
            badge: "Sustainable",
            likes: 38600,
            comments: 567,
            views: 245000
          },
          {
            id: "cloth_v4",
            title: "Casual Weekend Outfit Ideas",
            price: 119.99,
            badge: "Casual",
            likes: 29400,
            comments: 434,
            views: 198000
          }
        ]}
        products={[
          {
            id: "cloth_p1",
            title: "Designer Summer Dress Collection",
            price: 199.99,
            originalPrice: 299.99,
            badge: "Designer"
          },
          {
            id: "cloth_p2",
            title: "Premium Denim Jeans Straight Fit",
            price: 89.99,
            originalPrice: 119.99,
            badge: "Denim"
          },
          {
            id: "cloth_p3",
            title: "Casual T-Shirt 3-Pack Bundle",
            price: 59.99,
            originalPrice: 89.99,
            badge: "Bundle"
          },
          {
            id: "cloth_p4",
            title: "Business Formal Shirt Collection",
            price: 149.99,
            badge: "Formal"
          },
          {
            id: "cloth_p5",
            title: "Athletic Wear Set Pro Fit",
            price: 129.99,
            originalPrice: 179.99,
            badge: "Athletic"
          }
        ]}
        brands={["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Levi's"]}
      />

      {/* 6) Beauty Category Section */}
      <CategorySection
        title="Beauty"
        icon="💄"
        videos={[
          {
            id: "beauty_v1",
            title: "Complete Skincare Routine Tutorial",
            price: 159.99,
            originalPrice: 229.99,
            badge: "Skincare",
            likes: 78900,
            comments: 1456,
            views: 523000
          },
          {
            id: "beauty_v2",
            title: "Makeup Look: Natural Glow",
            price: 89.99,
            badge: "Makeup",
            likes: 56200,
            comments: 934,
            views: 398000
          },
          {
            id: "beauty_v3",
            title: "Hair Care Routine for Damaged Hair",
            price: 99.99,
            originalPrice: 149.99,
            badge: "Hair Care",
            likes: 42800,
            comments: 723,
            views: 287000
          },
          {
            id: "beauty_v4",
            title: "Fragrance Collection & Reviews",
            price: 199.99,
            badge: "Fragrance",
            likes: 34600,
            comments: 567,
            views: 234000
          }
        ]}
        products={[
          {
            id: "beauty_p1",
            title: "Complete Skincare Routine Kit",
            price: 159.99,
            originalPrice: 229.99,
            badge: "Kit"
          },
          {
            id: "beauty_p2",
            title: "Professional Makeup Palette Set",
            price: 89.99,
            originalPrice: 129.99,
            badge: "Professional"
          },
          {
            id: "beauty_p3",
            title: "Hair Treatment Oil Premium",
            price: 49.99,
            badge: "Hair Care"
          },
          {
            id: "beauty_p4",
            title: "Luxury Fragrance Eau de Parfum",
            price: 199.99,
            originalPrice: 259.99,
            badge: "Luxury"
          },
          {
            id: "beauty_p5",
            title: "Nail Care Essentials Bundle",
            price: 39.99,
            originalPrice: 59.99,
            badge: "Nails"
          }
        ]}
        brands={["L'Oreal", "Maybelline", "Clinique", "MAC", "Sephora", "Urban Decay"]}
      />

      {/* 7) Home Category Section */}
      <CategorySection
        title="Home"
        icon="🏠"
        videos={[
          {
            id: "home_v1",
            title: "Smart Home Setup Complete Guide",
            price: 299.99,
            originalPrice: 399.99,
            badge: "Smart Home",
            likes: 45600,
            comments: 823,
            views: 312000
          },
          {
            id: "home_v2",
            title: "Living Room Makeover on Budget",
            price: 199.99,
            badge: "Makeover",
            likes: 38200,
            comments: 634,
            views: 267000
          },
          {
            id: "home_v3",
            title: "Kitchen Organization Hacks",
            price: 89.99,
            originalPrice: 129.99,
            badge: "Organization",
            likes: 52900,
            comments: 945,
            views: 389000
          },
          {
            id: "home_v4",
            title: "Bedroom Decor Ideas & Tips",
            price: 149.99,
            badge: "Decor",
            likes: 29800,
            comments: 456,
            views: 198000
          }
        ]}
        products={[
          {
            id: "home_p1",
            title: "Smart LED Light Strips Kit",
            price: 79.99,
            originalPrice: 109.99,
            badge: "Smart"
          },
          {
            id: "home_p2",
            title: "Kitchen Appliance Bundle Set",
            price: 299.99,
            originalPrice: 399.99,
            badge: "Bundle"
          },
          {
            id: "home_p3",
            title: "Decorative Wall Art Collection",
            price: 59.99,
            badge: "Decor"
          },
          {
            id: "home_p4",
            title: "Storage Organization System",
            price: 129.99,
            originalPrice: 179.99,
            badge: "Storage"
          },
          {
            id: "home_p5",
            title: "Premium Bedding Set Queen",
            price: 189.99,
            originalPrice: 249.99,
            badge: "Premium"
          }
        ]}
        brands={["IKEA", "Philips", "KitchenAid", "Dyson", "Nest", "Ring"]}
      />

      {/* Newsletter Section */}
      <Newsletter />
      
    </div>
  );
}
