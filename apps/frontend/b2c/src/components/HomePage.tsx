// import { useState } from "react";
// import { HeroSection } from "./HeroSection";
// import { DealsSection } from "./DealsSection";
// import { FeaturesSection } from "./FeaturesSection";
// import { PopularDestinationsSection } from "./PopularDestinationsSection";
// import { PartnerCarousel } from "./PartnerCarousel";
// import { FlightResults } from "./FlightResults";
// import { LoadingAnimation } from "./LoadingAnimation";
// import { CheckoutPage } from "./CheckoutPage";

// interface HomePageProps {
//   isSignedIn?: boolean;
//   onNavigate?: (page: string, tab?: string) => void;
//   activeTab?: string;
// }

// export function HomePage({ isSignedIn = false, onNavigate, activeTab }: HomePageProps) {
//   const [searchResults, setSearchResults] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFlight, setSelectedFlight] = useState<any>(null);
//   const [showCheckout, setShowCheckout] = useState(false);

//   const handleSearch = (params: any) => {
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       setSearchResults(params);
//     }, 2000);
//   };

//   const handleCloseResults = () => {
//     setSearchResults(null);
//     setSelectedFlight(null);
//     setShowCheckout(false);
//   };

//   const handleSelectFlight = (flight: any) => {
//     setSelectedFlight(flight);
//     setShowCheckout(true);
//   };

//   const handleBackToResults = () => {
//     setShowCheckout(false);
//   };

//   const handleCheckoutComplete = () => {
//     // Navigate to My Trips page after successful booking
//     if (onNavigate) {
//       onNavigate("trips");
//     } else {
//       // Fallback: go back to home
//       setSearchResults(null);
//       setSelectedFlight(null);
//       setShowCheckout(false);
//     }
//   };

//   const handleSignIn = () => {
//     if (onNavigate) {
//       onNavigate("signin");
//     }
//   };

//   if (isLoading) {
//     return <LoadingAnimation message="Finding the best flights for you..." />;
//   }

//   if (showCheckout && selectedFlight && searchResults) {
//     return (
//       <CheckoutPage
//         flight={selectedFlight}
//         searchParams={searchResults}
//         onBack={handleBackToResults}
//         onComplete={handleCheckoutComplete}
//         isSignedIn={isSignedIn}
//         onSignIn={handleSignIn}
//       />
//     );
//   }

//   if (searchResults) {
//     return (
//       <FlightResults
//         searchParams={searchResults}
//         onClose={handleCloseResults}
//         onSelectFlight={handleSelectFlight}
//       />
//     );
//   }

//   return (
//     <>
//       <HeroSection onSearch={handleSearch} activeTab={activeTab} />
//       <PopularDestinationsSection />
//       <DealsSection onNavigate={(page) => onNavigate?.(page)} />
//       <PartnerCarousel />
//       <FeaturesSection />
//     </>
//   );
// }
