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
export const SAMPLE_CATALOG: CatalogProduct[] = [
  {
    id: "1",
    title: "iPhone 16 Pro Max 256GB with Camera Control",
    price: 999.99,
    originalPrice: 1099.99,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa1204421aea746ed876cfd0a2d6b2eb9?format=webp&width=800",
    category: "Phones",
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
    category: "Audio",
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
  // More Apple products for brand pages and lists
  {
    id: "5",
    title: "iPhone 15 128GB",
    price: 799.0,
    originalPrice: 899.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2af8b780c7fa41c89d7acdf153fac824?format=webp&width=800",
    category: "Phones",
    brand: "Apple",
    rating: 4.6,
    reviewCount: 1421,
    origin: "UK",
  },
  {
    id: "6",
    title: "iPhone 14 128GB",
    price: 699.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd15b45a1ab894ee486a8ba02980a7467?format=webp&width=800",
    category: "Phones",
    brand: "Apple",
    rating: 4.5,
    reviewCount: 5320,
    origin: "UK",
  },
  {
    id: "7",
    title: "Apple Watch Series 9 GPS 41mm",
    price: 399.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff81dd5d574034f448030235941c9a382?format=webp&width=800",
    category: "Wearables",
    brand: "Apple",
    rating: 4.7,
    reviewCount: 2109,
    origin: "UK",
  },
  {
    id: "8",
    title: "Apple Watch Ultra 2",
    price: 799.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa5073a63ad47454fa3d126c0cd3ffd11?format=webp&width=800",
    category: "Wearables",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 987,
    origin: "UK",
  },
  {
    id: "9",
    title: "iPad Air 11‑inch (M2)",
    price: 599.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2fdc4ff712c742b48b5f10e46b15af5a?format=webp&width=800",
    category: "Tablets",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1543,
    origin: "UK",
  },
  {
    id: "10",
    title: "iPad Pro 13‑inch (M4)",
    price: 999.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F319deb5bd62f44adbe76dee2d2c91558?format=webp&width=800",
    category: "Tablets",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 845,
    origin: "UK",
  },
  {
    id: "11",
    title: "MacBook Air 13‑inch (M3)",
    price: 1099.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a8ceaa469e146ff9bea81806abc63a1?format=webp&width=800",
    category: "Laptops",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1750,
    origin: "UK",
  },
  {
    id: "12",
    title: "MacBook Pro 14‑inch (M3)",
    price: 1899.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa6a27f8d49eb4361a224932f357cf1af?format=webp&width=800",
    category: "Laptops",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 950,
    origin: "UK",
  },
  // Additional non-Apple to enrich lists
  {
    id: "13",
    title: "Samsung Galaxy S24 Ultra",
    price: 1199.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F431d2d8b01494ad1b9b8be2de5a424e1?format=webp&width=800",
    category: "Phones",
    brand: "Samsung",
    rating: 4.7,
    reviewCount: 3001,
    origin: "China",
  },
  {
    id: "14",
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 349.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F199d372cf11f426bbd41c4f81a31c348?format=webp&width=800",
    category: "Audio",
    brand: "Sony",
    rating: 4.8,
    reviewCount: 6200,
    origin: "UK",
  },
  {
    id: "15",
    title: "Xiaomi 14 Ultra",
    price: 999.0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F71434f1b6c444921b1f60218c7258242?format=webp&width=800",
    category: "Phones",
    brand: "Xiaomi",
    rating: 4.6,
    reviewCount: 1100,
    origin: "China",
  },
];
