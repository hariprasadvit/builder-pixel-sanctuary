import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND_GRADIENT } from "@/components/ui/placeholders";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard,
  Lock,
  CheckCircle,
  X,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit
} from "lucide-react";

interface SavedCard {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

interface EnhancedStripeCheckoutProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

interface NewCardForm {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
  email: string;
  saveCard: boolean;
}

export default function EnhancedStripeCheckout({ 
  amount, 
  currency, 
  onSuccess, 
  onCancel, 
  isOpen 
}: EnhancedStripeCheckoutProps) {
  const [processing, setProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"saved" | "new">("saved");
  const [selectedCardId, setSelectedCardId] = useState("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  
  const [newCard, setNewCard] = useState<NewCardForm>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    email: "",
    saveCard: true
  });

  // Mock saved cards - in real app this would come from user profile/API
  const [savedCards] = useState<SavedCard[]>([
    {
      id: "card_1",
      type: "visa",
      last4: "4242",
      expiry: "12/26",
      name: "John Doe",
      isDefault: true
    },
    {
      id: "card_2",
      type: "mastercard", 
      last4: "8888",
      expiry: "08/25",
      name: "John Doe",
      isDefault: false
    },
    {
      id: "card_3",
      type: "amex",
      last4: "1005",
      expiry: "04/27",
      name: "John Doe",
      isDefault: false
    }
  ]);

  const getCardIcon = (type: string) => {
    switch(type) {
      case "visa": return "💳";
      case "mastercard": return "💳";
      case "amex": return "💳";
      default: return "💳";
    }
  };

  const getCardColor = (type: string) => {
    switch(type) {
      case "visa": return "from-blue-500 to-blue-600";
      case "mastercard": return "from-red-500 to-red-600";  
      case "amex": return "from-green-500 to-green-600";
      default: return "from-gray-500 to-gray-600";
    }
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

  const handleInputChange = (field: keyof NewCardForm, value: string | boolean) => {
    if (typeof value === "boolean") {
      setNewCard(prev => ({ ...prev, [field]: value }));
      return;
    }
    
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

  const validateForm = () => {
    if (paymentMethod === "saved") {
      return selectedCardId !== "";
    }
    
    const { number, expiry, cvv, name, email } = newCard;
    return (
      number.replace(/\s/g, '').length >= 13 &&
      expiry.length === 5 &&
      cvv.length >= 3 &&
      name.trim().length > 0 &&
      email.includes('@')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please complete all required fields");
      return;
    }

    setProcessing(true);
    
    // Simulate Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${BRAND_GRADIENT} rounded-lg flex items-center justify-center`}>
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
              <p className="text-sm text-gray-600">Choose your payment method</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Payment Amount */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">{currency}{amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <Button
              variant={paymentMethod === "saved" ? "default" : "outline"}
              onClick={() => {
                setPaymentMethod("saved");
                setShowNewCardForm(false);
              }}
              className={`flex-1 transition-all duration-300 ${
                paymentMethod === "saved" 
                  ? `${BRAND_GRADIENT} text-white`
                  : ""
              }`}
            >
              💳 Saved Cards
            </Button>
            <Button
              variant={paymentMethod === "new" ? "default" : "outline"}
              onClick={() => {
                setPaymentMethod("new");
                setShowNewCardForm(true);
              }}
              className={`flex-1 transition-all duration-300 ${
                paymentMethod === "new" 
                  ? `${BRAND_GRADIENT} text-white`
                  : ""
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Card
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Saved Cards Section */}
            {paymentMethod === "saved" && (
              <div className="space-y-3 animate-in slide-in-from-left duration-300">
                <RadioGroup value={selectedCardId} onValueChange={setSelectedCardId}>
                  {savedCards.map((card) => (
                    <div key={card.id} className="relative">
                      <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedCardId === card.id
                            ? "border-[#0b3b8f] bg-[#0b3b8f]/6 shadow-md transform scale-105"
                            : "border-gray-200 hover:border-[#0b3b8f]/20"
                        }`}
                        onClick={() => setSelectedCardId(card.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={card.id} id={card.id} />
                          <div className={`w-12 h-8 rounded-lg bg-gradient-to-r ${getCardColor(card.type)} flex items-center justify-center text-white font-bold text-xs`}>
                            {card.type.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {getCardIcon(card.type)} •••• {card.last4}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires {card.expiry} • {card.name}
                            </p>
                          </div>
                          {card.isDefault && (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
                {selectedCardId && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-in slide-in-from-bottom duration-300">
                    <Label htmlFor="savedCardCvv">CVV for selected card</Label>
                    <div className="relative mt-1">
                      <Input
                        id="savedCardCvv"
                        type={showCvv ? "text" : "password"}
                        placeholder="123"
                        maxLength={4}
                        className="pr-10"
                        required
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
                )}
              </div>
            )}

            {/* New Card Form */}
            {paymentMethod === "new" && showNewCardForm && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newCard.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Card Number */}
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.number}
                    onChange={(e) => handleInputChange("number", e.target.value)}
                    maxLength={19}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={(e) => handleInputChange("expiry", e.target.value)}
                      maxLength={5}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative mt-1">
                      <Input
                        id="cvv"
                        type={showCvv ? "text" : "password"}
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        maxLength={4}
                        className="pr-10"
                        required
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

                {/* Cardholder Name */}
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={newCard.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Save Card Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={newCard.saveCard}
                    onChange={(e) => handleInputChange("saveCard", e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save this card for future purchases
                  </Label>
                </div>
              </div>
            )}

            {/* Security Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Your payment is secured with SSL encryption</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              disabled={processing || !validateForm()}
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pay {currency}{amount.toFixed(2)}
                </div>
              )}
            </Button>

            {/* Cancel */}
            <Button 
              type="button"
              variant="ghost" 
              className="w-full"
              onClick={onCancel}
              disabled={processing}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
