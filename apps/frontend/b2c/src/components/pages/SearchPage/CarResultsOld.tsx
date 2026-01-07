import { Card, Button, Badge } from "@/components/ui";
import {
  Car,
  Users,
  MapPin,
  Fuel,
  Car as CarIcon,
  ArrowRight,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

interface CarResultsProps {
  searchParams: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    serviceType: "rental" | "taxi";
  };
  onClose: () => void;
  onSelectCar: (car: any) => void;
}

const mockCarRentals = [
  {
    id: 1,
    name: "Economy - Nissan Versa or similar",
    type: "Economy",
    category: "rental",
    price: 45,
    priceType: "per day",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwY2FyfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["5 seats", "Automatic", "Air Conditioning", "Bluetooth"],
    fuelPolicy: "Same as pickup",
    mileage: "Unlimited",
    supplier: "FlyBeth Rentals",
    rating: 4.5,
    reviews: 892,
    cancellation: "Free cancellation",
  },
  {
    id: 2,
    name: "Compact - Honda Civic or similar",
    type: "Compact",
    category: "rental",
    price: 62,
    priceType: "per day",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb21wYWN0JTIwY2FyfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["5 seats", "Automatic", "Air Conditioning", "Cruise Control"],
    fuelPolicy: "Same as pickup",
    mileage: "Unlimited",
    supplier: "FlyBeth Rentals",
    rating: 4.7,
    reviews: 1203,
    cancellation: "Free cancellation",
  },
  {
    id: 3,
    name: "SUV - Toyota RAV4 or similar",
    type: "SUV",
    category: "rental",
    price: 89,
    priceType: "per day",
    image:
      "https://images.unsplash.com/photo-1519641714857-4dc325be0588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxTVVYlMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["7 seats", "AWD", "Air Conditioning", "GPS", "Roof Rails"],
    fuelPolicy: "Same as pickup",
    mileage: "Unlimited",
    supplier: "FlyBeth Rentals",
    rating: 4.8,
    reviews: 756,
    cancellation: "Free cancellation",
  },
];

const mockTaxiServices = [
  {
    id: 4,
    name: "Standard Taxi",
    type: "Standard",
    category: "taxi",
    price: 25,
    priceType: "estimated fare",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXhpfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["4 passengers", "Air Conditioning", "Professional Driver"],
    estimatedTime: "5-10 minutes",
    supplier: "FlyBeth Taxi",
    rating: 4.3,
    reviews: 2341,
    vehicleType: "Sedan",
  },
  {
    id: 5,
    name: "Premium Taxi",
    type: "Premium",
    category: "taxi",
    price: 38,
    priceType: "estimated fare",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "4 passengers",
      "Luxury Interior",
      "WiFi",
      "Professional Driver",
    ],
    estimatedTime: "3-8 minutes",
    supplier: "FlyBeth Premium",
    rating: 4.8,
    reviews: 1876,
    vehicleType: "Luxury Sedan",
  },
  {
    id: 6,
    name: "SUV Taxi",
    type: "SUV",
    category: "taxi",
    price: 45,
    priceType: "estimated fare",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxTVVYlMjB0YXhpfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["7 passengers", "Extra Luggage Space", "Air Conditioning"],
    estimatedTime: "8-15 minutes",
    supplier: "FlyBeth Taxi",
    rating: 4.6,
    reviews: 1123,
    vehicleType: "SUV",
  },
];

export default function CarResults({
  searchParams,
  onClose,
  onSelectCar,
}: CarResultsProps) {
  const isRental = searchParams.serviceType === "rental";
  const cars = isRental ? mockCarRentals : mockTaxiServices;

  const getServiceIcon = () => {
    return isRental ? Car : Truck;
  };

  const ServiceIcon = getServiceIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="mb-2 flex items-center gap-2">
                <ServiceIcon className="h-6 w-6 text-accent" />
                Available {isRental ? "Car Rentals" : "Taxi Services"}
              </h2>
              <p className="text-muted-foreground">
                {searchParams.pickupLocation}{" "}
                {searchParams.dropoffLocation !== searchParams.pickupLocation &&
                  `→ ${searchParams.dropoffLocation}`}
                <br />
                {new Date(searchParams.pickupDate).toLocaleDateString()} at{" "}
                {searchParams.pickupTime}
                {isRental &&
                  ` - ${new Date(
                    searchParams.returnDate
                  ).toLocaleDateString()} at ${searchParams.returnTime}`}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              New Search
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              {cars.length} {isRental ? "vehicles" : "options"} available
            </Badge>
            {isRental && (
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
              >
                Free cancellation
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Car/Taxi Cards */}
        <div className="space-y-6">
          {cars.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/30 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Vehicle Image */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover min-h-[250px] hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent">
                      {vehicle.type}
                    </Badge>
                  </div>

                  {/* Vehicle Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-2">{vehicle.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{vehicle.supplier}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md">
                              <span className="font-semibold">
                                {vehicle.rating}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({vehicle.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-gradient-to-r from-primary/5 to-accent/5"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {isRental ? (
                          <>
                            <div className="flex items-center gap-2">
                              <Fuel className="h-4 w-4" />
                              <span>
                                Fuel Policy: {(vehicle as any).fuelPolicy}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CarIcon className="h-4 w-4" />
                              <span>Mileage: {(vehicle as any).mileage}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>
                                Vehicle Type: {(vehicle as any).vehicleType}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>
                                Estimated arrival:{" "}
                                {(vehicle as any).estimatedTime}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {vehicle.priceType}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${vehicle.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          onSelectCar({ ...vehicle, searchParams })
                        }
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-8"
                      >
                        {isRental ? "Rent Now" : "Book Ride"}
                        <ArrowRight className="ml-2 h-5 w-5" />
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
