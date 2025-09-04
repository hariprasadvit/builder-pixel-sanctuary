import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  Send,
  Bot,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCurrencySymbol } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isWishlisted, toggle } = useWishlist();
  const [newReview, setNewReview] = useState("");
  const { toast } = useToast();
  const [newRating, setNewRating] = useState(5);
  const [showComparison, setShowComparison] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Black Titanium");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedSize, setSelectedSize] = useState("");


  // Mock product data - in real app this would be fetched based on the ID
  const iphoneProduct = {
    id: "1",
    title: "iPhone 16 Pro Max 256GB with Camera Control",
    price: 999.99,
    originalPrice: 1099.99,
    rating: 4.8,
    reviewCount: 2847,
    origin: "UK" as const,
    deliveryEta: "Tomorrow",
    inStock: true,
    stockCount: 12,
    images: [
      "https://m.media-amazon.com/images/I/61135j8fPJL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/51UIlT-iiML._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71kahbX9OlL._SX679_.jpg",
    ],
    brand: "Apple",
    model: "iPhone 16",
    storage: "128GB",
    color: "Natural Titanium",
    features: [
      "6.9-inch Super Retina XDR display",
      "A18 Pro Bionic chip",
      "Pro camera system with 5x telephoto",
      "Camera Control button",
      "Titanium design",
      "5G connectivity",
    ],
    description:
      "The iPhone 16 Pro Max features the powerful A18 Pro chip, advanced Pro camera system with 5x telephoto, and comes in premium titanium finishes. Experience professional-grade performance and photography with the largest iPhone display.",
    specifications: {
      // Display
      "Display Type": "Super Retina XDR OLED",
      "Screen Size": "17.43 cm / 6.9″ (diagonal)",
      Resolution: "2868x1320-pixel at 460 ppi",
      "Display Features": "All-screen OLED display",

      // Storage & Capacity
      "Storage Options": "256GB, 512GB, 1TB",
      "Available Capacity": selectedStorage,

      // Durability
      "Water Resistance": "IP68 rated",
      "Water Depth": "Maximum 6 metres up to 30 minutes",
      Standard: "IEC standard 60529",

      // Camera System
      "Main Camera": "48MP Fusion (24mm, ƒ/1.78)",
      "Telephoto 2x": "12MP (52mm, ƒ/1.6)",
      "Ultra Wide": "48MP (13mm, ƒ/2.2, 120° FOV)",
      "Telephoto 5x": "12MP (120mm, ƒ/2.8, 20° FOV)",
      "Optical Zoom": "5x zoom in, 2x zoom out, 10x range",
      "Digital Zoom": "Up to 25x",
      "Front Camera": "12MP (ƒ/1.9, Autofocus)",

      // Power & Battery
      "Video Playback": "Up to 33 hours",
      "Audio Playback": "Up to 105 hours",
      Charging: "MagSafe up to 25W, USB-C fast charge",
      "Fast Charge": "50% in 30 minutes with 20W adapter",

      // Physical
      Height: "163 mm (6.42 inches)",
      "Operating System": "iOS 18",
      Processor: "A18 Pro Bionic",
      Warranty: "One-Year Limited Warranty",
    },
    seller: {
      name: "Apple Store",
      rating: 4.9,
      location: "London, UK",
    },
  };

  const blenderProduct = {
    id: "2",
    title: "SOLARA Blendkwik Portable Blender — 450ml",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewCount: 412,
    origin: "UK" as const,
    deliveryEta: "2 days",
    inStock: true,
    stockCount: 34,
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd13546187dfb44b4bba2bfaeed61a853?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc6a150242fb4a0ea1907d5406c6d846?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd7c29ab3cc974d96b6f2502e0d9cd568?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbee6b7bf593d4cdb849582405a2a43ec?format=webp&width=800",
    ],
    brand: "SOLARA",
    model: "Blendkwik",
    storage: "N/A",
    color: "Black Knight",
    features: [
      "450ml capacity (compact & travel-friendly)",
      "7.4V copper motor with pulse mode for crushing ice",
      "Six ultra-sharp stainless steel blades",
      "USB-C rechargeable — 4000mAh battery",
      "Blockage protection and safety lock",
      "Lightweight (≈545g) and fits most cup holders",
      "Includes Type-C charging cable and recipe card",
    ],
    description:
      "SOLARA Blendkwik is a compact, rechargeable portable blender designed for smoothies, shakes, and juices on-the-go. Powered by a 7.4V copper motor and six stainless steel blades, it handles frozen fruit and ice. The 4000mAh battery (USB-C charging) delivers multiple blends per charge and the unit includes safety features and a recipe card. Register at the SOLARA site for a 1-year warranty.",
    specifications: {
      Capacity: "450 ml",
      Motor: "7.4V copper motor",
      Blades: "6 x stainless steel blades",
      Battery: "4000 mAh rechargeable",
      Charging: "USB-C (cable included)",
      Material: "BPA-free Tritan",
      Weight: "≈545 g",
      DishwasherSafe: "Top-rack only parts",
      Warranty: "1 year (register within 7 days)",
    },
    seller: {
      name: "SOLARA Official",
      rating: 4.6,
      location: "UK",
    },
  };

  const clothingProduct = {
    id: "c1",
    title: "NOBERO Letter Regular T-Shirt - Olive (Pack)",
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.2,
    reviewCount: 842,
    origin: "UK",
    deliveryEta: "Tomorrow",
    inStock: true,
    stockCount: 50,
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1dd3ad46e4244a4b9cf6bf774685aa07?format=webp&width=1500",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdb1db13c0195459fa22b23b5b6f0b89d?format=webp&width=1500",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2c9173056aa140c5893f286b39f8ffe6?format=webp&width=1500",
    ],
    brand: "NOBERO",
    category: "Clothing",
    color: "Olive",
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Regular fit cotton t-shirt",
      "Printed lettering design",
      "Machine washable",
      "Lightweight breathable fabric",
    ],
    description:
      "NOBERO Letter Regular T-Shirt — comfortable everyday tee in olive with subtle print. Lightweight and breathable, perfect for casual wear.",
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular",
      Care: "Machine wash cold",
      Origin: "Imported",
    },
    seller: {
      name: "NOBERO Official",
      rating: 4.3,
      location: "UK",
    },
  };

  const productsById: Record<string, any> = {
    '1': iphoneProduct,
    '2': blenderProduct,
    'c1': clothingProduct,
  };

  const product = productsById[id || '1'] || iphoneProduct;

  // default selected size when product loads
  useEffect(() => {
    if (product && product.sizes && product.sizes.length) {
      setSelectedSize((s) => (s ? s : product.sizes[0]));
    }
  }, [product]);

  const handleQuantityChange = (increment: boolean) => {
    if (increment && quantity < product.stockCount) {
      setQuantity(quantity + 1);
    } else if (!increment && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.title} to cart`);
    // In real app, this would add to cart context/state
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${product.title}`);
    // In real app, this would navigate to checkout
  };

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      console.log(`New review: ${newReview}, Rating: ${newRating}`);
      setNewReview("");
      setNewRating(5);
    }
  };

  const marketingImages = [
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5de5308cd9d74fa89a81d80b794c4690?format=webp&width=1500",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9a3b0baebdac4319970704f846d0cf1a?format=webp&width=1500",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc4fcc90eee26492ebf3f89aa9b9fab34?format=webp&width=1500",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0676db21bd004183907b38103230e546?format=webp&width=1500",
    "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F89f17da7e0ce49628ee5fe3233aa9946?format=webp&width=1500",
  ];

  const productComparison = [
    {
      model: "Blendkwik (Standard)",
      price: "£39.99",
      motor: "7.4V copper motor",
      capacity: "450 ml",
      battery: "4000 mAh",
      features: ["USB-C Rechargeable", "6 stainless steel blades", "Safe-lock design"],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5de5308cd9d74fa89a81d80b794c4690?format=webp&width=800",
    },
    {
      model: "Blendkwik Pro",
      price: "£59.99",
      motor: "9V high-torque motor",
      capacity: "500 ml",
      battery: "5000 mAh",
      features: ["Stronger blades", "Longer battery", "Travel pouch"],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9a3b0baebdac4319970704f846d0cf1a?format=webp&width=800",
    },
  ];

  const mockReviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing phone! The camera quality is outstanding and the battery life is excellent. Camera Control is a game-changer for photography.",
      helpful: 24,
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great upgrade from my iPhone 14. The A18 chip is incredibly fast and the new features are useful. Only wish it had better zoom capabilities.",
      helpful: 18,
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Perfect phone for content creators. The video quality is cinema-grade and the new Action Button is so convenient for quick access to camera.",
      helpful: 32,
    },
  ];

  const aiSummary = product.id === '2'
    ? "Based on customer feedback, the SOLARA Blendkwik is praised for its portability, ease of use, and ability to crush frozen fruit and light ice. Users highlight the USB-C rechargeable battery and that it’s great for on-the-go smoothies. Primary suggestions: some users request a slightly larger capacity and stronger motor for heavy-duty blending. Overall sentiment: ~89% positive."
    : "Based on 2,847 customer reviews, the iPhone 16 excels in camera quality (95% positive), battery life (92% positive), and performance (97% positive). Most common praise: Camera Control feature, A18 chip speed, and build quality. Main concerns: Price point (mentioned in 12% of reviews) and desire for better zoom capabilities. Overall sentiment: 94% positive, with 'camera' and 'fast' being the most mentioned positive keywords.";

  const colorOptions = [
    {
      name: "Black Titanium",
      image: "https://m.media-amazon.com/images/I/61135j8fPJL._AC_SX69_.jpg",
      price: 999.99,
      originalPrice: 1099.99,
    },
    {
      name: "Natural Titanium",
      image: "https://m.media-amazon.com/images/I/51UIlT-iiML._AC_SX69_.jpg",
      price: 999.99,
      originalPrice: 1099.99,
    },
    {
      name: "White Titanium",
      image: "https://m.media-amazon.com/images/I/71kahbX9OlL._AC_SX69_.jpg",
      price: 1019.99,
      originalPrice: 1099.99,
    },
    {
      name: "Desert Titanium",
      image: "https://m.media-amazon.com/images/I/61135j8fPJL._AC_SX69_.jpg",
      price: 1039.99,
      originalPrice: 1099.99,
    },
  ];

  const storageOptions = [
    { size: "256GB", price: 1199.99, available: true },
    { size: "512GB", price: 1399.99, available: true },
    { size: "1TB", price: 1599.99, available: true },
  ];

  const frequentlyBoughtTogether = [
    {
      id: "fbt1",
      title: "Apple 20W USB-C Power Adapter for iPhone, iPad & AirPod...",
      price: 25.99,
      rating: 4.6,
      reviewCount: 3014,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb14c18fed8f2414098886fb619e2aa61?format=webp&width=800",
      savings: "12% off",
    },
    {
      id: "fbt2",
      title: "Spigen Ultra Hybrid MagFit Back Cover for Apple iPhone 16",
      price: 25.99,
      rating: 3.8,
      reviewCount: 67,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa9652edad11144bdb94228eb2683f050?format=webp&width=800",
    },
  ];

  const recommendedProducts = [
    {
      id: "rec1",
      title: "Samsung Galaxy S24 Ultra 256GB - No.1 Selling Android",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.5,
      reviewCount: 892,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Faa983f0020c6415b9f5ce51ad181afc2?format=webp&width=800",
      badge: "Best Seller",
    },
    {
      id: "rec2",
      title: "Apple Watch Series 9 GPS 45mm Aluminum Case",
      price: 399.99,
      rating: 4.6,
      reviewCount: 567,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0c0d110594234678a2d95d775bccee17?format=webp&width=800",
      badge: "New",
    },
    {
      id: "rec3",
      title: "Apple 20W USB-C Power Adapter - Fast Charging",
      price: 29.99,
      originalPrice: 35.99,
      rating: 4.8,
      reviewCount: 2156,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb14c18fed8f2414098886fb619e2aa61?format=webp&width=800",
    },
    {
      id: "rec4",
      title: "Spigen MagSafe Compatible iPhone 16 Case",
      price: 34.99,
      rating: 4.7,
      reviewCount: 1847,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa9652edad11144bdb94228eb2683f050?format=webp&width=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span
            className="hover:text-brand-blue cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span
            className="hover:text-brand-blue cursor-pointer"
            onClick={() => navigate(`/${(product.category || 'electronics').toLowerCase()}`)}
          >
            {product.category || 'Electronics'}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        {/* Mobile Layout - Cleaner top section */}
        <div className="lg:hidden mb-6">
          {/* Product Image - Full width */}
          <div className="mb-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md border max-w-sm mx-auto">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="flex gap-2 justify-center mt-3 overflow-x-auto px-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-brand-blue"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info - Organized */}
          <div className="space-y-4 px-1">
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-600 text-white text-xs">
                  {product.origin}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {getCurrencySymbol()}
                  {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {getCurrencySymbol()}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <Badge className="bg-red-100 text-red-700 mb-4 inline-block">
                  Save {getCurrencySymbol()}
                  {(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium text-sm">
                      In Stock ({product.stockCount} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium text-sm">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Description - Now visible on mobile */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-gray-800 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Product Highlights - Mobile version */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                Product Highlights
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div className="flex items-start gap-3 py-1">
                  <span className="text-blue-600 font-bold text-lg leading-none">
                    •
                  </span>
                  <span>A18 Pro chip for pro-level performance</span>
                </div>
                <div className="flex items-start gap-3 py-1">
                  <span className="text-blue-600 font-bold text-lg leading-none">
                    •
                  </span>
                  <span>Pro camera system with 5x telephoto lens</span>
                </div>
                <div className="flex items-start gap-3 py-1">
                  <span className="text-blue-600 font-bold text-lg leading-none">
                    •
                  </span>
                  <span>Extended battery life up to 33 hours video</span>
                </div>
                <div className="flex items-start gap-3 py-1">
                  <span className="text-blue-600 font-bold text-lg leading-none">
                    •
                  </span>
                  <span>Premium titanium design - aerospace grade</span>
                </div>
                <div className="flex items-start gap-3 py-1">
                  <span className="text-blue-600 font-bold text-lg leading-none">
                    •
                  </span>
                  <span>6.9″ largest iPhone display ever</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Better positioned */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-1 space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg h-12"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now - {getCurrencySymbol()}
                {(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-4 text-lg h-12"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Improved responsive design */}
        <div className="hidden lg:block mb-6">
          <div className="max-w-7xl mx-auto px-2">
            <div className="grid grid-cols-12 gap-6">
              {/* Product Images */}
              <div className="col-span-4 space-y-4">
                <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg border">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedImage === index
                          ? "border-brand-blue"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="col-span-5 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white">
                      {product.origin}
                    </Badge>
                    <Badge variant="outline">{product.brand}</Badge>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {getCurrencySymbol()}
                      {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {getCurrencySymbol()}
                        {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-100 text-red-700">
                        Save {getCurrencySymbol()}
                        {(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  {/* Product Description */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-gray-800 text-sm leading-relaxed">{product.description}</p>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">
                        In Stock ({product.stockCount} available)
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-medium">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Size selector (desktop) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Size</h4>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((s: string) => (
                        <button key={s} className={`px-3 py-1 rounded-md border ${selectedSize === s ? "border-brand-blue bg-brand-blue/10" : "border-gray-200"}`} onClick={() => setSelectedSize(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}


                {/* Delivery Info */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-brand-blue" />
                      <div>
                        <div className="font-medium">
                          Delivery: {product.deliveryEta}
                        </div>
                        <div className="text-sm text-gray-600">
                          Free delivery on orders over {getCurrencySymbol()}50
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quantity & Actions */}
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900 min-w-[80px]">
                      Quantity:
                    </span>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 hover:bg-blue-50"
                        onClick={() => handleQuantityChange(false)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 hover:bg-blue-50"
                        onClick={() => handleQuantityChange(true)}
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 h-14"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Buy Now - {getCurrencySymbol()}
                      {(product.price * quantity).toFixed(2)}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-4 text-lg transition-all duration-200 h-14"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggle({
                          id: product.id,
                          name: product.title,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.images[0],
                          category: product.category,
                          inStock: product.inStock,
                        });
                        const nowWishlisted = isWishlisted(product.id);
                        toast({
                          title: nowWishlisted
                            ? "Added to Wishlist."
                            : "Removed from Wishlist.",
                        });
                      }}
                      className={`flex-1 h-12 ${isWishlisted(product.id) ? "text-red-600 border-red-600" : ""}`}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${isWishlisted(product.id) ? "fill-current" : ""}`}
                      />
                      {isWishlisted(product.id) ? "Wishlisted" : "Wishlist"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-12">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                    <div className="text-xs font-medium text-gray-700">
                      Secure Payment
                    </div>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                    <div className="text-xs font-medium text-gray-700">
                      30-Day Returns
                    </div>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                    <div className="text-xs font-medium text-gray-700">
                      Fast Delivery
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Highlights & Summary - Third Column */}
              <div className="col-span-3 space-y-4">
                {/* Quick Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    Product Highlights
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 py-1">
                        <span className="text-blue-600 font-bold text-lg leading-none">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Specs */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Specs</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(product.specifications || {}).slice(0, 4).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-gray-600">{k}</span>
                        <div className="font-medium">{String(v)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Value Proposition */}
                {product.category !== 'Clothing' && (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500 text-white text-xs">LIMITED OFFER</Badge>
                      <span className="text-sm font-medium text-gray-900">Save {getCurrencySymbol()}{(product.originalPrice - product.price).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-700">Get the SOLARA Blendkwik with fast delivery and 1-year warranty upon registration. Limited time offer — save on the launch price.</p>
                  </div>
                )}

                {/* Why Choose This */}
                {product.category !== 'Clothing' && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Why Choose SOLARA Blendkwik?</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>Safe, BPA-free Tritan jar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{product.rating}/5 rating from {product.reviewCount} customers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span>Delivery in {product.deliveryEta}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Detail Sections - Options */}
        <div className="lg:hidden space-y-6 mb-8 px-1">
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Size</h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    className={`px-3 py-1 rounded-md border ${selectedSize === s ? "border-brand-blue bg-brand-blue/10" : "border-gray-200"}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Delivery Info */}
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity Selector */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Quantity</h4>
              <div className="flex items-center justify-center border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 hover:bg-blue-50"
                  onClick={() => handleQuantityChange(false)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 hover:bg-blue-50"
                  onClick={() => handleQuantityChange(true)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-blue" />
                Delivery
              </h4>
              <div className="text-sm">
                <div className="font-medium">{product.deliveryEta}</div>
                <div className="text-gray-600 text-xs">Free on £50+ orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Images - Single Column Scroll Layout */}
        {product.category === 'Clothing' ? (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Why NOBERO T‑Shirts?</h2>
            <div className="space-y-0">
              {[
                "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe98a8635fcfd46d0b338eda1133a18e3?format=webp&width=1500",
                "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe0374722cdb9474cb190793a11bf5541?format=webp&width=1500",
                "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6405d0c1fbc5451099e170fb3cf3f29c?format=webp&width=1500",
                "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F915231fbe5c649b491a8cbe1a416ccd0?format=webp&width=1500",
              ].map((image, index) => (
                <div key={index} className="w-full">
                  <img src={image} alt={`NOBERO ${index + 1}`} className="w-full h-auto object-cover block" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Why SOLARA Blendkwik?</h2>
            <div className="space-y-0">
              {marketingImages.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`SOLARA Blendkwik Marketing ${index + 1}`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* iPhone Comparison */}
        {product.category !== 'Clothing' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Compare Blendkwik Models</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center gap-2"
                >
                  {showComparison ? "Hide" : "Show"} Comparison
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showComparison ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
              {showComparison && (
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-4 gap-4">
                      {productComparison.map((phone, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${
                            phone.model === product.model ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="text-center">
                              <div className="w-20 h-20 mx-auto mb-3 bg-white border rounded-lg overflow-hidden">
                                <img
                                  src={phone.image}
                                  alt={phone.model}
                                  className="w-full h-full object-contain p-2"
                                />
                              </div>
                              <h3 className="font-bold text-lg">{phone.model}</h3>
                              <p className="text-xl font-bold text-green-600">
                                {phone.price}
                              </p>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Motor:</span>
                                <p className="text-gray-800">{phone.motor}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Capacity:</span>
                                <p className="text-gray-800">{phone.capacity}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Battery:</span>
                                <p className="text-gray-800">{phone.battery}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Features:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {phone.features.map((feature, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Product Details Tabs */}
        <Card className="relative z-10">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews & AI Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6 relative z-0">
                <div className="space-y-8">
                  {/* Product Description */}
                  <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl p-8 border border-blue-100 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Product Overview
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group hover:shadow-md transition-shadow duration-200 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold text-xl leading-none mt-0.5">
                              ✓
                            </span>
                            <span className="text-gray-800 font-medium">
                              {feature}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6 relative z-0">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Technical Specifications
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Complete technical details and features
                    </p>
                  </div>

                  {/* Render specifications dynamically from product.specifications */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{String(value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Overall Rating */}
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>
                  </div>

                  {/* AI Summary */}
  {product.category !== 'Clothing' && (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">
            AI Review Summary
          </h3>
          <Badge className="bg-purple-100 text-purple-700 text-xs">
            Powered by AI
          </Badge>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{aiSummary}</p>
      </CardContent>
    </Card>
  )}

                  {/* Write a Review */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Write a Review</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 cursor-pointer ${
                                i < newRating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setNewRating(i + 1)}
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button
                        onClick={handleSubmitReview}
                        disabled={!newReview.trim()}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Post Review
                      </Button>
                    </div>
                  </div>

                  {/* Customer Reviews */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Customer Reviews</h3>
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {review.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">
                                {review.user}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="hover:text-brand-blue">
                            Helpful ({review.helpful})
                          </button>
                          <button className="hover:text-brand-blue">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Seller Info */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Sold by</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">
                    {product.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{product.seller.name}</div>
                  <div className="text-sm text-gray-600">
                    {product.seller.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">
                      {product.seller.rating} seller rating
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline">View Store</Button>
            </div>
          </CardContent>
        </Card>

        {/* Frequently Bought Together */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">
              Frequently bought together
            </h2>
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="space-y-4">
                {/* Main Product - Mobile */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 bg-white border rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      This item
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {product.title}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      £{product.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Additional Products - Mobile */}
                {frequentlyBoughtTogether.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-xl text-gray-400 font-light flex-shrink-0">
                      +
                    </div>
                    <div className="w-20 h-20 bg-white border rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer line-clamp-2 font-medium">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({item.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-sm font-semibold">
                          £{item.price.toFixed(2)}
                        </div>
                        {item.savings && (
                          <div className="text-xs text-green-600">
                            {item.savings}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-row items-start gap-6">
              {/* Main Product */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white border rounded-lg overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="mt-2 text-sm font-medium">This item</div>
                <div className="text-sm text-gray-600">
                  £{product.price.toFixed(2)}
                </div>
              </div>

              {/* Plus Icons and Additional Products */}
              <div className="flex flex-wrap items-start gap-4">
                {frequentlyBoughtTogether.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="text-2xl text-gray-400 font-light">+</div>
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer line-clamp-2 max-w-24">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({item.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="text-sm font-semibold">
                        £{item.price.toFixed(2)}
                      </div>
                      {item.savings && (
                        <div className="text-xs text-green-600">
                          {item.savings}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price and Add to Cart */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total price:</div>
                  <div className="text-xl font-bold">
                    £
                    {(
                      product.price +
                      frequentlyBoughtTogether.reduce(
                        (sum, item) => sum + item.price,
                        0,
                      )
                    ).toFixed(2)}
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  Add all to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                Customers who viewed this item also viewed
              </h2>
              <Button variant="ghost" className="text-blue-600 hover:underline">
                View more
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    {item.badge && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs z-10">
                        {item.badge}
                      </Badge>
                    )}
                    <div className="aspect-square p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({item.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          £{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            £{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
