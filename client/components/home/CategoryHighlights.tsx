import React from "react";
import { Fragment } from "react";
import { BrandBannerPlaceholder, ProductPlaceholder, VideoPlaceholder } from "@/components/ui/placeholders";
import ElectronicsCategoryIcons from "@/components/home/ElectronicsCategoryIcons";
import UKDealsBanner from "@/components/home/UKDealsBanner";

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
        {CATEGORIES.map((cat) => (
          <Fragment key={cat.key}>
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="bg-gradient-to-r from-[#e6ecf7] to-[#fde7e7] text-gray-900 p-4">
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="p-4">
                {cat.key === 'electronics' ? (
                  <>
                    <div className="relative group w-full rounded-2xl overflow-hidden mb-4">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F38cd87269c174fc998ce6e04af10a52f?format=webp&width=1440"
                        alt="Epic Deals Banner"
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="shine-strip animate-shine z-10" />
                    </div>
                    <ElectronicsCategoryIcons />
                  </>
                ) : cat.key === 'cellphones' ? (
                  <div className="relative group w-full rounded-2xl overflow-hidden mb-4">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0685bf9e45fb4b92b841cc489a8ccc3c?format=webp&width=1440"
                      alt="Cellphones Banner"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="shine-strip animate-shine z-10" />
                  </div>
                ) : cat.key === 'clothing' ? null : (
                  <BrandBannerPlaceholder title={`${cat.title} Banner Placeholder`} height="h-40" />
                )}
                {cat.key === 'electronics' && (<div className="mt-6 border-t border-dashed border-gray-200" />)}
                {!(cat.key === 'electronics' || cat.key === 'cellphones' || cat.key === 'clothing') && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <VideoPlaceholder key={`v-${i}`} title={`${cat.title} Video`} price={89.99} originalPrice={109.99} likes={1500} comments={30} views={6000} cardHeight={420} mediaHeight={240} />
                    ))}
                  </div>
                )}
                {cat.key === 'clothing' && (
                  <div className="mb-4">
                    <UKDealsBanner />
                  </div>
                )}
                {cat.key === 'clothing' && (
                  <h4 className="mt-4 text-lg font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">Explore Women's Clothing</h4>
                )}
                <div className={`mt-4 grid ${cat.key === 'clothing' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-5'} gap-4`}>
                  {cat.key === 'electronics' ? (
                    [
                      { title: 'Dell Inspiron 15 (Ryzen)', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0a53cb8ad3da4225822a3c8461db49ed?format=webp&width=800', price: 599.0, original: 699.0 },
                      { title: 'MacBook Air 13" (M2)', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4971f1c6a0994cb5aeab807ca690b9df?format=webp&width=800', price: 999.0, original: 1099.0 },
                      { title: 'Sony ZV-1 Vlog Camera', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fa69fd77e1c714a3986bb29bf712560dd?format=webp&width=800', price: 549.0, original: 599.0 },
                      { title: 'boAt Wave Smartwatch', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff8632b0180b34fac94d990c1099d25db?format=webp&width=800', price: 39.0, original: 59.0 },
                      { title: 'boAt Party Speaker 160W', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F9c80bcb62fce48ebbcdbb8299649b4ca?format=webp&width=800', price: 129.0, original: 149.0 },
                    ].map((p, i) => (
                      <ProductPlaceholder
                        key={`elec-${i}`}
                        title={p.title}
                        price={p.price}
                        originalPrice={p.original}
                        thumbnailSrc={p.img}
                        fit="contain"
                        cardHeight={380}
                        mediaHeight={220}
                        mediaPadding="px-4 py-3"
                      />
                    ))
                  ) : cat.key === 'cellphones' ? (
                    [
                      { title: 'OnePlus Nord CE4 Lite', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc33feae9d94c451b8969c60661c3692d?format=webp&width=800', price: 199.0, original: 229.0 },
                      { title: 'Samsung Galaxy M05', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F52335893f0c54cb4b8fbdd9822964bdd?format=webp&width=800', price: 139.0, original: 159.0 },
                      { title: 'iQOO Z10x', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F687bbd4ffd97429ba501de2ec448faa3?format=webp&width=800', price: 229.0, original: 259.0 },
                      { title: 'Redmi 13 5G Prime Edition', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4de295fcb31a4ed990c1b1e9107431e3?format=webp&width=800', price: 179.0, original: 199.0 },
                      { title: 'POCO M6 Plus 5G', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4a1b3bab6a694089998b588abcabc22b?format=webp&width=800', price: 189.0, original: 209.0 },
                    ].map((p, i) => (
                      <ProductPlaceholder
                        key={`cell-${i}`}
                        title={p.title}
                        price={p.price}
                        originalPrice={p.original}
                        thumbnailSrc={p.img}
                        fit="contain"
                        cardHeight={380}
                        mediaHeight={220}
                        mediaPadding="px-4 py-3"
                      />
                    ))
                  ) : cat.key === 'clothing' ? (
                    [
                      { title: 'Jeans & Jeggings', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F93cd18deab3a4407aa76af7b5e08f6b6?format=webp&width=800' },
                      { title: 'Dresses & Jumpsuits', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F5af06d8bd91547698c386cecc3d7f32f?format=webp&width=800' },
                      { title: 'Tops & Tees', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F776cc9ad00a2462fa48eed60dec820da?format=webp&width=800' },
                      { title: 'Innerwear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcbc45a5ec381450ba77510215772c761?format=webp&width=800' },
                      { title: 'Swimwear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F91e4fb89cc444e35a56d1f498c6411c1?format=webp&width=800' },
                      { title: 'Activewear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd2565f28c67348d291689e7e20c2b10a?format=webp&width=800' }
                    ].map((p, i) => (
                      <div key={`cloth-${i}`} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                          <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          <div className="shine-strip animate-shine z-10" />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{p.title}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    Array.from({ length: 5 }).map((_, i) => (
                      <ProductPlaceholder key={`p-${i}`} title={`${cat.title} Product`} price={49.99} originalPrice={69.99} cardHeight={420} mediaHeight={240} />
                    ))
                  )}
                </div>
                {cat.key === 'electronics' && (
                  <div className="mt-6">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffd540752c33a4e3f8c8230d0eacb3794?format=webp&width=1440" alt="DiscoverAI Banner" className="w-full h-auto object-cover rounded-xl shadow-md" />
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
