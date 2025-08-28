import { useState } from "react";
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
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCurrencySymbol } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showComparison, setShowComparison] = useState(false);

  // Mock product data - in real app this would be fetched based on the ID
  const product = {
    id: "1",
    title: "iPhone 16 128GB with Camera Control",
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
      "6.1-inch Super Retina XDR display",
      "A18 Bionic chip",
      "Advanced dual-camera system",
      "Camera Control button",
      "Face ID",
      "5G connectivity"
    ],
    description: "The iPhone 16 features the powerful A18 chip, enhanced camera capabilities with the new Camera Control, and comes in stunning colors. Experience next-level performance and photography.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR OLED",
      "Chip": "A18 Bionic",
      "Storage": "128GB",
      "Camera": "48MP Main, 12MP Ultra Wide",
      "Battery": "Up to 22 hours video playback",
      "OS": "iOS 18"
    },
    seller: {
      name: "Apple Store",
      rating: 4.9,
      location: "London, UK"
    }
  };

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
    "https://m.media-amazon.com/images/G/31/img25/Wireless/Madhav/Feb/Apple/River/16/iPhone_16_Marketing_Page_Flex_Module_Avail_Amazon_Desktop_1500px__en-IN_01._CB547243914_.jpg",
    "https://m.media-amazon.com/images/G/31/img25/Wireless/Madhav/Feb/Apple/River/16/iPhone_16_Marketing_Page_Flex_Module_Avail_Amazon_Desktop_1500px__en-IN_02._CB547243914_.jpg",
    "https://m.media-amazon.com/images/G/31/img25/Wireless/Madhav/Feb/Apple/River/16/iPhone_16_Marketing_Page_Flex_Module_Avail_Amazon_Desktop_1500px__en-IN_03._CB547243914_.jpg",
    "https://m.media-amazon.com/images/G/31/img25/Wireless/Madhav/Feb/Apple/River/16/iPhone_16_Marketing_Page_Flex_Module_Avail_Amazon_Desktop_1500px__en-IN_04._CB547243914_.jpg",
  ];

  const iPhoneComparison = [
    {
      model: "iPhone 16",
      price: "£999.99",
      display: "6.1\" Super Retina XDR",
      chip: "A18 Bionic",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "Up to 22h video",
      storage: "128GB, 256GB, 512GB",
      features: ["Camera Control", "Action Button", "USB-C"]
    },
    {
      model: "iPhone 16 Plus",
      price: "£1,099.99",
      display: "6.7\" Super Retina XDR",
      chip: "A18 Bionic",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "Up to 27h video",
      storage: "128GB, 256GB, 512GB",
      features: ["Camera Control", "Action Button", "USB-C"]
    },
    {
      model: "iPhone 16 Pro",
      price: "£1,199.99",
      display: "6.3\" Super Retina XDR ProMotion",
      chip: "A18 Pro",
      camera: "48MP Main + 48MP Ultra Wide + 12MP Telephoto",
      battery: "Up to 27h video",
      storage: "128GB, 256GB, 512GB, 1TB",
      features: ["Camera Control", "Action Button", "Titanium Design", "5x Zoom"]
    },
    {
      model: "iPhone 16 Pro Max",
      price: "£1,399.99",
      display: "6.9\" Super Retina XDR ProMotion",
      chip: "A18 Pro",
      camera: "48MP Main + 48MP Ultra Wide + 12MP Telephoto",
      battery: "Up to 33h video",
      storage: "256GB, 512GB, 1TB",
      features: ["Camera Control", "Action Button", "Titanium Design", "5x Zoom"]
    }
  ];

  const mockReviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2 days ago",
      comment: "Amazing phone! The camera quality is outstanding and the battery life is excellent. Camera Control is a game-changer for photography.",
      helpful: 24
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "1 week ago",
      comment: "Great upgrade from my iPhone 14. The A18 chip is incredibly fast and the new features are useful. Only wish it had better zoom capabilities.",
      helpful: 18
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect phone for content creators. The video quality is cinema-grade and the new Action Button is so convenient for quick access to camera.",
      helpful: 32
    }
  ];

  const aiSummary = "Based on 2,847 customer reviews, the iPhone 16 excels in camera quality (95% positive), battery life (92% positive), and performance (97% positive). Most common praise: Camera Control feature, A18 chip speed, and build quality. Main concerns: Price point (mentioned in 12% of reviews) and desire for better zoom capabilities. Overall sentiment: 94% positive, with 'camera' and 'fast' being the most mentioned positive keywords.";

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
            onClick={() => navigate("/electronics")}
          >
            Electronics
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
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
                  className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? "border-brand-blue" : "border-gray-200"
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
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-600 text-white">{product.origin}</Badge>
                <Badge variant="outline">{product.brand}</Badge>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
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
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {getCurrencySymbol()}{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {getCurrencySymbol()}{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-100 text-red-700">
                    Save {getCurrencySymbol()}{(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
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
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-brand-blue" />
                  <div>
                    <div className="font-medium">Delivery: {product.deliveryEta}</div>
                    <div className="text-sm text-gray-600">
                      Free delivery on orders over {getCurrencySymbol()}50
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now - {getCurrencySymbol()}{(product.price * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-4 text-lg transition-all duration-200"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Shield className="w-6 h-6 text-brand-blue mx-auto mb-1" />
                <div className="text-xs text-gray-600">Secure Payment</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-brand-blue mx-auto mb-1" />
                <div className="text-xs text-gray-600">30-Day Returns</div>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-brand-blue mx-auto mb-1" />
                <div className="text-xs text-gray-600">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Images */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Why iPhone 16?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {marketingImages.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  src={image}
                  alt={`iPhone 16 Marketing ${index + 1}`}
                  className="w-full h-auto object-cover block"
                />
              </div>
            ))}
          </div>
        </div>

        {/* iPhone Comparison */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Compare iPhone Models</h2>
              <Button
                variant="outline"
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center gap-2"
              >
                {showComparison ? "Hide" : "Show"} Comparison
                <ChevronDown className={`w-4 h-4 transition-transform ${showComparison ? "rotate-180" : ""}`} />
              </Button>
            </div>
            {showComparison && (
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-4 gap-4">
                    {iPhoneComparison.map((phone, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${
                          phone.model === 'iPhone 16'
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="text-center">
                            <h3 className="font-bold text-lg">{phone.model}</h3>
                            <p className="text-xl font-bold text-green-600">{phone.price}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Display:</span>
                              <p className="text-gray-800">{phone.display}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Chip:</span>
                              <p className="text-gray-800">{phone.chip}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Camera:</span>
                              <p className="text-gray-800">{phone.camera}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Battery:</span>
                              <p className="text-gray-800">{phone.battery}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Features:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {phone.features.map((feature, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
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
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                          <div className="w-2 h-2 bg-brand-blue rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6 relative z-0">
                <div className="bg-white rounded-lg">
                  <div className="grid grid-cols-1 gap-0">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={key}
                        className={`flex justify-between items-center py-4 px-6 ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } ${index === 0 ? 'rounded-t-lg' : ''} ${
                          index === Object.entries(product.specifications).length - 1 ? 'rounded-b-lg' : ''
                        }`}
                      >
                        <span className="font-semibold text-gray-900">{key}</span>
                        <span className="text-gray-700 font-medium">{value}</span>
                      </div>
                    ))}
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
                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Bot className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-purple-900">AI Review Summary</h3>
                        <Badge className="bg-purple-100 text-purple-700 text-xs">Powered by AI</Badge>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{aiSummary}</p>
                    </CardContent>
                  </Card>

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
                              <div className="font-medium text-sm">{review.user}</div>
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
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="hover:text-brand-blue">
                            Helpful ({review.helpful})
                          </button>
                          <button className="hover:text-brand-blue">Reply</button>
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
                  <div className="text-sm text-gray-600">{product.seller.location}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.seller.rating} seller rating</span>
                  </div>
                </div>
              </div>
              <Button variant="outline">View Store</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
