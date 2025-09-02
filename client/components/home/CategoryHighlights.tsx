import React from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder } from "@/components/ui/placeholders";

const CATEGORIES = [
  { key: 'electronics', title: 'Electronics' },
  { key: 'cellphones', title: 'Cellphones' },
  { key: 'clothing', title: 'Clothing' },
  { key: 'beauty', title: 'Beauty' },
  { key: 'home', title: 'Home' },
  { key: 'kitchen', title: 'Kitchen' },
  { key: 'sports', title: 'Sports' },
  { key: 'toys', title: 'Toys' },
];

export default function CategoryHighlights() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 space-y-10">
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.key} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-[#e6ecf7] to-[#fde7e7] text-gray-900 p-4">
              <h3 className="text-xl font-bold">{cat.title}</h3>
            </div>
            <div className="p-4">
              {cat.key === 'electronics' ? (
                <div className="w-full rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fb86fd668bfb0409080f796c5fef4614f?format=webp&width=1440"
                    alt="Electronics deals banner"
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <BrandBannerPlaceholder title={`${cat.title} Banner Placeholder`} height="h-40" />
              )}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <VideoPlaceholder key={`v-${i}`} title={`${cat.title} Video`} price={89.99} originalPrice={109.99} likes={1500} comments={30} views={6000} cardHeight={420} mediaHeight={240} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {cat.key === 'electronics' ? (
                  [
                    { title: 'Dell 15 Ryzen Laptop', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a53cb8ad3da4225822a3c8461db49ed?format=webp&width=800', price: 599.0, original: 699.0 },
                    { title: 'MacBook Air', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4971f1c6a0994cb5aeab807ca690b9df?format=webp&width=800', price: 999.0, original: 1099.0 },
                    { title: 'Dell 15 (Alt)', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F98d9fd17592e4ad5908d676e373ed2b9?format=webp&width=800', price: 579.0, original: 649.0 },
                    { title: 'Smartwatch', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff8632b0180b34fac94d990c1099d25db?format=webp&width=800', price: 39.0, original: 59.0 },
                    { title: 'Party Speaker', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9c80bcb62fce48ebbcdbb8299649b4ca?format=webp&width=800', price: 129.0, original: 149.0 },
                    // camera optional sixth
                  ].map((p, i) => (
                    <ProductPlaceholder
                      key={`elec-${i}`}
                      title={p.title}
                      price={p.price}
                      originalPrice={p.original}
                      thumbnailSrc={p.img}
                      fit="contain"
                      cardHeight={420}
                      mediaHeight={240}
                    />
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, i) => (
                    <ProductPlaceholder key={`p-${i}`} title={`${cat.title} Product`} price={49.99} originalPrice={69.99} cardHeight={420} mediaHeight={240} />
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
