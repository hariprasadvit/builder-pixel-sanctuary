import React from "react";
import { ProductPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function DealsStrip() {
  const items = [
    {
      id: 'dealstrip-1',
      title: 'Smartrun A6 Treadmill',
      price: 299.99,
      originalPrice: 399.99,
      badge: 'Limited',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5a2faa9687f3425fa777d83d6801fce9?format=webp&width=800'
    },
    {
      id: 'dealstrip-2',
      title: '3-Piece Hardside Luggage Set',
      price: 129.99,
      originalPrice: 179.99,
      badge: 'Travel',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa2b4009e08244e11bcdaa69bc0888053?format=webp&width=800'
    },
    {
      id: 'dealstrip-3',
      title: 'Presto Active Wash Detergent 8kg',
      price: 15.99,
      originalPrice: 19.99,
      badge: 'Super Value',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9c1dbc7306e24a8ca61d044d63d3f342?format=webp&width=800'
    },
    {
      id: 'dealstrip-4',
      title: 'Philips 32" LED TV',
      price: 199.99,
      originalPrice: 249.99,
      badge: 'Deal',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5c109ec24aa94fa4916978ce02580ccf?format=webp&width=800'
    },
    {
      id: 'dealstrip-5',
      title: 'Slovic Doorway Pull-Up Bar',
      price: 24.99,
      originalPrice: 34.99,
      badge: 'Fitness',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F2a6e54e0ac624cec9e04c048284a779a?format=webp&width=800'
    },
    {
      id: 'dealstrip-6',
      title: 'Clip-on Lavalier Microphone',
      price: 29.99,
      originalPrice: 39.99,
      badge: 'New',
      thumbnailSrc: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc1733dfbf8e74ac589270fbe6bfaa4a5?format=webp&width=800'
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <SectionHeader title="Deals of the Day" icon="⏰" />
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((it) => (
              <ProductPlaceholder
                key={it.id}
                title={it.title}
                price={it.price}
                originalPrice={it.originalPrice}
                badge={it.badge}
                thumbnailSrc={it.thumbnailSrc}
                fit="contain"
                cardHeight={420}
                mediaHeight={240}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
