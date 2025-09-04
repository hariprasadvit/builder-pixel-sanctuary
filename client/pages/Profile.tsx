import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BRAND_GRADIENT } from "@/components/ui/placeholders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import AddAddressModal from "@/components/addresses/AddAddressModal";
import { useLocation as useLocationContext } from "@/contexts/LocationContext";
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
  Share2,
} from "lucide-react";

import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useToast } from "@/hooks/use-toast";

function ProfileWishlist() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();
  const { getCurrencySymbol } = useMarketplace();
  const { toast } = useToast();
  const currency = getCurrencySymbol();

  if (items.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Wishlist & Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-4">Save items you love for later</p>
            <Link to="/">
              <Button className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }>
                Start Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Wishlist & Favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => {
            const percentDrop =
              it.originalPrice && it.originalPrice > it.price
                ? Math.round(
                    ((it.originalPrice - it.price) / it.originalPrice) * 100,
                  )
                : 0;
            const dropAmt =
              it.originalPrice && it.originalPrice > it.price
                ? it.originalPrice - it.price
                : 0;
            return (
              <div
                key={it.id}
                className="border rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">
                      {it.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">
                        {currency}
                        {it.price.toFixed(2)}
                      </span>
                      {it.originalPrice && it.originalPrice > it.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {currency}
                          {it.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {dropAmt > 0 && (
                      <p className="text-xs text-green-700">
                        Price dropped by {currency}
                        {dropAmt.toFixed(2)}
                      </p>
                    )}
                    {it.inStock === false && (
                      <Badge className="mt-1 bg-gray-600">
                        Currently unavailable
                      </Badge>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        disabled={it.inStock === false}
                        onClick={() => {
                          addToCart({
                            id: it.id,
                            name: it.name,
                            price: it.price,
                            originalPrice: it.originalPrice || undefined,
                            image: it.image,
                            vendor: it.vendor || "nearbuy",
                            vendorName: "Wishlist",
                            category: it.category || "General",
                            shippingWeight: 1.0,
                          });
                          toggle(it);
                          toast({ title: "Moved to Cart" });
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" /> Move to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toggle(it);
                          toast({ title: "Removed from Wishlist." });
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const url = `${window.location.origin}/product/${it.id}`;
                          const text = `Check this out on Riki: ${it.name} - ${currency}${it.price.toFixed(2)}\n${url}`;
                          if ((navigator as any).share) {
                            try {
                              await (navigator as any).share({
                                title: it.name,
                                text,
                                url,
                              });
                            } catch {}
                          } else {
                            await navigator.clipboard.writeText(text);
                            toast({ title: "Link copied to clipboard" });
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder-avatar.jpg",
    joinDate: "March 2024",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
    reviews: true,
  });

  const { savedAddresses, removeAddress, updateAddress } = useLocationContext();

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false,
    },
  ]);

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState<
    null | "password" | "2fa" | "privacy"
  >(null);

  // Add Card form state
  const [cardType, setCardType] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const addCard = () => {
    const last4 = cardNumber.replace(/\s+/g, "").slice(-4) || "0000";
    const nextId = Math.max(...paymentMethods.map((p) => p.id), 0) + 1;
    setPaymentMethods([
      {
        id: nextId,
        type: cardType,
        last4,
        expiry,
        isDefault: paymentMethods.length === 0,
      },
      ...paymentMethods,
    ]);
    setAddCardOpen(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  const recentOrders = [
    {
      id: "#12345",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: "£299.99",
      items: 3,
    },
    {
      id: "#12344",
      date: "Dec 10, 2024",
      status: "In Transit",
      total: "£149.99",
      items: 1,
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b3b8f]/6 to-[#d32f2f]/6 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8 border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={userData.avatar}
                      alt={userData.firstName}
                    />
                    <AvatarFallback className={`text-2xl ${BRAND_GRADIENT} text-white` }>
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${BRAND_GRADIENT} text-white border-white` }
                  >
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
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-white border border-[#0b3b8f]/10">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3b8f] data-[state=active]:to-[#d32f2f] data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
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
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveProfile}
                      className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
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
                <Button
                  className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                  onClick={() => setAddressModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{address.label}</h3>
                            {address.isDefault && (
                              <Badge
                                variant="default"
                                className={`${BRAND_GRADIENT} hover:opacity-90 text-white text-xs` }
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">
                            {address.pincode} {address.city}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateAddress(address.id, { isDefault: true })
                            }
                          >
                            Set Default
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeAddress(address.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <AddAddressModal
                  open={addressModalOpen}
                  onOpenChange={setAddressModalOpen}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button
                  className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                  onClick={() => setAddCardOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {payment.type} •••• {payment.last4}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires {payment.expiry}
                            </p>
                          </div>
                          {payment.isDefault && (
                            <Badge
                              variant="default"
                              className={`${BRAND_GRADIENT} hover:opacity-90 text-white text-xs` }
                            >
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setPaymentMethods((prev) =>
                                prev.map((p) => ({
                                  ...p,
                                  isDefault: p.id === payment.id,
                                })),
                              )
                            }
                          >
                            Set Default
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setPaymentMethods((prev) =>
                                prev.filter((p) => p.id !== payment.id),
                              )
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Card Dialog */}
                <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add a new card</DialogTitle>
                      <DialogDescription>
                        Cards are stored securely. Test-only UI.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label>Card Type</Label>
                        <Input
                          value={cardType}
                          onChange={(e) => setCardType(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Card Number</Label>
                        <Input
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Expiry (MM/YY)</Label>
                          <Input
                            placeholder="12/26"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={addCard}
                        className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                      >
                        Save Card
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.total}</p>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              order.status === "Delivered"
                                ? `${BRAND_GRADIENT} hover:opacity-90 text-white`
                                : ""
                            }
                          >
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
                      <p className="text-sm text-gray-600">
                        Get notified about your order status
                      </p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          orderUpdates: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions & Deals</p>
                      <p className="text-sm text-gray-600">
                        Receive exclusive offers and discounts
                      </p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          promotions: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Arrivals</p>
                      <p className="text-sm text-gray-600">
                        Be first to know about new products
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newArrivals}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          newArrivals: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Price Drops</p>
                      <p className="text-sm text-gray-600">
                        Get alerts when prices drop on saved items
                      </p>
                    </div>
                    <Switch
                      checked={notifications.priceDrops}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          priceDrops: checked,
                        })
                      }
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
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setSecurityOpen("password")}
                  >
                    Change Password
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setSecurityOpen("2fa")}
                  >
                    Two-Factor Authentication
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setSecurityOpen("privacy")}
                  >
                    Privacy Settings
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-red-600 hover:text-red-700"
                    onClick={() =>
                      alert("Account deletion flow to be implemented")
                    }
                  >
                    Delete Account
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Security Dialogs */}
                  <Dialog
                    open={securityOpen === "password"}
                    onOpenChange={(o) => !o && setSecurityOpen(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Update your password for better security.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div>
                          <Label>Current Password</Label>
                          <Input type="password" />
                        </div>
                        <div>
                          <Label>New Password</Label>
                          <Input type="password" />
                        </div>
                        <div>
                          <Label>Confirm New Password</Label>
                          <Input type="password" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                          onClick={() => setSecurityOpen(null)}
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={securityOpen === "2fa"}
                    onOpenChange={(o) => !o && setSecurityOpen(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Two‑Factor Authentication</DialogTitle>
                        <DialogDescription>
                          Add an extra layer of security to your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Scan the QR in your authenticator app and enter the
                          6‑digit code to enable.
                        </p>
                        <Input placeholder="Enter 6‑digit code" />
                      </div>
                      <DialogFooter>
                        <Button
                          className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                          onClick={() => setSecurityOpen(null)}
                        >
                          Enable 2FA
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={securityOpen === "privacy"}
                    onOpenChange={(o) => !o && setSecurityOpen(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Privacy Settings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Show profile publicly</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Allow product recommendations</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          className={`${BRAND_GRADIENT} hover:opacity-90 text-white` }
                          onClick={() => setSecurityOpen(null)}
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
