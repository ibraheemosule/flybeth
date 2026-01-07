import { Card, Button, Badge } from "@/components/ui";
import {
  MapPin,
  Star,
  Clock,
  Users,
  ArrowRight,
  Camera,
  Ticket,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

interface AttractionResultsProps {
  searchParams: {
    destination: string;
    date: string;
    guests: number;
    attractionType: string;
  };
  onClose: () => void;
  onSelectAttraction: (attraction: any) => void;
}

const mockAttractions = [
  {
    id: 1,
    name: "Central Museum of Natural History",
    type: "Museum",
    location: "Downtown District",
    price: 25,
    duration: "2-3 hours",
    rating: 4.7,
    reviews: 3241,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW18ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Explore fascinating exhibits of natural history, dinosaur fossils, and interactive displays perfect for all ages.",
    features: [
      "Audio Guide Included",
      "Family Friendly",
      "Wheelchair Accessible",
      "Gift Shop",
    ],
    openHours: "9:00 AM - 6:00 PM",
    category: "Culture & Education",
    instantConfirmation: true,
  },
  {
    id: 2,
    name: "Sky Tower Observation Deck",
    type: "Observation",
    location: "City Center",
    price: 35,
    duration: "1-2 hours",
    rating: 4.9,
    reviews: 5682,
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3klMjB0b3dlcnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Experience breathtaking 360-degree panoramic views of the city from the highest observation deck.",
    features: [
      "360° Views",
      "Photo Opportunities",
      "Sunset Views",
      "Fast Track Entry",
    ],
    openHours: "8:00 AM - 10:00 PM",
    category: "Sightseeing",
    instantConfirmation: true,
  },
  {
    id: 3,
    name: "Adventure Theme Park",
    type: "Theme Park",
    location: "Entertainment District",
    price: 89,
    duration: "Full day",
    rating: 4.8,
    reviews: 2156,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVtZSUyMHBhcmt8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Thrilling roller coasters, family rides, live shows, and entertainment for visitors of all ages.",
    features: [
      "Fast Pass Available",
      "Live Shows",
      "Food Courts",
      "Parking Included",
    ],
    openHours: "10:00 AM - 8:00 PM",
    category: "Entertainment",
    instantConfirmation: true,
  },
  {
    id: 4,
    name: "Historic Old Town Walking Tour",
    type: "Tour",
    location: "Historic Quarter",
    price: 18,
    duration: "2 hours",
    rating: 4.6,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHRvd258ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Discover the rich history and hidden secrets of the old town with an expert local guide.",
    features: [
      "Expert Guide",
      "Small Groups",
      "Historical Sites",
      "Photo Stops",
    ],
    openHours: "Multiple tours daily",
    category: "Tours & Experiences",
    instantConfirmation: false,
  },
  {
    id: 5,
    name: "Botanical Gardens & Butterfly House",
    type: "Garden",
    location: "Garden District",
    price: 15,
    duration: "1-2 hours",
    rating: 4.5,
    reviews: 1567,
    image:
      "https://images.unsplash.com/photo-1441906363740-f8266c541b46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW58ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Stroll through beautiful botanical gardens featuring exotic plants and a stunning butterfly conservatory.",
    features: [
      "Tropical Plants",
      "Butterfly House",
      "Peaceful Setting",
      "Educational",
    ],
    openHours: "9:00 AM - 5:00 PM",
    category: "Nature & Gardens",
    instantConfirmation: true,
  },
  {
    id: 6,
    name: "Art Gallery & Cultural Center",
    type: "Gallery",
    location: "Arts Quarter",
    price: 20,
    duration: "1-3 hours",
    rating: 4.4,
    reviews: 734,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Contemporary and classic art exhibitions featuring local and international artists.",
    features: [
      "Rotating Exhibitions",
      "Local Artists",
      "Interactive Displays",
      "Café on Site",
    ],
    openHours: "10:00 AM - 7:00 PM",
    category: "Arts & Culture",
    instantConfirmation: true,
  },
];

export default function AttractionResults({
  searchParams,
  onClose,
  onSelectAttraction,
}: AttractionResultsProps) {
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
                <Camera className="h-6 w-6 text-accent" />
                Attractions in {searchParams.destination}
              </h2>
              <p className="text-muted-foreground">
                {new Date(searchParams.date).toLocaleDateString()} •{" "}
                {searchParams.guests} guests
                {searchParams.attractionType &&
                  ` • ${searchParams.attractionType}`}
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
              {mockAttractions.length} attractions available
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            >
              Instant confirmation
            </Badge>
          </div>
        </motion.div>

        {/* Attraction Cards */}
        <div className="space-y-6">
          {mockAttractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/30 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Attraction Image */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover min-h-[250px] hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-accent">{attraction.type}</Badge>
                      {attraction.instantConfirmation && (
                        <Badge className="bg-green-500">
                          <Ticket className="h-3 w-3 mr-1" />
                          Instant
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Attraction Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <h3 className="mb-2">{attraction.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{attraction.location}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-semibold">
                                {attraction.rating}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({attraction.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{attraction.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {attraction.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {attraction.features.slice(0, 3).map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-gradient-to-r from-primary/5 to-accent/5 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {attraction.features.length > 3 && (
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-primary/5 to-accent/5 text-xs"
                          >
                            +{attraction.features.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-1 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{attraction.openHours}</span>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {attraction.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Price per person
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${attraction.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          onSelectAttraction({ ...attraction, searchParams })
                        }
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
