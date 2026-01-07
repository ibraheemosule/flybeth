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
  Flight,
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

  // Determine which search type was performed
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

  // Handlers for each search type
  const onSelectFlight = (flight: Flight) => {
    useFlightsStore.setState({ selectedFlight: flight });
    router.push("/checkout");
  };

  const onSelectHotel = (hotel: any) => {
    useHotelsStore.setState({ selectedHotel: hotel });
    router.push("/checkout");
  };

  const onSelectCar = (car: any) => {
    useCarsStore.setState({ selectedCar: car });
    router.push("/checkout");
  };

  const onSelectPackage = (pkg: any) => {
    usePackagesStore.setState({ selectedPackage: pkg });
    router.push("/checkout");
  };

  const onSelectAttraction = (attraction: any) => {
    useAttractionsStore.setState({ selectedAttraction: attraction });
    router.push("/checkout");
  };

  // Render appropriate results component based on search type
  const renderResults = () => {
    switch (searchType) {
      case "flights":
        if (!flightsStore.searchParams) return null;
        return (
          <FlightResults
          // searchParams={flightsStore.searchParams}
          // onClose={returnHome}
          // onSelectFlight={onSelectFlight}
          />
        );

      case "hotels":
        if (!hotelsStore.searchParams) return null;
        return (
          <HotelResults
            searchParams={hotelsStore.searchParams}
            onClose={returnHome}
            onSelectHotel={onSelectHotel}
          />
        );

      case "cars":
        if (!carsStore.searchParams) return null;
        return (
          <CarResults
            searchParams={{
              pickupLocation: carsStore.searchParams.pickUpLocation,
              dropoffLocation:
                carsStore.searchParams.dropOffLocation ||
                carsStore.searchParams.pickUpLocation,
              pickupDate: carsStore.searchParams.pickUpDate,
              pickupTime: carsStore.searchParams.pickUpTime || "09:00",
              returnDate:
                carsStore.searchParams.dropOffDate ||
                carsStore.searchParams.pickUpDate,
              returnTime: carsStore.searchParams.dropOffTime || "18:00",
              serviceType: carsStore.searchParams.serviceType,
            }}
            onClose={returnHome}
            onSelectCar={onSelectCar}
          />
        );

      case "packages":
        if (!packagesStore.searchParams) return null;
        return (
          <PackageResults
            searchParams={{
              destination: packagesStore.searchParams.destination,
              departDate: packagesStore.searchParams.departDate,
              returnDate: packagesStore.searchParams.returnDate,
              travelers: packagesStore.searchParams.travelers,
              packageType: packagesStore.searchParams.packageType || "standard",
              budget: {
                min: packagesStore.searchParams.budgetMin || 0,
                max: packagesStore.searchParams.budgetMax || 10000,
              },
              includes: packagesStore.searchParams.inclusions,
            }}
            onClose={returnHome}
            onSelectPackage={onSelectPackage}
          />
        );

      case "attractions":
        if (!attractionsStore.searchParams) return null;
        return (
          <AttractionResults
            searchParams={{
              destination: attractionsStore.searchParams.destination,
              date: attractionsStore.searchParams.date,
              category:
                attractionsStore.searchParams.attractionTypes?.[0] || "all",
            }}
            onClose={returnHome}
            onSelectAttraction={onSelectAttraction}
          />
        );

      default:
        return null;
    }
  };

  return renderResults();
}
