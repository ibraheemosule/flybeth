import { useState } from "react";
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
import { CreditCard, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { useFlightsStore } from "@/stores";

import { useRouter } from "next/navigation";

export default function PaymentDetails() {
  const router = useRouter();
  const { selectedFlight: flight } = useFlightsStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const INSURANCE_PRICE = 29.99;
  const totalPrice = flight?.insurance
    ? (flight?.price || 0) + INSURANCE_PRICE
    : flight?.price;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions to proceed");
      return;
    }

    if (
      paymentInfo.cardNumber &&
      paymentInfo.expiry &&
      paymentInfo.cvv &&
      paymentInfo.cardName
    ) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        toast.success("Payment Successful!", {
          description: "Your booking has been confirmed",
        });
      }, 2500);
      router.push("/bookings");
    } else {
      toast.error("Please fill in all payment details");
    }
  };
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="border-2 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-[#2563eb]" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name *</Label>
              <Input
                id="cardName"
                value={paymentInfo.cardName}
                onChange={e =>
                  setPaymentInfo({
                    ...paymentInfo,
                    cardName: e.target.value,
                  })
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={e =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cardNumber: e.target.value,
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input
                  id="expiry"
                  value={paymentInfo.expiry}
                  onChange={e =>
                    setPaymentInfo({
                      ...paymentInfo,
                      expiry: e.target.value,
                    })
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={paymentInfo.cvv}
                  onChange={e =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cvv: e.target.value,
                    })
                  }
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#2563eb]/5 border border-[#2563eb]/20 flex items-start gap-3">
              <Lock className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>
            </div>

            {/* Ticketing Disclaimer */}
            <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200/60 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-yellow-900">
                  <strong>Important Booking Information:</strong>
                </p>
                <p className="text-xs text-yellow-800 leading-relaxed">
                  By clicking "Complete Booking," you are unconditionally
                  agreeing to purchase this ticket and are liable for full
                  payment. You will receive your confirmation email with ticket
                  numbers within 30 minutes. If you do not receive confirmation,
                  please contact our support team immediately.
                </p>
                <div className="text-xs text-yellow-800 space-y-1 mt-2">
                  <p>
                    • <strong>Cancellation:</strong> A $25 service fee applies
                    to refunded tickets (in addition to airline penalties)
                  </p>
                  <p>
                    • <strong>Changes:</strong> A $25 service fee applies to
                    passenger/agent-requested reissues
                  </p>
                  <p>
                    • <strong>24-Hour Void:</strong> Eligible tickets can be
                    voided within 24 hours with a $10 service fee
                  </p>
                  <p>
                    • <strong>Schedule Changes:</strong> Airline-initiated
                    changes do not incur our service fee
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="p-5 rounded-lg border border-[#2563eb]/20 bg-gradient-to-br from-[#2563eb]/3 to-[#10b981]/3">
              <div className="flex gap-4">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={checked =>
                    setAgreedToTerms(checked as boolean)
                  }
                  className="mt-1.5 flex-shrink-0"
                />
                <div className="flex-1 space-y-3">
                  <div>
                    <Label
                      htmlFor="terms"
                      className="cursor-pointer text-sm font-semibold text-gray-900"
                    >
                      I agree to the terms and conditions *
                    </Label>
                  </div>

                  <div className="bg-white/50 rounded-md p-3 border border-white/60">
                    <p className="text-xs text-gray-600 mb-2">
                      By proceeding with this booking, I confirm that I have
                      read and accept:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          window.open("/terms", "_blank");
                        }}
                        className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 rounded-md border border-[#2563eb]/20 hover:border-[#2563eb]/30 transition-colors"
                      >
                        Terms & Conditions
                      </a>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          window.open("/privacy", "_blank");
                        }}
                        className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 rounded-md border border-[#2563eb]/20 hover:border-[#2563eb]/30 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          window.open("/refund", "_blank");
                        }}
                        className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 rounded-md border border-[#2563eb]/20 hover:border-[#2563eb]/30 transition-colors"
                      >
                        Refund Policy
                      </a>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      I understand the ticketing terms, cancellation policies,
                      and service fees outlined above.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing || !agreedToTerms}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Booking - ${totalPrice?.toFixed(2)}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
