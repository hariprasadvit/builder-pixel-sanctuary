import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MarketplaceType } from "./MarketplaceContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: MarketplaceType;
  vendorName: string;
  quantity: number;
  attributes?: {
    size?: string;
    color?: string;
    variant?: string;
  };
  shippingWeight?: number;
  category: string;
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

export interface AppliedCoupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  description: string;
  minOrder?: number;
  maxDiscount?: number;
}

interface CartContextType {
  // Cart items management
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  clearVendorCart: (vendor: MarketplaceType) => void;
  
  // Multi-vendor cart management
  getItemsByVendor: (vendor: MarketplaceType) => CartItem[];
  getCartWarnings: () => string[];
  hasMultipleVendors: () => boolean;
  
  // Totals and calculations
  getTotals: (vendor?: MarketplaceType) => CartTotals;
  getItemCount: () => number;
  getVendorItemCount: (vendor: MarketplaceType) => number;
  
  // Coupons and promotions
  appliedCoupons: AppliedCoupon[];
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: (code: string) => void;
  
  // Delivery address for calculations
  deliveryPostcode: string | null;
  setDeliveryPostcode: (postcode: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (!saved) return [] as CartItem[];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [] as CartItem[];
      const validVendors = new Set(["nearbuy","uk","china"]);
      return parsed.filter((it: any) => it && typeof it === 'object' && typeof it.id === 'string' && typeof it.name === 'string' && typeof it.price === 'number' && typeof it.image === 'string' && validVendors.has(it.vendor || 'nearbuy')).map((it: any) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        originalPrice: typeof it.originalPrice === 'number' ? it.originalPrice : undefined,
        image: it.image,
        vendor: validVendors.has(it.vendor) ? it.vendor : 'nearbuy',
        vendorName: it.vendorName || 'Nearbuy Marketplace',
        quantity: Math.max(1, Number(it.quantity) || 1),
        attributes: it.attributes || undefined,
        shippingWeight: typeof it.shippingWeight === 'number' ? it.shippingWeight : undefined,
        category: typeof it.category === 'string' ? it.category : 'General',
      })) as CartItem[];
    } catch {
      return [] as CartItem[];
    }
  });
  
  const [appliedCoupons, setAppliedCoupons] = useState<AppliedCoupon[]>(() => {
    const saved = localStorage.getItem("appliedCoupons");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [deliveryPostcode, setDeliveryPostcode] = useState<string | null>(() => {
    return localStorage.getItem("deliveryPostcode");
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("appliedCoupons", JSON.stringify(appliedCoupons));
  }, [appliedCoupons]);

  useEffect(() => {
    if (deliveryPostcode) {
      localStorage.setItem("deliveryPostcode", deliveryPostcode);
    }
  }, [deliveryPostcode]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupons([]);
  };

  const clearVendorCart = (vendor: MarketplaceType) => {
    setItems(prev => prev.filter(item => item.vendor !== vendor));
    // Remove coupons that might be vendor-specific
    setAppliedCoupons(prev => prev.filter(coupon => 
      !coupon.code.toLowerCase().includes(vendor.toLowerCase())
    ));
  };

  const getItemsByVendor = (vendor: MarketplaceType): CartItem[] => {
    return items.filter(item => item.vendor === vendor);
  };

  const getCartWarnings = (): string[] => {
    const warnings: string[] = [];
    const vendors = new Set(items.map(item => item.vendor));
    
    if (vendors.size > 1) {
      const vendorNames = Array.from(vendors).map(v => 
        v === "uk" ? "UK" : v === "china" ? "China" : "Nearbuy"
      );
      warnings.push(
        `You have items from multiple vendors (${vendorNames.join(", ")}). Delivery fees will apply separately for each vendor.`
      );
    }
    
    const chinaItems = getItemsByVendor("china");
    if (chinaItems.length > 0) {
      warnings.push(
        `Items from China vendors have longer delivery times (7-14 days) and may incur additional customs fees.`
      );
    }
    
    return warnings;
  };

  const hasMultipleVendors = (): boolean => {
    const vendors = new Set(items.map(item => item.vendor));
    return vendors.size > 1;
  };

  const calculateDeliveryFee = (vendor: MarketplaceType, subtotal: number): number => {
    const baseRates: Record<string, number> = {
      nearbuy: 2.99,
      uk: 4.99,
      china: 9.99
    };
    const freeDeliveryThresholds: Record<string, number> = {
      nearbuy: 25,
      uk: 50,
      china: 100
    };
    const v = vendor || 'nearbuy';
    if (subtotal >= (freeDeliveryThresholds[v] ?? 25)) return 0;
    return baseRates[v] ?? 0;
  };

  const calculateTax = (subtotal: number): number => {
    return subtotal * 0.20; // 20% VAT
  };

  const calculateDiscount = (subtotal: number, vendor?: MarketplaceType): number => {
    return appliedCoupons.reduce((total, coupon) => {
      if (coupon.minOrder && subtotal < coupon.minOrder) return total;
      
      let discount = 0;
      if (coupon.type === "percentage") {
        discount = subtotal * (coupon.value / 100);
      } else {
        discount = coupon.value;
      }
      
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
      
      return total + discount;
    }, 0);
  };

  const getTotals = (vendor?: MarketplaceType): CartTotals => {
    const relevantItems = vendor ? getItemsByVendor(vendor) : items;
    const subtotal = relevantItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const deliveryFee = vendor 
      ? calculateDeliveryFee(vendor, subtotal)
      : hasMultipleVendors()
        ? Array.from(new Set(items.map(item => item.vendor)))
            .reduce((sum, v) => {
              const vendorSubtotal = getItemsByVendor(v).reduce((s, item) => s + (item.price * item.quantity), 0);
              return sum + calculateDeliveryFee(v, vendorSubtotal);
            }, 0)
        : items.length > 0 
          ? calculateDeliveryFee(items[0].vendor, subtotal)
          : 0;
    
    const discountAmount = calculateDiscount(subtotal, vendor);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = calculateTax(taxableAmount);
    const total = Math.max(0, taxableAmount + taxAmount + deliveryFee);
    
    return {
      subtotal,
      deliveryFee,
      taxAmount,
      discountAmount,
      total
    };
  };

  const getItemCount = (): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getVendorItemCount = (vendor: MarketplaceType): number => {
    return getItemsByVendor(vendor).reduce((sum, item) => sum + item.quantity, 0);
  };

  // Mock coupon validation - in real app this would call an API
  const applyCoupon = async (code: string): Promise<boolean> => {
    const mockCoupons: Record<string, AppliedCoupon> = {
      "1234": {
        code: "1234",
        type: "fixed",
        value: 50,
        description: "🎉 Special firework discount - £50 off!",
        minOrder: 10
      },
      "SAVE10": {
        code: "SAVE10",
        type: "percentage",
        value: 10,
        description: "10% off your order",
        minOrder: 30
      },
      "NEWUSER20": {
        code: "NEWUSER20",
        type: "percentage",
        value: 20,
        description: "20% off for new users",
        maxDiscount: 50
      },
      "FLAT5": {
        code: "FLAT5",
        type: "fixed",
        value: 5,
        description: "£5 off your order",
        minOrder: 25
      }
    };
    
    const coupon = mockCoupons[code.toUpperCase()];
    if (coupon && !appliedCoupons.some(c => c.code === coupon.code)) {
      setAppliedCoupons(prev => [...prev, coupon]);
      return true;
    }
    
    return false;
  };

  const removeCoupon = (code: string) => {
    setAppliedCoupons(prev => prev.filter(coupon => coupon.code !== code));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearVendorCart,
        getItemsByVendor,
        getCartWarnings,
        hasMultipleVendors,
        getTotals,
        getItemCount,
        getVendorItemCount,
        appliedCoupons,
        applyCoupon,
        removeCoupon,
        deliveryPostcode,
        setDeliveryPostcode
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
