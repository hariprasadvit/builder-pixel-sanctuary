import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MapTracker from "@/components/MapTracker";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CancelDialog from "@/components/orders/CancelDialog";
import ReturnWizard from "@/components/orders/ReturnWizard";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Star,
  RotateCcw,
  Download,
  MessageSquare,
  ChevronRight,
  XCircle
} from "lucide-react";

export default function Orders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"return" | "refund" | "cancel" | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [requestReason, setRequestReason] = useState("");

  const openRequest = (orderId: string, type: "return" | "refund" | "cancel") => {
    setSelectedOrderId(orderId);
    setDialogType(type);
    setDialogOpen(true);
  };

  const submitRequest = () => {
    setDialogOpen(false);
    setRequestReason("");
  };

  const downloadInvoice = (order: any) => {
    const itemsHtml = order.items
      .map((it: any) => `<tr><td>${it.name}</td><td style='text-align:center'>${it.quantity}</td><td style='text-align:right'>${order.currency}${it.price.toFixed(2)}</td></tr>`)
      .join("");
    const html = `<!doctype html><html><head><meta charset=\"utf-8\" /><title>Invoice ${order.id}</title><style>body{font-family:ui-sans-serif,system-ui,Arial;padding:24px}table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid #eee}</style></head><body><h1>Invoice ${order.id}</h1><p>Date: ${new Date(order.date).toLocaleDateString()}</p><table><thead><tr><th style='text-align:left'>Item</th><th>Qty</th><th style='text-align:right'>Price</th></tr></thead><tbody>${itemsHtml}</tbody></table><h3 style='text-align:right;margin-top:16px'>Total: ${order.currency}${order.total.toFixed(2)}</h3><p style='margin-top:8px;font-size:12px;color:#555'>Refund SLA: Prepaid 3–7 business days; Wallet instant–24h; COD to bank/UPI 5–7 business days.</p></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-invoice.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-12-15",
      status: "delivered",
      total: 299.99,
      currency: "£",
      shippingType: "local",
      estimatedDelivery: "2024-12-18",
      actualDelivery: "2024-12-17",
      trackingNumber: "TRK123456789",
      items: [
        {
          id: 1,
          name: "iPhone 15 Pro Max 256GB",
          image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=200",
          quantity: 1,
          price: 299.99,
          category: "electronics"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apt 4B",
        city: "New York, NY 10001"
      },
      timeline: [
        { status: "Order Placed", date: "2024-12-15 10:30 AM", completed: true },
        { status: "Payment Confirmed", date: "2024-12-15 10:31 AM", completed: true },
        { status: "Processing", date: "2024-12-15 02:15 PM", completed: true },
        { status: "Shipped", date: "2024-12-16 09:20 AM", completed: true },
        { status: "Out for Delivery", date: "2024-12-17 08:45 AM", completed: true },
        { status: "Delivered", date: "2024-12-17 02:30 PM", completed: true }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-12-12",
      status: "in-transit",
      total: 149.99,
      currency: "£",
      shippingType: "china",
      estimatedDelivery: "2024-12-16",
      trackingNumber: "TRK987654321",
      items: [
        {
          id: 2,
          name: "Samsung Galaxy Buds Pro",
          image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=200",
          quantity: 1,
          price: 149.99,
          category: "electronics"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apt 4B",
        city: "New York, NY 10001"
      },
      timeline: [
        { status: "Order Placed", date: "2024-12-12 03:20 PM", completed: true },
        { status: "Payment Confirmed", date: "2024-12-12 03:21 PM", completed: true },
        { status: "Processing", date: "2024-12-13 11:00 AM", completed: true },
        { status: "Shipped", date: "2024-12-14 01:30 PM", completed: true },
        { status: "Out for Delivery", date: "Expected: Dec 16", completed: false },
        { status: "Delivered", date: "Expected: Dec 16", completed: false }
      ]
    },
    {
      id: "ORD-2024-003",
      date: "2024-12-10",
      status: "processing",
      total: 89.99,
      currency: "£",
      shippingType: "china",
      estimatedDelivery: "2024-12-15",
      items: [
        {
          id: 3,
          name: "Nike Air Max Running Shoes",
          image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=200",
          quantity: 1,
          price: 89.99,
          category: "apparel"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "456 Business Ave, Suite 789",
        city: "New York, NY 10002"
      },
      timeline: [
        { status: "Order Placed", date: "2024-12-10 07:15 PM", completed: true },
        { status: "Payment Confirmed", date: "2024-12-10 07:16 PM", completed: true },
        { status: "Processing", date: "In Progress", completed: false },
        { status: "Shipped", date: "Expected: Dec 14", completed: false },
        { status: "Out for Delivery", date: "Expected: Dec 15", completed: false },
        { status: "Delivered", date: "Expected: Dec 15", completed: false }
      ]
    },
    {
      id: "ORD-2024-004",
      date: "2024-12-08",
      status: "cancelled",
      total: 199.99,
      currency: "£",
      shippingType: "china",
      items: [
        {
          id: 4,
          name: "Wireless Headphones",
          image: "/placeholder.svg",
          quantity: 1,
          price: 199.99
        }
      ],
      cancellationReason: "Customer requested cancellation"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      placed: { color: "bg-gray-100 text-gray-800", icon: Clock },
      processing: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      packed: { color: "bg-amber-100 text-amber-800", icon: Package },
      shipped: { color: "bg-blue-100 text-blue-800", icon: Truck },
      "out-for-delivery": { color: "bg-indigo-100 text-indigo-800", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
      "return-in-progress": { color: "bg-purple-100 text-purple-800", icon: RotateCcw },
      refunded: { color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
      "in-transit": { color: "bg-blue-100 text-blue-800", icon: Truck }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Package;

    return (
      <Badge className={`${config?.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const [cancelOpen, setCancelOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);

  const openCancel = (idx: number) => { setActiveOrderIndex(idx); setCancelOpen(true); };
  const openReturn = (idx: number) => { setActiveOrderIndex(idx); setReturnOpen(true); };

  const getReturnByForOrder = (order: any) => {
    const CATEGORY_WINDOWS: Record<string, number> = { apparel: 10, electronics: 7, home: 15 };
    const days = order.items.map((it:any) => CATEGORY_WINDOWS[it.category || 'electronics'] ?? 7);
    const maxDays = Math.max(...days, 7);
    return new Date(new Date(order.date).getTime() + maxDays*24*60*60*1000);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && order.status === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders by ID or product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                >
                  All Orders
                </Button>
                <Button
                  variant={selectedFilter === "delivered" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("delivered")}
                >
                  Delivered
                </Button>
                <Button
                  variant={selectedFilter === "in-transit" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("in-transit")}
                >
                  In Transit
                </Button>
                <Button
                  variant={selectedFilter === "processing" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("processing")}
                >
                  Processing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Ordered: {new Date(order.date).toLocaleDateString()}
                      </span>
                      {order.shippingType === 'local' ? (
                        <span className="flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          ETA: 20–30 min
                        </span>
                      ) : (
                        order.estimatedDelivery && (
                          <span className="flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    {getStatusBadge(order.status)}
                    <p className="font-semibold text-lg">
                      {order.currency}{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{order.currency}{item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Order Actions and Timeline */}
                <Tabs defaultValue="tracking" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tracking">Tracking</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tracking" className="mt-6">
                    {order.status !== "cancelled" ? (
                      <div className="space-y-4">
                        {order.trackingNumber && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm font-medium text-blue-900">
                              Tracking Number: {order.trackingNumber}
                            </p>
                          </div>
                        )}
                        {order.shippingType === 'local' ? (
                          <div className="space-y-4">
                            <MapTracker status={order.status === 'delivered' ? 'Delivered' : 'Courier en route'} />
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">Live status: <span className="font-medium">{order.status === 'delivered' ? 'Delivered' : 'On the way'}</span></p>
                              <Progress value={order.status === 'delivered' ? 100 : order.status === 'in-transit' ? 75 : 40} />
                              <p className="text-xs text-gray-500">ETA: 20–30 minutes</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {order.timeline.map((step, index) => (
                              <div key={index} className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  step.completed ? "bg-green-100" : "bg-gray-100"
                                }`}>
                                  {step.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                    {step.status}
                                  </p>
                                  <p className="text-sm text-gray-600">{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <XCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Order Cancelled</h3>
                        <p className="text-gray-600">{order.cancellationReason}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </h4>
                        {order.shippingAddress && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="font-medium">{order.shippingAddress.name}</p>
                            <p className="text-gray-600">{order.shippingAddress.address}</p>
                            <p className="text-gray-600">{order.shippingAddress.city}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="actions" className="mt-6">
                    <div className="flex flex-col gap-3">
                      {/* Delivered: Return / Exchange enabled with return-by date */}
                      {order.status === 'delivered' && (
                        <>
                          <p className="text-xs text-gray-600">Return by {getReturnByForOrder(order).toLocaleDateString()}</p>
                          <div className="flex flex-wrap gap-3">
                            <Button variant="outline" onClick={() => { setActiveOrderIndex(orders.indexOf(order)); setReturnOpen(true); }}>
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Return / Exchange
                            </Button>
                            <Button variant="outline">
                              <Star className="w-4 h-4 mr-2" />
                              Write Review
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Placed / Processing / Packed: Cancel enabled (packed with warning) */}
                      {(order.status === 'placed' || order.status === 'processing' || order.status === 'packed') && (
                        <div className="flex flex-wrap gap-3">
                          <Button variant="outline" onClick={() => { setActiveOrderIndex(orders.indexOf(order)); setCancelOpen(true); }}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Order
                          </Button>
                          {order.status === 'packed' && (
                            <p className="text-xs text-amber-700">We’ll try to stop dispatch.</p>
                          )}
                        </div>
                      )}

                      {/* Shipped/Out for Delivery: Cancel disabled with hint */}
                      {(order.status === 'shipped' || order.status === 'out-for-delivery') && (
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-3">
                            <Button variant="outline" disabled>
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Order
                            </Button>
                          </div>
                          <p className="text-xs text-gray-600">You can refuse delivery or return after delivery.</p>
                        </div>
                      )}

                      {/* Common actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" onClick={() => downloadInvoice(order)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/support/chat', { state: { orderId: order.id } })}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Support
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/support', { state: { orderId: order.id } })}>
                          <Package className="w-4 h-4 mr-2" />
                          Need Help?
                        </Button>
                        <Button variant="outline">
                          <Package className="w-4 h-4 mr-2" />
                          Reorder Items
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? "Try adjusting your search terms" : "You haven't placed any orders yet"}
              </p>
              <Button>
                Start Shopping
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {activeOrderIndex !== null && (
        <>
          <CancelDialog
            open={cancelOpen}
            onOpenChange={setCancelOpen}
            orderId={orders[activeOrderIndex].id}
            status={orders[activeOrderIndex].status}
            items={orders[activeOrderIndex].items}
            currency={orders[activeOrderIndex].currency}
            onConfirm={() => { /* noop demo */ }}
          />
          <ReturnWizard
            open={returnOpen}
            onOpenChange={setReturnOpen}
            orderId={orders[activeOrderIndex].id}
            items={orders[activeOrderIndex].items}
            orderDate={orders[activeOrderIndex].date}
            currency={orders[activeOrderIndex].currency}
          />
        </>
      )}
    </div>
  );
}
