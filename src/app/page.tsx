import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ExploreByType from "@/components/home/ExploreByType";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NeighborhoodGuide from "@/components/home/NeighborhoodGuide";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LatestInsights from "@/components/home/LatestInsights";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedProperties />
      <ExploreByType />
      <WhyChooseUs />
      <NeighborhoodGuide />
      <TestimonialsSection />
      <LatestInsights />
      <CTABanner />
    </>
  );
}
