import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchCatalog } from "@/lib/search";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, SortAsc } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResults() {
  const q = useQuery();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const keyword = q.get("q") || "";
  const { products } = searchCatalog(keyword, 1000);
  const pageSize = 8;
  const visible = products.slice(0, page * pageSize);

  useEffect(() => { setPage(1); }, [keyword]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
          <div className="text-sm text-gray-700">Results for <strong>“{keyword}”</strong> • {products.length} items</div>
          <div className="flex gap-2">
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            <Button variant="outline"><SortAsc className="w-4 h-4 mr-2" /> Sort</Button>
          </div>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">No results for “{keyword}”.</h3>
              <p className="text-gray-600">Try different spelling or explore categories below.</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["Electronics","Home","Sports","Fashion"].map((c) => (
                  <Badge key={c} className="bg-blue-100 text-blue-700 border-blue-200">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  originalPrice={p.originalPrice ?? undefined}
                  rating={p.rating}
                  reviewCount={p.reviewCount}
                  origin={p.origin}
                  deliveryEta={p.origin === 'UK' ? 'Tomorrow' : '5-10 days'}
                />
              ))}
            </div>
            {visible.length < products.length && (
              <div className="flex justify-center mt-6">
                <Button onClick={() => setPage((p) => p + 1)}>Load More</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
