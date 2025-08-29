import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, HelpCircle, Headphones, FileQuestion, AlertCircle, CreditCard, Package, RotateCcw } from "lucide-react";

export default function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as any)?.orderId ?? null;

  const quickLinks = [
    { label: "Cancel Order", action: () => navigate("/support/chat", { state: { intent: "cancel", orderId } }) },
    { label: "Return Status", action: () => navigate("/support/chat", { state: { intent: "return-status", orderId } }) },
    { label: "Refund Not Received", action: () => navigate("/support/chat", { state: { intent: "refund", orderId } }) },
    { label: "Payment Issues", action: () => navigate("/support/chat", { state: { intent: "payment", orderId } }) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-lg space-y-4">
        <h1 className="text-2xl font-bold">Support</h1>
        <p className="text-gray-600">How can we help you today?</p>

        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow" onClick={() => navigate("/support/chat", { state: { orderId } })}>
            <CardContent className="p-4 flex items-center gap-3">
              <Headphones className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-xs text-gray-600">Talk to Riki Assistant</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow" onClick={() => navigate("/help-center") }>
            <CardContent className="p-4 flex items-center gap-3">
              <FileQuestion className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium">Help Center & FAQs</p>
                <p className="text-xs text-gray-600">Guides and policies</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Quick links</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((q) => (
              <Button key={q.label} variant="outline" onClick={q.action} className="justify-start">
                <AlertCircle className="w-4 h-4 mr-2" />{q.label}
              </Button>
            ))}
          </div>
        </div>

        {orderId && (
          <div className="text-xs text-gray-600">Context: Order {orderId}</div>
        )}
      </div>
    </div>
  );
}
