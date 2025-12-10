import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Checkbox,
} from "@/components/ui";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield } from "lucide-react";
import { toast } from "sonner";
import { useFlightsStore } from "@/stores";
import { useState } from "react";

export default function TravelerDetails({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const INSURANCE_PRICE = 29.99;
  const { selectedFlight: flight } = useFlightsStore();
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passengerInfo.firstName &&
      passengerInfo.lastName &&
      passengerInfo.email
    ) {
      setStep(3);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const update = (insurance: boolean) => {
    useFlightsStore.setState({
      selectedFlight: Object.assign({}, flight, { insurance }),
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="border-2 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-[#2563eb]" />
            Passenger Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePassengerSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={passengerInfo.firstName}
                  onChange={e =>
                    setPassengerInfo({
                      ...passengerInfo,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={passengerInfo.lastName}
                  onChange={e =>
                    setPassengerInfo({
                      ...passengerInfo,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={passengerInfo.email}
                  onChange={e =>
                    setPassengerInfo({
                      ...passengerInfo,
                      email: e.target.value,
                    })
                  }
                  placeholder="john@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={passengerInfo.phone}
                  onChange={e =>
                    setPassengerInfo({
                      ...passengerInfo,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <p className="text-sm text-muted-foreground">
                📧 Booking confirmation will be sent to your email
              </p>
            </div>

            {/* Travel Insurance Option */}
            <div className="p-5 rounded-xl border-2 border-[#2563eb]/20 bg-gradient-to-br from-[#2563eb]/5 to-[#10b981]/5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox
                    id="insurance"
                    checked={flight?.insurance || false}
                    onCheckedChange={checked => update(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="insurance"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4 text-[#10b981]" />
                      Add Travel Protection Insurance
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Protect your trip with comprehensive coverage including
                      trip cancellation, medical emergencies, baggage loss, and
                      flight delays. Get 24/7 travel assistance wherever you go.
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">
                    ${INSURANCE_PRICE}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    per traveler
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/60 border border-[#2563eb]/10">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Note:</strong> By checking this option, you agree
                  to add Travel Protection Insurance to your booking. This
                  charge will be added to your total at checkout and is
                  non-refundable after purchase.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90"
            >
              Continue to Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
