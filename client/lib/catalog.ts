export interface CatalogProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  origin: "UK" | "China";
}

// Minimal shared catalog used by search; extend/replace with real API later
export const CATALOG: CatalogProduct[] = [
  {
    id: "1",
    title: "iPhone 16 Pro Max 256GB with Camera Control",
    price: 999.99,
    originalPrice: 1099.99,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5af4fad80ff4399a6d668145b207b6e?format=webp&width=800",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 2847,
    origin: "UK",
  },
  {
    id: "2",
    title: "Samsung Galaxy Buds Pro Wireless Earbuds",
    price: 89.99,
    originalPrice: 149.99,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.5,
    reviewCount: 1234,
    origin: "China",
  },
  {
    id: "3",
    title: "Nike Air Max Plus Running Shoes",
    price: 119.99,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F840cbc4d5c6c45b891684ac95917a774?format=webp&width=800",
    category: "Sports & Outdoors",
    brand: "Nike",
    rating: 4.7,
    reviewCount: 567,
    origin: "UK",
  },
  {
    id: "4",
    title: "Dyson V15 Detect Absolute Cordless Vacuum",
    price: 549.99,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbc0b172ea8124ff1b3a0d4c65468556e?format=webp&width=800",
    category: "Home & Garden",
    brand: "Dyson",
    rating: 4.9,
    reviewCount: 892,
    origin: "UK",
  },
];
