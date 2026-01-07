import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Separator,
  Badge,
  Checkbox,
} from "@/components/ui";
import { motion } from "framer-motion";
import { Plane, CheckCircle2, Calendar, MapPin, Shield } from "lucide-react";
import { useFlightsStore } from "@/stores/flightsStore";
import { formatDate } from "@packages/shared-utils";

export default function BookingSummary() {
  const { selectedFlight: flight, searchParams } = useFlightsStore();

  const INSURANCE_PRICE = 29.99;
  const totalPrice = flight?.insurance
    ? (flight?.price || 0) + INSURANCE_PRICE
    : flight?.price;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-4"
    >
      <Card className="border-2 border-[#2563eb]/20 bg-white/90 backdrop-blur-lg shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white">
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* Flight Details */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <Plane className="h-5 w-5 text-[#2563eb]" />
              Flight Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Airline</span>
                <span>{flight?.airline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Class</span>
                <Badge variant="outline">{flight?.flightClass}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Route */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#10b981]" />
              Route
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div>{flight?.departure.time}</div>
                  <div className="text-xs text-muted-foreground">
                    {flight?.departure.airport}
                  </div>
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#10b981]" />
                <div className="text-center">
                  <div>{flight?.arrival.time}</div>
                  <div className="text-xs text-muted-foreground">
                    {flight?.arrival.airport}
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {flight?.duration} • {flight?.stops}
              </div>
            </div>
          </div>

          <Separator />

          {/* Travel Date */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#2563eb]" />
              Travel Date
            </h4>
            {searchParams?.departDate && (
              <p className="text-sm">
                {formatDate(new Date(searchParams.departDate))}
              </p>
            )}
            {searchParams?.returnDate && (
              <p className="text-sm text-muted-foreground">
                Return: {formatDate(new Date(searchParams.returnDate))}
              </p>
            )}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div>
            <h4 className="mb-3">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Base Fare (1 Adult)
                </span>
                <span>${flight?.price}</span>
              </div>
              {flight?.insurance && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Travel Insurance
                  </span>
                  <span>${INSURANCE_PRICE}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span>Included</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 border border-[#2563eb]/20">
            <div className="flex justify-between items-center">
              <span>Total Price</span>
              <span className="text-3xl bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">
                ${totalPrice?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#10b981]" />
              <span>100% Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
              <span>Free Cancellation within 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
              <span>Price Match Guarantee</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
