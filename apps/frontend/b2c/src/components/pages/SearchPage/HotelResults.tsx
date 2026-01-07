import { useRouter } from "next/navigation";
import { useHotelsStore } from "@/stores";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface HotelResultsProps {
  // No props needed - component uses store directly
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
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBob3RlbHxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Beach Front",
    amenities: ["wifi", "pool", "spa", "restaurant", "beach", "water-sports"],
    type: "Beach Resort",
    distanceFromCenter: "8.5 km from center",
  },
];

const amenityIcons = {
  wifi: Wifi,
  parking: ParkingCircle,
  restaurant: Utensils,
  pool: "🏊",
  spa: "🧖",
  gym: "💪",
  bar: Coffee,
  beach: "🏖️",
  "water-sports": "🏄",
};

export default function HotelResults() {
  const router = useRouter();
  const hotelsStore = useHotelsStore();
  const searchParams = hotelsStore.searchParams;

  const onClose = () => router.push("/");
  const onSelectHotel = (hotel: any) => {
    useHotelsStore.setState({ selectedHotel: hotel });
    router.push("/checkout");
  };

  if (!searchParams) {
    router.push("/");
    return null;
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
              <h2 className="mb-2">Hotels</h2>
              <p className="text-muted-foreground">
                {searchParams.location} • {searchParams.checkIn} -{" "}
                {searchParams.checkOut} • {searchParams.guests} guests
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
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
                    <Badge className="absolute top-4 left-4 bg-accent">
                      {hotel.type}
                    </Badge>
                  </div>

                  {/* Hotel Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-2">{hotel.name}</h3>
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
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Popular amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map(amenity => {
                            const IconComponent =
                              amenityIcons[
                                amenity as keyof typeof amenityIcons
                              ];
                            return (
                              <Badge
                                key={amenity}
                                variant="outline"
                                className="flex items-center gap-1 text-xs bg-gradient-to-r from-accent/5 to-primary/5"
                              >
                                {typeof IconComponent === "string" ? (
                                  <span>{IconComponent}</span>
                                ) : typeof IconComponent === "function" ? (
                                  <IconComponent className="h-3 w-3" />
                                ) : null}
                                {amenity.charAt(0).toUpperCase() +
                                  amenity.slice(1)}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Cancellation Policy */}
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ Free cancellation until 6 PM on check-in date
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
                          <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                            ${hotel.price}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {hotel.pricePerNight ? "per night" : "total"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Includes taxes and fees
                        </p>
                      </div>
                      <Button
                        onClick={() => onSelectHotel(hotel)}
                        className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                      >
                        Book Hotel
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
