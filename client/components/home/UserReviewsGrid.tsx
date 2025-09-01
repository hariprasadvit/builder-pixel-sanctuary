import React from "react";
import { ReviewPlaceholder, ProductPlaceholder, SectionHeader } from "@/components/ui/placeholders";

export default function UserReviewsGrid() {
  const reviews = [
    { u: 'sophia', r: 4.8, t: 'Absolutely loved the quality and the fast delivery. Highly recommend!' },
    { u: 'liam', r: 4.5, t: 'Great value for money. The video demo helped me decide quickly.' },
    { u: 'olivia', r: 4.7, t: 'Stylish and functional. Exactly as described in the video.' },
    { u: 'noah', r: 4.6, t: 'Customer service was excellent and the product is top notch.' },
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
                <ProductPlaceholder title="Reviewed Product" price={89.99} originalPrice={119.99} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
