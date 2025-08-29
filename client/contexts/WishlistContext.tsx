import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category?: string;
  inStock?: boolean;
  vendor?: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  isWishlisted: (id: string) => boolean;
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "wishlist:v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue) as WishlistItem[];
          setItems(next);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isWishlisted = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items],
  );

  const add = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [item, ...prev],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [item, ...prev],
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, isWishlisted, add, remove, toggle, clear }),
    [items, isWishlisted, add, remove, toggle, clear],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
