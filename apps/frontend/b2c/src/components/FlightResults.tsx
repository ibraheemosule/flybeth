import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plane, Clock, Briefcase, Wifi, Coffee, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FlightResultsProps {
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
  };
  onClose: () => void;
  onSelectFlight: (flight: any) => void;
}

const mockFlights = [
  {
    id: 1,
    airline: "Flybeth Airways",
    price: 459,
    departure: { time: "08:30 AM", airport: "JFK" },
    arrival: { time: "11:45 AM", airport: "LAX" },
    duration: "5h 15m",
    stops: "Non-stop",
    class: "Economy",
    amenities: ["wifi", "meals", "entertainment"],
    baggage: "2 checked bags included",
  },
  {
    id: 2,
    airline: "Sky Connect",
    price: 389,
    departure: { time: "02:15 PM", airport: "JFK" },
    arrival: { time: "05:40 PM", airport: "LAX" },
    duration: "5h 25m",
    stops: "Non-stop",
    class: "Economy",
    amenities: ["wifi", "entertainment"],
    baggage: "1 checked bag included",
  },
  {
    id: 3,
    airline: "Global Express",
    price: 329,
    departure: { time: "06:00 AM", airport: "JFK" },
    arrival: { time: "12:30 PM", airport: "LAX" },
    duration: "6h 30m",
    stops: "1 stop in ORD",
    class: "Economy",
    amenities: ["entertainment"],
    baggage: "1 checked bag included",
  },
  {
    id: 4,
    airline: "Premium Air",
    price: 899,
    departure: { time: "10:00 AM", airport: "JFK" },
    arrival: { time: "01:20 PM", airport: "LAX" },
    duration: "5h 20m",
    stops: "Non-stop",
    class: "Business",
    amenities: ["wifi", "meals", "entertainment", "lounge"],
    baggage: "3 checked bags included",
  },
];

export function FlightResults({ searchParams, onClose, onSelectFlight }: FlightResultsProps) {
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
                {searchParams.from} → {searchParams.to} • {searchParams.departDate}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              New Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              {mockFlights.length} flights found
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
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
                            className={flight.class === "Business" 
                              ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30" 
                              : "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
                            }
                          >
                            {flight.class}
                          </Badge>
                        </div>
                        {flight.stops === "Non-stop" && (
                          <Badge className="bg-accent text-white">
                            Direct Flight
                          </Badge>
                        )}
                      </div>

                      {/* Time and Route */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl">{flight.departure.time}</div>
                          <p className="text-muted-foreground text-sm">{flight.departure.airport}</p>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                          <div className="text-sm text-muted-foreground mb-1">{flight.duration}</div>
                          <div className="w-full relative">
                            <div className="h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-accent rotate-90" />
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{flight.stops}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl">{flight.arrival.time}</div>
                          <p className="text-muted-foreground text-sm">{flight.arrival.airport}</p>
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
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all"
                        onClick={() => onSelectFlight(flight)}
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
            Prices shown include taxes and fees. Book now to lock in these rates! ✈️
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}