import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  AlertTriangle,
  Tag,
  Truck,
  MapPin,
  Clock,
  X,
  CheckCircle
} from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useMarketplace, MarketplaceType } from "@/contexts/MarketplaceContext";
import { useLocation } from "@/contexts/LocationContext";
import { useFireworks } from "@/hooks/useFireworks";
import EnhancedStripeCheckout from "@/components/EnhancedStripeCheckout";

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearVendorCart,
    getItemsByVendor,
    getCartWarnings,
    hasMultipleVendors,
    getTotals,
    getItemCount,
    appliedCoupons,
    applyCoupon,
    removeCoupon
  } = useCart();
  
  const { getMarketplaceLabel, getDeliveryTime, getCurrencySymbol } = useMarketplace();
  const { currentAddress } = useLocation();
  const { triggerFireworks, FireworksComponent } = useFireworks();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);

  const warnings = getCartWarnings();
  const currency = getCurrencySymbol();
  const totalItems = getItemCount();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    const success = await applyCoupon(couponCode.trim());

    if (success) {
      const code = couponCode.trim();
      setCouponCode("");

      // Trigger fireworks for the special 1234 code
      if (code === "1234") {
        setCouponSuccess("🎆 Firework discount applied! Enjoy £50 off!");
        console.log('Triggering fireworks for coupon 1234');
        triggerFireworks();
      } else {
        setCouponSuccess("✅ Coupon applied successfully!");
      }

      // Clear success message after 5 seconds
      setTimeout(() => setCouponSuccess(""), 5000);
    } else {
      setCouponError("Invalid coupon code or coupon already applied");
    }

    setCouponLoading(false);
  };

  const handlePaymentSuccess = () => {
    setShowStripeCheckout(false);

    // Clear cart and navigate to success page
    clearCart();
    navigate("/payment-success", {
      state: {
        orderNumber: `ORD-${Date.now()}`,
        amount: overallTotals.total,
        currency: currency,
        customerEmail: "customer@example.com"
      }
    });
  };

  const CartItemCard = ({ item }: { item: CartItem }) => (
    <Card className="mb-4 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.vendorName}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {getMarketplaceLabel(item.vendor)}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            {item.attributes && (
              <div className="flex gap-2 mb-2">
                {item.attributes.size && (
                  <Badge variant="secondary" className="text-xs">Size: {item.attributes.size}</Badge>
                )}
                {item.attributes.color && (
                  <Badge variant="secondary" className="text-xs">Color: {item.attributes.color}</Badge>
                )}
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="text-right">
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-sm text-gray-400 line-through">
                    {currency}{item.originalPrice.toFixed(2)}
                  </p>
                )}
                <p className="font-semibold text-lg">
                  {currency}{(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {currency}{item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const VendorSection = ({ vendor, vendorItems }: { vendor: MarketplaceType; vendorItems: CartItem[] }) => {
    const vendorTotals = getTotals(vendor);
    const vendorLabel = getMarketplaceLabel(vendor);
    const deliveryTime = getDeliveryTime(vendor);
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{vendorLabel} Marketplace</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {deliveryTime}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => clearVendorCart(vendor)}
            className="text-red-600 hover:text-red-700"
          >
            Clear {vendorLabel} Cart
          </Button>
        </div>
        
        {vendorItems.map(item => (
          <CartItemCard key={`${item.id}-${JSON.stringify(item.attributes)}`} item={item} />
        ))}
        
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({vendorItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>{currency}{vendorTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Delivery Fee
                </span>
                <span className={vendorTotals.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                  {vendorTotals.deliveryFee === 0 ? "FREE" : `${currency}${vendorTotals.deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <div className="flex gap-3 justify-center mb-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    addToCart({
                      id: "demo-1",
                      name: "iPhone 16 Pro Max 256GB",
                      price: 999.99,
                      image: "/placeholder.svg",
                      vendor: "uk",
                      vendorName: "UK Marketplace",
                      category: "Electronics"
                    });
                    addToCart({
                      id: "demo-2",
                      name: "Xiaomi Mi 13 Ultra 512GB",
                      price: 649.99,
                      originalPrice: 799.99,
                      image: "/placeholder.svg",
                      vendor: "china",
                      vendorName: "China Marketplace",
                      category: "Electronics"
                    });
                  }}
                >
                  Add Demo Items
                </Button>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-500">
                  💡 Tip: Use coupon code "1234" for a special surprise!
                </p>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                    <p className="text-sm font-medium text-blue-800 mb-2">Test the firework effect:</p>
                    <Button
                      onClick={() => {
                        console.log('Manual firework test triggered from Cart page');
                        triggerFireworks();
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
                    >
                      🎆 Launch Fireworks! 🎆
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
                    <p className="text-sm font-medium text-green-800 mb-2">Test the complete payment flow:</p>
                    <Button
                      onClick={() => {
                        // Add demo items first
                        addToCart({
                          id: "demo-1",
                          name: "iPhone 16 Pro Max 256GB",
                          price: 999.99,
                          image: "/placeholder.svg",
                          vendor: "uk",
                          vendorName: "UK Marketplace",
                          category: "Electronics"
                        });
                        // Then open payment modal
                        setTimeout(() => setShowStripeCheckout(true), 500);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
                    >
                      💳 Test Payment Flow 💳
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const overallTotals = getTotals();
  const vendors = Array.from(new Set(items.map(item => item.vendor)));

  return (
    <>
      <FireworksComponent />
      <EnhancedStripeCheckout
        amount={overallTotals.total}
        currency={currency}
        isOpen={showStripeCheckout}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowStripeCheckout(false)}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mb-6 space-y-3">
            {warnings.map((warning, index) => (
              <Alert key={index} className="border-orange-200 bg-orange-50">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  {warning}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {hasMultipleVendors() ? (
              vendors.map(vendor => (
                <VendorSection 
                  key={vendor} 
                  vendor={vendor} 
                  vendorItems={getItemsByVendor(vendor)} 
                />
              ))
            ) : (
              <div>
                {items.map(item => (
                  <CartItemCard key={`${item.id}-${JSON.stringify(item.attributes)}`} item={item} />
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Address */}
                {currentAddress && (
                  <div className="p-3 bg-white rounded-lg border">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Deliver to:</p>
                        <p className="text-sm text-gray-600">
                          {currentAddress.address}, {currentAddress.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {currentAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Coupon Section */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <Button 
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </Button>
                  </div>
                  
                  {couponError && (
                    <p className="text-sm text-red-600">{couponError}</p>
                  )}

                  {couponSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">{couponSuccess}</p>
                    </div>
                  )}
                  
                  {appliedCoupons.length > 0 && (
                    <div className="space-y-2">
                      {appliedCoupons.map(coupon => (
                        <div key={coupon.code} className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-800">{coupon.code}</p>
                              <p className="text-xs text-green-600">{coupon.description}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeCoupon(coupon.code)}
                            className="w-6 h-6 text-green-600 hover:text-green-800"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{currency}{overallTotals.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className={overallTotals.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                      {overallTotals.deliveryFee === 0 ? "FREE" : `${currency}${overallTotals.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {overallTotals.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{currency}{overallTotals.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax (20% VAT)</span>
                    <span>{currency}{overallTotals.taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{currency}{overallTotals.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowStripeCheckout(true)}
                >
                  Proceed to Checkout
                </Button>

                {/* Security Info */}
                <div className="text-center text-xs text-gray-500 mt-4">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Secure checkout powered by SSL encryption
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
