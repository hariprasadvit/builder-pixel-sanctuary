import React from "react";

export default function HeroCarousel() {
  return (
    <section className="bg-white">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative bg-white">
          <div className="w-full h-[260px] md:h-[320px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdc07b67b48df45a5aafbcac52e9ec7ff?format=webp&width=2400"
              alt="Lenovo Empowering Progress Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
