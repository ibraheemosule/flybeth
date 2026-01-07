"use client";

import {
  Hotel,
  Star,
  MapPin,
  Wifi,
  Coffee,
  ParkingCircle,
  Utensils,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface HotelResultsPageProps {
  searchParams: {
    destination: string;
    checkInDate: string;
    checkOutDate: string;
    guests: string;
  };
  onClose: () => void;
  onSelectHotel: (hotel: any) => void;
}

const mockHotels = [
  {
    id: 1,
    name: "Flybeth Grand Hotel & Spa",
    price: 189,
    pricePerNight: true,
    rating: 4.8,
    reviews: 1234,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Downtown",
    amenities: ["wifi", "parking", "pool", "spa", "restaurant", "gym"],
    type: "Luxury Hotel",
    distanceFromCenter: "0.5 km from center",
  },
  {
    id: 2,
    name: "Skyline Plaza Hotel",
    price: 149,
    pricePerNight: true,
    rating: 4.5,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "City Center",
    amenities: ["wifi", "restaurant", "bar", "gym"],
    type: "Business Hotel",
    distanceFromCenter: "1.2 km from center",
  },
  {
    id: 3,
    name: "Coastal Breeze Resort",
    price: 229,
    pricePerNight: true,
    rating: 4.9,
    reviews: 2103,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBob3RlbHxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Beachfront",
    amenities: ["wifi", "parking", "beach", "pool", "spa", "restaurant"],
    type: "Resort",
    distanceFromCenter: "5.8 km from center",
  },
  {
    id: 4,
    name: "Urban Boutique Suites",
    price: 119,
    pricePerNight: true,
    rating: 4.3,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Arts District",
    amenities: ["wifi", "coffee", "workspace"],
    type: "Boutique Hotel",
    distanceFromCenter: "2.3 km from center",
  },
  {
    id: 5,
    name: "Heritage Palace Hotel",
    price: 279,
    pricePerNight: true,
    rating: 4.6,
    reviews: 1456,
    image:
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Historic Quarter",
    amenities: ["wifi", "parking", "restaurant", "spa", "concierge"],
    type: "Heritage Hotel",
    distanceFromCenter: "0.8 km from center",
  },
  {
    id: 6,
    name: "Modern Business Inn",
    price: 98,
    pricePerNight: true,
    rating: 4.1,
    reviews: 723,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Business District",
    amenities: ["wifi", "breakfast", "workspace"],
    type: "Business Hotel",
    distanceFromCenter: "3.2 km from center",
  },
];

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: ParkingCircle,
  restaurant: Utensils,
  coffee: Coffee,
  pool: Hotel,
  spa: Hotel,
  gym: Hotel,
  beach: Hotel,
  bar: Coffee,
  workspace: Hotel,
  breakfast: Utensils,
  concierge: Hotel,
};

export default function HotelResultsPage({
  searchParams = {
    destination: "New York",
    checkInDate: "Dec 15, 2024",
    checkOutDate: "Dec 18, 2024",
    guests: "2 Adults, 1 Room",
  },
  onClose,
  onSelectHotel,
}: Partial<HotelResultsPageProps>) {
  const handleClose = () => {
    if (onClose) onClose();
    console.log("Close search results");
  };

  const handleSelectHotel = (hotel: any) => {
    if (onSelectHotel) onSelectHotel(hotel);
    console.log("Selected hotel:", hotel);
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
              <h2 className="text-3xl font-bold mb-2">Available Hotels</h2>
              <p className="text-muted-foreground">
                {searchParams.destination} • {searchParams.checkInDate} -{" "}
                {searchParams.checkOutDate}
              </p>
              <p className="text-sm text-muted-foreground">
                {searchParams.guests}
              </p>
            </div>
            <Button variant="outline" onClick={handleClose}>
              New Search
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20"
            >
              {mockHotels.length} hotels found
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20"
            >
              Best rates guaranteed
            </Badge>
          </div>
        </motion.div>

        {/* Hotel Cards */}
        <div className="space-y-6">
          {mockHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/30 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Hotel Image */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover min-h-[250px] hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-white">
                      {hotel.type}
                    </Badge>
                  </div>

                  {/* Hotel Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {hotel.location} • {hotel.distanceFromCenter}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-semibold">
                                {hotel.rating}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({hotel.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 4).map(amenity => {
                          const Icon = amenityIcons[amenity] || Hotel;
                          return (
                            <Badge
                              key={amenity}
                              variant="outline"
                              className="bg-gradient-to-r from-accent/5 to-primary/5 capitalize"
                            >
                              <Icon className="h-3 w-3 mr-1" />
                              {amenity}
                            </Badge>
                          );
                        })}
                        {hotel.amenities.length > 4 && (
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-accent/5 to-primary/5"
                          >
                            +{hotel.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Price per night
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                            ${hotel.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            + taxes
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          handleSelectHotel({ ...hotel, searchParams })
                        }
                        className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 h-12 px-8 shadow-lg hover:shadow-xl transition-all"
                      >
                        Select Room
                        <ArrowRight className="ml-2 h-5 w-5" />
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
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10 text-center"
        >
          <p className="text-muted-foreground">
            All prices include taxes and fees. Rates subject to availability. 🏨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
