import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Car, Users, Briefcase, Fuel, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CarResultsProps {
  searchParams: {
    pickUpLocation: string;
    dropOffLocation: string;
    pickUpDate: string;
    dropOffDate?: string;
    carType?: "rental" | "taxi";
  };
  onClose: () => void;
  onSelectCar: (car: any) => void;
}

const mockCars = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Sedan",
    price: 45,
    pricePerDay: true,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    price: 89,
    pricePerDay: true,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 5,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Electric",
    features: ["Autopilot", "Premium Audio", "Glass Roof"],
    supplier: "Avis",
  },
  {
    id: 4,
    name: "Ford Mustang Convertible",
    category: "Convertible",
    price: 95,
    pricePerDay: true,
    image: "https://images.unsplash.com/photo-1584345604447-2b6b1b9b8f0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXN0YW5nJTIwY2FyfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 4,
    luggage: 2,
    transmission: "Manual",
    fuelType: "Gasoline",
    features: ["Convertible Top", "Premium Audio", "Sport Mode"],
    supplier: "Budget",
  },
];

const mockTaxis = [
  {
    id: 101,
    name: "Standard Sedan",
    category: "Economy",
    price: 45,
    pricePerDay: false,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 4,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "Professional Driver", "Meet & Greet"],
    supplier: "Flybeth Transfer",
  },
  {
    id: 102,
    name: "Premium SUV",
    category: "Premium",
    price: 75,
    pricePerDay: false,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 3,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["Premium Interior", "Champagne Service", "VIP Treatment", "Professional Driver"],
    supplier: "Flybeth VIP Transfer",
  },
  {
    id: 104,
    name: "Van (7-9 passengers)",
    category: "Group",
    price: 110,
    pricePerDay: false,
    image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pdmFufGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 9,
    luggage: 6,
    transmission: "Automatic",
    fuelType: "Gasoline",
    features: ["AC", "Extra Space", "Group Transfer", "Professional Driver"],
    supplier: "Flybeth Transfer",
  },
];

export function CarResults({ searchParams, onClose, onSelectCar }: CarResultsProps) {
  const isTaxi = searchParams.carType === "taxi";
  const vehicles = isTaxi ? mockTaxis : mockCars;
  
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
              <h2 className="mb-2">{isTaxi ? "Available Airport Transfers" : "Available Cars"}</h2>
              <p className="text-muted-foreground">
                {searchParams.pickUpLocation} {isTaxi ? `→ ${searchParams.dropOffLocation}` : `• ${searchParams.pickUpDate} - ${searchParams.dropOffDate}`}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              New Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              {vehicles.length} {isTaxi ? "transfers" : "cars"} available
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              Free cancellation
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
                  <div className="md:w-1/3 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-contain p-6 min-h-[250px]"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">{vehicle.category}</Badge>
                  </div>

                  {/* Vehicle Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-2">{vehicle.name} {!isTaxi && "or similar"}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Provided by {vehicle.supplier}
                          </p>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm">{vehicle.passengers} Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span className="text-sm">{vehicle.luggage} Bags</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {vehicle.fuelType === "Electric" ? (
                            <Zap className="h-4 w-4 text-accent" />
                          ) : (
                            <Fuel className="h-4 w-4 text-accent" />
                          )}
                          <span className="text-sm">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-accent" />
                          <span className="text-sm">{vehicle.transmission}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="bg-gradient-to-r from-primary/5 to-accent/5"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {isTaxi ? "Total price" : "Price per day"}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${vehicle.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => onSelectCar({ ...vehicle, searchParams })}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-8"
                      >
                        Book Now
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