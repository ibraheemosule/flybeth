import { BookingTabs } from "./BookingTabs";
import { Sparkles, Plane, Globe, Star } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onSearch: (params: any) => void;
  activeTab?: string;
}

export function HeroSection({ onSearch, activeTab }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Dynamic animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent animate-gradient-shift">
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1507582164819-43222b86fb0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWxlciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjM2MTc5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-transparent to-primary/30" />
        </div>
      </div>

      {/* Floating animated shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
      />
      
      {/* Floating icons */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 left-20 opacity-20"
      >
        <Plane className="h-16 w-16 text-white" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 right-32 opacity-20"
      >
        <Globe className="h-20 w-20 text-white" />
      </motion.div>
      
      <div className="container mx-auto relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-white text-sm">Your Adventure Starts Here</span>
            <Star className="h-4 w-4 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white mb-4 max-w-3xl mx-auto text-5xl md:text-6xl lg:text-7xl"
          >
            Wanderlust Meets{" "}
            <span className="bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent animate-gradient-text">
              Smart Travel
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Discover extraordinary destinations, unbeatable prices, and seamless booking experiences. 
            Let's turn your travel dreams into reality.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <BookingTabs onSearch={onSearch} activeTab={activeTab} />
        </motion.div>
      </div>
      
      {/* Bottom wave decoration - Removed to prevent UI interference */}
    </section>
  );
}