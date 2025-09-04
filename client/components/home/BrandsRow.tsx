import React from "react";
import { BrandLogoPlaceholder } from "@/components/ui/placeholders";

const LOGOS = [
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f0daf3b8e4e40779a843424556a2304?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F16789c308e8f4c3c8ba0f16313752b36?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F989a04673c2941e09da9f0563a2c4e42?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff276ae5853db4f0fbeea70183e07ad73?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbbf5b7dfefa243c5bb2b24de3bb4efa0?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F8715da2716ae44518ebc3886d9fb83aa?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0995d7c31bb9430cb6df578351cf587e?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbdd3c767f5f54c999be4d6f5b07baf90?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F32c10e15dc274eb695964755fb439f8d?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa5f75495652749889577bd4603a21836?format=webp&width=800",
];

export default function BrandsRow() {
  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="h-1 w-full rounded bg-gradient-to-r from-[#e3f2fd] to-[#fde7e7] mb-3"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Brands</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {LOGOS.map((src, i) => (
            <div key={i} className="flex-shrink-0 p-1 group">
              <BrandLogoPlaceholder size="lg" shape="square" src={src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
