import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, TrendingDown, Zap, Clock, Tag, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";

const flashDeals = [
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
    discount: 28,
    timeLeft: "23h 45m",
    badge: "🔥 Hot Deal",
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
    discount: 27,
    timeLeft: "15h 20m",
  },
  {
    id: 3,
    title: "Island Bliss",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlfGVufDF8fHx8MTc2MzUyNTU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$799",
    originalPrice: "$1,099",
    rating: 4.8,
    reviews: 1432,
    discount: 27,
    timeLeft: "8h 12m",
  },
];

export function DealsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full mb-6">
            <Sparkles className="h-5 w-5" />
            <span>Exclusive Deals Hub</span>
          </div>
          <h1 className="mb-4">Unbelievable Savings on Dream Destinations</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Limited-time offers that make luxury travel accessible. These deals
            won't last long—grab them while you can!
          </p>
        </div>

        {/* Flash Deals Section - No Tabs Needed */}
        <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3>Flash Sale Active!</h3>
              <p className="text-muted-foreground">
                Prices drop every hour. Check back often!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashDeals.map(deal => (
            <Card
              key={deal.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Time left badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg animate-pulse">
                  <Clock className="h-4 w-4" />
                  <span>{deal.timeLeft}</span>
                </div>

                {/* Discount badge */}
                <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  {deal.discount}% OFF
                </div>

                {deal.badge && (
                  <Badge className="absolute bottom-3 left-3 bg-white text-foreground shadow-lg">
                    {deal.badge}
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="truncate">{deal.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>📍 {deal.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{deal.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({deal.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">
                      {deal.originalPrice}
                    </div>
                    <div className="text-2xl text-primary">{deal.price}</div>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90">
                    Grab Deal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary to-accent rounded-2xl text-white text-center">
          <h2 className="text-white mb-4">Never Miss a Deal!</h2>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about flash
            sales, exclusive offers, and insider travel tips.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
