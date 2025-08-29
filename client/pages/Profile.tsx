import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Heart,
  Package,
  Edit,
  Plus,
  ChevronRight,
  LogOut,
  Camera,
  Trash2,
  ShoppingCart,
  Share2
} from "lucide-react";

import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder-avatar.jpg",
    joinDate: "March 2024"
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
    reviews: true
  });

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      address: "456 Business Ave, Suite 789",
      city: "New York, NY 10002",
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false
    }
  ];

  const recentOrders = [
    {
      id: "#12345",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: "£299.99",
      items: 3
    },
    {
      id: "#12344",
      date: "Dec 10, 2024",
      status: "In Transit",
      total: "£149.99",
      items: 1
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8 border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={userData.avatar} alt={userData.firstName} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white border-white">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p className="text-gray-600">{userData.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    Member since {userData.joinDate}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Personal</TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Addresses</TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Payments</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Orders</TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Wishlist</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      value={userData.firstName}
                      onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      value={userData.lastName}
                      onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Addresses</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{address.type}</h3>
                            {address.isDefault && (
                              <Badge variant="default" className="text-xs bg-blue-600 hover:bg-blue-700">Default</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">{address.city}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.type} •••• {payment.last4}</p>
                            <p className="text-sm text-gray-600">Expires {payment.expiry}</p>
                          </div>
                          {payment.isDefault && (
                            <Badge variant="default" className="text-xs bg-blue-600 hover:bg-blue-700">Default</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link to="/orders">
                  <Button variant="outline">
                    View All Orders
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.total}</p>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className={order.status === "Delivered" ? "bg-blue-600 hover:bg-blue-700" : ""}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <ProfileWishlist />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-600">Get notified about your order status</p>
                    </div>
                    <Switch 
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions & Deals</p>
                      <p className="text-sm text-gray-600">Receive exclusive offers and discounts</p>
                    </div>
                    <Switch 
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Arrivals</p>
                      <p className="text-sm text-gray-600">Be first to know about new products</p>
                    </div>
                    <Switch 
                      checked={notifications.newArrivals}
                      onCheckedChange={(checked) => setNotifications({...notifications, newArrivals: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Price Drops</p>
                      <p className="text-sm text-gray-600">Get alerts when prices drop on saved items</p>
                    </div>
                    <Switch 
                      checked={notifications.priceDrops}
                      onCheckedChange={(checked) => setNotifications({...notifications, priceDrops: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    Change Password
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Two-Factor Authentication
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Privacy Settings
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between text-red-600 hover:text-red-700">
                    Delete Account
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
