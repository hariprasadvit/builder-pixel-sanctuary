import React from "react";
import SocialSellCard from "@/components/home/SocialSellCard";

export default function SocialSellSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow bg-white">
          <div className="bg-gradient-to-r from-[#e3f2fd] to-[#e1f5fe] p-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Social Sell • Review Push</h3>
            <p className="text-xs md:text-sm text-gray-700/80">Curated from reviews, powered by AI.</p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            <SocialSellCard
              title="Wireless ANC Buds with 30h case"
              creatorHandle="@techwithsam"
              avatars={["https://i.pravatar.cc/24?img=1","https://i.pravatar.cc/24?img=2","https://i.pravatar.cc/24?img=3"]}
              videoPoster="https://images.unsplash.com/photo-1606229365485-93a3b8e84cf3?q=80&w=1200&auto=format&fit=crop"
              videoSrc="https://cdn.coverr.co/videos/coverr-urban-snapshots-8241/1080p.mp4"
              bullets={["Clear calls; punchy bass","Comfortable for long sessions","Case scratches easily"]}
              rating={4.3}
              ratingCount={1287}
              updatedAgo="2h ago"
              price={59.99}
              originalPrice={79.99}
              discountPercent={25}
              couponCode="SAVE10"
              deliveryEta="Tomorrow 9AM"
              returnsBadge="7-day Returns"
              likes={3200}
              boughtIn24h={214}
              liveViewers={87}
              sources={[{ title: "Top review", url: "#", snippet: "Great sound for the price; mic is decent indoors." }]}
            />
            <SocialSellCard
              title="Portable blender 500ml"
              creatorHandle="@homechef.ai"
              avatars={["https://i.pravatar.cc/24?img=4","https://i.pravatar.cc/24?img=5"]}
              videoPoster="https://images.unsplash.com/photo-1572552633825-046b5072662b?q=80&w=1200&auto=format&fit=crop"
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
              videoPoster="https://images.unsplash.com/photo-1582582621959-48f9d9f6c2e1?q=80&w=1200&auto=format&fit=crop"
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
              videoPoster="https://images.unsplash.com/photo-1587825140400-9b06d0102f80?q=80&w=1200&auto=format&fit=crop"
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
