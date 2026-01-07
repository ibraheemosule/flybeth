import { useState, useEffect } from "react";
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
import { toast } from "sonner@2.0.3";
import { PassengerForm } from "./PassengerForm";
import { ProcessingPaymentOverlay } from "./ProcessingPaymentOverlay";
import { PaymentResultModal } from "./PaymentResultModal";
import { generateTicketPDF } from "../utils/ticketGenerator";

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
    passengers?: number;
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

  // Number of passengers (default to 1 if not specified)
  const numPassengers = searchParams.passengers || 1;
  
  // Check if flight is international (simple check - can be enhanced)
  const isInternational = !["JFK", "LAX", "ORD", "MIA", "DEN", "ATL", "SFO", "SEA", "BOS"].includes(searchParams.to);
  
  // Check if origin is Nigeria (Lagos or Abuja)
  const isFromNigeria = searchParams.from.includes('Lagos') || searchParams.from.includes('Abuja') || searchParams.from.includes('LOS') || searchParams.from.includes('ABV');
  
  // Current passenger being edited (0-indexed)
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
  
  // Initialize passenger data with proper structure
  const initializePassengerData = () => {
    return Array(numPassengers).fill(null).map(() => ({
      dateOfBirth: "",
      name: {
        firstName: "",
        lastName: "",
      },
      gender: "",
      contact: {
        emailAddress: "",
        phones: [
          {
            deviceType: "MOBILE" as const,
            countryCallingCode: "+1",
            number: "",
          },
        ],
      },
      documents: isInternational
        ? [
            {
              documentType: "PASSPORT" as const,
              birthPlace: "",
              issuanceLocation: "",
              issuanceDate: "",
              number: "",
              expiryDate: "",
              issuanceCountry: "",
              validityCountry: "",
              nationality: "",
              holder: true,
            },
          ]
        : undefined,
    }));
  };
  
  // Store passenger data for all passengers
  const [passengersData, setPassengersData] = useState<any[]>(initializePassengerData());

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  // New state for insurance and terms
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Payment result states
  const [showResultModal, setShowResultModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  
  // Guest email state
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  
  const INSURANCE_PRICE = 29.99;
  const basePrice = flight.price * numPassengers;
  const insuranceTotal = travelInsurance ? INSURANCE_PRICE * numPassengers : 0;
  const totalPrice = basePrice + insuranceTotal;

  const handleContinueAsGuest = () => {
    if (!guestEmail || !guestEmail.includes('@')) {
      toast.error("Please enter a valid email address to continue");
      return;
    }
    
    if (!guestPhone || guestPhone.length < 10) {
      toast.error("Please enter a valid phone number to continue");
      return;
    }
    
    // Set the email and phone for the first passenger
    const newData = [...passengersData];
    if (newData[0]) {
      newData[0] = {
        ...newData[0],
        contact: {
          ...newData[0].contact,
          emailAddress: guestEmail,
          phones: [
            {
              deviceType: "MOBILE" as const,
              countryCallingCode: "+1",
              number: guestPhone,
            },
          ],
        },
      };
      setPassengersData(newData);
    }
    
    setStep(2);
  };

  const handlePassengerDataUpdate = (index: number, data: any) => {
    const newData = [...passengersData];
    newData[index] = data;
    setPassengersData(newData);
  };

  const validateCurrentPassenger = () => {
    const passenger = passengersData[currentPassengerIndex];
    const hasBasicInfo = passenger.name?.firstName && passenger.name?.lastName && passenger.dateOfBirth && passenger.gender;
    const hasContact = currentPassengerIndex === 0 ? (passenger.contact?.emailAddress && passenger.contact?.phones?.[0]?.number) : true;
    const hasPassport = isInternational ? (passenger.documents?.[0]?.number && passenger.documents?.[0]?.expiryDate && passenger.documents?.[0]?.nationality && passenger.documents?.[0]?.issuanceCountry) : true;
    
    return hasBasicInfo && hasContact && hasPassport;
  };

  const handleNextPassenger = () => {
    if (!validateCurrentPassenger()) {
      toast.error("Please fill in all required fields before continuing");
      return;
    }
    
    if (currentPassengerIndex < numPassengers - 1) {
      setCurrentPassengerIndex(currentPassengerIndex + 1);
    }
  };

  const handlePreviousPassenger = () => {
    if (currentPassengerIndex > 0) {
      setCurrentPassengerIndex(currentPassengerIndex - 1);
    }
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentPassenger()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate all passengers have required data
    const allValid = passengersData.every((passenger, idx) => {
      const hasBasicInfo = passenger.name?.firstName && passenger.name?.lastName && passenger.dateOfBirth && passenger.gender;
      const hasContact = idx === 0 ? (passenger.contact?.emailAddress && passenger.contact?.phones?.[0]?.number) : true;
      const hasPassport = isInternational ? (passenger.documents?.[0]?.number && passenger.documents?.[0]?.expiryDate && passenger.documents?.[0]?.nationality && passenger.documents?.[0]?.issuanceCountry) : true;
      
      return hasBasicInfo && hasContact && hasPassport;
    });
    
    if (allValid) {
      setStep(3);
    } else {
      toast.error("Please complete information for all passengers");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions to proceed");
      return;
    }
    
    if (isFromNigeria) {
      // Initialize Paystack payment
      handlePaystackPayment();
    } else {
      // Standard card payment
      if (
        paymentInfo.cardNumber &&
        paymentInfo.expiry &&
        paymentInfo.cvv &&
        paymentInfo.cardName
      ) {
        setIsProcessing(true);
        // Simulate payment processing with realistic delay
        setTimeout(() => {
          // Simulate 90% success rate
          const isSuccess = Math.random() > 0.1;
          
          setIsProcessing(false);
          
          if (isSuccess) {
            // Generate booking reference
            const ref = 'FLY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            setBookingReference(ref);
            setPaymentSuccess(true);
            setPaymentError("");
            setShowResultModal(true);
          } else {
            // Payment failed
            setPaymentSuccess(false);
            setPaymentError("Your card was declined. Please check your card details and try again, or use a different payment method.");
            setShowResultModal(true);
          }
        }, 3000);
      } else {
        toast.error("Please fill in all payment details");
      }
    }
  };

  const handlePaystackPayment = () => {
    setIsProcessing(true);
    
    // Get primary passenger email
    const customerEmail = passengersData[0]?.contact?.emailAddress || 'customer@example.com';
    
    // Convert price to Kobo (Paystack uses smallest currency unit)
    const amountInKobo = Math.round(totalPrice * 100 * 1600); // Assuming 1 USD = 1600 NGN
    
    // Paystack popup configuration
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with actual Paystack public key
      email: customerEmail,
      amount: amountInKobo,
      currency: 'NGN',
      ref: 'FLY_' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Booking Type",
            variable_name: "booking_type",
            value: "Flight"
          },
          {
            display_name: "Passenger Name",
            variable_name: "passenger_name",
            value: `${passengersData[0]?.name?.firstName} ${passengersData[0]?.name?.lastName}`
          }
        ]
      },
      callback: function(response: any) {
        setIsProcessing(false);
        setBookingReference(response.reference);
        setPaymentSuccess(true);
        setPaymentError("");
        setShowResultModal(true);
      },
      onClose: function() {
        setIsProcessing(false);
        setPaymentSuccess(false);
        setPaymentError("Payment was cancelled. You closed the payment window.");
        setShowResultModal(true);
      }
    });
    
    handler.openIframe();
  };

  const handleDownloadTicket = () => {
    const currentDate = new Date().toLocaleDateString();
    
    const ticketData = {
      bookingRef: bookingReference,
      type: "Flight",
      from: searchParams.from,
      to: searchParams.to,
      departureDate: searchParams.departDate,
      departureTime: flight.departure.time,
      arrivalTime: flight.arrival.time,
      airline: flight.airline,
      flightNumber: `${flight.airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`,
      className: flight.class,
      duration: flight.duration,
      terminal: `Terminal ${Math.floor(Math.random() * 4 + 1)}`,
      gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 20 + 1)}`,
      passengers: passengersData.map((p, idx) => ({
        firstName: p.name.firstName,
        lastName: p.name.lastName,
        dateOfBirth: p.dateOfBirth,
        seatNumber: `${Math.floor(Math.random() * 30 + 1)}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`
      })),
      price: `$${totalPrice.toFixed(2)}`,
      purchaseDate: currentDate,
    };
    
    generateTicketPDF(ticketData);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    if (paymentSuccess) {
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
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="guestEmail" className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            Email Address *
                          </Label>
                          <Input
                            id="guestEmail"
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full"
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll send your booking confirmation and e-tickets to this email
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guestPhone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            Phone Number *
                          </Label>
                          <Input
                            id="guestPhone"
                            type="tel"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+1 123 456 7890"
                            className="w-full"
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll use this number to send booking updates and confirmations
                          </p>
                        </div>
                        <Button
                          onClick={handleContinueAsGuest}
                          variant="outline"
                          className="w-full border-2 hover:border-primary"
                        >
                          Continue as Guest
                        </Button>
                      </div>
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
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-6 w-6 text-primary" />
                        Passenger Information
                      </div>
                      {numPassengers > 1 && (
                        <Badge variant="outline" className="text-sm">
                          {currentPassengerIndex + 1} of {numPassengers}
                        </Badge>
                      )}
                    </CardTitle>
                    
                    {/* Passenger Tabs Navigation */}
                    {numPassengers > 1 && (
                      <div className="mt-2 pt-3 border-t space-y-1.5">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: numPassengers }).map((_, idx) => {
                            const passenger = passengersData[idx];
                            const isComplete = passenger?.name?.firstName && passenger?.name?.lastName && passenger?.dateOfBirth && passenger?.gender;
                            const isActive = idx === currentPassengerIndex;
                            
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentPassengerIndex(idx)}
                                className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1 ${
                                  isActive
                                    ? "bg-primary/5 text-primary border border-primary/20"
                                    : isComplete
                                    ? "bg-transparent text-green-600 border border-green-200/60 hover:bg-green-50/50"
                                    : "bg-transparent text-gray-500 border border-gray-200/60 hover:bg-gray-50/50"
                                }`}
                              >
                                {isComplete && !isActive && (
                                  <CheckCircle2 className="h-2.5 w-2.5" />
                                )}
                                <span>
                                  Passenger {idx + 1}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Progress bar */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: numPassengers }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-0.5 flex-1 rounded-full transition-all ${
                                passengersData[idx]?.name?.firstName && passengersData[idx]?.name?.lastName
                                  ? "bg-primary/40"
                                  : idx === currentPassengerIndex
                                  ? "bg-primary/20"
                                  : "bg-gray-200/60"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePassengerSubmit} className="space-y-4">
                      <PassengerForm
                        index={currentPassengerIndex}
                        onUpdate={handlePassengerDataUpdate}
                        isInternational={isInternational}
                        initialData={passengersData[currentPassengerIndex]}
                      />

                      {/* Show insurance only on last passenger */}
                      {currentPassengerIndex === numPassengers - 1 && (
                        /* Travel Insurance Option */
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
                      )}

                      {/* Navigation Buttons */}
                      {numPassengers > 1 && currentPassengerIndex < numPassengers - 1 ? (
                        // Not on last passenger - show next/previous
                        <div className="flex gap-3">
                          {currentPassengerIndex > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePreviousPassenger}
                              className="flex-1"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous Passenger
                            </Button>
                          )}
                          <Button
                            type="button"
                            onClick={handleNextPassenger}
                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                          >
                            Next Passenger
                            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                          </Button>
                        </div>
                      ) : (
                        // On last passenger or single passenger - show payment button
                        <div className="flex gap-3">
                          {numPassengers > 1 && currentPassengerIndex > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePreviousPassenger}
                              className="flex-1"
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous Passenger
                            </Button>
                          )}
                          <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                          >
                            Continue to Payment
                          </Button>
                        </div>
                      )}
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
                      {isFromNigeria ? (
                        /* Paystack Payment for Nigeria */
                        <>
                          <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                                <svg className="w-8 h-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="100" cy="100" r="100" fill="#00C3F7"/>
                                  <path d="M60 100L80 120L140 60" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-green-900">Paystack Secure Payment</h3>
                                <p className="text-sm text-green-700">Fast & secure payment for Nigerian customers</p>
                              </div>
                            </div>
                            <p className="text-sm text-green-800 leading-relaxed">
                              Your payment will be processed securely through Paystack. Click the button below to complete your booking. You can pay with your card, bank account, or mobile money.
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                            <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm mb-1">Secure Payment</p>
                              <p className="text-xs text-muted-foreground">
                                All transactions are encrypted and processed securely through Paystack's PCI-DSS compliant platform.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Standard Card Payment */
                        <>
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
                        </>
                      )}

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
                          Base Fare ({numPassengers} {numPassengers === 1 ? 'Adult' : 'Adults'})
                        </span>
                        <span>${basePrice.toFixed(2)}</span>
                      </div>
                      {travelInsurance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Travel Insurance (×{numPassengers})
                          </span>
                          <span>${insuranceTotal.toFixed(2)}</span>
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
        
        {/* Processing Overlay */}
        <ProcessingPaymentOverlay isOpen={isProcessing} />
        
        {/* Payment Result Modal */}
        <PaymentResultModal
          isOpen={showResultModal}
          onClose={handleCloseResultModal}
          success={paymentSuccess}
          bookingRef={bookingReference}
          errorMessage={paymentError}
          onDownloadTicket={paymentSuccess ? handleDownloadTicket : undefined}
          onViewTrips={paymentSuccess ? onComplete : undefined}
        />
      </div>
    </div>
  );
}