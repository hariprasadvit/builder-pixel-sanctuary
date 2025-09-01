import React from "react";
import FiveUpSection from "@/components/home/FiveUpSection";

export default function HomeFiveUps() {
  return (
    <>
      <FiveUpSection title="New Arrivals" icon="🆕" badge="Just In" />
      <FiveUpSection title="Clothing" icon="👗" badge="Exclusive" />
      <FiveUpSection title="Electronics" icon="🔌" badge="Hot Deal" />
    </>
  );
}
