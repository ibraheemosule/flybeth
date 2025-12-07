import { motion } from "framer-motion";
// Logo removed - using text instead

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({
  message = "Loading...",
}: LoadingAnimationProps) {
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
          <span className="text-4xl font-bold text-blue-600">FlyBeth</span>

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
            {[0, 1, 2].map(i => (
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
