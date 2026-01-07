"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Car, Users, Briefcase, Fuel, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 5,
    luggage: 2,
    transmission: "Automatic",
    fuelType: "Electric",
    features: ["AC", "Autopilot", "Premium Audio", "Supercharging"],
    supplier: "Tesla Rentals",
  },
  {
    id: 4,
    name: "Ford Transit",
    category: "Van",
    price: 120,
    pricePerDay: true,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW4lMjBjYXJ8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    passengers: 12,
    luggage: 8,
    transmission: "Manual",
    fuelType: "Diesel",
    features: ["AC", "GPS", "Cargo Space"],
    supplier: "Budget",
  },
];

export default function CarResults({
  searchParams,
  onClose,
  onSelectCar,
}: CarResultsProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price");

  const filteredCars = mockCars.sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchParams.carType === "taxi"
                  ? "Airport Transfers"
                  : "Car Rentals"}
              </h1>
              <p className="text-gray-600">
                {searchParams.pickUpLocation} → {searchParams.dropOffLocation} •{" "}
                {searchParams.pickUpDate}
                {searchParams.dropOffDate && ` - ${searchParams.dropOffDate}`}
              </p>
            </div>
            <Button onClick={onClose} variant="outline">
              Modify Search
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="text-primary">
              {filteredCars.length} cars available
            </Badge>
            <Badge variant="outline">Best prices guaranteed</Badge>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 hover:border-primary/30">
                <div className="flex flex-col md:flex-row">
                  {/* Car Image */}
                  <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Car Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {car.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline">{car.category}</Badge>
                            <span>•</span>
                            <span>{car.supplier}</span>
                          </div>
                        </div>
                      </div>

                      {/* Car Specs */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{car.passengers} passengers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span>{car.luggage} bags</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-gray-500" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {car.fuelType === "Electric" ? (
                            <Zap className="h-4 w-4 text-green-500" />
                          ) : (
                            <Fuel className="h-4 w-4 text-gray-500" />
                          )}
                          <span>{car.fuelType}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">
                          {car.pricePerDay ? "Per day" : "Total"}
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          ${car.price}
                          {car.pricePerDay && (
                            <span className="text-lg">/day</span>
                          )}
                        </p>
                      </div>
                      <Button
                        onClick={() => onSelectCar(car)}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                      >
                        Select Car
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
    </div>
  );
}
