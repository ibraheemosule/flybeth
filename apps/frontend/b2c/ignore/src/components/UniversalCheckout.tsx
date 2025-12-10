import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { motion } from "motion/react";
import {
  Plane,
  Hotel,
  Car,
  Package,
  Ticket,
  CreditCard,
  Lock,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ArrowLeft,
  AlertCircle,
  Shield,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ReceiptModal } from "./ReceiptModal";

interface UniversalCheckoutProps {
  booking: any;
  bookingType: "flight" | "hotel" | "car" | "package" | "attraction";
  onBack: () => void;
  onComplete: () => void;
  isSignedIn: boolean;
  onSignIn: () => void;
}

const INSURANCE_PRICE = 29.99;

export function UniversalCheckout({
  booking,
  bookingType,
  onBack,
  onComplete,
  isSignedIn,
  onSignIn,
}: UniversalCheckoutProps) {
  const [step, setStep] = useState(isSignedIn ? 2 : 1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

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

  const [travelInsurance, setTravelInsurance] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const basePrice = booking.price || 0;
  const totalPrice = travelInsurance ? basePrice + INSURANCE_PRICE : basePrice;

  const getIcon = () => {
    switch (bookingType) {
      case "flight":
        return Plane;
      case "hotel":
        return Hotel;
      case "car":
        return Car;
      case "package":
        return Package;
      case "attraction":
        return Ticket;
      default:
        return Plane;
    }
  };

  const getBookingLabel = () => {
    switch (bookingType) {
      case "flight":
        return "Passenger";
      case "hotel":
        return "Guest";
      case "car":
        return "Driver";
      case "package":
        return "Traveler";
      case "attraction":
        return "Visitor";
      default:
        return "Customer";
    }
  };

  const Icon = getIcon();

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
        // Store booking data
        const bookingData = {
          ...booking,
          bookingType,
          passengerInfo,
          travelInsurance,
          totalPrice,
          bookingRef: `FB-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`,
          bookingDate: new Date().toISOString(),
        };
        localStorage.setItem('lastBooking', JSON.stringify(bookingData));
        
        setShowReceipt(true);
      }, 2500);
    } else {
      toast.error("Please fill in all payment details");
    }
  };

  const handleReceiptClose = (open: boolean) => {
    setShowReceipt(open);
    if (!open) {
      onComplete();
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
              <span className="text-sm hidden sm:inline">Details</span>
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
                        Sign in to access your saved preferences and earn rewards
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

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
                      {getBookingLabel()} Information
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
                            placeholder="john.doe@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
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
                            placeholder="+1 (555) 000-0000"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12"
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
                className="space-y-6"
              >
                {/* Travel Insurance Option */}
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-accent" />
                      Protect Your Trip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20">
                      <Checkbox
                        id="insurance"
                        checked={travelInsurance}
                        onCheckedChange={(checked) =>
                          setTravelInsurance(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="insurance"
                          className="font-semibold cursor-pointer block mb-1"
                        >
                          Add Travel Insurance - ${INSURANCE_PRICE.toFixed(2)}
                        </label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Coverage includes trip cancellation, medical emergencies,
                          and lost baggage
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          * Please review full terms and conditions for coverage details
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="border-2 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
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
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) =>
                                setPaymentInfo({
                                  ...paymentInfo,
                                  cvv: e.target.value,
                                })
                              }
                              placeholder="123"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ticketing Disclaimer */}
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex gap-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                              Important Ticketing Information
                            </p>
                            <p className="text-xs text-blue-800">
                              Your booking is subject to availability. All prices include taxes
                              and fees. Additional charges may apply for changes or cancellations.
                              Please review our refund policy before completing your purchase.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) =>
                            setAgreedToTerms(checked as boolean)
                          }
                          className="mt-1"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <span className="text-primary font-semibold underline">
                            Terms & Conditions
                          </span>{" "}
                          and{" "}
                          <span className="text-primary font-semibold underline">
                            Privacy Policy
                          </span>{" "}
                          *
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-14"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-5 w-5" />
                            Complete Booking - ${totalPrice.toFixed(2)}
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        <span>Secure payment powered by Flybeth</span>
                      </div>
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
              className="sticky top-8"
            >
              <Card className="border-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2">{booking.name || booking.airline}</h3>
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Price</span>
                      <span className="font-semibold">${basePrice.toFixed(2)}</span>
                    </div>
                    {travelInsurance && (
                      <div className="flex justify-between text-accent">
                        <span>Travel Insurance</span>
                        <span className="font-semibold">
                          ${INSURANCE_PRICE.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-baseline">
                    <span className="text-lg">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (() => {
        const lastBooking = JSON.parse(localStorage.getItem('lastBooking') || '{}');
        
        // Create trip object with required fields
        const tripData = {
          id: Date.now(),
          destination: booking.destination || booking.location || booking.name || 'N/A',
          dates: booking.departDate 
            ? `${booking.departDate} - ${booking.returnDate || booking.checkoutDate || booking.dropOffDate || ''}`
            : booking.pickUpDate 
              ? `${booking.pickUpDate}${booking.dropOffDate ? ` - ${booking.dropOffDate}` : ''}`
              : 'N/A',
          bookingRef: lastBooking.bookingRef || `FB-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`,
          price: `$${totalPrice.toFixed(2)}`,
          type: bookingType.charAt(0).toUpperCase() + bookingType.slice(1),
          insurance: travelInsurance,
          insurancePrice: travelInsurance ? `$${INSURANCE_PRICE.toFixed(2)}` : undefined,
        };

        return (
          <ReceiptModal
            open={showReceipt}
            onOpenChange={handleReceiptClose}
            trip={tripData}
          />
        );
      })()}
    </div>
  );
}