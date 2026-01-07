"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useFlightsStore } from "@/stores";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Plane,
  Clock,
  Briefcase,
  Wifi,
  Coffee,
  ArrowRight,
  MapPin,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { mockFlights } from "./utilsSearchPage";
import { Flight } from "@/stores";
import { LoadingAnimation } from "@/components/LoadingAnimation";

interface FlightStop {
  airport: string;
  city: string;
  layover: string;
}

interface FlightLeg {
  time: string;
  airport: string;
}

interface FlightDetails {
  id: number;
  airline: string;
  price: number;
  departure: FlightLeg;
  arrival: FlightLeg;
  duration: string;
  stops: FlightStop[];
  class: string;
  amenities: string[];
  baggage: string;
  date?: string;
}

interface RoundTripFlight {
  id: number;
  outbound: FlightDetails;
  return: FlightDetails;
  totalPrice: number;
}

interface MultiCityFlight {
  id: number;
  legs: FlightDetails[];
  totalPrice: number;
}

interface FlightResultsProps {
  // No props needed - component uses store directly
}

const generateFlights = (
  from: string,
  to: string,
  date: string
): FlightDetails[] => [
  {
    id: 1,
    airline: "Flybeth Airways",
    price: 459,
    departure: { time: "08:30 AM", airport: from },
    arrival: { time: "11:45 AM", airport: to },
    duration: "5h 15m",
    stops: [] as FlightStop[],
    class: "Economy",
    amenities: ["wifi", "meals", "entertainment"],
    baggage: "2 checked bags included",
    date: date,
  },
  {
    id: 2,
    airline: "Sky Connect",
    price: 389,
    departure: { time: "02:15 PM", airport: from },
    arrival: { time: "05:40 PM", airport: to },
    duration: "5h 25m",
    stops: [] as FlightStop[],
    class: "Economy",
    amenities: ["wifi", "entertainment"],
    baggage: "1 checked bag included",
    date: date,
  },
  {
    id: 3,
    airline: "Global Express",
    price: 329,
    departure: { time: "06:00 AM", airport: from },
    arrival: { time: "12:30 PM", airport: to },
    duration: "6h 30m",
    stops: [{ airport: "ORD", city: "Chicago", layover: "1h 15m" }],
    class: "Economy",
    amenities: ["entertainment"],
    baggage: "1 checked bag included",
    date: date,
  },
  {
    id: 4,
    airline: "Premium Air",
    price: 899,
    departure: { time: "10:00 AM", airport: from },
    arrival: { time: "01:20 PM", airport: to },
    duration: "5h 20m",
    stops: [] as FlightStop[],
    class: "Business",
    amenities: ["wifi", "meals", "entertainment", "lounge"],
    baggage: "3 checked bags included",
    date: date,
  },
];

const generateRoundTripFlights = (
  from: string,
  to: string,
  departDate: string,
  returnDate: string
): RoundTripFlight[] => {
  const outboundFlights = generateFlights(from, to, departDate);
  const returnFlights = generateFlights(to, from, returnDate);

  const roundTrips: RoundTripFlight[] = [];
  let idCounter = 1;

  outboundFlights.slice(0, 4).forEach((outbound, outIdx) => {
    const returnFlight = returnFlights[outIdx % returnFlights.length];
    roundTrips.push({
      id: idCounter++,
      outbound,
      return: returnFlight,
      totalPrice: outbound.price + returnFlight.price,
    });
  });

  return roundTrips;
};

const generateMultiCityFlights = (): MultiCityFlight[] => {
  const multiCityRoutes = [
    {
      legs: [
        generateFlights("JFK", "LAX", "Dec 20, 2025")[0],
        generateFlights("LAX", "NRT", "Dec 24, 2025")[1],
        generateFlights("NRT", "JFK", "Dec 30, 2025")[2],
      ],
    },
    {
      legs: [
        generateFlights("JFK", "LHR", "Dec 20, 2025")[1],
        generateFlights("LHR", "CDG", "Dec 24, 2025")[0],
        generateFlights("CDG", "JFK", "Dec 30, 2025")[3],
      ],
    },
  ];

  return multiCityRoutes.map((route, idx) => ({
    id: idx + 1,
    legs: route.legs,
    totalPrice: route.legs.reduce((sum, leg) => sum + leg.price, 0),
  }));
};

