import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, TrendingDown, Zap, MapPin } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Deal {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
}

interface DealsSectionProps {
  onNavigate?: (page: string) => void;
}

const deals: Deal[] = [
  {
    id: 1,
    title: "Paradise Awaits",
    location: "Phuket, Thailand",
    image:
      "https://images.unsplash.com/photo-1704314315344-cd10b9779ce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMGJlYWNofGVufDF8fHx8MTc2MzYxNzk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$649",
    originalPrice: "$899",
    rating: 4.9,
    reviews: 2341,
    badge: "🔥 Hot Deal",
    badgeColor: "accent",
  },
  {
    id: 2,
    title: "Urban Explorer",
    location: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRva3lvfGVufDF8fHx8MTc2MzYxNzk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$1,099",
    originalPrice: "$1,499",
    rating: 4.8,
    reviews: 1876,
    badge: "Limited Time",
  },
  {
    id: 3,
    title: "Desert Dreams",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1703866367063-71eae5acbf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeXxlbnwxfHx8fDE3NjM2MTc5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$1,599",
    rating: 4.7,
    reviews: 987,
  },
  {
    id: 4,
    title: "Island Bliss",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlfGVufDF8fHx8MTc2MzUyNTU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$799",
    originalPrice: "$1,099",
    rating: 4.8,
    reviews: 1432,
    badge: "Best Seller",
  },
];

export function DealsSection({ onNavigate }: DealsSectionProps = {}) {
  const router = useRouter();
  const handleViewDeal = () => {
    router.push("/deals");
  };

  return (
    <section className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-2 rounded-full mb-4 border border-accent/20"
          >
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-accent">Flash Deals</span>
          </motion.div>
          <h2 className="mb-2">Today's Hot Deals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Limited-time offers on top destinations - grab them before they're
            gone!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border-2 hover:border-accent/30 bg-white/90 backdrop-blur-lg h-full">
                <div className="relative h-40 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Floating badges */}
                  {deal.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge
                        className={`absolute top-2 right-2 text-xs ${
                          deal.badgeColor === "accent"
                            ? "bg-accent text-white"
                            : "bg-white text-foreground"
                        } shadow-lg backdrop-blur-sm`}
                      >
                        {deal.badge}
                      </Badge>
                    </motion.div>
                  )}

                  {deal.originalPrice && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg"
                    >
                      <TrendingDown className="h-3 w-3" />
                      {Math.round(
                        (1 -
                          parseInt(deal.price.replace(/\D/g, "")) /
                            parseInt(deal.originalPrice.replace(/\D/g, ""))) *
                          100
                      )}
                      %
                    </motion.div>
                  )}

                  {/* Location overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>{deal.location}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="truncate group-hover:text-primary transition-colors text-base">
                    {deal.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{deal.rating}</span>
                    <span className="text-muted-foreground">
                      ({deal.reviews.toLocaleString()})
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      {deal.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          {deal.originalPrice}
                        </div>
                      )}
                      <div className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {deal.price}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleViewDeal}
                      className="btn-gradient-small"
                    >
                      View
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
