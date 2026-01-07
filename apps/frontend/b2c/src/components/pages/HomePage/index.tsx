"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "./HeroSection";
import DealsSection from "./DealsSection";
import FeaturesSection from "./FeaturesSection";
import PartnerCarousel from "./PartnerCarousel";
import PopularDestinationsSection from "./PopularDestinationsSection";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import {
  useFlightsStore,
  useHotelsStore,
  useCarsStore,
  usePackagesStore,
  useAttractionsStore,
  useAuthStore,
} from "@/stores";

// Import result components from SearchPage
import FlightResults from "../SearchPage/FlightResults";
import HotelResults from "../SearchPage/HotelResults";
import CarResults from "../SearchPage/CarResults";
import PackageResults from "../SearchPage/PackageResults";
import AttractionResults from "../SearchPage/AttractionResults";

interface HomePageProps {
  isSignedIn?: boolean;
  onNavigate?: (page: string, tab?: string) => void;
  activeTab?: string;
}

type BookingType = "flight" | "hotel" | "car" | "package" | "attraction";

export function HomePage({
  isSignedIn = false,
  onNavigate,
  activeTab,
}: HomePageProps) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>("flight");

  // Get store states
  const flightsStore = useFlightsStore();
  const hotelsStore = useHotelsStore();
  const carsStore = useCarsStore();
  const packagesStore = usePackagesStore();
  const attractionsStore = useAttractionsStore();
  const authStore = useAuthStore();

  // Check if user is actually signed in from store
  const actualIsSignedIn = isSignedIn || authStore.isAuthenticated;

  const loadingMessages: Record<BookingType, string> = {
    flight: "Finding the best flights for you...",
    hotel: "Searching for amazing hotels...",
    car: "Finding the perfect rental car...",
    package: "Building your dream vacation package...",
    attraction: "Discovering exciting experiences...",
  };

  const handleSearch = async (params: any) => {
    setIsLoading(true);
    const searchType = (params.type || "flight") as BookingType;
    setBookingType(searchType);

    try {
      // Use zustand stores for actual searching
      switch (searchType) {
        case "flight":
          await flightsStore.searchFlights(params);
          break;
        case "hotel":
          await hotelsStore.searchHotels(params);
          break;
        case "car":
          await carsStore.searchCars(params);
          break;
        case "package":
          await packagesStore.searchPackages(params);
          break;
        case "attraction":
          await attractionsStore.searchAttractions(params);
          break;
      }

      setSearchResults(params);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
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
      // Use Next.js routing as fallback
      router.push("/bookings");
    }
  };

  const handleSignIn = () => {
    if (onNavigate) {
      onNavigate("signin");
    } else {
      router.push("/signin");
    }
  };

  if (isLoading) {
    return <LoadingAnimation message={loadingMessages[bookingType]} />;
  }

  if (showCheckout && selectedBooking && searchResults) {
    // Navigate to checkout page with selected booking
    // Store the selected booking in sessionStorage for the checkout page to access
    sessionStorage.setItem(
      "selectedBooking",
      JSON.stringify({
        booking: selectedBooking,
        bookingType,
        searchParams: searchResults,
      })
    );

    router.push("/checkout");
    return null;
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
            searchParams={{
              pickupLocation:
                searchResults.pickUpLocation || searchResults.from,
              dropoffLocation:
                searchResults.dropOffLocation || searchResults.to,
              pickupDate: searchResults.pickUpDate || searchResults.departDate,
              pickupTime: searchResults.pickUpTime || "09:00",
              returnDate: searchResults.dropOffDate || searchResults.returnDate,
              returnTime: searchResults.dropOffTime || "18:00",
              serviceType: searchResults.serviceType || "rental",
            }}
            onClose={handleCloseResults}
            onSelectCar={handleSelectBooking}
          />
        );
      case "package":
        return (
          <PackageResults
            searchParams={{
              destination: searchResults.destination,
              departDate: searchResults.departDate,
              returnDate: searchResults.returnDate,
              travelers: searchResults.travelers || searchResults.passengers,
              packageType: searchResults.packageType || "standard",
              budget: {
                min: searchResults.budgetMin || 0,
                max: searchResults.budgetMax || 10000,
              },
              includes: searchResults.inclusions,
            }}
            onClose={handleCloseResults}
            onSelectPackage={handleSelectBooking}
          />
        );
      case "attraction":
        return (
          <AttractionResults
            searchParams={{
              destination: searchResults.destination,
              date: searchResults.date,
              category: searchResults.attractionTypes?.[0] || "all",
            }}
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
      <DealsSection onNavigate={onNavigate} />
      <PartnerCarousel />
      <FeaturesSection />
    </>
  );
}
