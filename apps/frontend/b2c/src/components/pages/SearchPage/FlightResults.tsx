"use client";

import { useEffect, useState } from "react";

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
} from "lucide-react";
import { motion } from "framer-motion";
import { mockFlights } from "./utilsSearchPage";
import { Flight } from "@/stores";
import { LoadingAnimation } from "@/components/LoadingAnimation";

interface FlightResultsProps {
  searchParams?: any;
  onClose?: () => void;
  onSelectFlight?: (flight: any) => void;
}

export default function FlightResults({
  searchParams,
  onClose,
  onSelectFlight,
}: FlightResultsProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectFlight = (flight: Flight) => {
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
                {searchParams?.from} → {searchParams?.to} •{" "}
                {searchParams?.departDate}
              </p>
            </div>
            <Button variant="outline" onClick={handleClose}>
              New Search
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 border-[#2563eb]/20"
            >
              {mockFlights.length} flights found
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 border-[#2563eb]/20"
            >
              Best prices
            </Badge>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-4">
          {mockFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#10b981]/50 bg-white/80 backdrop-blur-sm">
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
                              flight.flightClass === "business"
                                ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                                : "bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 border-[#2563eb]/20"
                            }
                          >
                            {flight.flightClass}
                          </Badge>
                        </div>
                        {(Array.isArray(flight.stops)
                          ? flight.stops.length === 0
                          : flight.stops === "Non-stop") && (
                          <Badge className="bg-[#10b981] text-white">
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
                            <div className="h-[2px] bg-gradient-to-r from-[#2563eb] via-[#10b981] to-[#2563eb]" />
                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-[#10b981] rotate-90" />
                            {/* Stop indicators for multi-stop flights */}
                            {Array.isArray(flight.stops) &&
                              flight.stops.length > 0 && (
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
                                        <div className="h-3 w-3 rounded-full bg-[#10b981] border-2 border-white shadow-md -translate-x-1/2" />
                                        {/* Tooltip on hover */}
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
                            {Array.isArray(flight.stops) ? (
                              flight.stops.length === 0 ? (
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
                              )
                            ) : (
                              flight.stops
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl">{flight.arrival.time}</div>
                          <p className="text-muted-foreground text-sm">
                            {flight.arrival.airport}
                          </p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {flight.amenities.includes("wifi") && (
                          <div className="flex items-center gap-1">
                            <Wifi className="h-4 w-4 text-[#10b981]" />
                            <span>WiFi</span>
                          </div>
                        )}
                        {flight.amenities.includes("meals") && (
                          <div className="flex items-center gap-1">
                            <Coffee className="h-4 w-4 text-[#10b981]" />
                            <span>Meals</span>
                          </div>
                        )}
                        {flight.amenities.includes("entertainment") && (
                          <div className="flex items-center gap-1">
                            <span>📺 Entertainment</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-[#10b981]" />
                          <span>{flight.baggage}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 p-4 lg:p-0 rounded-xl bg-gradient-to-br from-[#2563eb]/5 to-[#10b981]/5 lg:bg-none">
                      <div className="text-center lg:text-right">
                        <div className="text-3xl bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">
                          ${flight.price}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          per person
                        </p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90 shadow-lg hover:shadow-xl transition-all"
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
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#2563eb]/5 to-[#10b981]/5 border border-[#2563eb]/10 text-center"
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
