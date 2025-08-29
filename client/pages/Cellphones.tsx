import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PhoneItem {
  id: string;
  image: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  origin: "UK" | "China";
}

const GBP = (n: number) => `£${n.toFixed(2)}`;

const PHONES: PhoneItem[] = [
  { id: "p1", brand: "Apple", title: "Apple iPhone 15 Pro", price: 999.0, originalPrice: 1099.0, rating: 4.8, reviewCount: 2847, inStock: true, origin: "UK", image: "https://m.media-amazon.com/images/I/81CgtwSII3L._SX679_.jpg" },
  { id: "p2", brand: "Apple", title: "Apple iPhone 15", price: 799.0, rating: 4.6, reviewCount: 1421, inStock: true, origin: "UK", image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg" },
  { id: "p3", brand: "Apple", title: "Apple iPhone 14", price: 699.0, rating: 4.5, reviewCount: 5320, inStock: true, origin: "UK", image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg" },
  { id: "p4", brand: "Samsung", title: "Samsung Galaxy S24 Ultra", price: 1199.0, rating: 4.7, reviewCount: 3981, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0d593427391f45c19d8b7093eba2a9f7?format=webp&width=800" },
  { id: "p5", brand: "Samsung", title: "Samsung Galaxy S24", price: 849.0, rating: 4.6, reviewCount: 2103, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6e0d4dc3c07e4c77866b1d05c0f08a75?format=webp&width=800" },
  { id: "p6", brand: "Samsung", title: "Samsung Galaxy A55 5G", price: 349.0, rating: 4.3, reviewCount: 1203, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4982664b9e0447b5ac373d0bf4dc3729?format=webp&width=800" },
  { id: "p7", brand: "OnePlus", title: "OnePlus 12 5G", price: 799.0, rating: 4.5, reviewCount: 1782, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4607e1c5e1b34ada992800a4a93c5208?format=webp&width=800" },
  { id: "p8", brand: "OnePlus", title: "OnePlus 12R 5G", price: 499.0, rating: 4.4, reviewCount: 990, inStock: true, origin: "China", image: "https://m.media-amazon.com/images/I/61VbKHdE0rL._SX679_.jpg" },
  { id: "p9", brand: "Xiaomi", title: "Xiaomi 14 Ultra", price: 999.0, rating: 4.6, reviewCount: 742, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8538fd4e143344d1b0b699cd96efe8d6?format=webp&width=800" },
  { id: "p10", brand: "Xiaomi", title: "Redmi Note 13 Pro+", price: 329.0, rating: 4.3, reviewCount: 3011, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff5328786623c4462b122dfaae430e04f?format=webp&width=800" },
  { id: "p11", brand: "Realme", title: "Realme GT 6T", price: 449.0, rating: 4.2, reviewCount: 860, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcde1c1168a4f4f6e8051072743e2895a?format=webp&width=800" },
  { id: "p12", brand: "Realme", title: "Realme 12 Pro+", price: 369.0, rating: 4.1, reviewCount: 1543, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F79bcfb3ffa7f4c9cb609d8128498cb6a?format=webp&width=800" },
  { id: "p13", brand: "Vivo", title: "Vivo X100 Pro 5G", price: 1099.0, rating: 4.6, reviewCount: 677, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff274a7af43ad4affb7a05f1a602e5391?format=webp&width=800" },
  { id: "p14", brand: "Vivo", title: "Vivo V30 Pro", price: 549.0, rating: 4.3, reviewCount: 911, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F874fb72d141442d7a8959e76670dd124?format=webp&width=800" },
  { id: "p15", brand: "Oppo", title: "OPPO Reno 12 Pro 5G", price: 649.0, rating: 4.2, reviewCount: 802, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdd82503809b14bc99d35e6c4f3c97b8f?format=webp&width=800" },
  { id: "p16", brand: "Oppo", title: "OPPO Find N3 Flip", price: 949.0, rating: 4.4, reviewCount: 521, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F362f5b0f8c444e16b32146c12fdf1944?format=webp&width=800" },
  { id: "p17", brand: "Apple", title: "Apple iPhone 13", price: 599.0, rating: 4.5, reviewCount: 9000, inStock: true, origin: "UK", image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg" },
  { id: "p18", brand: "Samsung", title: "Samsung Galaxy Z Flip6", price: 999.0, rating: 4.3, reviewCount: 245, inStock: true, origin: "China", image: "https://m.media-amazon.com/images/I/71Nt2Z3i8oL._SX679_.jpg" },
  { id: "p19", brand: "Samsung", title: "Samsung Galaxy Z Fold6", price: 1699.0, rating: 4.4, reviewCount: 198, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd869ea1ba1a94b3f8871111b4ddab199?format=webp&width=800" },
  { id: "p20", brand: "Xiaomi", title: "POCO F6 5G", price: 389.0, rating: 4.4, reviewCount: 2110, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc273fcec23484bef9b0d0369672215e0?format=webp&width=800" },
  { id: "p21", brand: "OnePlus", title: "OnePlus Nord CE4", price: 299.0, rating: 4.1, reviewCount: 1560, inStock: true, origin: "China", image: "https://m.media-amazon.com/images/I/61B0+qQriPL._SX679_.jpg" },
  { id: "p22", brand: "Realme", title: "Realme Narzo 70 Pro", price: 289.0, rating: 4.0, reviewCount: 780, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8394f1b1a9034364a8f5350184cba37e?format=webp&width=800" },
  { id: "p23", brand: "Vivo", title: "Vivo T3 5G", price: 259.0, rating: 4.0, reviewCount: 540, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcfc884677ebe485a9b3dbff8829c47e6?format=webp&width=800" },
  { id: "p24", brand: "Oppo", title: "OPPO A79 5G", price: 219.0, rating: 3.9, reviewCount: 430, inStock: true, origin: "China", image: "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa1cdb2fc81d94e2fb29e564b2795a9e7?format=webp&width=800" },
];

export default function Cellphones() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([100, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStock, setInStock] = useState<boolean | null>(null);
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(1);

  const brandOptions = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Vivo", "Oppo"];

  const filtered = useMemo(() => {
    let list = PHONES.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    if (brands.length) list = list.filter(p => brands.includes(p.brand));
    list = list.filter(p => p.price >= price[0] && p.price <= price[1]);
    if (minRating > 0) list = list.filter(p => p.rating >= minRating);
    if (inStock !== null) list = list.filter(p => p.inStock === inStock);
    switch (sort) {
      case "price-asc": list = [...list].sort((a,b)=>a.price-b.price); break;
      case "price-desc": list = [...list].sort((a,b)=>b.price-a.price); break;
      case "newest": list = [...list].sort((a,b)=>b.reviewCount-a.reviewCount); break; // proxy
      default: break; // popularity default order
    }
    return list;
  }, [query, brands, price, minRating, inStock, sort]);

  const pageSize = 12;
  const visible = filtered.slice(0, page * pageSize);
  useEffect(()=>{ setPage(1); }, [query, brands, price, minRating, inStock, sort]);

  const clearFilters = () => {
    setBrands([]); setPrice([100,2000]); setMinRating(0); setInStock(null);
  };

  const chips: {label: string, onRemove: () => void}[] = [];
  if (brands.length) chips.push({ label: `Brand: ${brands.join(', ')}`, onRemove: ()=>setBrands([]) });
  if (price[0] !== 100 || price[1] !== 2000) chips.push({ label: `Price: ${GBP(price[0])}–${GBP(price[1])}`, onRemove: ()=>setPrice([100,2000]) });
  if (minRating > 0) chips.push({ label: `Rating: ${minRating}★+`, onRemove: ()=>setMinRating(0) });
  if (inStock !== null) chips.push({ label: inStock ? 'In Stock' : 'Out of Stock', onRemove: ()=>setInStock(null) });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky sub-header */}
      <div className="sticky top-16 z-40 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search cellphones..." className="pl-10 h-10 rounded-full" />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-10"><Filter className="w-4 h-4 mr-2"/>Filters</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] sm:w-[420px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-medium mb-2">Brand</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brandOptions.map(b => (
                      <label key={b} className="flex items-center gap-2 text-sm">
                        <Checkbox checked={brands.includes(b)} onCheckedChange={(v)=> setBrands(s=> v ? [...s, b] : s.filter(x=>x!==b))} /> {b}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <Slider value={price} min={100} max={2000} step={10} onValueChange={(v:any)=>setPrice([v[0], v[1]])} />
                  <div className="text-sm text-gray-600 mt-1">{GBP(price[0])} – {GBP(price[1])}</div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ratings</h4>
                  <div className="flex gap-2 flex-wrap">
                    {[0,3,4,4.5,5].map(r=> (
                      <Button key={r} variant={minRating===r?"default":"outline"} size="sm" onClick={()=>setMinRating(r)}>{r===0?"All":`${r}★+`}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="flex gap-2">
                    <Button variant={inStock===true?"default":"outline"} size="sm" onClick={()=>setInStock(true)}>In Stock</Button>
                    <Button variant={inStock===false?"default":"outline"} size="sm" onClick={()=>setInStock(false)}>Out of Stock</Button>
                    <Button variant={inStock===null?"default":"outline"} size="sm" onClick={()=>setInStock(null)}>Any</Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sort</h4>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-asc">Price Low–High</SelectItem>
                      <SelectItem value="price-desc">Price High–Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={()=>setOpen(false)}>Apply</Button>
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {chips.length>0 && (
          <div className="container mx-auto px-4 pb-3 flex flex-wrap gap-2">
            {chips.map((c,i)=> (
              <Badge key={i} className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">{c.label} <button onClick={c.onRemove}><X className="w-3 h-3"/></button></Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <img src="/placeholder.svg" className="w-24 h-24 mx-auto mb-4 opacity-40" />
              <h3 className="text-lg font-semibold mb-2">No phones found.</h3>
              <p className="text-gray-600 mb-4">Try removing filters.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  rating={p.rating}
                  reviewCount={p.reviewCount}
                  origin={p.origin}
                  deliveryEta={p.origin==='UK'? 'Tomorrow' : '5–10 days'}
                />
              ))}
            </div>
            {visible.length < filtered.length && (
              <div className="flex justify-center py-6">
                <Button onClick={()=>setPage(p=>p+1)}>Load More</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
