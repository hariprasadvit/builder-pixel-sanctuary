import React from "react";

export default function BrandsStrip() {
  const brands = [
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/20/Samsung_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/09/Nike_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sony_logo.svg",
  ];
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Featured Brands</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 items-center">
          {brands.map((src, i) => (
            <div key={i} className="h-14 rounded-lg bg-gray-50 border flex items-center justify-center p-3">
              <img src={src} alt="Brand" className="max-h-full max-w-[120px] object-contain opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
