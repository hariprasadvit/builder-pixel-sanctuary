import React from "react";

import AnnouncementStrip from "@/components/home/AnnouncementStrip";
import HeroCarousel from "@/components/HeroCarousel";
import FlashDealsCarousel from "@/components/home/FlashDealsCarousel";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import TopCategories from "@/components/home/TopCategories";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import DealsStrip from "@/components/home/DealsStrip";
import BestsellerHighlights from "@/components/home/BestsellerHighlights";
import HomeFiveUps from "@/components/home/HomeFiveUps";
import BrandsRow from "@/components/home/BrandsRow";
import CreatorPicks from "@/components/home/CreatorPicks";
import UserReviewsGrid from "@/components/home/UserReviewsGrid";
import FooterConnect from "@/components/home/FooterConnect";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementStrip />
      <HeroCarousel />
      <FlashDealsCarousel />
      <TrendingCarousel />
      <TopCategories />
      <CategoryHighlights />
      <DealsStrip />
      <BestsellerHighlights />
      <HomeFiveUps />
      <BrandsRow />
      <CreatorPicks />
      <UserReviewsGrid />
      <FooterConnect />
    </div>
  );
}
