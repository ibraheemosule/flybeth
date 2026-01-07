"use client";

import { motion } from "framer-motion";
import { Plane, Loader2 } from "lucide-react";
import Image from "next/image";

interface ProcessingPaymentOverlayProps {
  isOpen: boolean;
}

export function ProcessingPaymentOverlay({
  isOpen,
}: ProcessingPaymentOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="h-12 w-32 relative">
              <Image
                src="/flybeth-logo.png"
                alt="Flybeth"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Animated Plane */}
          <div className="relative h-32 flex items-center justify-center">
            <motion.div
              animate={{
                x: [-100, 100],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute"
            >
              <Plane className="h-12 w-12 text-primary" />
            </motion.div>

            {/* Trail effect */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
            />
          </div>

          {/* Processing Text */}
          <div className="space-y-2">
            <h3 className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              Processing Your Payment
            </h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we securely process your transaction...
            </p>
          </div>

          {/* Spinner */}
          <div className="flex items-center justify-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">This may take a few moments</span>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
              />
            ))}
          </div>

          {/* Security message */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground">
              🔒 Your payment is encrypted and secure
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
