import React from "react";

import HeroCarousel from "@/components/HeroCarousel";
import FlashDealsCarousel from "@/components/home/FlashDealsCarousel";
import TopCategories from "@/components/home/TopCategories";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import DealsStrip from "@/components/home/DealsStrip";
import BrandsRow from "@/components/home/BrandsRow";
import CreatorPicks from "@/components/home/CreatorPicks";
import UserReviewsGrid from "@/components/home/UserReviewsGrid";
import FooterConnect from "@/components/home/FooterConnect";
import SocialSellSection from "@/components/home/SocialSellSection";
import ExploreCurated from "@/components/home/ExploreCurated";
import WowFlashBanner from "@/components/home/WowFlashBanner";


export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementStrip />
      <HeroCarousel />
      <FlashDealsCarousel />
      <TopCategories />
      <ExploreCurated />
      <WowFlashBanner />
      <SocialSellSection />
      <CategoryHighlights />
      <DealsStrip />
      <BrandsRow />
      <CreatorPicks />
      <UserReviewsGrid />
      <FooterConnect />
    </div>
  );
}
