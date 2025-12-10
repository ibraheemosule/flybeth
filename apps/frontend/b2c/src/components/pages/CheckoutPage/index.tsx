"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

import { ArrowLeft } from "lucide-react";
import BookingSummary from "./BookingSummary";
import BookingAccount from "./BookingAccount";
import TravelerDetails from "./TravelerDetails";
import PaymentDetails from "./PaymentDetails";
import ProgressSteps from "./ProgressSteps";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const isSignedIn = false;
  const [step, setStep] = useState(isSignedIn ? 2 : 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563eb]/5 via-white to-[#10b981]/5 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-[#2563eb]/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <ProgressSteps step={step} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && <BookingAccount setStep={setStep} />}
            {step === 2 && <TravelerDetails setStep={setStep} />}
            {step === 3 && <PaymentDetails />}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
