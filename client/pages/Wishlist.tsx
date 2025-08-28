import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2, 
  Share2,
  Filter,
  Grid3X3,
  List,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Wishlist() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB",
      price: 999.99,
      originalPrice: 1099.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
      rating: 4.8,
      reviewCount: 2847,
      category: "Electronics",
      inStock: true,
      addedDate: "2024-12-10",
      priceDropPercent: 9
    },
    {
      id: "2",
      name: "Samsung Galaxy Buds Pro",
      price: 89.99,
      originalPrice: 149.99,
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
      rating: 4.5,
      reviewCount: 1234,
      category: "Electronics", 
      inStock: true,
      addedDate: "2024-12-08",
      priceDropPercent: 40
    },
    {
      id: "3",
      name: "Nike Air Max Running Shoes",
      price: 119.99,
      originalPrice: null,
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=800",
      rating: 4.7,
      reviewCount: 567,
      category: "Sports",
      inStock: false,
      addedDate: "2024-12-05",
      priceDropPercent: null
    },
    {
      id: "4",
      name: "Dyson V15 Detect Cordless Vacuum",
      price: 549.99,
      originalPrice: null,
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=800",
      rating: 4.9,
      reviewCount: 892,
      category: "Home",
      inStock: true,
      addedDate: "2024-12-03",
      priceDropPercent: null
    }
  ]);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const addToCart = (itemId: string) => {
    // Add to cart logic here
    console.log("Adding to cart:", itemId);
  };

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {item.priceDropPercent && (
                <Badge className="absolute top-2 left-2 bg-red-600">
                  -{item.priceDropPercent}%
                </Badge>
              )}
              {!item.inStock && (
                <Badge className="absolute top-2 right-2 bg-gray-600">
                  Out of Stock
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({item.reviewCount})</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-lg">£{item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    £{item.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  disabled={!item.inStock}
                  onClick={() => addToCart(item.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Added {new Date(item.addedDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                {item.priceDropPercent && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-xs">
                    -{item.priceDropPercent}%
                  </Badge>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge variant="secondary" className="text-xs mb-1">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">£{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-500 line-through">
                        £{item.originalPrice}
                      </span>
                    )}
                    {!item.inStock && (
                      <Badge className="bg-gray-600">Out of Stock</Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      disabled={!item.inStock}
                      onClick={() => addToCart(item.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  Added to wishlist on {new Date(item.addedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            {/* Controls */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search wishlist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={view === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setView("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={view === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setView("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Drop Alerts */}
            {filteredItems.some(item => item.priceDropPercent) && (
              <Card className="mb-6 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <span className="text-sm font-medium">🎉 Price Drops Alert!</span>
                    <span className="text-sm">
                      {filteredItems.filter(item => item.priceDropPercent).length} items have reduced prices
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Items */}
            {filteredItems.length > 0 ? (
              view === "grid" ? <GridView /> : <ListView />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding items you love to your wishlist. You'll find the heart icon on product pages.
              </p>
              <Link to="/">
                <Button size="lg">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
