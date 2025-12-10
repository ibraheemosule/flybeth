import { HeroSection } from "./HeroSection";
import DealsSection from "./DealsSection";
import FeaturesSection from "./FeaturesSection";
import PartnerCarousel from "./PartnerCarousel";
import PopularDestinationsSection from "./PopularDestinationsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularDestinationsSection />
      <DealsSection />
      <PartnerCarousel />
      <FeaturesSection />
    </>
  );
}
