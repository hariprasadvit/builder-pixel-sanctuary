import React from "react";
import SocialSellCard from "@/components/home/SocialSellCard";

export default function SocialSellSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow bg-white">
          <div className="bg-gradient-to-r from-[#e3f2fd] to-[#e1f5fe] p-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">what people are buying around u</h3>
            <p className="text-xs md:text-sm text-gray-700/80">Curated from reviews, powered by AI.</p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            <SocialSellCard
              title="Wireless ANC Buds with 30h case"
              creatorHandle="@techwithsam"
              avatars={["https://i.pravatar.cc/24?img=1","https://i.pravatar.cc/24?img=2","https://i.pravatar.cc/24?img=3"]}
              videoPoster="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fcb15df6ec29e43109e4dd97765ab7200?format=webp&width=800"
              hideWatchButton
              bullets={["Clear calls; punchy bass","Comfortable for long sessions","Case scratches easily"]}
              rating={4.3}
              ratingCount={1287}
              updatedAgo="2h ago"
              price={59.99}
              originalPrice={79.99}
              discountPercent={25}
              couponCode="SAVE10"
              likes={3200}
              boughtIn24h={214}
              sources={[{ title: "Top review", url: "#", snippet: "Great sound for the price; mic is decent indoors." }]}
            />
            <SocialSellCard
              title="Portable blender 500ml"
              creatorHandle="@homechef.ai"
              avatars={["https://i.pravatar.cc/24?img=4","https://i.pravatar.cc/24?img=5"]}
              videoPoster="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Feeb98ccbd77a4083bafb59d5cadd70e0?format=webp&width=800&cb=2"
              bullets={["Quick smoothies","USB-C charge","Blade not for nuts"]}
              rating={4.1}
              ratingCount={642}
              updatedAgo="6h ago"
              price={24.99}
              originalPrice={34.99}
              couponCode="BLEND5"
              likes={980}
              boughtIn24h={56}
            />
            <SocialSellCard
              title="Ergo desk chair"
              creatorHandle="@workspace"
              avatars={["https://i.pravatar.cc/24?img=6"]}
              videoPoster="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2F6d635c57372c4ff892d479e37f9bd254?format=webp&width=800&cb=3"
              bullets={["Breathable mesh","Excellent lumbar","Armrests a bit wobbly"]}
              rating={4.5}
              ratingCount={312}
              updatedAgo="1d ago"
              price={129.0}
              originalPrice={159.0}
              discountPercent={19}
              likes={1650}
              boughtIn24h={33}
            />
            <SocialSellCard
              title="1080p Creator Webcam"
              creatorHandle="@remotework"
              avatars={["https://i.pravatar.cc/24?img=7"]}
              videoPoster="https://cdn.builder.io/api/v1/image/assets%2F1ba648a6a1694e9aa91b762fb1bf4499%2Fc1d75e916f494c2e86219078200c4a3f?format=webp&width=800&cb=4"
              bullets={["Sharp image","Auto exposure works","Colors slightly cool"]}
              rating={4.2}
              ratingCount={908}
              updatedAgo="3h ago"
              price={39.0}
              originalPrice={49.0}
              couponCode="CAM5"
              likes={720}
              boughtIn24h={41}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
