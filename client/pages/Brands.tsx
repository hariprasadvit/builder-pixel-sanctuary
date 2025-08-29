import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SAMPLE_CATALOG } from "@/lib/catalog";

export default function Brands() {
  const navigate = useNavigate();
  const brands = useMemo(() => Array.from(new Set(SAMPLE_CATALOG.map(p => p.brand))).sort(), []);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">All Brands</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {brands.map((brand) => (
          <Card key={brand} className="group hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(`/brands/${brand.toLowerCase()}`)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-semibold text-gray-900 group-hover:text-brand-blue">{brand}</div>
              <Button variant="outline" size="sm" className="group-hover:border-brand-blue group-hover:text-brand-blue">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
