import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  ShoppingCart,
  Share2,
  Grid3X3,
  List,
  Search,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";

export default function Wishlist() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const { items, remove, toggle, clear } = useWishlist();
  const { addToCart } = useCart();
  const { getCurrencySymbol } = useMarketplace();
  const { toast } = useToast();

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (i.category || "").toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [items, searchQuery],
  );

  const currency = getCurrencySymbol();

  const anySelected = Object.values(selected).some(Boolean);
  const selectedIds = Object.entries(selected)
    .filter(([, v]) => v)
    .map(([id]) => id);

  const bulkRemove = () => {
    selectedIds.forEach(remove);
    setSelected({});
    toast({ title: "Removed selected from Wishlist." });
  };

  const bulkMoveToCart = () => {
    selectedIds.forEach((id) => {
      const it = items.find((x) => x.id === id);
      if (!it) return;
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
      remove(id);
    });
    setSelected({});
    toast({ title: "Moved to Cart." });
  };

  const shareItem = async (it: (typeof items)[number]) => {
    const url = `${window.location.origin}/product/${it.id}`;
    const text = `Check this out on Riki: ${it.name} - ${currency}${it.price.toFixed(2)}\n${url}`;
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: it.name, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "Link copied to clipboard" });
    }
  };

  const RecommendationBanner = () => {
    if (items.length === 0) return null;
    const topCategory = items
      .map((i) => i.category)
      .filter(Boolean)
      .reduce<Record<string, number>>((acc, c) => {
        if (!c) return acc;
        acc[c] = (acc[c] || 0) + 1;
        return acc;
      }, {});
    const best = Object.entries(topCategory).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    return (
      <Card className="mb-6">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              You may also like {best ? `more in ${best}` : "similar items"}…
            </p>
          </div>
          <Link to="/categories">
            <Button variant="outline" size="sm">
              Explore
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  const ItemCard = ({ it }: { it: (typeof items)[number] }) => {
    const percentDrop =
      it.originalPrice && it.originalPrice > it.price
        ? Math.round(((it.originalPrice - it.price) / it.originalPrice) * 100)
        : 0;
    const dropAmt =
      it.originalPrice && it.originalPrice > it.price
        ? it.originalPrice - it.price
        : 0;

    const checked = !!selected[it.id];

    return (
      <Card className="group hover:shadow-lg transition-all">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={it.image}
              alt={it.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            {percentDrop > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-600">
                -{percentDrop}%
              </Badge>
            )}
            {!it.inStock && (
              <Badge className="absolute top-2 right-2 bg-gray-600">
                Currently unavailable
              </Badge>
            )}
            <button
              className="absolute bottom-2 left-2 w-8 h-8 rounded bg-white/90 border flex items-center justify-center"
              onClick={() => setSelected((s) => ({ ...s, [it.id]: !checked }))}
            >
              {checked ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
              {it.name}
            </h3>
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
              <p className="text-xs text-green-700 mt-1">
                Price dropped by {currency}
                {dropAmt.toFixed(2)}
              </p>
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
              <Button variant="outline" size="sm" onClick={() => shareItem(it)}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" /> My Wishlist
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {items.length > 0 ? (
          <>
            <Card className="mb-4">
              <CardContent className="p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
                <div className="flex gap-2 items-center w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search wishlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant={view === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    disabled={!anySelected}
                    onClick={bulkMoveToCart}
                  >
                    Move Selected to Cart
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!anySelected}
                    onClick={bulkRemove}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Remove Selected
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      clear();
                      toast({ title: "Cleared Wishlist." });
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            <RecommendationBanner />

            {filtered.length > 0 ? (
              view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((it) => (
                    <ItemCard key={it.id} it={it} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((it) => (
                    <ItemCard key={it.id} it={it} />
                  ))}
                </div>
              )
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold mb-4">
                Your Wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your Wishlist is empty. Start adding favorites!
              </p>
              <Link to="/">
                <Button size="lg">Shop Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
