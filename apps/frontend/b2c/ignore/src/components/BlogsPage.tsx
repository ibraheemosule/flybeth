import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ArrowRight, Compass } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

const blogs = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    excerpt: "Discover breathtaking destinations off the beaten path that will make your Instagram followers jealous.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
    category: "Destinations",
    date: "Nov 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Ultimate Guide to Booking Cheap Flights in 2025",
    excerpt: "Learn insider tips and tricks from travel experts to save hundreds on your next flight booking.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    category: "Travel Tips",
    date: "Nov 10, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Travel: What You Need to Know",
    excerpt: "How to reduce your carbon footprint while exploring the world responsibly.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    category: "Sustainability",
    date: "Nov 5, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Best European Cities for Solo Travelers",
    excerpt: "Safe, exciting, and welcoming destinations perfect for your solo adventure.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    category: "Solo Travel",
    date: "Oct 28, 2024",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "How to Pack Light for a 2-Week Trip",
    excerpt: "Master the art of minimalist packing with our comprehensive guide.",
    image: "https://images.unsplash.com/photo-1553830591-2f0938e98b5f?w=800&q=80",
    category: "Packing Tips",
    date: "Oct 20, 2024",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Navigating Airport Security Like a Pro",
    excerpt: "Speed through security checkpoints with these expert tips and tricks.",
    image: "https://images.unsplash.com/photo-1559268950-2d7ceb2efa3e?w=800&q=80",
    category: "Travel Tips",
    date: "Oct 15, 2024",
    readTime: "5 min read",
  },
];

const categories = ["All", "Destinations", "Travel Tips", "Solo Travel", "Sustainability", "Packing Tips"];

export function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-4 border border-primary/20">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm">Travel Inspiration</span>
          </div>
          <h1 className="mb-4">Flybeth Travel Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert tips, destination guides, and travel stories to inspire your next adventure
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all bg-white/80 backdrop-blur-sm"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border-2 hover:border-primary/30 bg-white/90 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-white text-foreground">
                    {blog.category}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription>{blog.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary/10 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
