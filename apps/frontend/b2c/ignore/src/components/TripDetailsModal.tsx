import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Plane, Hotel, Calendar, Users, MapPin, Clock, CheckCircle2, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

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

export function TripDetailsModal({ open, onOpenChange, trip }: TripDetailsModalProps) {
  // Ensure trip has details object to prevent errors
  const tripDetails = trip?.details || { guests: "N/A" };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Trip Details</span>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
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
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white">
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
              <h4 className="flex items-center gap-2 text-primary">
                <Plane className="h-5 w-5" />
                Flight Information
              </h4>
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p>{tripDetails.flight}</p>
                  </div>
                  <Badge variant="outline" className="bg-white">Economy Class</Badge>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Departure</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>8:30 AM</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>11:45 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{tripDetails.guests}</span>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
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
              <h4 className="flex items-center gap-2 text-accent">
                <Hotel className="h-5 w-5" />
                Hotel Information
              </h4>
              <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10 space-y-3">
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
                    <p className="text-sm text-muted-foreground">4.5/5 rating</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Room Type</p>
                  <p>Deluxe Ocean View Room</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                    <p>3:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                    <p>11:00 AM</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
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
                <Mail className="h-4 w-4 text-primary" />
                <span>support@flybeth.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>1-800-FLYBETH (24/7 Support)</span>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Price</span>
              <span className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {trip.price}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-2 hover:border-accent"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Manage Booking
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}