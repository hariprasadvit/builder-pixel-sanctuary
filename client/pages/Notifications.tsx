import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Package, 
  Truck, 
  CheckCircle, 
  Gift, 
  Star,
  AlertCircle,
  Clock,
  Trash2,
  Settings,
  Filter,
  MarkAsUnread,
  MoreVertical
} from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-2024-001 has been delivered successfully",
      timestamp: new Date("2024-12-17T14:30:00"),
      read: false,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionable: true,
      orderId: "ORD-2024-001"
    },
    {
      id: "2",
      type: "promotion",
      title: "Flash Sale Alert! 🔥",
      message: "Up to 70% off on Electronics - Limited time offer ending in 6 hours",
      timestamp: new Date("2024-12-16T10:00:00"),
      read: false,
      icon: Gift,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      actionable: true,
      promoCode: "FLASH70"
    },
    {
      id: "3",
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-2024-002 is on its way! Expected delivery: Dec 16",
      timestamp: new Date("2024-12-14T13:30:00"),
      read: true,
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      actionable: true,
      orderId: "ORD-2024-002",
      trackingNumber: "TRK987654321"
    },
    {
      id: "4",
      type: "wishlist",
      title: "Price Drop Alert",
      message: "Samsung Galaxy Buds Pro in your wishlist is now 40% off!",
      timestamp: new Date("2024-12-13T09:15:00"),
      read: true,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      actionable: true,
      productId: "2"
    },
    {
      id: "5",
      type: "order",
      title: "Payment Confirmed",
      message: "Payment for order #ORD-2024-003 has been processed successfully",
      timestamp: new Date("2024-12-10T19:16:00"),
      read: true,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionable: false,
      orderId: "ORD-2024-003"
    },
    {
      id: "6",
      type: "promotion",
      title: "Welcome Bonus! 🎉",
      message: "Get 15% off your first order with code WELCOME15",
      timestamp: new Date("2024-12-08T12:00:00"),
      read: true,
      icon: Gift,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      actionable: true,
      promoCode: "WELCOME15"
    },
    {
      id: "7",
      type: "system",
      title: "Security Alert",
      message: "New login detected from Chrome on Windows - was this you?",
      timestamp: new Date("2024-12-07T16:45:00"),
      read: true,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      actionable: true
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const getFilteredNotifications = (filter: string) => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NotificationItem = ({ notification }: { notification: any }) => {
    const Icon = notification.icon;
    
    return (
      <Card className={`${!notification.read ? 'border-blue-200 shadow-sm' : ''} hover:shadow-md transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className={`${notification.bgColor} rounded-full p-2 shrink-0`}>
              <Icon className={`w-5 h-5 ${notification.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(notification.id)}
                    className="w-8 h-8 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {notification.actionable && (
                <div className="mt-3 flex gap-2">
                  {notification.orderId && (
                    <Button variant="outline" size="sm">
                      View Order
                    </Button>
                  )}
                  {notification.trackingNumber && (
                    <Button variant="outline" size="sm">
                      Track Package
                    </Button>
                  )}
                  {notification.promoCode && (
                    <Button variant="outline" size="sm">
                      Use Code: {notification.promoCode}
                    </Button>
                  )}
                  {notification.productId && (
                    <Button variant="outline" size="sm">
                      View Product
                    </Button>
                  )}
                  {notification.type === "system" && (
                    <Button variant="outline" size="sm">
                      Review Activity
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <MarkAsUnread className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Filters */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All
              <Badge variant="secondary" className="text-xs">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              Unread
              {unreadCount > 0 && (
                <Badge className="text-xs bg-blue-600">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="order" className="flex items-center gap-2">
              Orders
              <Badge variant="secondary" className="text-xs">
                {notifications.filter(n => n.type === "order").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="promotion" className="flex items-center gap-2">
              Promotions
              <Badge variant="secondary" className="text-xs">
                {notifications.filter(n => n.type === "promotion").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              Wishlist
              <Badge variant="secondary" className="text-xs">
                {notifications.filter(n => n.type === "wishlist").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {["all", "unread", "order", "promotion", "wishlist"].map((filter) => (
            <TabsContent key={filter} value={filter}>
              <div className="space-y-4">
                {getFilteredNotifications(filter).length > 0 ? (
                  getFilteredNotifications(filter).map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                      <p className="text-gray-600">
                        {filter === "unread" 
                          ? "All notifications have been read" 
                          : `No ${filter === "all" ? "" : filter} notifications yet`}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Notification Preferences */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage your notification settings in your profile to control what alerts you receive.
            </p>
            <Button variant="outline">
              Manage Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
