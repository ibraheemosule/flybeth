import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Globe,
  Users,
  Heart,
  Award,
  Target,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";

const stats = [
  { label: "Countries Served", value: "150+", icon: Globe },
  { label: "Happy Travelers", value: "2M+", icon: Users },
  { label: "Partner Airlines", value: "500+", icon: Award },
  { label: "Customer Satisfaction", value: "98%", icon: Heart },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description:
      "Every decision we make starts with you. Your satisfaction and travel dreams drive everything we do.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "No hidden fees, no surprises. We believe in honest pricing and clear communication.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology to make travel booking seamless and enjoyable.",
  },
  {
    icon: TrendingUp,
    title: "Best Value",
    description:
      "We negotiate with airlines to bring you the best prices without compromising quality.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-gradient-to-r from-primary to-accent text-white mb-6">
              About Flybeth
            </Badge>
            <h1 className="mb-6">
              Transforming the Way You{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Explore the World
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded in 2020, Flybeth has grown from a small startup to a global travel platform trusted by millions. Our mission is simple: make travel accessible, affordable, and extraordinary for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center bg-white/80 backdrop-blur-lg border-2 hover:border-primary/30 transition-all hover:shadow-xl">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-4xl mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Our Story</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-white/90 backdrop-blur-lg border-2">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Flybeth was born from a simple frustration: travel booking was complicated, confusing, and often disappointing. Our founders, seasoned travelers themselves, knew there had to be a better way.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg border-2">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We started with a vision to create a platform that combines cutting-edge technology with genuine human care. Today, Flybeth uses AI-powered search algorithms to scan millions of flight combinations, finding you the best deals in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg border-2">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  But technology alone isn't enough. Our 24/7 support team is always ready to help, our pricing is transparent with no hidden fees, and our commitment to customer satisfaction is unwavering. We don't just book flights—we make travel dreams come true.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/90 backdrop-blur-lg border-2 hover:border-primary/30 transition-all hover:shadow-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary to-accent text-white border-0 shadow-2xl">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4 text-white">Ready to Start Your Journey?</h2>
                <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                  Join millions of travelers who trust Flybeth for their adventures
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
