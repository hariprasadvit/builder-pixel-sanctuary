import React from "react";
import { ReviewPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function UserReviewsGrid() {
  const reviews = [
    {
      u: "sophia",
      r: 4.8,
      t: "Absolutely loved the quality and the fast delivery. Highly recommend!",
      product: {
        id: "p1",
        title: "3-Piece Hardside Luggage Set",
        price: 129.99,
        originalPrice: 179.99,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6a2c10f82e824425b091fa145c9ef7d5?format=webp&width=800",
      },
    },
    {
      u: "liam",
      r: 4.5,
      t: "Great value for money. The video demo helped me decide quickly.",
      product: {
        id: "p2",
        title: "Wireless Lavalier Microphone",
        price: 39.99,
        originalPrice: 59.99,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F59f45ae50d5344e983f65e3d33a2bc8f?format=webp&width=800",
      },
    },
    {
      u: "olivia",
      r: 4.7,
      t: "Stylish and functional. Exactly as described in the video.",
      product: {
        id: "p3",
        title: "TrueBasics Clean Whey Protein",
        price: 15.99,
        originalPrice: 19.99,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4db3478a5d164ea58e3cd6b8ea0e2522?format=webp&width=800",
      },
    },
    {
      u: "noah",
      r: 4.6,
      t: "Customer service was excellent and the product is top notch.",
      product: {
        id: "p4",
        title: "Pintola Peanut Butter 1kg",
        price: 9.99,
        originalPrice: 12.99,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd9915874d56f4e9c9870179954c516d3?format=webp&width=800",
      },
    },
  ];
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SectionHeader title="User Reviews & Community" icon="💬" />
          <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rv, i) => (
              <div key={i} className="space-y-3">
                <ReviewPlaceholder
                  username={rv.u}
                  rating={rv.r}
                  text={rv.t}
                  product={{
                    title: rv.product.title,
                    price: rv.product.price,
                    originalPrice: rv.product.originalPrice,
                    thumbnailSrc: rv.product.image,
                    rating: rv.r,
                    reviews: 120,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
