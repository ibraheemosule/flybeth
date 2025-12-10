import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
  Input,
} from "@/components/ui";
import {
  Calendar,
  Plane,
  Hotel,
  Users,
  Edit,
  XCircle,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ManageBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: any;
}

export function ManageBookingModal({
  open,
  onOpenChange,
  trip,
}: ManageBookingModalProps) {
  const [isModifying, setIsModifying] = useState(false);

  const handleModifyDates = () => {
    setIsModifying(true);
    toast.success("Date modification requested", {
      description: "Our team will contact you shortly to finalize the changes.",
    });
    setTimeout(() => {
      setIsModifying(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleCancelBooking = () => {
    toast.error("Cancellation requested", {
      description:
        "A cancellation request has been submitted. You'll receive confirmation via email.",
    });
    setTimeout(() => {
      onOpenChange(false);
    }, 2000);
  };

  const handleAddServices = () => {
    toast.success("Service upgrade requested", {
      description: "Additional services will be added to your booking.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">
                Manage Your Booking
              </DialogTitle>
              <DialogDescription>
                Modify dates, add services, or cancel your booking
              </DialogDescription>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              {trip.bookingRef}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Current Booking Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Destination
                </p>
                <p className="font-medium">{trip.destination}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Travel Dates
                </p>
                <p className="font-medium">{trip.dates}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Booking Type
                </p>
                <p className="font-medium">{trip.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Price
                </p>
                <p className="font-medium text-primary text-xl">{trip.price}</p>
              </div>
            </div>
          </div>

          {/* Manage Options */}
          <Tabs defaultValue="modify" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modify">Modify Dates</TabsTrigger>
              <TabsTrigger value="services">Add Services</TabsTrigger>
              <TabsTrigger value="cancel">Cancel Booking</TabsTrigger>
            </TabsList>

            <TabsContent value="modify" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-dates">Select New Dates</Label>
                  <Input
                    id="new-dates"
                    type="text"
                    placeholder="e.g., Dec 20 - Dec 27, 2025"
                    className="mt-2"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Date changes may be subject to availability and price
                      differences. Our team will confirm the new pricing before
                      finalizing your modification.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleModifyDates}
                  disabled={isModifying}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isModifying ? "Processing..." : "Request Date Change"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4 mt-6">
              <div className="space-y-3">
                <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Upgrade to Premium Economy
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Extra legroom and amenities
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddServices}
                    >
                      Add +$199
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Hotel className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Airport Transfer</p>
                        <p className="text-sm text-muted-foreground">
                          Private car service
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddServices}
                    >
                      Add +$89
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Travel Insurance</p>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive coverage
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddServices}
                    >
                      Add +$49
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cancel" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900 mb-2">
                        Cancellation Policy
                      </h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Cancel 14+ days before: Full refund</li>
                        <li>• Cancel 7-13 days before: 50% refund</li>
                        <li>• Cancel less than 7 days: No refund</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Reason for Cancellation (Optional)</Label>
                  <Input placeholder="Help us improve our service..." />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimated Refund
                  </p>
                  <p className="text-2xl font-medium text-gray-900">
                    {trip.price}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Refund will be processed within 5-7 business days
                  </p>
                </div>

                <Button
                  onClick={handleCancelBooking}
                  variant="destructive"
                  className="w-full"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <div className="border-t pt-6">
            <h4 className="mb-3">Need Help?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start gap-2">
                <Phone className="h-4 w-4" />
                Call Support: 1-800-FLYBETH
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Mail className="h-4 w-4" />
                Email: support@flybeth.com
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
