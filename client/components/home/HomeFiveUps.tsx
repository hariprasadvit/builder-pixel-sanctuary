import React from "react";
import FiveUpSection from "@/components/home/FiveUpSection";

export default function HomeFiveUps() {
  return (
    <>
      <FiveUpSection title="New Arrivals" icon="🆕" badge="Just In" gradientClass="bg-gradient-to-r from-[#0b3b8f] to-[#6a1b9a]" />
      <FiveUpSection title="Clothing" icon="👗" badge="Exclusive" gradientClass="bg-gradient-to-r from-[#d32f2f] to-[#f06292]" />
      <FiveUpSection title="Electronics" icon="🔌" badge="Hot Deal" gradientClass="bg-gradient-to-r from-[#0b3b8f] to-[#1976d2]" />
    </>
  );
}
