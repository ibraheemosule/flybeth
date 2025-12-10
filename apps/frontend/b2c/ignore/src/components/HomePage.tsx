import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { DealsSection } from "./DealsSection";
import { FeaturesSection } from "./FeaturesSection";
import { PopularDestinationsSection } from "./PopularDestinationsSection";
import { PartnerCarousel } from "./PartnerCarousel";
import { FlightResults } from "./FlightResults";
import { HotelResults } from "./HotelResults";
import { CarResults } from "./CarResults";
import { PackageResults } from "./PackageResults";
import { AttractionResults } from "./AttractionResults";
import { LoadingAnimation } from "./LoadingAnimation";
import { CheckoutPage } from "./CheckoutPage";
import { UniversalCheckout } from "./UniversalCheckout";

interface HomePageProps {
  isSignedIn?: boolean;
  onNavigate?: (page: string, tab?: string) => void;
  activeTab?: string;
}

export function HomePage({ isSignedIn = false, onNavigate, activeTab }: HomePageProps) {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [bookingType, setBookingType] = useState<"flight" | "hotel" | "car" | "package" | "attraction">("flight");

  const handleSearch = (params: any) => {
    setIsLoading(true);
    const bookingType = params.type || "flight";
    setBookingType(bookingType);
    
    // Simulate API call with different loading messages
    const loadingMessages: Record<string, string> = {
      flight: "Finding the best flights for you...",
      hotel: "Searching for amazing hotels...",
      car: "Finding the perfect rental car...",
      package: "Building your dream vacation package...",
      attraction: "Discovering exciting experiences...",
    };
    
    setTimeout(() => {
      setIsLoading(false);
      setSearchResults(params);
    }, 2000);
  };

  const handleCloseResults = () => {
    setSearchResults(null);
    setSelectedBooking(null);
    setShowCheckout(false);
  };

  const handleSelectBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowCheckout(true);
  };

  const handleBackToResults = () => {
    setShowCheckout(false);
  };

  const handleCheckoutComplete = () => {
    // Navigate to My Trips page after successful booking
    if (onNavigate) {
      onNavigate("trips");
    } else {
      // Fallback: go back to home
      setSearchResults(null);
      setSelectedBooking(null);
      setShowCheckout(false);
    }
  };

  const handleSignIn = () => {
    if (onNavigate) {
      onNavigate("signin");
    }
  };

  const loadingMessages: Record<string, string> = {
    flight: "Finding the best flights for you...",
    hotel: "Searching for amazing hotels...",
    car: "Finding the perfect rental car...",
    package: "Building your dream vacation package...",
    attraction: "Discovering exciting experiences...",
  };

  if (isLoading) {
    return <LoadingAnimation message={loadingMessages[bookingType]} />;
  }

  if (showCheckout && selectedBooking && searchResults) {
    // Use original CheckoutPage for flights (backward compatibility)
    if (bookingType === "flight") {
      return (
        <CheckoutPage
          flight={selectedBooking}
          searchParams={searchResults}
          onBack={handleBackToResults}
          onComplete={handleCheckoutComplete}
          isSignedIn={isSignedIn}
          onSignIn={handleSignIn}
        />
      );
    }
    
    // Use UniversalCheckout for other booking types
    return (
      <UniversalCheckout
        booking={selectedBooking}
        bookingType={bookingType}
        onBack={handleBackToResults}
        onComplete={handleCheckoutComplete}
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
      />
    );
  }

  if (searchResults) {
    // Render appropriate results page based on booking type
    switch (bookingType) {
      case "flight":
        return (
          <FlightResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectFlight={handleSelectBooking}
          />
        );
      case "hotel":
        return (
          <HotelResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectHotel={handleSelectBooking}
          />
        );
      case "car":
        return (
          <CarResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectCar={handleSelectBooking}
          />
        );
      case "package":
        return (
          <PackageResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectPackage={handleSelectBooking}
          />
        );
      case "attraction":
        return (
          <AttractionResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectAttraction={handleSelectBooking}
          />
        );
      default:
        return (
          <FlightResults
            searchParams={searchResults}
            onClose={handleCloseResults}
            onSelectFlight={handleSelectBooking}
          />
        );
    }
  }

  return (
    <>
      <HeroSection onSearch={handleSearch} activeTab={activeTab} />
      <PopularDestinationsSection />
      <DealsSection onNavigate={(page) => onNavigate?.(page)} />
      <PartnerCarousel />
      <FeaturesSection />
    </>
  );
}