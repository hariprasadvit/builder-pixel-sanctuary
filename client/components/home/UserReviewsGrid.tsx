import React from "react";
import { ReviewPlaceholder, ProductPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function UserReviewsGrid() {
  const reviews = [
    { u: 'sophia', r: 4.8, t: 'Absolutely loved the quality and the fast delivery. Highly recommend!', product: { id: 'p1', title: 'Smartrun A6 Treadmill', price: 299.99, originalPrice: 399.99, image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9e2be29595284b1b976141bac8a99f9a?format=webp&width=800' } },
    { u: 'liam', r: 4.5, t: 'Great value for money. The video demo helped me decide quickly.', product: { id: 'p2', title: '3-Piece Hardside Luggage Set', price: 129.99, originalPrice: 179.99, image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F285a6e5fe1b7405b9629e5a364a9d8cf?format=webp&width=800' } },
    { u: 'olivia', r: 4.7, t: 'Stylish and functional. Exactly as described in the video.', product: { id: 'p3', title: 'Presto Active Wash Detergent 8kg', price: 15.99, originalPrice: 19.99, image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F285a6e5fe1b7405b9629e5a364a9d8cf?format=webp&width=800' } },
    { u: 'noah', r: 4.6, t: 'Customer service was excellent and the product is top notch.', product: { id: 'p4', title: 'Philips 32" LED TV', price: 199.99, originalPrice: 249.99, image: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F285a6e5fe1b7405b9629e5a364a9d8cf?format=webp&width=800' } },
  ];
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="User Reviews & Community" icon="💬" />
          <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rv, i) => (
              <div key={i} className="space-y-3">
                <ReviewPlaceholder username={rv.u} rating={rv.r} text={rv.t} />
                <ProductPlaceholder title={rv.product.title} price={rv.product.price} originalPrice={rv.product.originalPrice} thumbnailSrc={rv.product.image} fit="contain" cardHeight={200} mediaHeight={120} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
