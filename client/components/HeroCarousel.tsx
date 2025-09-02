import React from "react";

export default function HeroCarousel() {
  return (
    <section className="bg-white">
      <div className="w-full">
        <div className="relative bg-white">
          <div className="w-full h-[220px] md:h-[260px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdc07b67b48df45a5aafbcac52e9ec7ff?format=webp&width=2000"
              alt="Lenovo Empowering Progress Banner"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