const FlightLegDisplay = ({
  flight,
  label,
  from,
  to,
}: {
  flight: FlightDetails;
  label: string;
  from: string;
  to: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
      >
        {label}
      </Badge>
      <span className="text-sm text-muted-foreground">{flight.airline}</span>
    </div>

    <div className="flex items-center gap-4">
      <div className="text-center">
        <div className="text-xl">{flight.departure.time}</div>
        <p className="text-muted-foreground text-sm">
          {flight.departure.airport}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="text-xs text-muted-foreground mb-1">
          {flight.duration}
        </div>
        <div className="w-full relative">
          <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
          <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-accent rotate-90" />
          {flight.stops.length > 0 && (
            <>
              {flight.stops.map((stop, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{
                    left: `${((idx + 1) / (flight.stops.length + 1)) * 100}%`,
                  }}
                >
                  <div className="relative group">
                    <div className="h-2 w-2 rounded-full bg-accent border-2 border-white shadow-md -translate-x-1/2" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {stop.city} ({stop.airport})
                      <div className="text-[10px] text-gray-300">
                        {stop.layover} layover
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {flight.stops.length === 0 ? (
            "Non-stop"
          ) : (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {flight.stops.length}{" "}
              {flight.stops.length === 1 ? "stop" : "stops"}
            </span>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="text-xl">{flight.arrival.time}</div>
        <p className="text-muted-foreground text-sm">
          {flight.arrival.airport}
        </p>
      </div>
    </div>
  </div>
);

const MultiCityFlightCard = ({
  multiCity,
  index,
  onSelectFlight,
}: {
  multiCity: MultiCityFlight;
  index: number;
  onSelectFlight: (flight: any) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLegsToShow = 3;
  const hasMoreLegs = multiCity.legs.length > maxLegsToShow;
  const totalStops = multiCity.legs.reduce(
    (sum, leg) => sum + leg.stops.length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/50 bg-white/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                  >
                    {multiCity.legs[0].class}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20"
                  >
                    {multiCity.legs.length} Flight Legs
                  </Badge>
                  {totalStops > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {totalStops} total {totalStops === 1 ? "stop" : "stops"}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div className="flex items-center gap-1 text-sm overflow-x-auto">
                  {multiCity.legs.map((leg, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 shrink-0"
                    >
                      <span className="font-medium">
                        {leg.departure.airport}
                      </span>
                      {idx < multiCity.legs.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      )}
                      {idx === multiCity.legs.length - 1 && (
                        <>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">
                            {leg.arrival.airport}
                          </span>
                        </>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {(isExpanded
                  ? multiCity.legs
                  : multiCity.legs.slice(0, maxLegsToShow)
                ).map((leg, legIndex) => (
                  <div key={legIndex}>
                    <FlightLegDisplay
                      flight={leg}
                      label={`Leg ${legIndex + 1} • ${leg.date}`}
                      from={leg.departure.airport}
                      to={leg.arrival.airport}
                    />
                    {legIndex <
                      (isExpanded
                        ? multiCity.legs.length - 1
                        : Math.min(maxLegsToShow, multiCity.legs.length) -
                          1) && (
                      <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-dashed border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-white px-3 text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Layover in {leg.arrival.airport}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {hasMoreLegs && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="bg-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 border border-gray-200 hover:border-primary/30 px-6 py-5 text-sm shadow-sm"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show {multiCity.legs.length - maxLegsToShow} More{" "}
                          {multiCity.legs.length - maxLegsToShow === 1
                            ? "Leg"
                            : "Legs"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {isExpanded && (
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground pt-2 border-t border-gray-100">
                  {multiCity.legs[0].amenities.includes("wifi") && (
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-accent" />
                      <span>WiFi</span>
                    </div>
                  )}
                  {multiCity.legs[0].amenities.includes("meals") && (
                    <div className="flex items-center gap-1">
                      <Coffee className="h-4 w-4 text-accent" />
                      <span>Meals</span>
                    </div>
                  )}
                  {multiCity.legs[0].amenities.includes("entertainment") && (
                    <div className="flex items-center gap-1">
                      <span>📺 Entertainment</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-accent" />
                    <span>{multiCity.legs[0].baggage}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 p-4 lg:p-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 lg:bg-none">
              <div className="text-center lg:text-right">
                <div className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${multiCity.totalPrice}
                </div>
                <p className="text-sm text-muted-foreground">per person</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {multiCity.legs.length} flights total
                </p>
              </div>
              <Button
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
                onClick={() =>
                  onSelectFlight({
                    ...multiCity.legs[0],
                    multiCity: true,
                    legs: multiCity.legs,
                    price: multiCity.totalPrice,
                  })
                }
              >
                Select Flight
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default function FlightResults() {
  const router = useRouter();
  const flightsStore = useFlightsStore();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = flightsStore.searchParams;

  const isRoundTrip =
    searchParams?.tripType === "roundtrip" || !!searchParams?.return;
  const isMultiCity = searchParams?.tripType === "multicity";

  const onClose = () => router.push("/");
  const onSelectFlight = (flight: any) => {
    useFlightsStore.setState({ selectedFlight: flight });
    router.push("/checkout");
  };

  const oneWayFlights =
    !isRoundTrip && !isMultiCity
      ? generateFlights(
          searchParams?.from || "JFK",
          searchParams?.to || "LAX",
          searchParams?.departure || "Dec 20, 2025"
        )
      : [];
  const roundTripFlights =
    isRoundTrip && !isMultiCity
      ? generateRoundTripFlights(
          searchParams?.from || "JFK",
          searchParams?.to || "LAX",
          searchParams?.departure || "Dec 20, 2025",
          searchParams?.return || "Dec 27, 2025"
        )
      : [];
  const multiCityFlights = isMultiCity ? generateMultiCityFlights() : [];

  const handleSelectFlight = (flight: any) => {
    if (onSelectFlight) {
      onSelectFlight(flight);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!searchParams) {
      handleClose();
      return;
    }
    // Simulate loading delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (isLoading || !searchParams) {
    return <LoadingAnimation message="Finding the best flights for you..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="mb-2">Available Flights</h2>
              <p className="text-muted-foreground">
                {isMultiCity
                  ? "Multi-city Journey"
                  : isRoundTrip
                  ? `${searchParams?.from} ⇄ ${searchParams?.to} • ${searchParams?.departure} - ${searchParams?.return}`
                  : `${searchParams?.from} → ${searchParams?.to} • ${searchParams?.departure}`}
              </p>
            </div>
            <Button variant="outline" onClick={handleClose}>
              New Search
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              {isMultiCity
                ? `${multiCityFlights.length} multi-city routes found`
                : isRoundTrip
                ? `${roundTripFlights.length} round-trip flights found`
                : `${oneWayFlights.length} flights found`}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              {isMultiCity
                ? "Multiple destinations"
                : isRoundTrip
                ? "Round-trip deals"
                : "Best prices"}
            </Badge>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-4">
          {/* Multi-city flights */}
          {isMultiCity &&
            multiCityFlights.map((multiCity, index) => (
              <MultiCityFlightCard
                key={multiCity.id}
                multiCity={multiCity}
                index={index}
                onSelectFlight={handleSelectFlight}
              />
            ))}

          {/* Round-trip flights */}
          {isRoundTrip &&
            roundTripFlights.map((roundTrip, index) => (
              <motion.div
                key={roundTrip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/50 bg-white/80 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Flight Info */}
                      <div className="flex-1 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                roundTrip.outbound.class === "Business"
                                  ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                                  : "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                              }
                            >
                              {roundTrip.outbound.class}
                            </Badge>
                            {roundTrip.outbound.stops.length === 0 &&
                              roundTrip.return.stops.length === 0 && (
                                <Badge className="bg-accent text-white">
                                  Both Direct
                                </Badge>
                              )}
                          </div>
                        </div>

                        {/* Outbound Flight */}
                        <FlightLegDisplay
                          flight={roundTrip.outbound}
                          label="Outbound"
                          from={roundTrip.outbound.departure.airport}
                          to={roundTrip.outbound.arrival.airport}
                        />

                        {/* Divider */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-sm text-muted-foreground">
                              <ArrowLeftRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>

                        {/* Return Flight */}
                        <FlightLegDisplay
                          flight={roundTrip.return}
                          label="Return"
                          from={roundTrip.return.departure.airport}
                          to={roundTrip.return.arrival.airport}
                        />

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground pt-2 border-t border-gray-100">
                          {roundTrip.outbound.amenities.includes("wifi") && (
                            <div className="flex items-center gap-1">
                              <Wifi className="h-4 w-4 text-accent" />
                              <span>WiFi</span>
                            </div>
                          )}
                          {roundTrip.outbound.amenities.includes("meals") && (
                            <div className="flex items-center gap-1">
                              <Coffee className="h-4 w-4 text-accent" />
                              <span>Meals</span>
                            </div>
                          )}
                          {roundTrip.outbound.amenities.includes(
                            "entertainment"
                          ) && (
                            <div className="flex items-center gap-1">
                              <span>📺 Entertainment</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-accent" />
                            <span>{roundTrip.outbound.baggage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 p-4 lg:p-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 lg:bg-none">
                        <div className="text-center lg:text-right">
                          <div className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${roundTrip.totalPrice}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            per person
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            ${roundTrip.outbound.price} + $
                            {roundTrip.return.price}
                          </p>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
                          onClick={() =>
                            handleSelectFlight({
                              ...roundTrip.outbound,
                              roundTrip: true,
                              outbound: roundTrip.outbound,
                              return: roundTrip.return,
                              price: roundTrip.totalPrice,
                            })
                          }
                        >
                          Select Flight
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

          {/* One-way flights */}
          {!isRoundTrip &&
            !isMultiCity &&
            oneWayFlights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/50 bg-white/80 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="mb-1">{flight.airline}</h3>
                            <Badge
                              variant="outline"
                              className={
                                flight.class === "Business"
                                  ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                                  : "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                              }
                            >
                              {flight.class}
                            </Badge>
                          </div>
                          {flight.stops.length === 0 && (
                            <Badge className="bg-accent text-white">
                              Direct Flight
                            </Badge>
                          )}
                        </div>

                        {/* Time and Route */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl">
                              {flight.departure.time}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {flight.departure.airport}
                            </p>
                          </div>

                          <div className="flex-1 flex flex-col items-center">
                            <div className="text-sm text-muted-foreground mb-1">
                              {flight.duration}
                            </div>
                            <div className="w-full relative">
                              <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
                              <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-accent rotate-90" />
                              {flight.stops.length > 0 && (
                                <>
                                  {flight.stops.map((stop, idx) => (
                                    <div
                                      key={idx}
                                      className="absolute top-1/2 transform -translate-y-1/2"
                                      style={{
                                        left: `${
                                          ((idx + 1) /
                                            (flight.stops.length + 1)) *
                                          100
                                        }%`,
                                      }}
                                    >
                                      <div className="relative group">
                                        <div className="h-3 w-3 rounded-full bg-accent border-2 border-white shadow-md -translate-x-1/2" />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                          {stop.city} ({stop.airport})
                                          <div className="text-[10px] text-gray-300">
                                            {stop.layover} layover
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {flight.stops.length === 0 ? (
                                "Non-stop"
                              ) : (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {flight.stops.length}{" "}
                                  {flight.stops.length === 1 ? "stop" : "stops"}
                                  {flight.stops.length <= 2 && (
                                    <span className="text-xs">
                                      (
                                      {flight.stops.map(s => s.city).join(", ")}
                                      )
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-2xl">
                              {flight.arrival.time}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {flight.arrival.airport}
                            </p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {flight.amenities.includes("wifi") && (
                            <div className="flex items-center gap-1">
                              <Wifi className="h-4 w-4 text-accent" />
                              <span>WiFi</span>
                            </div>
                          )}
                          {flight.amenities.includes("meals") && (
                            <div className="flex items-center gap-1">
                              <Coffee className="h-4 w-4 text-accent" />
                              <span>Meals</span>
                            </div>
                          )}
                          {flight.amenities.includes("entertainment") && (
                            <div className="flex items-center gap-1">
                              <span>📺 Entertainment</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-accent" />
                            <span>{flight.baggage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 p-4 lg:p-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 lg:bg-none">
                        <div className="text-center lg:text-right">
                          <div className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${flight.price}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            per person
                          </p>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => handleSelectFlight(flight)}
                        >
                          Select Flight
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-center"
        >
          <p className="text-muted-foreground">
            Prices shown include taxes and fees. Book now to lock in these
            rates! ✈️
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
