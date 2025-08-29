import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Mail, 
  Download, 
  Home,
  ShoppingBag,
  Truck,
  Calendar
} from "lucide-react";
import { useFireworks } from "@/hooks/useFireworks";

interface PaymentSuccessProps {
  orderNumber?: string;
  amount?: number;
  currency?: string;
  customerEmail?: string;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerFireworks, FireworksComponent } = useFireworks();
  
  const [showContent, setShowContent] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  
  // Get data from navigation state or use defaults
  const {
    orderNumber = `ORD-${Date.now()}`,
    amount = 999.99,
    currency = "£",
    customerEmail = "customer@example.com",
    deliveryType = "china"
  } = location.state || {};

  useEffect(() => {
    // Trigger fireworks once after a small delay to ensure page is ready
    const fireworkTimeout = setTimeout(() => {
      console.log('Triggering fireworks from PaymentSuccess page');
      triggerFireworks();
    }, 200);

    // Staggered animation entrance
    const timeouts = [
      setTimeout(() => setShowContent(true), 500),
      setTimeout(() => setAnimationStep(1), 1000),
      setTimeout(() => setAnimationStep(2), 1500),
      setTimeout(() => setAnimationStep(3), 2000),
      setTimeout(() => setAnimationStep(4), 2500),
    ];

    return () => {
      clearTimeout(fireworkTimeout);
      timeouts.forEach(clearTimeout);
    };
  }, []); // Remove triggerFireworks dependency to prevent re-triggers

  const features = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Confirmation Email",
      description: "Sent to your inbox",
      delay: "animation-delay-100"
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: "Order Tracking",
      description: "Track your shipment",
      delay: "animation-delay-200"
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Digital Receipt",
      description: "Download anytime",
      delay: "animation-delay-300"
    }
  ];

  return (
    <>
      <FireworksComponent />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Main Success Card */}
          <Card className={`relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <CardContent className="p-8 text-center">
              
              {/* Success Icon with Pulse Animation */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white animate-bounce" />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-400 rounded-full animate-ping opacity-25"></div>
              </div>

              {/* Success Message */}
              <div className={`space-y-4 transition-all duration-700 ${
                animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Payment Successful! 🎉
                </h1>
                <p className="text-xl text-gray-600">
                  Thank you for your purchase
                </p>
              </div>

              {/* Order Details */}
              <div className={`mt-8 space-y-4 transition-all duration-700 delay-300 ${
                animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-semibold text-lg text-gray-900">{orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount Paid</p>
                      <p className="font-semibold text-lg text-green-600">{currency}{amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-900">💳 •••• 4242</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaction Date</p>
                      <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className={`mt-8 transition-all duration-700 delay-500 ${
                animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                        animationStep >= 4 ? 'animate-in slide-in-from-bottom' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-blue-600 mb-2 flex justify-center">
                        {feature.icon}
                      </div>
                      <h4 className="font-medium text-gray-800 text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className={`mt-8 transition-all duration-700 delay-700 ${
                animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Estimated Delivery</h3>
                  </div>
                  {deliveryType === 'local' ? (
                    <div className="text-center">
                      <p className="text-xl font-semibold text-gray-800">Arriving in 20–30 minutes</p>
                      <p className="text-sm text-gray-600 mt-1">Real-time courier tracking available</p>
                      <Badge className="mt-3 bg-green-100 text-green-700 border-green-300">Local delivery</Badge>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <p className="text-gray-700">
                          {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <Badge className="mt-3 bg-blue-100 text-blue-700 border-blue-300">International shipping</Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-1000 ${
            animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button
              onClick={() => navigate("/orders")}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Your Order
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const html = `<!doctype html><html><head><meta charset=\"utf-8\" /><title>Invoice ${orderNumber}</title></head><body><h1>Invoice ${orderNumber}</h1><p>Amount: ${currency}${amount.toFixed(2)}</p><p>Date: ${new Date().toLocaleString()}</p><p>Email: ${customerEmail}</p></body></html>`;
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${orderNumber}-invoice.html`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 h-12 font-semibold border-2 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 h-12 font-semibold border-2 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Footer Message */}
          <div className={`text-center space-y-4 transition-all duration-700 delay-1200 ${
            animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-gray-600">
              Need help? Contact us at{" "}
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-medium">
                support@example.com
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
