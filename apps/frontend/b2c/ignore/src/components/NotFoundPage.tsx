import { Button } from "./ui/button";
import { MapPin, Home, Search, Compass } from "lucide-react";
import { motion } from "motion/react";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full"
        />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img src={flybethLogo} alt="Flybeth" className="h-20 mx-auto mb-8 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-white/90 mb-4">Oops! This destination doesn't exist</div>
          <h1 className="text-white mb-4">404 - Lost in the Clouds</h1>
          <p className="text-white/90 max-w-md mx-auto text-lg mb-8">
            Looks like you've wandered off the map. Let's get you back on track to your dream destination!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
        >
          <Button
            onClick={() => onNavigate("home")}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-2xl w-full sm:w-auto"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <Button
            onClick={() => onNavigate("deals")}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 w-full sm:w-auto"
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Deals
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-6 justify-center"
        >
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Popular Destinations</span>
          </button>
          <button
            onClick={() => onNavigate("help")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span className="text-sm">Need Help?</span>
          </button>
        </motion.div>

        {/* Decorative plane */}
        <motion.div
          animate={{
            x: ["-100vw", "100vw"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-0 text-white/20 text-6xl"
        >
          ✈️
        </motion.div>
      </div>
    </div>
  );
}
