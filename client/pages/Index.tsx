import React from "react";

import NeutralHeroBanner from "@/components/home/NeutralHeroBanner";
import FlashDealsCarousel from "@/components/home/FlashDealsCarousel";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import TopCategories from "@/components/home/TopCategories";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import DealsStrip from "@/components/home/DealsStrip";
import BestsellerHighlights from "@/components/home/BestsellerHighlights";
import NewArrivalsMasonry from "@/components/home/NewArrivalsMasonry";
import BrandsRow from "@/components/home/BrandsRow";
import CreatorPicks from "@/components/home/CreatorPicks";
import UserReviewsGrid from "@/components/home/UserReviewsGrid";
import FooterConnect from "@/components/home/FooterConnect";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NeutralHeroBanner />
      <FlashDealsCarousel />
      <TrendingCarousel />
      <TopCategories />
      <CategoryHighlights />
      <DealsStrip />
      <BestsellerHighlights />
      <NewArrivalsMasonry />
      <BrandsRow />
      <CreatorPicks />
      <UserReviewsGrid />
      <FooterConnect />
    </div>
  );
}
