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
                  <BrandBannerPlaceholder title={`${cat.title} Banner Placeholder`} height={cat.key === 'home' ? "h-72 md:h-96" : "h-40"} imageSrc={cat.key === 'beauty' ? "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffae995da10db42548b572f98c6aadf92?format=webp&width=1440" : cat.key === 'home' ? "https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ff6fb837581724910addd6f8b2ecb90d7?format=webp&width=1440" : undefined} />
                )}
                {cat.key === 'electronics' && (<div className="mt-6 border-t border-dashed border-gray-200" />)}
                {!(cat.key === 'electronics' || cat.key === 'cellphones' || cat.key === 'clothing') && (
                  <div className={`mt-4 grid grid-cols-2 ${cat.key === 'home' ? 'md:grid-cols-5 lg:grid-cols-5' : 'md:grid-cols-4 lg:grid-cols-4'} gap-4`}>
                    {cat.key === 'beauty' ? (
                      [
                        { title: 'British Makeup Tips', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F733271c97b48431d85c9f90c5db28e9a?format=webp&width=800' },
                        { title: 'British & Irish Makeup', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F933ef31be6464395afa4050f02a703a3?format=webp&width=800' },
                        { title: 'Cult Beauty Haul', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4402cdceea62458195c5d9b5dab02e0d?format=webp&width=800' },
                        { title: 'UK Beauty Picks', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F4f173e2302764a548fd399b8e8d61026?format=webp&width=800' },
                      ].map((v, i) => (
                        <VideoPlaceholder
                          key={`beauty-${i}`}
                          title={v.title}
                          price={19.99}
                          originalPrice={29.99}
                          likes={1200}
                          comments={45}
                          views={5400}
                          aspect="16/9"
                          thumbnailSrc={v.img}
                          fit="cover"
                          cardHeight={420}
                          mediaHeight={240}
                          className="w-full"
                        />
                      ))
                    ) : cat.key === 'home' ? (
                      [
                        { title: 'Wall Clock', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F800dea76bfaf4b96b84850671fe5a9cb?format=webp&width=800', price: 24.99 },
                        { title: 'Scented Candle', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fff9554b1616e4357a99028665d0c5e4a?format=webp&width=800', price: 9.99 },
                        { title: 'Mint Mug', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F1d25eb988cd14b0aaaf6191c25f8b352?format=webp&width=800', price: 7.99 },
                        { title: 'Kitchen Jar', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F201733d801a74c6c8e1643bd9af4a585?format=webp&width=800', price: 12.99 },
                        { title: 'Cow Vase', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F87eeefbea37140ffb957b0ca55459140?format=webp&width=800', price: 14.99 },
                      ].map((p, i) => (
                        <ProductPlaceholder key={`home-${i}`} title={p.title} price={p.price} originalPrice={undefined} thumbnailSrc={p.img} fit="contain" showBuyButton={true} cardHeight={420} mediaHeight={240} />
                      ))
                    ) : (
                      Array.from({ length: 4 }).map((_, i) => (
                        <VideoPlaceholder key={`v-${i}`} title={`${cat.title} Video`} price={89.99} originalPrice={109.99} likes={1500} comments={30} views={6000} cardHeight={420} mediaHeight={240} />
                      ))
                    )}
                  </div>
                )}
                {cat.key === 'clothing' && (
                  <div className="mb-4">
                    <UKDealsBanner />
                  </div>
                )}

                {/* New: Explore Men's Clothing subsection */}
                {cat.key === 'clothing' && (
                  <div className="mt-6">
                    <h4 className="text-lg font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent animate-gradient-x">Explore Men's Clothing</h4>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {[
                        { title: 'Casual wear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F78abe6e110b147ec87697439e3781ca2?format=webp&width=800' },
                        { title: 'Sports wear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F34f89b30847844a5874652f766b57898?format=webp&width=800' },
                        { title: 'Sports Shoes', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F0d108bd585304b32bf66f523bf1ae1aa?format=webp&width=800' },
                        { title: 'Watches', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc5305d9748cc4f6385b8490ee9ea3045?format=webp&width=800' },
                        { title: 'Formal wear', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcd2ee57f41c64ff3b20a0fabc88cc467?format=webp&width=800' },
                        { title: 'Sunglasses', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fd0e6450d3d7840929e29bd2ab7c955e9?format=webp&width=800' }
                      ].map((p, i) => (
                        <div key={`men-${i}`} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="shine-strip animate-shine z-10" />
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{p.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <a key={`cell-${i}`} href="/product/1" className="block">
                        <ProductPlaceholder
                          title={p.title}
                          price={p.price}
                          originalPrice={p.original}
                          thumbnailSrc={p.img}
                          fit="contain"
                          cardHeight={380}
                          mediaHeight={220}
                          mediaPadding="px-4 py-3"
                        />
                      </a>
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
                    cat.key === 'beauty' ? (
                      [
                        { title: 'Teresa Tarmey Cleanser', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fbb78b598692f4d2e889bfd4fae409754?format=webp&width=800', price: 24.99, original: 34.99 },
                        { title: 'L Oreal Color Lipstick', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fee8ba4724a04499683c282572fb022eb?format=webp&width=800', price: 9.99, original: 14.99 },
                        { title: 'Maychao Nail Polish', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F7dc8e2250cfc43228bdca04a8d8eda37?format=webp&width=800', price: 6.99, original: 9.99 },
                        { title: 'Floral Makeup Pouch', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fdfb4443db99c4fa18f0f0e6af088d7e5?format=webp&width=800', price: 12.99, original: 19.99 },
                        { title: 'Monogram Makeup Pouch', img: 'https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fe04549ca79764d0f8c8cd93e3a94ec34?format=webp&width=800', price: 12.99, original: 19.99 },
                      ].map((p, i) => (
                        <ProductPlaceholder key={`beauty-p-${i}`} title={p.title} price={p.price} originalPrice={p.original} thumbnailSrc={p.img} fit="contain" cardHeight={420} mediaHeight={240} />
                      ))
                    ) : cat.key === 'home' ? null : (
                      Array.from({ length: 5 }).map((_, i) => (
                        <ProductPlaceholder key={`p-${i}`} title={`${cat.title} Product`} price={49.99} originalPrice={69.99} cardHeight={420} mediaHeight={240} />
                      ))
                    )
                  )}
                </div>
                {cat.key === 'electronics' && (
                  <div className="mt-6 group relative rounded-xl overflow-hidden">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Ffd540752c33a4e3f8c8230d0eacb3794?format=webp&width=1440" alt="DiscoverAI Banner" className="w-full h-auto object-cover" />
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
