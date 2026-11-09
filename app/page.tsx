import HomeHeroSection from "@/components/sections/HomeHeroSection";
import WorkoutSection from "@/components/sections/WorkoutSection";
import TopPicksSection from "@/components/sections/TopPicksSection";
import LatestWearSection from "@/components/sections/LatestWearSection";
import ProductGallerySection from "@/components/sections/ProductGallerySection";
import LevelUpSection from "@/components/sections/LevelUpSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9ebed]">
      <HomeHeroSection />
      <WorkoutSection />
      <TopPicksSection />
      <LatestWearSection />
      <ProductGallerySection />
      <SkillsSection />
      <TestimonialsSection />
      <FaqSection />
      <LevelUpSection />
    </main>
  );
}
