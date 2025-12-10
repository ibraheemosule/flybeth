import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import { Shield, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-primary to-accent text-white mb-6">
            <Shield className="mr-2 h-4 w-4" />
            Refund Policy
          </Badge>
          <h1 className="mb-4">Transparent & Fair Refund Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Last updated: November 22, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* 24-Hour Cancellation */}
          <Card className="bg-white/90 backdrop-blur-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                24-Hour Free Cancellation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We offer a full refund for cancellations made within 24 hours of
                booking, provided that the booking was made at least 7 days
                before the scheduled departure date.
              </p>
              <p>
                This applies to all flight bookings regardless of the fare type.
                The refund will be processed to the original payment method
                within 5-7 business days.
              </p>
            </CardContent>
          </Card>

          {/* Standard Cancellations */}
          <Card className="bg-white/90 backdrop-blur-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Standard Cancellations (After 24 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                For cancellations made after the 24-hour grace period, refund
                eligibility depends on the airline's policy and the fare type
                you purchased:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Refundable Tickets:</strong> Full refund minus any
                  airline processing fees
                </li>
                <li>
                  <strong>Non-Refundable Tickets:</strong> May be eligible for
                  credit towards future travel, subject to change fees
                </li>
                <li>
                  <strong>Basic Economy:</strong> Typically non-refundable and
                  non-changeable
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Airline-Initiated Cancellations */}
          <Card className="bg-white/90 backdrop-blur-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Airline-Initiated Cancellations or Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                If your flight is cancelled, significantly delayed, or
                rescheduled by the airline, you are entitled to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full refund to the original payment method, or</li>
                <li>
                  Rebooking on the next available flight at no additional cost
                </li>
              </ul>
              <p>
                We will notify you immediately via email and SMS if the airline
                makes any changes to your booking.
              </p>
            </CardContent>
          </Card>

          {/* Processing Times */}
          <Card className="bg-white/90 backdrop-blur-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Refund Processing Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Flybeth processing: 3-5 business days</li>
                <li>Airline approval: 5-7 business days</li>
                <li>Bank/card issuer: 7-10 business days</li>
              </ul>
              <p className="pt-2">
                Total time from refund request to funds appearing in your
                account: approximately 15-22 business days. We'll keep you
                updated via email throughout the process.
              </p>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Flybeth service fees are non-refundable except during the
                  24-hour grace period
                </li>
                <li>
                  Refund policies vary by airline and fare class - always review
                  before booking
                </li>
                <li>
                  Travel insurance may provide additional coverage for
                  unforeseen circumstances
                </li>
                <li>Group bookings may have different cancellation terms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-white/90 backdrop-blur-lg border-2">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Questions about our refund policy? Contact our support team at{" "}
                <a
                  href="mailto:refunds@flybeth.com"
                  className="text-primary hover:underline"
                >
                  refunds@flybeth.com
                </a>{" "}
                or call us at 1-800-FLYBETH
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
