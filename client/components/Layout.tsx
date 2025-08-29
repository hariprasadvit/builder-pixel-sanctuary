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
  const { getItemCount } = useCart();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const mobileResults = useMemo(() => (mobileQuery ? searchCatalog(mobileQuery, 8) : null), [mobileQuery]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  type NoticeType = 'order'|'promo'|'system';
  const [notifications, setNotifications] = useState<{id:string; title:string; description:string; time:string; type:NoticeType; read:boolean}[]>([
    { id: '1', title: 'Out for delivery', description: 'Order ORD-2024-002 is on its way. Expect today 2–6pm.', time: '2h ago', type: 'order', read: false },
    { id: '2', title: 'Price dropped', description: 'Nike Air Max in your wishlist is now £20 off.', time: 'Yesterday', type: 'promo', read: false },
    { id: '3', title: 'Return scheduled', description: 'Pickup booked for tomorrow 10:00–12:00. Keep OTP handy.', time: '2d ago', type: 'order', read: true },
  ]);
  const unseenCount = useMemo(() => notifications.filter(n=>!n.read).length, [notifications]);

  async function detectMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const data = await resp.json();
        const addr = data.address || {};
        const pincode = addr.postcode || "";
        const city = addr.city || addr.town || addr.village || "";
        const state = addr.state || "";
        const line = data.display_name || `${city}, ${state}`;
        const label = window.prompt("Label this address (e.g., Home, Office)", "Detected");
        const created = addAddress({ type: "other", label: label || "Detected", address: line, pincode, city, state, isDefault: false });
        setCurrentAddress(created);
      } catch (e) {
        alert("Failed to resolve address");
      }
    }, () => alert("Permission denied for location"));
  }

  const setDefault = (id: string) => {
    savedAddresses.forEach(a => updateAddress(a.id, { isDefault: a.id === id }));
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: "promotions", label: "Promotions", icon: Tag, color: "text-red-600", to: "/flashsale" },
    { id: "brands", label: "Brands", icon: Award, color: "text-purple-600", to: "/brands" },
    { id: "newest", label: "Newest", icon: Star, color: "text-blue-600", to: "/newest" },
    {
      id: "bestsellers",
      label: "Bestsellers",
      icon: TrendingUp,
      color: "text-green-600",
      to: "/bestsellers",
    },
    { id: "coupons", label: "Coupons", icon: Tag, color: "text-amber-600", to: "/coupons" },
    { id: "sale", label: "On sale", icon: Tag, color: "text-orange-600", to: "/flashsale" },
  ];

  const secondaryMenuItems = [
    {
      id: "seller",
      label: "Become a seller",
      icon: Users,
      color: "text-indigo-600",
      to: "/sell",
    },
    { id: "contact", label: "Contact Us", icon: Phone, color: "text-gray-600" },
  ];

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar - Sticky */}
      <header className="sticky top-0 z-50 bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Left section with Hamburger and Logo */}
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetDescription className="text-left">
                      Browse categories and options
                    </SheetDescription>
                  </SheetHeader>

                  <div className="p-0">
                    {/* Main Menu Items */}
                    <div className="py-4">
                      {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => {
                              // @ts-ignore
                              if (item.to) navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${item.color}`}
                            />
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-200 my-2" />

                    {/* Secondary Menu Items */}
                    <div className="py-4">
                      {secondaryMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => {
                              // @ts-ignore
                              if (item.to) navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${item.color}`}
                            />
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa74e56e283d44231b5a2ba37cfcd2c4b?format=webp&width=800"
                  alt="RIKY Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Location Selector */}
            <div className="hidden md:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 max-w-[200px] justify-start px-2"
                  >
                    <MapPin className="w-4 h-4 text-brand-blue" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs text-muted-foreground">
                        Deliver to
                      </span>
                      <span className="text-sm font-medium truncate">
                        {getCurrentLocationName()}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                      <div className="text-sm text-muted-foreground">
                        {address.pincode} {address.city}, {address.state}
                      </div>
                      <div className="mt-2 flex gap-2">
                        {!address.isDefault && (
                          <Button variant="outline" size="sm" onClick={(e)=>{ e.stopPropagation(); setDefault(address.id); }}>Set default</Button>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-brand-blue" onClick={(e)=>{ e.stopPropagation(); detectMyLocation(); }}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Detect My Location
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-brand-blue" onClick={(e)=>{ e.stopPropagation(); addNewAddressManual(); }}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Add new address
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>


            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <Link
                to="/categories"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab("/categories")
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                }`}
              >
                Categories
              </Link>
              <Link
                to="/videos"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab("/videos")
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                }`}
              >
                Videos
              </Link>
              <Link
                to="/orders"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab("/orders")
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                }`}
              >
                Orders
              </Link>
              <Link
                to="/support"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab("/support")
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                }`}
              >
                Support
              </Link>

              {/* Desktop Menu Button */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Menu className="w-4 h-4" />
                    <span className="text-sm">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetDescription className="text-left">
                      Browse categories and options
                    </SheetDescription>
                  </SheetHeader>

                  <div className="p-0">
                    {/* Main Menu Items */}
                    <div className="py-4">
                      {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => {
                              // @ts-ignore
                              if (item.to) navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${item.color}`}
                            />
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-200 my-2" />

                    {/* Secondary Menu Items */}
                    <div className="py-4">
                      {secondaryMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => {
                              // @ts-ignore
                              if (item.to) navigate(item.to);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${item.color}`}
                            />
                            <span className="font-medium text-gray-900">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {/* Marketplace Toggle - Always visible */}
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              <Select value={currentMarketplace} onValueChange={setMarketplace}>
                <SelectTrigger className="w-[100px] md:w-[130px] flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearbuy">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="hidden sm:inline">Nearbuy</span>
                      <span className="sm:hidden">Local</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="uk">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      UK
                    </div>
                  </SelectItem>
                  <SelectItem value="china">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      China
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Wishlist - Hidden on very small screens */}
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden xs:flex"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {unseenCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">{unseenCount}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 p-0 overflow-hidden">
                  <div className="px-4 py-3 border-b flex items-center justify-between bg-white">
                    <div className="font-medium">Notifications</div>
                    <div className="flex items-center gap-3">
                      <button className="text-xs text-brand-blue" onClick={() => setNotifications(prev=>prev.map(n=>({...n, read:true})))}>Mark all read</button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-auto divide-y">
                    {notifications.map(n => (
                      <button key={n.id} className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${n.read? '' : 'bg-blue-50/60'}`} onClick={()=> setNotifications(prev=>prev.map(x=> x.id===n.id? {...x, read:true}: x))}>
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${n.type==='order'?'bg-blue-600': n.type==='promo'?'bg-amber-500':'bg-gray-600'}`}>{n.type==='order'?'📦': n.type==='promo'?'🏷️':'ℹ️'}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">{n.title}</span>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                              <span className="ml-auto text-xs text-gray-500 whitespace-nowrap">{n.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{n.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t bg-gray-50 text-right">
                    <Link to="/orders" className="text-xs text-brand-blue">View all</Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {getItemCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                      {getItemCount()}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Profile - Always visible on desktop and larger mobile */}
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search and Location */}
          <div className={`md:hidden pb-3 pt-2 transition-all duration-300 ${isScrolled ? 'opacity-0 max-h-0 overflow-hidden py-0' : 'opacity-100 max-h-32'}`}>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search products in ${currentMarketplace === "nearbuy" ? "your area" : currentMarketplace.toUpperCase()}...`}
                className="pl-10 pr-4 h-10"
                value={mobileQuery}
                onChange={(e)=>setMobileQuery(e.target.value)}
                onKeyDown={(e)=>{ if(e.key==='Enter' && mobileQuery.trim()) { window.location.href = `/search?q=${encodeURIComponent(mobileQuery.trim())}`; } }}
              />
              {mobileQuery && (
                <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 p-2 space-y-2">
                  <div>
                    <h4 className="text-xs font-semibold px-1 mb-1">Products</h4>
                    {mobileResults && mobileResults.products.length>0 ? mobileResults.products.slice(0,4).map(p => (
                      <button key={p.id} className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-left" onClick={()=>{ window.location.href = `/search?q=${encodeURIComponent(p.title)}`; }}>
                        <img src={p.image} className="w-8 h-8 rounded object-cover" />
                        <div className="text-sm flex-1">{(() => { const parts = splitHighlight(p.title, mobileQuery); return (<><span>{parts.before}</span><strong>{parts.match}</strong><span>{parts.after}</span></>); })()}</div>
                      </button>
                    )) : <div className="text-xs text-gray-500 px-1">No product matches</div>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h4 className="text-xs font-semibold px-1 mb-1">Categories</h4>
                      {mobileResults && mobileResults.categories.length>0 ? mobileResults.categories.slice(0,4).map(c => (
                        <button key={c.name} className="block w-full text-left p-2 rounded hover:bg-gray-50 text-xs" onClick={()=>{ window.location.href = `/search?q=${encodeURIComponent(c.name)}`; }}>{(() => { const parts = splitHighlight(c.name, mobileQuery); return (<><span>{parts.before}</span><strong>{parts.match}</strong><span>{parts.after}</span></>); })()}</button>
                      )) : <div className="text-xs text-gray-500 px-1">—</div>}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold px-1 mb-1">Brands</h4>
                      {mobileResults && mobileResults.brands.length>0 ? mobileResults.brands.slice(0,4).map(b => (
                        <button key={b} className="block w-full text-left p-2 rounded hover:bg-gray-50 text-xs" onClick={()=>{ window.location.href = `/search?q=${encodeURIComponent(b)}`; }}>{(() => { const parts = splitHighlight(b, mobileQuery); return (<><span>{parts.before}</span><strong>{parts.match}</strong><span>{parts.after}</span></>); })()}</button>
                      )) : <div className="text-xs text-gray-500 px-1">—</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 justify-start h-10"
                >
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  <div className="flex flex-col items-start text-left flex-1">
                    <span className="text-xs text-muted-foreground">
                      Deliver to
                    </span>
                    <span className="text-sm font-medium truncate">
                      {getCurrentLocationName()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[calc(100vw-2rem)]"
                align="start"
              >
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
                    <div className="text-sm text-muted-foreground">
                      {address.pincode} {address.city}, {address.state}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {!address.isDefault && (
                        <Button variant="outline" size="sm" onClick={(e)=>{ e.stopPropagation(); setDefault(address.id); }}>Set default</Button>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-brand-blue" onClick={(e)=>{ e.stopPropagation(); detectMyLocation(); }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Detect My Location
                </DropdownMenuItem>
                <DropdownMenuItem className="text-brand-blue" onClick={(e)=>{ e.stopPropagation(); addNewAddressManual(); }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Add new address
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">{children}</main>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <AddAddressModal open={addressModalOpen} onOpenChange={setAddressModalOpen} />

      {/* Desktop Footer - Hidden on Mobile */}
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
                <h3 className="text-white font-bold text-sm mb-4">Get to Know Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">About Riky</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>

              {/* Connect with Us */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">Connect with Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Instagram</a></li>
                </ul>
              </div>

              {/* Make Money with Us */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">Make Money with Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Sell on Riky</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Sell under Riky Accelerator</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Protect and Build Your Brand</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Riky Global Selling</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Supply to Riky</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Fulfilment by Riky</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Advertise Your Products</a></li>
                </ul>
              </div>

              {/* Let Us Help You */}
              <div>
                <h3 className="text-white font-bold text-sm mb-4">Let Us Help You</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Your Account</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Returns Centre</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Recalls and Product Safety Alerts</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">100% Purchase Protection</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Riky App Download</a></li>
                  <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Help</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Language Selector */}
        <div className="bg-slate-800 border-t border-slate-700 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa74e56e283d44231b5a2ba37cfcd2c4b?format=webp&width=800"
                alt="RIKY Logo"
                className="h-8 w-auto brightness-0 invert"
              />
              <div className="flex items-center gap-4">
                <button className="border border-slate-600 rounded px-3 py-1 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-colors flex items-center gap-2">
                  🌐 English
                </button>
                <button className="border border-slate-600 rounded px-3 py-1 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-colors flex items-center gap-2">
                  🇮🇳 India
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-slate-900 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-7 gap-6 text-center">
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">RikyBooks</h4>
                <p className="text-slate-400 text-xs">Books, art & collectibles</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">Riky Web Services</h4>
                <p className="text-slate-400 text-xs">Scalable Cloud Computing Services</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">Audible</h4>
                <p className="text-slate-400 text-xs">Download Audio Books</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">IMDb</h4>
                <p className="text-slate-400 text-xs">Movies, TV & Celebrities</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">Shopping</h4>
                <p className="text-slate-400 text-xs">Fashion Brands</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">Prime Now</h4>
                <p className="text-slate-400 text-xs">2-Hour Delivery on Everyday Items</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs mb-2">Riky Prime Music</h4>
                <p className="text-slate-400 text-xs">100 million songs, ad-free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="bg-slate-900 border-t border-slate-800 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Conditions of Use & Sale</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-white transition-colors">Interest-Based Ads</a>
              <span>© 2024, Riky.com, Inc. or its affiliates</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab("/")
                ? "text-brand-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/categories"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab("/categories")
                ? "text-brand-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Categories</span>
          </Link>

          <Link
            to="/support"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab("/support")
                ? "text-brand-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs">Support</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab("/orders")
                ? "text-brand-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab("/profile")
                ? "text-brand-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
