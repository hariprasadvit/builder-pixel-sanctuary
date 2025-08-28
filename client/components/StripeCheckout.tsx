import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  Lock,
  CheckCircle,
  X,
  Eye,
  EyeOff
} from "lucide-react";

interface StripeCheckoutProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

interface CardForm {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
  email: string;
}

export default function StripeCheckout({ 
  amount, 
  currency, 
  onSuccess, 
  onCancel, 
  isOpen 
}: StripeCheckoutProps) {
  const [processing, setProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [cardForm, setCardForm] = useState<CardForm>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    email: ""
  });

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

  const handleInputChange = (field: keyof CardForm, value: string) => {
    let formattedValue = value;
    
    if (field === "number") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setCardForm(prev => ({ ...prev, [field]: formattedValue }));
  };

  const getCardType = (number: string) => {
    const firstDigit = number.replace(/\s/g, '')[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };

  const validateForm = () => {
    const { number, expiry, cvv, name, email } = cardForm;
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
      alert("Please fill in all fields correctly");
      return;
    }

    setProcessing(true);
    
    // Simulate Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
              <p className="text-sm text-gray-600">Powered by Stripe</p>
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
        <div className="p-6 bg-gray-50 border-b">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">{currency}{amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={cardForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Card Number */}
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative mt-1">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardForm.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                maxLength={19}
                className="pr-16"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {cardForm.number && (
                  <Badge variant="outline" className="text-xs">
                    {getCardType(cardForm.number)}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardForm.expiry}
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
                  value={cardForm.cvv}
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
              value={cardForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1"
              required
            />
          </div>

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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold"
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
  );
}
