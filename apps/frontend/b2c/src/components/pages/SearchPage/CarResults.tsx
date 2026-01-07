import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Briefcase, Fuel, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCarsStore } from "@/stores";
import { useRouter } from "next/navigation";

const mockCars = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Sedan",
    price: 45,
    pricePerDay: true,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 5,
    luggage: 3,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "Bluetooth", "Backup Camera"],
    supplier: "Enterprise",
  },
  {
    id: 2,
    name: "Honda CR-V",
    category: "SUV",
    price: 65,
    pricePerDay: true,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 5,
    luggage: 4,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "4WD", "GPS", "Bluetooth"],
    supplier: "Hertz",
  },
  {
    id: 3,
    name: "Tesla Model 3",
    category: "Electric",
    price: 85,
    pricePerDay: true,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 5,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Electric",
    features: ["Autopilot", "Premium Audio", "Supercharger Network"],
    supplier: "Tesla",
  },
];

const mockTaxis = [
  {
    id: 101,
    name: "Standard Taxi",
    category: "Economy",
    price: 35,
    pricePerDay: false,
    image:
      "https://images.unsplash.com/photo-1526128260932-74d3a97b5b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXhpJTIwY2FyfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 4,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "GPS", "Professional Driver"],
    supplier: "Flybeth Taxi",
  },
  {
    id: 102,
    name: "Premium Sedan",
    category: "Comfort",
    price: 55,
    pricePerDay: false,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc2VkYW58ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 6,
    luggage: 4,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "WiFi", "Leather Seats", "Professional Driver"],
    supplier: "Flybeth Transfer",
  },
  {
    id: 103,
    name: "Luxury Sedan",
    category: "Luxury",
    price: 95,
    pricePerDay: false,
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 3,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: [
      "Premium Interior",
      "Champagne Service",
      "VIP Treatment",
      "Professional Driver",
    ],
    supplier: "Flybeth VIP Transfer",
  },
];

export default function CarResults() {
  const { searchParams, setSelectedCar } = useCarsStore();
  const router = useRouter();

  const isTaxi = searchParams?.serviceType === "taxi";
  const vehicles = isTaxi ? mockTaxis : mockCars;

  const onClose = () => {
    router.back();
  };

  const onSelectCar = (car: any) => {
    setSelectedCar(car);
    router.push("/booking/car");
  };

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
              <h2 className="mb-2">
                {isTaxi ? "Airport Transfer" : "Car Rental"}
              </h2>
              <p className="text-muted-foreground">
                {searchParams?.pickupLocation}
                {searchParams?.dropoffLocation !==
                  searchParams?.pickupLocation &&
                  ` → ${searchParams?.dropoffLocation}`}{" "}
                • {searchParams?.pickupDate}
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
              {vehicles.length} {isTaxi ? "transfer options" : "cars"} found
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              {isTaxi ? "Professional drivers" : "Free cancellation"}
            </Badge>
          </div>
        </motion.div>

        {/* Vehicle Cards */}
        <div className="space-y-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Vehicle Image */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover min-h-[250px] hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {vehicle.category}
                    </Badge>
                  </div>

                  {/* Vehicle Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-2">{vehicle.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {vehicle.supplier}
                          </p>
                        </div>
                      </div>

                      {/* Vehicle Specs */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Passengers
                            </p>
                            <p className="text-sm font-semibold">
                              {vehicle.passengers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10">
                          <Briefcase className="h-5 w-5 text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Luggage
                            </p>
                            <p className="text-sm font-semibold">
                              {vehicle.luggage}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                          {vehicle.fuelType === "Electric" ? (
                            <Zap className="h-5 w-5 text-primary" />
                          ) : (
                            <Fuel className="h-5 w-5 text-primary" />
                          )}
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Fuel
                            </p>
                            <p className="text-sm font-semibold">
                              {vehicle.fuelType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10">
                          <Car className="h-5 w-5 text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Transmission
                            </p>
                            <p className="text-sm font-semibold">
                              {vehicle.transmission}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Features included
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map(feature => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-xs bg-gradient-to-r from-primary/5 to-accent/5"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Policy */}
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          {isTaxi
                            ? "✓ Meet & greet service • Flight tracking • Free waiting time"
                            : "✓ Free cancellation up to 48 hours before pickup"}
                        </p>
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          From
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${vehicle.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {vehicle.pricePerDay ? "per day" : "total"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {isTaxi
                            ? "One-way transfer"
                            : "Includes basic insurance"}
                        </p>
                      </div>
                      <Button
                        onClick={() => onSelectCar(vehicle)}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                      >
                        {isTaxi ? "Book Transfer" : "Rent Car"}
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
