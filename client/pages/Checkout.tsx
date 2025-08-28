import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard,
  MapPin,
  Plus,
  Edit,
  Lock,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wallet,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLocation, Address } from "@/contexts/LocationContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";

interface PaymentMethod {
  id: string;
  type: "card" | "wallet";
  name: string;
  details: string;
  icon: string;
  isDefault?: boolean;
}

interface NewCardForm {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { 
    items, 
    getTotals, 
    getCartWarnings,
    hasMultipleVendors,
    getItemsByVendor,
    clearCart
  } = useCart();
  
  const { 
    currentAddress, 
    savedAddresses, 
    setCurrentAddress 
  } = useLocation();
  
  const { getMarketplaceLabel, getCurrencySymbol } = useMarketplace();
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(currentAddress);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCard, setNewCard] = useState<NewCardForm>({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [showCvv, setShowCvv] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  // Mock payment methods - in real app this would come from user's saved methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card_1",
      type: "card",
      name: "Visa •••• 4242",
      details: "Expires 12/26",
      icon: "💳",
      isDefault: true
    },
    {
      id: "card_2", 
      type: "card",
      name: "Mastercard •••• 8888",
      details: "Expires 08/25",
      icon: "💳"
    },
    {
      id: "wallet_1",
      type: "wallet",
      name: "Apple Pay",
      details: "Touch ID or Face ID",
      icon: "📱"
    },
    {
      id: "wallet_2",
      type: "wallet", 
      name: "Google Pay",
      details: "One-tap checkout",
      icon: "📱"
    }
  ]);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  useEffect(() => {
    // Set default payment method
    const defaultMethod = paymentMethods.find(method => method.isDefault);
    if (defaultMethod && !selectedPaymentMethod) {
      setSelectedPaymentMethod(defaultMethod.id);
    }
  }, [paymentMethods, selectedPaymentMethod]);

  const currency = getCurrencySymbol();
  const totals = getTotals();
  const warnings = getCartWarnings();
  const vendors = Array.from(new Set(items.map(item => item.vendor)));

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setCurrentAddress(address);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = v;
    if (v.length >= 2) {
      formattedValue = v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return formattedValue;
  };

  const handleCardInputChange = (field: keyof NewCardForm, value: string) => {
    let formattedValue = value;
    
    if (field === "number") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setNewCard(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validateCardForm = (): boolean => {
    const { number, expiry, cvv, name } = newCard;
    return (
      number.replace(/\s/g, '').length >= 13 &&
      expiry.length === 5 &&
      cvv.length >= 3 &&
      name.trim().length > 0
    );
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    
    if (!selectedPaymentMethod && !showNewCardForm) {
      alert("Please select a payment method");
      return;
    }
    
    if (showNewCardForm && !validateCardForm()) {
      alert("Please fill in all card details correctly");
      return;
    }
    
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In real app, this would:
      // 1. Process payment with payment gateway
      // 2. Create order in backend
      // 3. Send confirmation emails
      // 4. Update inventory
      
      // Clear cart and redirect to success page
      clearCart();
      navigate("/payment-success", {
        state: {
          orderNumber: `ORD-${Date.now()}`,
          amount: totals.total,
          currency: currency,
          customerEmail: "customer@example.com",
          orderAddress: selectedAddress
        }
      });
      
    } catch (error) {
      alert("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/cart")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Review your order and complete your purchase</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Delivery & Payment */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup 
                    value={selectedAddress?.id || ""} 
                    onValueChange={(value) => {
                      const address = savedAddresses.find(addr => addr.id === value);
                      if (address) handleAddressSelect(address);
                    }}
                  >
                    {savedAddresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={address.id} className="cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{address.label}</span>
                              {address.isDefault && (
                                <Badge variant="outline" className="text-xs">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{address.address}</p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.pincode}
                            </p>
                          </Label>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!showNewCardForm && (
                    <RadioGroup 
                      value={selectedPaymentMethod} 
                      onValueChange={setSelectedPaymentMethod}
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <Label htmlFor={method.id} className="cursor-pointer font-medium">
                                {method.name}
                              </Label>
                              <p className="text-sm text-gray-600">{method.details}</p>
                            </div>
                          </div>
                          {method.isDefault && (
                            <Badge variant="outline" className="text-xs">Default</Badge>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {showNewCardForm ? (
                    <div className="space-y-4 p-4 border rounded-lg bg-white">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Add New Card</h4>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowNewCardForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={newCard.number}
                            onChange={(e) => handleCardInputChange("number", e.target.value)}
                            maxLength={19}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={newCard.expiry}
                              onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                              <Input
                                id="cvv"
                                type={showCvv ? "text" : "password"}
                                placeholder="123"
                                value={newCard.cvv}
                                onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                                maxLength={4}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowCvv(!showCvv)}
                              >
                                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={newCard.name}
                            onChange={(e) => handleCardInputChange("name", e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="saveCard" 
                            checked={saveCard}
                            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                          />
                          <Label htmlFor="saveCard" className="text-sm">
                            Save this card for future purchases
                          </Label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowNewCardForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Card
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Special instructions for delivery..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-4 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items by Vendor */}
                {hasMultipleVendors() ? (
                  vendors.map(vendor => {
                    const vendorItems = getItemsByVendor(vendor);
                    const vendorTotals = getTotals(vendor);
                    return (
                      <div key={vendor} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{getMarketplaceLabel(vendor)}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {vendor === "china" ? "7-14 days" : vendor === "uk" ? "1-2 days" : "Same day"}
                          </Badge>
                        </div>
                        {vendorItems.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="text-xs text-gray-600 pl-4">
                          Delivery: {vendorTotals.deliveryFee === 0 ? "FREE" : `${currency}${vendorTotals.deliveryFee.toFixed(2)}`}
                        </div>
                        <Separator />
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{currency}{totals.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Delivery Fee
                    </span>
                    <span className={totals.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                      {totals.deliveryFee === 0 ? "FREE" : `${currency}${totals.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{currency}{totals.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax (20% VAT)</span>
                    <span>{currency}{totals.taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total (GBP)</span>
                    <span>{currency}{totals.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <button className="text-blue-600 underline">Terms & Conditions</button> and <button className="text-blue-600 underline">Privacy Policy</button>
                    </Label>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handlePlaceOrder}
                    disabled={processing || !agreeToTerms}
                  >
                    {processing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Place Order {currency}{totals.total.toFixed(2)}
                      </div>
                    )}
                  </Button>

                  {/* Security Info */}
                  <div className="text-center text-xs text-gray-500">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-3 h-3" />
                      Secure payment powered by SSL encryption
                    </div>
                    <p>All payments processed in GBP (£)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
