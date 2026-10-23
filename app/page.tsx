import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import HomePressMarquee from "@/components/sections/HomePressMarquee";
import HomeTextMarquee from "@/components/sections/HomeTextMarquee";
import ImgText from "@/components/sections/ImgText";
import ProductSlider from "@/components/sections/ProductSlider";
import VideosFeeds from "@/components/sections/VideosFeeds";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HomeHeroSection />
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
