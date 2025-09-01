import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Home,
  Grid3X3,
  Package,
  UserCircle,
  Play,
  MapPin,
  ChevronDown,
  Menu,
  Star,
  TrendingUp,
  Award,
  Tag,
  Users,
  Phone,
  HelpCircle,
  Bell,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchOverlay from "@/components/search/SearchOverlay";
import { searchCatalog, splitHighlight } from "@/lib/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useLocation as useLocationContext } from "@/contexts/LocationContext";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddAddressModal from "@/components/addresses/AddAddressModal";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { currentMarketplace, setMarketplace, getMarketplaceLabel } =
    useMarketplace();
  const navigate = useNavigate();
  const {
    currentAddress,
    savedAddresses,
    setCurrentAddress,
    addAddress,
    updateAddress,
    getCurrentLocationName,
  } = useLocationContext();
  let getItemCount = () => 0 as number;
  try {
    // Attempt to read from CartContext; if provider is absent, fall back gracefully
    ({ getItemCount } = useCart());
  } catch (e) {
    // no provider found, keep default
  }
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const mobileResults = useMemo(
    () => (mobileQuery ? searchCatalog(mobileQuery, 8) : null),
    [mobileQuery],
  );
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  type NoticeType = "order" | "promo" | "system";
  const [notifications, setNotifications] = useState<
    {
      id: string;
      title: string;
      description: string;
      time: string;
      type: NoticeType;
      read: boolean;
    }[]
  >([
    {
      id: "1",
      title: "Out for delivery",
      description: "Order ORD-2024-002 is on its way. Expect today 2–6pm.",
      time: "2h ago",
      type: "order",
      read: false,
    },
    {
      id: "2",
      title: "Price dropped",
      description: "Nike Air Max in your wishlist is now £20 off.",
      time: "Yesterday",
      type: "promo",
      read: false,
    },
    {
      id: "3",
      title: "Return scheduled",
      description: "Pickup booked for tomorrow 10:00���12:00. Keep OTP handy.",
      time: "2d ago",
      type: "order",
      read: true,
    },
  ]);
  const unseenCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  async function detectMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = await resp.json();
          const addr = data.address || {};
          const pincode = addr.postcode || "";
          const city = addr.city || addr.town || addr.village || "";
          const state = addr.state || "";
          const line = data.display_name || `${city}, ${state}`;
          const label = window.prompt(
            "Label this address (e.g., Home, Office)",
            "Detected",
          );
          const created = addAddress({
            type: "other",
            label: label || "Detected",
            address: line,
            pincode,
            city,
            state,
            isDefault: false,
          });
          setCurrentAddress(created);
        } catch (e) {
          alert("Failed to resolve address");
        }
      },
      () => alert("Permission denied for location"),
    );
  }

  const setDefault = (id: string) => {
    savedAddresses.forEach((a) =>
      updateAddress(a.id, { isDefault: a.id === id }),
    );
  };

  function addNewAddressManual() {
    setAddressModalOpen(true);
  }

  // Track scroll position to hide mobile search/delivery on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      id: "promotions",
      label: "Promotions",
      icon: Tag,
      color: "text-red-600",
      to: "/flashsale",
    },
    {
      id: "brands",
      label: "Brands",
      icon: Award,
      color: "text-purple-600",
      to: "/brands",
    },
    {
      id: "newest",
      label: "Newest",
      icon: Star,
      color: "text-blue-600",
      to: "/newest",
    },
    {
      id: "bestsellers",
      label: "Bestsellers",
      icon: TrendingUp,
      color: "text-green-600",
      to: "/bestsellers",
    },
    {
      id: "coupons",
      label: "Coupons",
      icon: Tag,
      color: "text-amber-600",
      to: "/coupons",
    },
    {
      id: "sale",
      label: "On sale",
      icon: Tag,
      color: "text-orange-600",
      to: "/flashsale",
    },
  ];

  const secondaryMenuItems = [
    {
      id: "seller",
      label: "Become a seller",
      icon: Users,
      color: "text-indigo-600",
      to: "/sell",
    },
    { id: "contact", label: "Contact Us", icon: Phone, color: "text-gray-600", to: "/contact" },
  ];

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Sticky Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 shadow-xl backdrop-blur">
        <div className="container mx-auto px-4">
          {/* Desktop Header */}
          <div className="flex items-center justify-between h-16 text-white">
            {/* Left: Hamburger and Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white hover:bg-white/10"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>All Categories</SheetTitle>
                    <SheetDescription>
                      Explore all product categories
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-4">
                    {/* Quick Categories */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Electronics', icon: '📱', to: '/electronics' },
                        { name: 'Fashion', icon: '👕', to: '/fashion' },
                        { name: 'Home', icon: '🏠', to: '/home' },
                        { name: 'Beauty', icon: '💄', to: '/beauty' },
                        { name: 'Sports', icon: '⚽', to: '/sports' },
                        { name: 'Books', icon: '📚', to: '/books' }
                      ].map((cat) => (
                        <Button
                          key={cat.name}
                          variant="outline"
                          className="h-20 flex flex-col items-center gap-2"
                          onClick={() => {
                            navigate(cat.to);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="text-xs">{cat.name}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {/* Menu Items */}
                    <div className="space-y-2">
                      {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start gap-3 h-12"
                            onClick={() => {
                              navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span>{item.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div className="font-bold text-2xl text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🛍️</span>
                  </div>
                  RIKY
                </div>
              </Link>
            </div>

            {/* Left: Location Selector with Marketplace Switcher */}
            <div className="hidden md:flex items-center gap-4">
              {/* Marketplace Selector */}
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                <span className="text-xs font-medium">Shop:</span>
                <Select value={currentMarketplace} onValueChange={setMarketplace}>
                  <SelectTrigger className="bg-transparent border-none text-white text-sm font-medium h-auto p-0 [&>svg]:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nearbuy">Riky Local</SelectItem>
                    <SelectItem value="uk">Riky UK</SelectItem>
                    <SelectItem value="china">Riky China</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 max-w-[200px] justify-start px-2 text-white hover:bg-white/10"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs text-white/80">
                        Deliver to
                      </span>
                      <span className="text-sm font-medium truncate">
                        {getCurrentLocationName()}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="start">
                  <DropdownMenuLabel>Select delivery address</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {savedAddresses.map((address) => (
                    <DropdownMenuItem
                      key={address.id}
                      onClick={() => setCurrentAddress(address)}
                      className="flex flex-col items-start py-3"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2">
                          {address.type === "home" && (
                            <Home className="w-4 h-4" />
                          )}
                          {address.type === "office" && (
                            <Package className="w-4 h-4" />
                          )}
                          {address.type === "other" && (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span className="font-medium">{address.label}</span>
                        </div>
                        {currentAddress?.id === address.id && (
                          <div className="w-2 h-2 bg-brand-blue rounded-full ml-auto" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {address.address}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={addNewAddressManual}>
                    Add new address
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Center: Large Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products, brands & sellers"
                  className="pl-12 pr-4 h-12 text-lg rounded-full bg-white/95 backdrop-blur border-0 shadow-lg focus:shadow-xl transition-all duration-300 focus:bg-white"
                  onClick={() => setSearchOpen(true)}
                  readOnly
                />
              </div>
            </div>

            {/* Right: Action Icons */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 flex flex-col items-center h-auto py-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs mt-1 hidden md:block">Cart</span>
                  {getItemCount() > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-yellow-400 text-black font-bold">
                      {getItemCount()}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Orders */}
              <Link to="/orders">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 flex flex-col items-center h-auto py-2"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-xs mt-1 hidden md:block">Orders</span>
                </Button>
              </Link>

              {/* User Profile */}
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/10 flex-col items-center h-auto py-2">
                  <User className="w-5 h-5" />
                  <span className="text-xs mt-1">Profile</span>
                </Button>
              </Link>

              {/* Desktop Hamburger Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex text-white hover:bg-white/10 flex-col items-center h-auto py-2"
                  >
                    <Menu className="w-5 h-5" />
                    <span className="text-xs mt-1">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>All Categories</SheetTitle>
                    <SheetDescription>
                      Explore all product categories
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-4">
                    {/* Quick Categories */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Electronics', icon: '📱', to: '/electronics' },
                        { name: 'Fashion', icon: '👕', to: '/fashion' },
                        { name: 'Home', icon: '🏠', to: '/home' },
                        { name: 'Beauty', icon: '💄', to: '/beauty' },
                        { name: 'Sports', icon: '⚽', to: '/sports' },
                        { name: 'Books', icon: '📚', to: '/books' }
                      ].map((cat) => (
                        <Button
                          key={cat.name}
                          variant="outline"
                          className="h-20 flex flex-col items-center gap-2"
                          onClick={() => {
                            navigate(cat.to);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="text-xs">{cat.name}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {/* Menu Items */}
                    <div className="space-y-2">
                      {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start gap-3 h-12"
                            onClick={() => {
                              navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span>{item.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {location.pathname.toLowerCase() !== "/videos" && (
            <div
              className={`md:hidden pb-3 pt-2 transition-all duration-300 ${isScrolled ? "opacity-0 max-h-0 overflow-hidden py-0" : "opacity-100 max-h-32"}`}
            >
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products, brands & sellers"
                  className="pl-10 pr-4 h-10 bg-white/95 rounded-full border-0"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && mobileQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(mobileQuery.trim())}`;
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">{children}</main>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <AddAddressModal
        open={addressModalOpen}
        onOpenChange={setAddressModalOpen}
      />

      {/* Desktop Footer - Keep existing footer */}
      <footer className="hidden md:block bg-slate-800 text-white">
        {/* Back to Top */}
        <div className="bg-slate-700 py-4 text-center hover:bg-slate-600 cursor-pointer transition-colors">
          <span className="text-sm font-medium">Back to top</span>
        </div>

        {/* Main Footer Content */}
        <div className="bg-slate-800 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-8">
              {/* Get to Know Us */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">
                  Get to Know Us
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      About Riky
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Press Releases
                    </a>
                  </li>
                </ul>
              </div>

              {/* Make Money */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">
                  Make Money with Us
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/sell" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Sell on Riky
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Become an Affiliate
                    </a>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">
                  Customer Service
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/contact" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">
                  Connect with Us
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-700 pt-8 mt-8 text-center">
              <p className="text-slate-400 text-sm">
                © 2024 Riky. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
          <Link to="/" className={`flex flex-col items-center justify-center gap-1 ${isActiveTab("/") ? "text-brand-blue" : "text-gray-600"}`}>
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link to="/categories" className={`flex flex-col items-center justify-center gap-1 ${isActiveTab("/categories") ? "text-brand-blue" : "text-gray-600"}`}>
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Categories</span>
          </Link>

          <Link to="/videos" className={`flex flex-col items-center justify-center gap-1 ${isActiveTab("/videos") ? "text-brand-blue" : "text-gray-600"}`}>
            <Play className="w-5 h-5" />
            <span className="text-xs">Videos</span>
          </Link>

          <Link to="/cart" className={`flex flex-col items-center justify-center gap-1 relative ${isActiveTab("/cart") ? "text-brand-blue" : "text-gray-600"}`}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Cart</span>
            {getItemCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                {getItemCount()}
              </Badge>
            )}
          </Link>

          <Link to="/profile" className={`flex flex-col items-center justify-center gap-1 ${isActiveTab("/profile") ? "text-brand-blue" : "text-gray-600"}`}>
            <UserCircle className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
