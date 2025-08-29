import { CATALOG, CatalogProduct } from "./catalog";

import { CATALOG, CatalogProduct } from "./catalog";

export interface SearchResult {
  products: CatalogProduct[];
  categories: { name: string; count: number }[];
  brands: string[];
}

export function searchCatalog(query: string, limit = 20): SearchResult {
  const q = query.trim().toLowerCase();
  const products = CATALOG.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  ).slice(0, limit);

  const categoriesMap = new Map<string, number>();
  const brandSet = new Set<string>();
  products.forEach((p) => {
    categoriesMap.set(p.category, (categoriesMap.get(p.category) || 0) + 1);
    brandSet.add(p.brand);
  });

  const categories = Array.from(categoriesMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const brands = Array.from(brandSet);

  return { products, categories, brands };
}

export function splitHighlight(text: string, query: string) {
  const q = query.trim();
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  const idx = q ? lower.indexOf(ql) : -1;
  if (idx === -1) {
    return { before: text, match: "", after: "" };
  }
  return {
    before: text.slice(0, idx),
    match: text.slice(idx, idx + q.length),
    after: text.slice(idx + q.length),
  };
}
