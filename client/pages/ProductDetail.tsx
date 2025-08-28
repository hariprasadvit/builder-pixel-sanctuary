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
  CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketplace } from "@/contexts/MarketplaceContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCurrencySymbol } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5580a7f4d84c4fd5b5757cc8dfeae1b4?format=webp&width=800",
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
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
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

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
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

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <p className="text-gray-700">{product.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
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
                  <div className="text-gray-600">
                    Customer reviews and ratings would be displayed here in a real application.
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
