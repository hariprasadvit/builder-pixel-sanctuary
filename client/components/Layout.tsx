import { ReactNode, useState } from "react";
import { Search, Heart, ShoppingCart, User, Home, Grid3X3, Package, UserCircle, Play, MapPin, ChevronDown, Menu, Star, TrendingUp, Award, Tag, Users, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { currentMarketplace, setMarketplace, getMarketplaceLabel } = useMarketplace();
  const { currentAddress, savedAddresses, setCurrentAddress, getCurrentLocationName } = useLocationContext();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'promotions', label: 'Promotions', icon: Tag, color: 'text-red-600' },
    { id: 'brands', label: 'Brands', icon: Award, color: 'text-purple-600' },
    { id: 'newest', label: 'Newest', icon: Star, color: 'text-blue-600' },
    { id: 'bestsellers', label: 'Bestsellers', icon: TrendingUp, color: 'text-green-600' },
    { id: 'sale', label: 'On sale', icon: Tag, color: 'text-orange-600' },
  ];

  const secondaryMenuItems = [
    { id: 'seller', label: 'Become a seller', icon: Users, color: 'text-indigo-600' },
    { id: 'contact', label: 'Contact Us', icon: Phone, color: 'text-gray-600' },
  ];

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Marketplace Banner */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          {currentMarketplace === 'nearbuy' && "🚀 Shopping locally - Same day delivery available"}
          {currentMarketplace === 'uk' && "🇬🇧 UK Marketplace - Fast shipping from trusted UK sellers"}
          {currentMarketplace === 'china' && "🌏 China Marketplace - Great value with worldwide shipping"}
        </div>
      </div>

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
                              console.log(`Selected: ${item.label}`);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span className="font-medium text-gray-900">{item.label}</span>
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
                              console.log(`Selected: ${item.label}`);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span className="font-medium text-gray-900">{item.label}</span>
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
                  <Button variant="ghost" className="flex items-center gap-2 max-w-[200px] justify-start px-2">
                    <MapPin className="w-4 h-4 text-brand-blue" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs text-muted-foreground">Deliver to</span>
                      <span className="text-sm font-medium truncate">{getCurrentLocationName()}</span>
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
                          {address.type === 'home' && <Home className="w-4 h-4" />}
                          {address.type === 'office' && <Package className="w-4 h-4" />}
                          {address.type === 'other' && <MapPin className="w-4 h-4" />}
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
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-brand-blue">
                    <MapPin className="w-4 h-4 mr-2" />
                    Add new address
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/categories"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab('/categories') ? 'text-brand-blue' : 'text-muted-foreground'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/videos"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab('/videos') ? 'text-brand-blue' : 'text-muted-foreground'
                }`}
              >
                Videos
              </Link>
              <Link
                to="/orders"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isActiveTab('/orders') ? 'text-brand-blue' : 'text-muted-foreground'
                }`}
              >
                Orders
              </Link>

              {/* Desktop Menu Button */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
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
                              console.log(`Selected: ${item.label}`);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span className="font-medium text-gray-900">{item.label}</span>
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
                              console.log(`Selected: ${item.label}`);
                              setIsMenuOpen(false);
                            }}
                          >
                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                            <span className="font-medium text-gray-900">{item.label}</span>
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
              <Button variant="ghost" size="icon" className="relative hidden xs:flex">
                <Heart className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-brand-red">
                  3
                </Badge>
              </Button>

              {/* User Avatar - Hidden on very small screens */}
              <Button variant="ghost" size="icon" className="hidden xs:flex">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search and Location */}
          <div className="md:hidden pb-3 pt-2">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search products in ${currentMarketplace === 'nearbuy' ? 'your area' : currentMarketplace.toUpperCase()}...`}
                className="pl-10 pr-4 h-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2 justify-start h-10">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  <div className="flex flex-col items-start text-left flex-1">
                    <span className="text-xs text-muted-foreground">Deliver to</span>
                    <span className="text-sm font-medium truncate">{getCurrentLocationName()}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[calc(100vw-2rem)]" align="start">
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
                        {address.type === 'home' && <Home className="w-4 h-4" />}
                        {address.type === 'office' && <Package className="w-4 h-4" />}
                        {address.type === 'other' && <MapPin className="w-4 h-4" />}
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
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-brand-blue">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add new address
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab('/') 
                ? 'text-brand-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/categories"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab('/categories')
                ? 'text-brand-blue'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Categories</span>
          </Link>

          <Link
            to="/videos"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab('/videos')
                ? 'text-brand-blue'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Play className="w-5 h-5" />
            <span className="text-xs">Videos</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab('/orders') 
                ? 'text-brand-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center gap-1 ${
              isActiveTab('/profile') 
                ? 'text-brand-blue' 
                : 'text-muted-foreground hover:text-foreground'
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
