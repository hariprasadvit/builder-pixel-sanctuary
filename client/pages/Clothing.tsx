import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface ClothItem {
  id: string;
  image: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

const GBP = (n: number) => `£${n.toFixed(2)}`;

// Use the provided attachment images for listing
const CLOTHES: ClothItem[] = [
  {
    id: "c1",
    brand: "Urban Tee",
    title: "Casual Printed T-Shirt (Pack of 3)",
    price: 599,
    originalPrice: 999,
    rating: 4.2,
    reviewCount: 421,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbfa228a630454527a3b0fe16df0a6034?format=webp&width=800",
    colors: ["Blue", "Green", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "c2",
    brand: "Classic Polo",
    title: "Men's Solid Polo Shirt",
    price: 499,
    rating: 4.0,
    reviewCount: 210,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Feef959dfcd1a43c4800a4fd90a6b2d4e?format=webp&width=800",
    colors: ["Teal", "Navy"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: "c3",
    brand: "Formals Co",
    title: "Striped Formal Shirt",
    price: 799,
    rating: 4.4,
    reviewCount: 132,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8afd0f44bd884af48da1151d46e2c501?format=webp&width=800",
    colors: ["White", "Blue"],
    sizes: ["M", "L"],
  },
  {
    id: "c4",
    brand: "Boho Men",
    title: "Casual Linen Kurta",
    price: 999,
    rating: 4.1,
    reviewCount: 88,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd32cb3495b9d44c4b00a183fab9ecdf1?format=webp&width=800",
    colors: ["Beige"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: "c5",
    brand: "StripeHouse",
    title: "Slim Fit Striped Shirt",
    price: 699,
    rating: 4.0,
    reviewCount: 54,
    inStock: false,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F29731c00d8334b139e7fa9bd3aa9dcd5?format=webp&width=800",
    colors: ["Blue/Grey"],
    sizes: ["L", "XL"],
  },
  {
    id: "c6",
    brand: "Casuals",
    title: "Solid Cotton T-Shirt",
    price: 399,
    rating: 3.9,
    reviewCount: 310,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fee2e391ec1ef420abf5ac1bb4a99b38b?format=webp&width=800",
    colors: ["Grey", "Navy", "Black"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "c7",
    brand: "ResortWear",
    title: "Striped Resort Shirt",
    price: 899,
    rating: 4.3,
    reviewCount: 72,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F3afd9e3ed5774bc59ac8aac240c13d09?format=webp&width=800",
    colors: ["Sky Blue"],
    sizes: ["M", "L"],
  },
  {
    id: "c8",
    brand: "Everyday",
    title: "Pack of 3 Crew Neck Tees",
    price: 1099,
    rating: 4.5,
    reviewCount: 420,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb8b5b341b41c4502a4b54062cad20c2b?format=webp&width=800",
    colors: ["Multi"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "c9",
    brand: "Athletica",
    title: "Performance Running Tee",
    price: 549,
    rating: 4.0,
    reviewCount: 210,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffe0d8f5cb7e543b5a93983ab81396273?format=webp&width=800",
    colors: ["Black"],
    sizes: ["M", "L"],
  },
  {
    id: "c10",
    brand: "Summer Line",
    title: "Lightweight Cotton Shirt",
    price: 649,
    rating: 4.2,
    reviewCount: 101,
    inStock: true,
    image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F23daec97df4042088121270a23aafe3a?format=webp&width=800",
    colors: ["Light Blue"],
    sizes: ["M", "L", "XL"],
  },
];

export default function Clothing() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const section = params.get("section") || params.get("category") || "";

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStock, setInStock] = useState<boolean | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(1);

  const brandOptions = Array.from(new Set(CLOTHES.map((c) => c.brand))).slice(0, 10);
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const colorOptions = Array.from(new Set(CLOTHES.flatMap((c) => c.colors || []))).slice(0, 10);

  const filtered = useMemo(() => {
    let list = CLOTHES.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (section) {
      const tokens = section.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      list = list.filter((p) => {
        const txt = `${p.title} ${p.brand}`.toLowerCase();
        return tokens.some((t) => txt.includes(t));
      });
    }
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (inStock !== null) list = list.filter((p) => p.inStock === inStock);
    if (sizes.length) list = list.filter((p) => (p.sizes || []).some((s) => sizes.includes(s)));
    if (colors.length) list = list.filter((p) => (p.colors || []).some((c) => colors.includes(c)));

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [query, brands, price, minRating, inStock, sizes, colors, sort, section]);

  useEffect(() => setPage(1), [query, brands, price, minRating, inStock, sizes, colors, sort, section]);

  const clearFilters = () => {
    setBrands([]);
    setPrice([0, 2000]);
    setMinRating(0);
    setInStock(null);
    setSizes([]);
    setColors([]);
  };

  const chips: { label: string; onRemove: () => void }[] = [];
  if (brands.length) chips.push({ label: `Brand: ${brands.join(", ")}`, onRemove: () => setBrands([]) });
  if (price[0] !== 0 || price[1] !== 2000) chips.push({ label: `Price: ${GBP(price[0])}–${GBP(price[1])}`, onRemove: () => setPrice([0, 2000]) });
  if (minRating > 0) chips.push({ label: `Rating: ${minRating}★+`, onRemove: () => setMinRating(0) });
  if (sizes.length) chips.push({ label: `Sizes: ${sizes.join(", ")}`, onRemove: () => setSizes([]) });
  if (colors.length) chips.push({ label: `Colors: ${colors.join(", ")}`, onRemove: () => setColors([]) });
  if (inStock !== null) chips.push({ label: inStock ? "In Stock only" : "Out of Stock", onRemove: () => setInStock(null) });

  const pageSize = 12;
  const visible = filtered.slice(0, page * pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-16 z-40 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clothing..." className="pl-10 h-10 rounded-full" />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-10 md:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] sm:w-[420px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-medium mb-2">Brand</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brandOptions.map((b) => (
                      <label key={b} className="flex items-center gap-2 text-sm">
                        <Checkbox checked={brands.includes(b)} onCheckedChange={(v) => setBrands((s) => (v ? [...s, b] : s.filter((x) => x !== b)))} /> {b}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Price Range (GBP)</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {[[0, 199], [200, 499], [500, 799], [800, 1199], [1200, 2000]].map(([a, b]) => (
                      <Button key={`${a}-${b}`} variant="outline" size="sm" className={price[0] === a && price[1] === b ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""} onClick={() => setPrice([a, b])}>
                        {GBP(a)} – {GBP(b)}
                      </Button>
                    ))}
                  </div>
                  <Slider value={price} min={0} max={2000} step={10} onValueChange={(v: any) => setPrice([v[0], v[1]])} />
                  <div className="text-sm text-gray-600 mt-1">{GBP(price[0])} – {GBP(price[1])}</div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Customer Ratings</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[4, 3, 2, 1, 0].map((r) => (
                      <Button key={r} variant="outline" size="sm" className={`${minRating === r ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""} ${r === 0 ? "col-span-2 w-full justify-center" : ""}`} onClick={() => setMinRating(r)}>
                        {r === 0 ? (<>All</>) : (<><span>{r}</span><span className="text-yellow-500">★</span><span>&nbsp;&amp; above</span></>)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {sizeOptions.map((s) => (
                      <label key={s} className="flex items-center gap-2">
                        <Checkbox checked={sizes.includes(s)} onCheckedChange={(v) => setSizes((ss) => (v ? [...ss, s] : ss.filter((x) => x !== s)))} /> {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Colors</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {colorOptions.map((c) => (
                      <label key={c} className="flex items-center gap-2">
                        <Checkbox checked={colors.includes(c)} onCheckedChange={(v) => setColors((cs) => (v ? [...cs, c] : cs.filter((x) => x !== c)))} /> {c}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className={`w-full ${inStock === true ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""}`} onClick={() => setInStock(true)}>In Stock only</Button>
                    <Button variant="outline" size="sm" className={`w-full ${inStock === null ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""}`} onClick={() => setInStock(null)}>Include All</Button>
                    <Button variant="outline" size="sm" className={`w-full ${inStock === false ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""}`} onClick={() => setInStock(false)}>Out of Stock</Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setOpen(false)}>Apply</Button>
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {chips.length > 0 && (
          <div className="container mx-auto px-4 pb-3 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <Badge key={i} className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">{c.label} <button onClick={c.onRemove}><X className="w-3 h-3" /></button></Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="hidden md:block col-span-1">
            <div className="bg-white border rounded-lg p-4 space-y-6 sticky top-28">
              <div>
                <h4 className="font-semibold mb-2">Brand</h4>
                <div className="grid grid-cols-2 gap-2">
                  {brandOptions.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={brands.includes(b)} onCheckedChange={(v) => setBrands((s) => (v ? [...s, b] : s.filter((x) => x !== b)))} /> {b}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Price Range (GBP)</h4>
                <div className="grid grid-cols-1 gap-2 mb-2">
                  {[[0, 199], [200, 499], [500, 799], [800, 1199], [1200, 2000]].map(([a, b]) => (
                    <Button key={`${a}-${b}`} size="sm" variant="outline" className={`w-full justify-between ${price[0] === a && price[1] === b ? "bg-brand-blue text-white border-brand-blue hover:bg-brand-blue/90" : ""}`} onClick={() => setPrice([a, b])}>
                      {GBP(a)} – {GBP(b)}
                    </Button>
                  ))}
                </div>
                <Slider value={price} min={0} max={2000} step={10} onValueChange={(v: any) => setPrice([v[0], v[1]])} />
                <div className="text-sm text-gray-600 mt-1">{GBP(price[0])} – {GBP(price[1])}</div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Sizes</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {sizeOptions.map((s) => (
                    <label key={s} className="flex items-center gap-2"><Checkbox checked={sizes.includes(s)} onCheckedChange={(v) => setSizes((ss) => (v ? [...ss, s] : ss.filter((x) => x !== s)))} /> {s}</label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Colors</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {colorOptions.map((c) => (
                    <label key={c} className="flex items-center gap-2"><Checkbox checked={colors.includes(c)} onCheckedChange={(v) => setColors((cs) => (v ? [...cs, c] : cs.filter((x) => x !== c)))} /> {c}</label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={clearFilters} variant="outline">Clear All</Button>
              </div>
            </div>
          </aside>

          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">{filtered.length} results</div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort By</span>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-52"><SelectValue placeholder="Sort" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-asc">Price: Low → High</SelectItem>
                    <SelectItem value="price-desc">Price: High → Low</SelectItem>
                    <SelectItem value="rating-desc">Customer Ratings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <img src="/placeholder.svg" className="w-24 h-24 mx-auto mb-4 opacity-40" />
                  <h3 className="text-lg font-semibold mb-2">No clothing items found.</h3>
                  <p className="text-gray-600 mb-4">Try removing filters.</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((p) => (
                    <ProductCard key={p.id} id={p.id} image={p.image} title={p.title} price={p.price} originalPrice={p.originalPrice} rating={p.rating} reviewCount={p.reviewCount} origin={"UK"} deliveryEta={p.inStock ? "Tomorrow" : "5–10 days"} />
                  ))}
                </div>
                {visible.length < filtered.length && (
                  <div className="flex justify-center py-6"><Button onClick={() => setPage((p) => p + 1)}>Load More</Button></div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
