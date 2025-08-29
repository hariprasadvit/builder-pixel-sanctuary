import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Electronics from "./pages/Electronics";
import Laptops from "./pages/Laptops";
import Cellphones from "./pages/Cellphones";
import Videos from "./pages/Videos";
import Support from "./pages/Support";
import SupportChat from "./pages/SupportChat";
import HelpCenter from "./pages/HelpCenter";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import SearchResults from "./pages/SearchResults";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Newest from "./pages/Newest";
import Bestsellers from "./pages/Bestsellers";
import Sell from "./pages/Sell";
import Coupons from "./pages/Coupons";
import FlashSale from "./pages/FlashSale";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MarketplaceProvider>
          <LocationProvider>
            <CartProvider>
              <WishlistProvider>
                <Routes>
                  {/* Authentication routes without Layout */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Main app routes with Layout */}
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/categories" element={<Categories />} />
                          <Route
                            path="/electronics"
                            element={<Electronics />}
                          />
                          <Route path="/cellphones" element={<Cellphones />} />
                          <Route path="/laptops" element={<Laptops />} />
                          <Route path="/videos" element={<Videos />} />
                          <Route path="/Videos" element={<Videos />} />
                          <Route path="/support" element={<Support />} />
                          <Route
                            path="/support/chat"
                            element={<SupportChat />}
                          />
                          <Route path="/help-center" element={<HelpCenter />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route
                            path="/payment-success"
                            element={<PaymentSuccess />}
                          />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/brands" element={<Brands />} />
                          <Route
                            path="/brands/:brand"
                            element={<BrandDetail />}
                          />
                          <Route path="/newest" element={<Newest />} />
                          <Route
                            path="/bestsellers"
                            element={<Bestsellers />}
                          />
                          <Route path="/sell" element={<Sell />} />
                          <Route path="/coupons" element={<Coupons />} />
                          <Route path="/flashsale" element={<FlashSale />} />
                          <Route path="/search" element={<SearchResults />} />
                          <Route
                            path="/product/:id"
                            element={<ProductDetail />}
                          />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </LocationProvider>
        </MarketplaceProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
