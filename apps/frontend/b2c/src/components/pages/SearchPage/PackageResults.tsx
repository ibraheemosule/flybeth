import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Plane,
  Hotel,
  MapPin,
  Star,
  ArrowRight,
  Car,
} from "lucide-react";
import { motion } from "framer-motion";

interface PackageResultsProps {
  searchParams: {
    destination: string;
    departDate: string;
    returnDate: string;
    travelers: number;
    packageType: string;
    budget: { min: number; max: number };
    includes: {
      flights: boolean;
      hotels: boolean;
      cars: boolean;
      activities: boolean;
    };
  };
  onClose: () => void;
  onSelectPackage: (pkg: any) => void;
}

const mockPackages = [
  {
    id: 1,
    name: "Paradise Getaway",
    destination: "Maldives",
    price: 1899,
    originalPrice: 2499,
    savings: 600,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydHxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 543,
    nights: 7,
    includes: {
      flight: "Round-trip flights",
      hotel: "5-Star Resort",
      car: "Airport Transfer & Car Rental",
      meals: "All-Inclusive",
      activities: "Snorkeling & Spa",
    },
    highlights: ["Private Beach", "Water Villa", "Airport Transfer"],
  },
  {
    id: 2,
    name: "European Explorer",
    destination: "Paris & Rome",
    price: 1599,
    originalPrice: 2199,
    savings: 600,
    image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHJvbWV8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 892,
    nights: 10,
    includes: {
      flight: "Multi-city flights",
      hotel: "4-Star Hotels",
      car: "High-speed train & transfers",
      meals: "Breakfast included",
      activities: "City Tours & Museums",
    },
    highlights: ["Eiffel Tower", "Colosseum", "Express Transfers"],
  },
  {
    id: 3,
    name: "Tropical Adventure",
    destination: "Thailand & Bali",
    price: 1299,
    originalPrice: 1799,
    savings: 500,
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMGJhbGl8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 721,
    nights: 12,
    includes: {
      flight: "Round-trip & domestic flights",
      hotel: "Beach Resorts & City Hotels",
      car: "Private transfers included",
      meals: "Breakfast included",
      activities: "Temple Tours & Beach Activities",
    },
    highlights: ["Bangkok Temples", "Bali Beaches", "Cultural Shows"],
  },
];

export default function PackageResults({
  searchParams,
  onClose,
  onSelectPackage,
}: PackageResultsProps) {
  // Filter packages based on user's selections
  const shouldShowCarInfo = searchParams.includes?.cars;

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
              <h2 className="mb-2">Vacation Packages</h2>
              <p className="text-muted-foreground">
                {searchParams.destination} • {searchParams.departDate} -{" "}
                {searchParams.returnDate}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              New Search
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              {mockPackages.length} packages found
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              Save up to $650
            </Badge>
            {searchParams.includes?.cars && (
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
              >
                <Car className="h-3 w-3 mr-1" />
                Includes Car Rental
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="space-y-6">
          {mockPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Package Image */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover min-h-[300px] hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent">
                      Save ${pkg.savings}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{pkg.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({pkg.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-2">{pkg.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {pkg.destination} • {pkg.nights} nights
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* What's Included */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {searchParams.includes?.flights !== false && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                            <Plane className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold">Flights</p>
                              <p className="text-xs text-muted-foreground">
                                {pkg.includes.flight}
                              </p>
                            </div>
                          </div>
                        )}
                        {searchParams.includes?.hotels !== false && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10">
                            <Hotel className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold">Hotel</p>
                              <p className="text-xs text-muted-foreground">
                                {pkg.includes.hotel}
                              </p>
                            </div>
                          </div>
                        )}
                        {shouldShowCarInfo && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                            <Car className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold">
                                Car Rental
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {pkg.includes.car}
                              </p>
                            </div>
                          </div>
                        )}
                        {searchParams.includes?.activities !== false && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10">
                            <Package className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold">
                                Activities
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {pkg.includes.activities}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.highlights.map(highlight => (
                          <Badge
                            key={highlight}
                            variant="outline"
                            className="text-xs bg-gradient-to-r from-primary/5 to-accent/5"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 line-through">
                          ${pkg.originalPrice}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${pkg.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            per person
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          onSelectPackage({ ...pkg, searchParams })
                        }
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                      >
                        Book Package
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
