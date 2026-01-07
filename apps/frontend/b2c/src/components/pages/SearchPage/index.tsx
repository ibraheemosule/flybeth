"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import {
  useFlightsStore,
  useHotelsStore,
  useCarsStore,
  usePackagesStore,
  useAttractionsStore,
} from "@/stores";

// Import result components
import HotelResults from "./HotelResults";
import CarResults from "./CarResults";
import PackageResults from "./PackageResults";
import AttractionResults from "./AttractionResults";
import FlightResults from "./FlightResults";

type SearchType =
  | "flights"
  | "hotels"
  | "cars"
  | "packages"
  | "attractions"
  | null;

export default function SearchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState<SearchType>(null);

  // Get store data
  const flightsStore = useFlightsStore();
  const hotelsStore = useHotelsStore();
  const carsStore = useCarsStore();
  const packagesStore = usePackagesStore();
  const attractionsStore = useAttractionsStore();

  const returnHome = () => router.push("/");
  const determineSearchType = (): SearchType => {
    if (flightsStore.searchParams) return "flights";
    if (hotelsStore.searchParams) return "hotels";
    if (carsStore.searchParams) return "cars";
    if (packagesStore.searchParams) return "packages";
    if (attractionsStore.searchParams) return "attractions";

    return null;
  };

  useEffect(() => {
    const type = determineSearchType();

    if (!type) {
      returnHome();
      return;
    }

    setSearchType(type);

    // Simulate loading delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Loading states
  if (isLoading) {
    const messages = {
      flights: "Finding the best flights for you...",
      hotels: "Searching for perfect hotels...",
      cars: "Finding available vehicles...",
      packages: "Discovering amazing packages...",
      attractions: "Finding top attractions...",
    };

    return <LoadingAnimation message={messages[searchType || "flights"]} />;
  }

  if (!searchType) {
    return <LoadingAnimation message="Loading..." />;
  }

  // Render appropriate results component based on search type
  const renderResults = () => {
    switch (searchType) {
      case "flights":
        return <FlightResults />;

      case "hotels":
        return <HotelResults />;

      case "cars":
        return <CarResults />;

      case "packages":
        return <PackageResults />;

      case "attractions":
        return <AttractionResults />;

      default:
        return null;
    }
  };

  return renderResults();
}
