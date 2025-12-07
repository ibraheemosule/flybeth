"use client";

import { useState } from "react";
// import { HeroSection } from "../../HeroSection";
// import { DealsSection } from "../../DealsSection";
import { FeaturesSection } from "../../FeaturesSection";
import { PopularDestinationsSection } from "../../PopularDestinationsSection";
import { PartnerCarousel } from "../../PartnerCarousel";
// import { FlightResults } from "../../FlightResults";
import { LoadingAnimation } from "../../LoadingAnimation";
// import { CheckoutPage } from "../../CheckoutPage";
import { useRouter } from "next/navigation";
import { SearchPage } from "../SearchPage";
import { HeroSection } from "./HeroSection";
import DealsSection from "./DealsSection";

export function HomePage() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  //   const handleNavigate = (page: string, tab?: string) => {
  //     if (page === "home") {
  //       router.push("/");
  //     } else {
  //       router.push(`/${page}` as any);
  //     }
  //   };

  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleSearch = (params: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSearchResults(params);
    }, 2000);
  };

  const handleCloseResults = () => {
    setSearchResults(null);
    setSelectedFlight(null);
    setShowCheckout(false);
  };

  const handleSelectFlight = (flight: any) => {
    setSelectedFlight(flight);
    setShowCheckout(true);
  };

  const handleBackToResults = () => {
    setShowCheckout(false);
  };

  //   if (isLoading) {
  //     return <LoadingAnimation message="Finding the best flights for you..." />;
  //   }

  //   if (showCheckout && selectedFlight && searchResults) {
  //     return (
  //       <CheckoutPage
  //         flight={selectedFlight}
  //         searchParams={searchResults}
  //         onBack={handleBackToResults}
  //         onComplete={() => router.push("/trips")}
  //         isSignedIn={isSignedIn}
  //         onSignIn={() => router.push("/signin")}
  //       />
  //     );
  //   }

  //   if (searchResults) {
  //     return (
  //       <SearchPage
  //         searchParams={searchResults}
  //         onClose={handleCloseResults}
  //         onSelectFlight={handleSelectFlight}
  //       />
  //     );
  //   }

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <PopularDestinationsSection />
      <DealsSection />
      <PartnerCarousel />
      <FeaturesSection />
    </>
  );
}
