import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Download,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
// Logo removed - using text instead

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: {
    id: number;
    destination: string;
    dates: string;
    bookingRef: string;
    price: string;
    type: string;
    insurance?: boolean;
    insurancePrice?: string;
  };
}

export function ReceiptModal({ open, onOpenChange, trip }: ReceiptModalProps) {
  const handleDownload = () => {
    // Simulate download
    const element = document.createElement("a");
    const file = new Blob([`Receipt for ${trip.bookingRef}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `Flybeth-Receipt-${trip.bookingRef}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-accent" />
            Booking Receipt
          </DialogTitle>
          <DialogDescription>
            Your complete booking receipt and payment confirmation
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header with Logo */}
          <div className="text-center py-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
            <span className="text-2xl font-bold text-blue-600 mx-auto mb-4 block text-center">
              FlyBeth
            </span>
            <h3 className="mb-1">Thank You for Booking with Flybeth!</h3>
            <p className="text-muted-foreground text-sm">
              Your adventure awaits
            </p>
          </div>

          {/* Booking Reference */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white">
            <p className="text-sm mb-1 text-white/80">Booking Reference</p>
            <p className="text-2xl tracking-wider">{trip.bookingRef}</p>
          </div>

          {/* Trip Details */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 text-primary">Trip Details</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p>{trip.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
                  <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Travel Dates
                    </p>
                    <p>{trip.dates}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
                  <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Booking Type
                    </p>
                    <p>{trip.type}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div>
              <h4 className="mb-3 text-primary">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{trip.price}</span>
                </div>
                {trip.insurance && trip.insurancePrice && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Travel Protection Insurance
                    </span>
                    <span>{trip.insurancePrice}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span>Included</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total Paid</span>
                  <span className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {trip.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Paid with Credit Card ending in ****4532</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Important Info */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm mb-2">
                📧 A confirmation email has been sent to your registered email
                address.
              </p>
              <p className="text-sm text-muted-foreground">
                Please save this receipt for your records. You can access it
                anytime from your My Trips page.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 hover:border-primary"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
