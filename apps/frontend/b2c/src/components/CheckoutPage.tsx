import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import {
  Plane,
  CreditCard,
  Lock,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface CheckoutPageProps {
  flight: {
    id: number;
    airline: string;
    price: number;
    departure: { time: string; airport: string };
    arrival: { time: string; airport: string };
    duration: string;
    stops: string;
    class: string;
  };
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
  };
  onBack: () => void;
  onComplete: () => void;
  isSignedIn: boolean;
  onSignIn: () => void;
}

export function CheckoutPage({
  flight,
  searchParams,
  onBack,
  onComplete,
  isSignedIn,
  onSignIn,
}: CheckoutPageProps) {
  const [step, setStep] = useState(isSignedIn ? 2 : 1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  // New state for insurance and terms
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const INSURANCE_PRICE = 29.99;
  const totalPrice = travelInsurance ? flight.price + INSURANCE_PRICE : flight.price;

  const handleContinueAsGuest = () => {
    setStep(2);
  };

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
        onComplete();
      }, 2500);
    } else {
      toast.error("Please fill in all payment details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div
              className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-gray-200"}`}
              >
                {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
              </div>
              <span className="text-sm hidden sm:inline">Account</span>
            </div>
            <div className={`h-[2px] w-20 ${step >= 2 ? "bg-gradient-to-r from-primary to-accent" : "bg-gray-200"}`} />
            <div
              className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-gray-200"}`}
              >
                {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : "2"}
              </div>
              <span className="text-sm hidden sm:inline">Passenger</span>
            </div>
            <div className={`h-[2px] w-20 ${step >= 3 ? "bg-gradient-to-r from-primary to-accent" : "bg-gray-200"}`} />
            <div
              className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="text-sm hidden sm:inline">Payment</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Sign In or Continue as Guest */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
                      Account Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                      <h3 className="mb-2">Already have an account?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Sign in to access your saved preferences and earn
                        rewards
                      </p>
                      <Button
                        onClick={onSignIn}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      >
                        Sign In
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">
                          Or
                        </span>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border-2 border-dashed border-gray-300">
                      <h3 className="mb-2">Continue as Guest</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Book quickly without creating an account
                      </p>
                      <Button
                        onClick={handleContinueAsGuest}
                        variant="outline"
                        className="w-full border-2 hover:border-primary"
                      >
                        Continue as Guest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Passenger Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
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
                            onChange={(e) =>
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
                            onChange={(e) =>
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
                            onChange={(e) =>
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
                            onChange={(e) =>
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

                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm text-muted-foreground">
                          📧 Booking confirmation will be sent to your email
                        </p>
                      </div>

                      {/* Travel Insurance Option */}
                      <div className="p-5 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Checkbox
                              id="insurance"
                              checked={travelInsurance}
                              onCheckedChange={(checked) => setTravelInsurance(checked as boolean)}
                              className="mt-1"
                            />
                            <div className="space-y-1">
                              <Label htmlFor="insurance" className="cursor-pointer flex items-center gap-2">
                                <Shield className="h-4 w-4 text-accent" />
                                Add Travel Protection Insurance
                              </Label>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Protect your trip with comprehensive coverage including trip cancellation, medical emergencies, baggage loss, and flight delays. Get 24/7 travel assistance wherever you go.
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              ${INSURANCE_PRICE}
                            </div>
                            <div className="text-xs text-muted-foreground">per traveler</div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/60 border border-primary/10">
                          <p className="text-xs text-muted-foreground">
                            💡 <strong>Note:</strong> By checking this option, you agree to add Travel Protection Insurance to your booking. This charge will be added to your total at checkout and is non-refundable after purchase.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      >
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-6 w-6 text-primary" />
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
                          onChange={(e) =>
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
                            onChange={(e) =>
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
                            onChange={(e) =>
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
                            onChange={(e) =>
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

                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm mb-1">Secure Payment</p>
                          <p className="text-xs text-muted-foreground">
                            Your payment information is encrypted and secure.
                            We never store your card details.
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
                            By clicking "Complete Booking," you are unconditionally agreeing to purchase this ticket and are liable for full payment. You will receive your confirmation email with ticket numbers within 30 minutes. If you do not receive confirmation, please contact our support team immediately.
                          </p>
                          <div className="text-xs text-yellow-800 space-y-1 mt-2">
                            <p>• <strong>Cancellation:</strong> A $25 service fee applies to refunded tickets (in addition to airline penalties)</p>
                            <p>• <strong>Changes:</strong> A $25 service fee applies to passenger/agent-requested reissues</p>
                            <p>• <strong>24-Hour Void:</strong> Eligible tickets can be voided within 24 hours with a $10 service fee</p>
                            <p>• <strong>Schedule Changes:</strong> Airline-initiated changes do not incur our service fee</p>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions Checkbox */}
                      <div className="p-4 rounded-lg border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                            I have read and agree to the{" "}
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                window.open('/terms', '_blank');
                              }}
                              className="text-primary hover:underline"
                            >
                              Terms and Conditions
                            </a>
                            ,{" "}
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                window.open('/privacy', '_blank');
                              }}
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </a>
                            , and{" "}
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                window.open('/refund', '_blank');
                              }}
                              className="text-primary hover:underline"
                            >
                              Refund Policy
                            </a>
                            . I understand and accept the ticketing terms outlined above. *
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isProcessing || !agreedToTerms}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Complete Booking - ${totalPrice.toFixed(2)}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-4"
            >
              <Card className="border-2 border-primary/20 bg-white/90 backdrop-blur-lg shadow-xl">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {/* Flight Details */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary" />
                      Flight Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Airline</span>
                        <span>{flight.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class</span>
                        <Badge variant="outline">{flight.class}</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Route */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      Route
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div>{flight.departure.time}</div>
                          <div className="text-xs text-muted-foreground">
                            {flight.departure.airport}
                          </div>
                        </div>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-primary to-accent" />
                        <div className="text-center">
                          <div>{flight.arrival.time}</div>
                          <div className="text-xs text-muted-foreground">
                            {flight.arrival.airport}
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        {flight.duration} • {flight.stops}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Travel Date */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Travel Date
                    </h4>
                    <p className="text-sm">{searchParams.departDate}</p>
                    {searchParams.returnDate && (
                      <p className="text-sm text-muted-foreground">
                        Return: {searchParams.returnDate}
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
                        <span>${flight.price}</span>
                      </div>
                      {travelInsurance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Travel Insurance
                          </span>
                          <span>${INSURANCE_PRICE}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Taxes & Fees
                        </span>
                        <span>Included</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span>Total Price</span>
                      <span className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>100% Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span>Free Cancellation within 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span>Price Match Guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}