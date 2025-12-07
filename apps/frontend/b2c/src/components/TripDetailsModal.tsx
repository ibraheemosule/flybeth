import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Plane,
  Hotel,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

interface TripDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: {
    id: number;
    destination: string;
    type: string;
    dates: string;
    bookingRef: string;
    status: string;
    price: string;
    details: {
      flight?: string;
      hotel?: string;
      guests: string;
    };
  };
}

export function TripDetailsModal({
  open,
  onOpenChange,
  trip,
}: TripDetailsModalProps) {
  // Ensure trip has details object to prevent errors
  const tripDetails = trip?.details || { guests: "N/A" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-[#2563eb]/10">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Trip Details</span>
            <Badge className="bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white">
              {trip.status === "confirmed" ? "Confirmed" : "Completed"}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            View all the details and information about your trip
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Destination Header */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white">
            <h2 className="mb-2 text-white">{trip.destination}</h2>
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="h-4 w-4" />
              <span>{trip.dates}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 mt-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Booking Reference: {trip.bookingRef}</span>
            </div>
          </div>

          {/* Flight Details */}
          {tripDetails.flight && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-[#2563eb]">
                <Plane className="h-5 w-5" />
                Flight Information
              </h4>
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#2563eb]/5 to-[#10b981]/5 border border-[#2563eb]/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p>{tripDetails.flight}</p>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    Economy Class
                  </Badge>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Departure
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#10b981]" />
                      <span>8:30 AM</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Arrival
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#10b981]" />
                      <span>11:45 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-[#2563eb]" />
                  <span>{tripDetails.guests}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                  <p className="text-sm">✓ 2 checked bags included</p>
                  <p className="text-sm">✓ Seat selection available</p>
                  <p className="text-sm">✓ Mobile boarding pass</p>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Details */}
          {tripDetails.hotel && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-[#10b981]">
                <Hotel className="h-5 w-5" />
                Hotel Information
              </h4>
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/5 to-[#2563eb]/5 border border-[#10b981]/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p>{tripDetails.hotel}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Beachfront Location</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-500">★★★★☆</div>
                    <p className="text-sm text-muted-foreground">
                      4.5/5 rating
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Room Type
                  </p>
                  <p>Deluxe Ocean View Room</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Check-in
                    </p>
                    <p>3:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Check-out
                    </p>
                    <p>11:00 AM</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/20">
                  <p className="text-sm">✓ Free breakfast included</p>
                  <p className="text-sm">✓ Pool & spa access</p>
                  <p className="text-sm">✓ Free WiFi</p>
                </div>
              </div>
            </div>
          )}

          {/* Contact & Support */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <h4 className="mb-3">Need Help?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#2563eb]" />
                <span>support@flybeth.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#10b981]" />
                <span>1-800-FLYBETH (24/7 Support)</span>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2563eb]/5 to-[#10b981]/5 border border-[#2563eb]/10">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Price</span>
              <span className="text-3xl bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">
                {trip.price}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-2 hover:border-[#10b981]"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90">
              Manage Booking
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
