import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Download, ArrowRight, AlertTriangle } from "lucide-react";
import flybethLogo from "figma:asset/cc0c72fad362bbd2c66729e646104165003b6a43.png";

interface PaymentResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  bookingRef?: string;
  errorMessage?: string;
  onDownloadTicket?: () => void;
  onViewTrips?: () => void;
}

export function PaymentResultModal({
  isOpen,
  onClose,
  success,
  bookingRef,
  errorMessage,
  onDownloadTicket,
  onViewTrips,
}: PaymentResultModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border-2 border-primary/10">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {success ? "Payment Successful" : "Payment Failed"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {success 
              ? "Your booking has been confirmed and your tickets are ready" 
              : "There was an issue processing your payment"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={flybethLogo} alt="Flybeth" className="h-10" />
          </div>

          {success ? (
            // Success State
            <>
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-accent/20"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Payment Successful!
                </h2>
                <p className="text-muted-foreground">
                  Your booking has been confirmed
                </p>
              </div>

              {/* Booking Reference */}
              {bookingRef && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
                  <p className="text-xl tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {bookingRef}
                  </p>
                </div>
              )}

              {/* Confirmation Message */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">Your tickets are ready!</p>
                    <p className="text-muted-foreground text-xs">
                      A confirmation email has been sent with your e-tickets and booking details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {onDownloadTicket && (
                  <Button
                    onClick={onDownloadTicket}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Tickets
                  </Button>
                )}
                
                {onViewTrips && (
                  <Button
                    onClick={onViewTrips}
                    variant="outline"
                    className="w-full border-2 hover:border-primary"
                  >
                    View My Trips
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="w-full"
                >
                  Continue Browsing
                </Button>
              </div>
            </>
          ) : (
            // Failure State
            <>
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-red-500" />
                </div>
              </motion.div>

              {/* Error Message */}
              <div className="space-y-2">
                <h2 className="text-2xl text-red-600">
                  Payment Failed
                </h2>
                <p className="text-muted-foreground">
                  We couldn't process your payment
                </p>
              </div>

              {/* Error Details */}
              {errorMessage && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-left">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-red-900">Error Details:</p>
                      <p className="text-red-700 text-xs">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Message */}
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-left">
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-yellow-900">What to do next:</p>
                  <ul className="text-yellow-800 text-xs space-y-1 list-disc list-inside">
                    <li>Check your card details and try again</li>
                    <li>Ensure you have sufficient funds</li>
                    <li>Try a different payment method</li>
                    <li>Contact your bank if the issue persists</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Try Again
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-2 hover:border-primary"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}