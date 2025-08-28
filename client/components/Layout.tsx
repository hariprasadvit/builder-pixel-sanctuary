import { ReactNode } from "react";
import { Search, Heart, ShoppingCart, User, Home, Grid3X3, Package, UserCircle, Play } from "lucide-react";
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

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { currentMarketplace, setMarketplace, getMarketplaceLabel } = useMarketplace();

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
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa74e56e283d44231b5a2ba37cfcd2c4b?format=webp&width=800"
                alt="RIKY Logo"
                className="h-8 w-auto"
              />
            </Link>

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

            {/* Right section */}
            <div className="flex items-center gap-2 md:gap-4">
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

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4"
              />
            </div>
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
