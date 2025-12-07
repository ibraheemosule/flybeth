import { motion } from "motion/react";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({ message = "Loading..." }: LoadingAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img src={flybethLogo} alt="Flybeth" className="h-24 w-auto" />
          
          {/* Animated glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 blur-xl bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </motion.div>
        
        <div className="text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-muted-foreground"
          >
            {message}
          </motion.p>
          
          {/* Loading dots */}
          <div className="flex gap-1 justify-center mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
