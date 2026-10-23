import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import HomePressMarquee from "@/components/sections/HomePressMarquee";
import HomeTextMarquee from "@/components/sections/HomeTextMarquee";
import ImgText from "@/components/sections/ImgText";
import ProductSlider from "@/components/sections/ProductSlider";
import WorkoutSection from "@/components/sections/WorkoutSection";
import TopPicksSection from "@/components/sections/TopPicksSection";
import VideosFeeds from "@/components/sections/VideosFeeds";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9ebed]">
      <HomeHeroSection />
      <WorkoutSection />
      <TopPicksSection />
      <HomePressMarquee />

      {/* Featured Products Section */}
      <FeaturedProducts limit={4} />
      <HomeTextMarquee />
      <VideosFeeds />
      <ProductSlider />
      <ImgText />
    </main>
  );
}
