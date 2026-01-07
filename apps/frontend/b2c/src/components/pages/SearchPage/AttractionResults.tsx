import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Users, Ticket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AttractionResultsProps {
  searchParams: {
    destination: string;
    date?: string;
    category: string;
  };
  onClose: () => void;
  onSelectAttraction: (attraction: any) => void;
}

const mockAttractions = [
  {
    id: 1,
    name: "Sunset Harbor Cruise",
    category: "Tours & Sightseeing",
    price: 79,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwY3J1aXNlfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 1234,
    groupSize: "Up to 30 people",
    highlights: ["Scenic views", "Complimentary drinks", "Professional guide"],
    includes: ["Boat ride", "Snacks & drinks", "Photo opportunities"],
    cancellation: "Free cancellation up to 24h",
  },
  {
    id: 2,
    name: "City Walking Food Tour",
    category: "Food & Dining",
    price: 65,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91cnxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 892,
    groupSize: "Small group (12 max)",
    highlights: ["10+ tastings", "Local guide", "Hidden gems"],
    includes: ["Food samples", "Beverages", "Recipe booklet"],
    cancellation: "Free cancellation up to 24h",
  },
  {
    id: 3,
    name: "Adventure Zip Line Experience",
    category: "Adventure & Outdoor",
    price: 99,
    duration: "2.5 hours",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aXAlMjBsaW5lfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 543,
    groupSize: "Up to 15 people",
    highlights: ["7 zip lines", "Safety equipment", "Stunning views"],
    includes: ["All equipment", "Safety briefing", "Photos included"],
    cancellation: "Free cancellation up to 48h",
  },
  {
    id: 4,
    name: "Museum of Modern Art Pass",
    category: "Museums & Culture",
    price: 35,
    duration: "Full day access",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnR8ZW58MXx8fHwxNzYzNjE3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 2103,
    groupSize: "Individual entry",
    highlights: ["Skip the line", "Audio guide", "Special exhibitions"],
    includes: ["Entry ticket", "Audio guide", "Exhibition access"],
    cancellation: "Free cancellation up to 24h",
  },
  {
    id: 5,
    name: "Snorkeling & Beach Adventure",
    category: "Water Activities",
    price: 89,
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nfGVufDF8fHx8MTc2MzYxNzkzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 678,
    groupSize: "Up to 20 people",
    highlights: ["Equipment provided", "Beach BBQ", "Multiple spots"],
    includes: ["Snorkel gear", "Lunch", "Transportation"],
    cancellation: "Free cancellation up to 48h",
  },
];

export default function AttractionResults({ searchParams, onClose, onSelectAttraction }: AttractionResultsProps) {
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
              <h2 className="mb-2">Things To Do</h2>
              <p className="text-muted-foreground">
                {searchParams.destination}
                {searchParams.date && ` • ${searchParams.date}`}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              New Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              {mockAttractions.length} experiences found
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              Top rated activities
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
                      className="w-full h-full object-cover min-h-[280px] hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent">
                      {attraction.category}
                    </Badge>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold text-sm">{attraction.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attraction Details */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <h3 className="mb-2">{attraction.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{attraction.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{attraction.groupSize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">({attraction.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Highlights:</p>
                        <div className="flex flex-wrap gap-2">
                          {attraction.highlights.map((highlight) => (
                            <Badge
                              key={highlight}
                              variant="outline"
                              className="bg-gradient-to-r from-accent/5 to-primary/5"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* What's Included */}
                      <div className="mb-3">
                        <p className="text-sm font-semibold mb-2">What&apos;s included:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {attraction.includes.map((item) => (
                            <div key={item} className="flex items-center gap-1">
                              <Ticket className="h-3 w-3 text-accent" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-accent">{attraction.cancellation}</p>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between pt-4 border-t mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">From</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                            ${attraction.price}
                          </span>
                          <span className="text-sm text-muted-foreground">per person</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => onSelectAttraction({ ...attraction, searchParams })}
                        className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 h-12 px-8"
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