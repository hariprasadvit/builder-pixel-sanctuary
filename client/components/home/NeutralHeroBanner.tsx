import React from "react";

export default function NeutralHeroBanner() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0321792062974de6832309764cd809b8?format=webp&width=1200"
            alt="Hero Banner 1"
            className="w-full h-60 md:h-96 object-cover rounded-2xl shadow"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F77fb44a0cff44dd0997d0e2860a8ecd2?format=webp&width=1200"
            alt="Hero Banner 2"
            className="w-full h-60 md:h-96 object-cover rounded-2xl shadow"
          />
        </div>
      </div>
    </section>
  );
}
