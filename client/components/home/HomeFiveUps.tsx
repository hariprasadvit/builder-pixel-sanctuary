import React from "react";
import FiveUpSection from "@/components/home/FiveUpSection";

export default function HomeFiveUps() {
  return (
    <>
      <FiveUpSection title="New Arrivals" icon="🆕" badge="Just In" gradientClass="bg-gradient-to-r from-[#e3f2fd] to-[#ede7f6]" />
      <FiveUpSection title="Clothing" icon="👗" badge="Exclusive" gradientClass="bg-gradient-to-r from-[#fde7e7] to-[#fce4ec]" />
      <FiveUpSection title="Electronics" icon="🔌" badge="Hot Deal" gradientClass="bg-gradient-to-r from-[#e3f2fd] to-[#e1f5fe]" />
    </>
  );
}
