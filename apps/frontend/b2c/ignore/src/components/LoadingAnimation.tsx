import { motion, AnimatePresence } from "motion/react";
import { Plane, Car, Hotel, MapPin, Package, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";

interface LoadingAnimationProps {
  message?: string;
}

const travelIcons = [
  { Icon: Plane, label: "Flights", color: "from-blue-500 to-blue-600" },
  { Icon: Hotel, label: "Hotels", color: "from-purple-500 to-purple-600" },
  { Icon: Car, label: "Cars", color: "from-green-500 to-green-600" },
  { Icon: Ticket, label: "Attractions", color: "from-orange-500 to-orange-600" },
  { Icon: Package, label: "Packages", color: "from-pink-500 to-pink-600" },
];

export function LoadingAnimation({ message = "Loading..." }: LoadingAnimationProps) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % travelIcons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = travelIcons[currentIconIndex];
  const CurrentIcon = currentIcon.Icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Main animated icon container */}
        <div className="relative">
          {/* Orbiting small icons */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {travelIcons.map((item, index) => {
              const Icon = item.Icon;
              const angle = (index / travelIcons.length) * 2 * Math.PI;
              const radius = 70;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  animate={{
                    x: [x, Math.cos(angle + Math.PI * 2) * radius],
                    y: [y, Math.sin(angle + Math.PI * 2) * radius],
                    opacity: currentIconIndex === index ? 1 : 0.3,
                    scale: currentIconIndex === index ? 1.2 : 0.8,
                  }}
                  transition={{
                    x: { duration: 10, repeat: Infinity, ease: "linear" },
                    y: { duration: 10, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                >
                  <div className={`p-2 rounded-full bg-gradient-to-br ${item.color} shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              );
            })}

            {/* Center: Large animated current icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIconIndex}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute inset-0 blur-2xl bg-gradient-to-r ${currentIcon.color} rounded-full`}
                  />
                  
                  {/* Main icon */}
                  <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${currentIcon.color} shadow-2xl`}>
                    <CurrentIcon className="h-12 w-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Flybeth logo - smaller and below */}
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img src={flybethLogo} alt="Flybeth" className="h-12 w-auto opacity-90" />
        </motion.div>

        {/* Message and progress */}
        <div className="text-center space-y-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIconIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-medium"
            >
              {message}
            </motion.p>
          </AnimatePresence>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm text-muted-foreground"
          >
            Searching {currentIcon.label.toLowerCase()}...
          </motion.p>

          {/* Progress indicator */}
          <div className="flex gap-1.5 justify-center">
            {travelIcons.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentIconIndex === index ? 1.2 : 1,
                  opacity: currentIconIndex >= index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className={`h-1.5 w-1.5 rounded-full ${
                  currentIconIndex === index
                    ? `bg-gradient-to-r ${currentIcon.color}`
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}