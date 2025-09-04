import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

function useCountdown(seconds: number) {
  const [remain, setRemain] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setRemain((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const hrs = Math.floor(remain / 3600);
  const mins = Math.floor((remain % 3600) / 60);
  const secs = remain % 60;
  return [hrs, mins, secs] as const;
}

export default function FlashSaleTimer() {
  const [h, m, s] = useCountdown(2 * 3600 + 15 * 60 + 12);
  return (
    <section className="py-8 bg-gradient-to-r from-rose-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Flash Sale</h2>
          <div className="flex items-center gap-2 text-lg font-mono">
            <span className="px-2 py-1 rounded bg-white border">
              {String(h).padStart(2, "0")}
            </span>
            :
            <span className="px-2 py-1 rounded bg-white border">
              {String(m).padStart(2, "0")}
            </span>
            :
            <span className="px-2 py-1 rounded bg-white border">
              {String(s).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-white border shadow"
            >
              <img
                className="w-full h-40 object-cover"
                src={`https://picsum.photos/seed/flash${i}/600/400`}
                alt="Flash Sale"
              />
              <div className="p-3">
                <div className="text-sm font-semibold mb-1">Hot Deal #{i}</div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-rose-600">
                    £{(19.99 + i).toFixed(2)}
                  </div>
                  <AddFlashItemButton index={i} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddFlashItemButton({ index }: { index: number }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const price = 19.99 + index;
  const handle = () => {
    addToCart(
      {
        id: `flash-${index}`,
        name: `Hot Deal #${index}`,
        price,
        image: `https://picsum.photos/seed/flash${index}/600/400`,
        vendor: "nearbuy",
        vendorName: "Nearbuy",
        category: "Flash",
      },
      1,
    );
    toast({
      title: "Added to cart",
      description: `Hot Deal #${index} added to cart.`,
    });
  };
  return (
    <Button
      size="sm"
      onClick={handle}
      className="bg-gradient-to-r from-[#0b3b8f] to-[#d32f2f] text-white"
    >
      Add to Cart
    </Button>
  );
}
