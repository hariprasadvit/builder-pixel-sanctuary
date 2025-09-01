import React from "react";

import HeroMegaBanner from "@/components/home/HeroMegaBanner";
import FlashDealsCarousel from "@/components/home/FlashDealsCarousel";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import CategoriesMegaGrid from "@/components/home/CategoriesMegaGrid";
import EditorialStorySection from "@/components/home/EditorialStorySection";
import DealsStrip from "@/components/home/DealsStrip";
import CreatorPicks from "@/components/home/CreatorPicks";
import BrandsCarousel from "@/components/home/BrandsCarousel";
import NewArrivalsMasonry from "@/components/home/NewArrivalsMasonry";
import BestsellerHighlights from "@/components/home/BestsellerHighlights";
import LookbookSpread from "@/components/home/LookbookSpread";
import SeasonalSaleBanner from "@/components/home/SeasonalSaleBanner";
import LifestyleExplore from "@/components/home/LifestyleExplore";
import RecommendedFeed from "@/components/home/RecommendedFeed";
import BrandsSpotlightCarousel from "@/components/home/BrandsSpotlightCarousel";
import UserReviewsGrid from "@/components/home/UserReviewsGrid";
import FooterConnect from "@/components/home/FooterConnect";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroMegaBanner />
      <FlashDealsCarousel />
      <TrendingCarousel />
      <CategoriesMegaGrid />
      <EditorialStorySection />
      <DealsStrip />
      <CreatorPicks />
      <BrandsCarousel />
      <NewArrivalsMasonry />
      <BestsellerHighlights />
      <LookbookSpread />
      <SeasonalSaleBanner />
      <LifestyleExplore />
      <RecommendedFeed />
      <BrandsSpotlightCarousel />
      <UserReviewsGrid />
      <FooterConnect />
    </div>
  );
}
