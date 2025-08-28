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

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar - Sticky */}
      <header className="sticky top-0 z-50 bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-8 h-6 bg-brand-blue rounded-sm flex items-center justify-center">
                  <div className="w-6 h-4 bg-white rounded-sm relative">
                    <div className="absolute top-3 left-1 w-1 h-1 bg-brand-red rounded-full"></div>
                    <div className="absolute top-3 right-1 w-1 h-1 bg-brand-red rounded-full"></div>
                  </div>
                </div>
                <span className="ml-2 text-xl font-bold text-brand-dark">RIKY</span>
              </div>
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
            <div className="flex items-center gap-4">
              {/* Region Toggle */}
              <Select defaultValue="nearbuy">
                <SelectTrigger className="w-[130px] hidden md:flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearbuy">Nearbuy</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                </SelectContent>
              </Select>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-brand-red">
                  3
                </Badge>
              </Button>

              {/* User Avatar */}
              <Button variant="ghost" size="icon">
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
        <div className="grid grid-cols-6 h-16">
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
            to="/cart"
            className={`flex flex-col items-center justify-center gap-1 relative ${
              isActiveTab('/cart') 
                ? 'text-brand-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Cart</span>
            <Badge className="absolute top-1 right-6 w-5 h-5 flex items-center justify-center p-0 text-xs bg-brand-red">
              3
            </Badge>
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
